# Bobbotag

A simple node module to detect and manage tags on input strings.

## Installation

```shell

npm install bobbotag

```

## Usage

Bobbotag can be used as a normal class instance on change text callback.

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
  tag: '@',
  tagReplaced: '#'
})

function onChangeText(newText) {
  // give new text to instance
  bobbo.changeText(newText)

  // check if a tag is detected
  if (bobbo.getCurrentTag() && users[bobbo.getCurrentTag()]) {
    console.log('tag detected!')

    bobbo.replaceCurrentTag(
      users[bobbo.getCurrentTag()]
    )
  }

  // update rendered text with updated text from instance
  text = bobbo.getPrettyText()
}

function onSubmit() {
  console.log('Pretty:', bobbo.getPrettyText())
  console.log('Real:', bobbo.getText())
  console.log('Tags:', bobbo.getTags())
}
```

## Try it

You can start to play with bobbotag running the test script.

```shell

git clone https://github.com/ideonetwork/bobbotag

npm run test

```

![Example of usage](doc/example.gif)