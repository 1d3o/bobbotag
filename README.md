# Bobbotag

A simple node module to detect and manage tags on input strings.

## Usage

```js
const Bobbotag = require('bobbotag')

let users = {
  foo: {
    value: '12',
    label: 'Foo Bar'
  },
  bar: {
    value: '42',
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
}

function onSubmit() {
  console.log('Pretty:', bobbo.getPrettyText())
  console.log('Real:', bobbo.getText())
  console.log('Tags:', bobbo.getTags())
}
```

## TODO

- Write a better documentation.