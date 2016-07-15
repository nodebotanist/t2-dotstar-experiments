'use strict' 

const tessel = require('tessel')

function DotStarStrip(numPixels, port){
  if(!this instanceof DotStarStrip) return new DotStarStrip(numPixels, port)

  if(!numPixels) throw new Error('You need to pass a number of pixels into the DotStar constructor!')

  this.port = port ? tessel.port[port] : tessel.port.A
  this.numPixels = numPixels
  // 4 bytes for start frame, 4 for each pixel, 4 for end frame
  this.pixels = []
  this.startFrameBuffer = new Buffer([0x00, 0x00, 0x00, 0x00])
  this.endFrameBuffer = new Buffer([0xff, 0xff, 0xff, 0xff])

  console.log(this.pixels.length)
}

DotStarStrip.prototype.init = function(clockSpeed){
  clockSpeed = clockSpeed || 8000000
  this.spi = this.port.SPI({
    clockSpeed: clockSpeed
  })
}

DotStarStrip.prototype.clear = function(){
    this.spi.transfer(new Buffer([0x00, 0x00, 0x00, 0x00]))
  // }
  for(let i = 0; i < this.numPixels; i++){
    // data[i] = 0xff
    // data[i + 1] = 0x00
    // data[i + 2] = 0x00
    // data[i + 3] = 0x00
    this.spi.transfer(new Buffer([0xff, 0x00, 0x00, 0x00]))
  }
  // let dataBuffer = Buffer.concat([this.startFrameBuffer, data, this.endFrameBuffer])
  // console.log(dataBuffer)
  // this.spi.transfer(dataBuffer)
  // for(let i = 0; i < 4; i++){
    this.spi.transfer(new Buffer([0xFF, 0xFF, 0xFF, 0xFF]))
}

DotStarStrip.prototype.setPixel = function(options){
  //TODO: Validate options: need pixel, color array of rgb or red, green, blue
  let offset = 3 + 4 * options.pixel

  this.pixels[offset] = 0xFF
  this.pixels[offset + 1] = options.color[0]
  this.pixels[offset + 2] = options.color[1]
  this.pixels[offset + 3] = options.color[2]


  this.spi.transfer(this.pixels)
}

DotStarStrip.prototype.test = function(){
  // let data = new Buffer(60 * 4)
  // for(let i = 0; i < 4; i++){
    this.spi.transfer(new Buffer([0x00, 0x00, 0x00, 0x00]))
  // }
  for(let i = 0; i < this.numPixels * 2; i++){
    // data[i] = 0xff
    // data[i + 1] = 0x00
    // data[i + 2] = 0x00
    // data[i + 3] = 0x00
    this.spi.transfer(new Buffer([0xff, 0xaa, 0xaa, 0xaa]))
  }
  // let dataBuffer = Buffer.concat([this.startFrameBuffer, data, this.endFrameBuffer])
  // console.log(dataBuffer)
  // this.spi.transfer(dataBuffer)
  // for(let i = 0; i < 4; i++){
    this.spi.transfer(new Buffer([0xFF, 0xFF, 0xFF, 0xFF]))
  // }  
}

module.exports = DotStarStrip