'use strict'

const tessel = require('tessel')
const colot = require('color')
const DotStarStrip = require('./dotstar')

let strip = new DotStarStrip(40, 'A')

strip.init(4000000)
strip.clear()

let options = {
  color: [0x66, 0x33, 0x99]
}

let i = 0
strip.test()

setInterval(function(){
    // options.pixel = i
    // strip.setPixel(options)
    // i++
    // if(i == 59) i = 0
    strip.clear(function(){
      console.log('cleared')
      strip.test(function(){
        console.log('tested')
      })
    })
    console.log('waiting')
}, 5000)
