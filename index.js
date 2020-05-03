'use strict'
const { EventEmitter } = require('events')
const chalk = require('chalk')
const diffy = require('diffy')
const trim = require('diffy/trim')

class Render extends EventEmitter {
  constructor ({ state }) {
    super()
    this.df = diffy({ fullscreen: true })
    this.input = this.createInput()
    this.state = state || {}

    this.input.on('enter', (line) => {
      if (line === 'exit') return process.exit(1)
      this.emit('enter-key', line)
    })

    this.input.on('update', () => {
      this.setState({
        input: this.input.line() || ''
      })
    })
  }

  createInput () {
    function style (start, cursor, end) {
      if (!cursor) cursor = ' '
      return chalk.white(start + '|' + end)
    }
    const input = require('diffy/input')({ style: style })
    return input
  }

  setState (obj) {
    for (const p in obj) {
      this.state[p] = obj[p]
    }
    this.df.render()
  }

  forceRender () {
    if (!this._init_render) {
      return this._render()
    }
    this.df.render()
  }

  _render () {
    if (!this._init_render) {
      this._init_render = true
    }
    this.df.render(() => {
      return trim(this.render())
    })
  }
}
module.exports = Render
