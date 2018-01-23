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

      this.tagCurrent = null
  }

  /**
   * @function getPrettyText
   */
  getPrettyText () {
    return this.prettyWords.join(' ')
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
      throw new TypeError('the tag should be replaced with a {value, label} object')
    }
    if (typeof replaceObj.value !== 'string' || typeof replaceObj.label !== 'string') {
      throw new TypeError('the value and label of replaceCurrentTag should be a string')
    }

    const lastWord = this._arrayLast(this.words)
    const lastWordValue = this.options.tagReplaced + this._stringWithNoSpaces(replaceObj.value)
    const lastWordLabel = this._stringWithNoSpaces(replaceObj.label)

    this._arrayReplaceLast(this.words, lastWordValue)
    this._arrayReplaceLast(this.prettyWords, lastWordLabel)
    this._arrayAdd(this.words, '')
    this._arrayAdd(this.prettyWords, '')

    this.tags[replaceObj.value] = replaceObj
  }

  /**
   * @function changeText
   * @param {string} text 
   */
  changeText (text) {
    this.tagCurrent = null
  
    const textWords = text.split(' ')

    if (textWords.length > this.words.length) {
      this._manageWordAdded(textWords)
    } else if (textWords.length < this.words.length) {
      this._manageWordRemoved()
    } else {
      this._manageWordChanged(textWords)      
    }

    const lastWord = this._arrayLast(this.words)
    if (lastWord && lastWord.startsWith(this.options.tag)) {
      const tag = lastWord.substr(this.options.tag.length)
      this.tagCurrent = tag && tag.length > 0 ? tag : null
    }
  }

  // Helpers:
  // //////////////////////////////////////////////////////////////////////////////

  _setOptions(options) {
    const tag = this._stringWithNoSpaces(options.tag || '@')
    if (!tag || typeof tag !== 'string') {
      throw new TypeError('tag option should be a string')
    }

    const tagReplaced = this._stringWithNoSpaces(options.tagReplaced || '@')
    if (!tagReplaced || typeof tagReplaced !== 'string') {
      throw new TypeError('tag replaced option should be a string')
    }

    this.options = {
      tag,
      tagReplaced
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

    if (lastWord.startsWith(this.options.tagReplaced) &&
        !lastTextWord.startsWith(this.options.tag)) {
      const sameTags = this.words.filter((el) => el == lastWord)
      if (sameTags.length < 2) delete this.tags[lastWord.substr(this.options.tag.length)]

      this._arrayRemoveLast(this.words)
      this._arrayRemoveLast(this.prettyWords)
    } else {
      this._arrayReplaceLast(this.words, lastTextWord)
      this._arrayReplaceLast(this.prettyWords, lastTextWord)
    }
  }

  _stringWithNoSpaces(string) {
    return string.replace(/\s/g,'')
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