/**
 * @class Bobbotag.
 */
class Bobbotag {

  /**
   * @function constructor
   * @param {object} options
   * @param {string} options.tagChar 
   */
  constructor(options = {}) {
      this._setOptions(options)

      this.words = []
      this.prettyWords = []
      this.tags = {}

      this.tagReplaced = false
      this.tagCurrent = null
  }

  /**
   * @function getPrettyText
   */
  getPrettyText () {
    let extraChar = this.tagReplaced ? ' ' : ''
    return this.prettyWords.join(' ') + extraChar
  }

  /**
   * @function getText
   */
  getText () {
    return this.words.join(' ')
  }

  /**
   * @function getTags
   */
  getTags () {
    return this.tags
  }

  /**
   * @function getCurrentTag
   */
  getCurrentTag () {
    return this.tagCurrent
  }

  /**
   * @function replaceCurrentTag
   * @param {object} replaceObj
   * @param {string} replaceObj.value
   * @param {string} replaceObj.label
   */
  replaceCurrentTag (replaceObj) {
    if (!replaceObj.value || !replaceObj.label) {
      throw new TypeError('tag can be replaced with a {value, label} object')
    }

    const lastWord = this._arrayLast(this.words)
    const lastWordValue = this.options.tagChar + replaceObj.value
    const lastWordLabel = replaceObj.label.replace(/\s/g,'')

    this._arrayReplaceLast(this.words, lastWordValue)
    this._arrayReplaceLast(this.prettyWords, lastWordLabel)

    this.tags[replaceObj.value] = replaceObj
    this.tagReplaced = true
  }

  /**
   * @function changeText
   * @param {string} text 
   */
  changeText (text) {
    const textWords = text.split(' ')

    if (textWords.length > this.words.length) {
      this._manageWordAdded(textWords)
    } else if (textWords.length < this.words.length) {
      this._manageWordRemoved()
    } else {
      this._manageWordChanged(textWords)      
    }

    const lastWord = this._arrayLast(this.words)
    if (lastWord) {
      const firstChar = lastWord.charAt(0)
      const secondChar = lastWord.charAt(1)

      if ((firstChar === this.options.tagChar) && (secondChar !== '')) {
        this.tagCurrent = lastWord.substr(1)
      } else {
        this.tagCurrent = null
      }
    }

    this.tagReplaced = false
  }

  // Helpers:
  // //////////////////////////////////////////////////////////////////////////////

  _setOptions(options) {
    const tagChar = options.tagChar || '@'
    if (!tagChar || tagChar.length !== 1) {
      throw new TypeError('tag char should be a single character')
    }

    this.options = {
      tagChar
    }
  }

  _manageWordAdded(textWords) {
    const newWord = this._arrayLast(textWords)
    this._arrayAdd(this.words, newWord)
    this._arrayAdd(this.prettyWords, newWord)
  }

  _manageWordRemoved() {
    this._arrayRemoveLast(this.words)
    this._arrayRemoveLast(this.prettyWords)
  }

  _manageWordChanged(textWords) {
    const lastWord = this._arrayLast(this.words)
    const lastTextWord = this._arrayLast(textWords)

    if (lastWord.charAt(0) == this.options.tagChar &&
        lastTextWord.charAt(0) !== this.options.tagChar) {
      const sameTags = this.words.filter((el) => el == lastWord)
      if (sameTags.length < 2) delete this.tags[lastWord.substr(1)]

      this._arrayRemoveLast(this.words)
      this._arrayRemoveLast(this.prettyWords)
    } else {
      this._arrayReplaceLast(this.words, lastTextWord)
      this._arrayReplaceLast(this.prettyWords, lastTextWord)
    }
  }

  _arrayLast(array) {
    return array[array.length - 1]
  }

  _arrayAdd(array, value) {
    array.push(value)
  }
  
  _arrayRemoveLast(array) {
    array.splice(-1, 1)
  }

  _arrayReplaceLast(array, value) {
    array[array.length - 1] = value
  }

}

module.exports = Bobbotag