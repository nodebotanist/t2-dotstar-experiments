const tessel = require('tessel')
const colot = require('color')
const DotStarStrip = require('./dotstar')

let strip = new DotStarStrip(60, 'A')

strip.init(4000000)
strip.clear()

let options = {
  color: [50, 0, 150]
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