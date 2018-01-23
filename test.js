const readline = require('readline')
const Bobbotag = require('./index')

let users = {
  foo: {
    value: 12,
    label: 'Foo Bar'
  },
  bar: {
    value: 42,
    label: 'Bar Foo'
  }
}
let text = ''

const bobbo = new Bobbotag({
  tagChar: '@'
})

function onChangeText(newText) {
  bobbo.changeText(newText)

  if (bobbo.getCurrentTag() && users[bobbo.getCurrentTag()]) {
    bobbo.replaceCurrentTag(
      users[bobbo.getCurrentTag()]
    )
  }

  text = bobbo.getPrettyText()

  console.log('Pretty:', bobbo.getPrettyText())
  console.log('Real:', bobbo.getText())
  console.log('Tags:', bobbo.getTags())
}

// Manage keyboard:

readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)

process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit()
    return
  }

  if (key.name == 'backspace') {
    onChangeText(text.substring(0, text.length-1))
  } else {
    onChangeText(text + key.sequence)
  }
})

console.log('Press any key...')