const DiffyView = require('./index.js')

class View extends DiffyView {
  render () {
    return `
      Hello world
    `
  }
}

const v = new View({
  state: {}
})

v.forceRender()
