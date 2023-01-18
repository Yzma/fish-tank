class BiteFish extends Fish {

  constructor(options) {
    super(options)
    this.surgeSecondsLeft = 0
    this.maxSurge = 1.0
    this.surgMult = 3.
    this.imageUri = '/images/biteFish.gif'
    
    this.currentTarget = null
    console.log(this.tank.denizens)

    this.findFood()
    if (this.currentTarget !== null) {
      const food = this.tank.denizens[this.currentTarget]
      console.log('food:', food)
      console.log('food position:', food.position)
      console.log('my position', this.position)
      // const m = new Vector(food.position.x - this.position.x, food.position.y - this.position.y)
    }

  }

  updateOneTick() {
    if (this.currentTarget === null) {
      this.findFood()
      let delta = this.swimVelocity.scale(PHYSICS_TICK_SIZE_S * (1 + 1.2 * this.surgMult))
      this.position.addMut(delta)
      this.timeUntilSpeedChange -= PHYSICS_TICK_SIZE_S
  
    } else {
      // Move towards fish
      const food = this.tank.denizens[this.currentTarget]
      const m = new Vector(this.position.x - food.position.x, this.position.y - food.position.y)
      this.position.x -= m.x * 0.03
      this.position.y -= m.y * 0.03
    }
  }

  findFood() {
    for (let id in this.tank.denizens) {
      if (this.tank.denizens[id] instanceof Fish && !(this.tank.denizens[id] instanceof BiteFish)) {
        this.currentTarget = id
        break
      }
    }
  }


  onClick(event) {
    this.surgeSecondsLeft = this.maxSurge
    console.log('event', event)
  }
}
