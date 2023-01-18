class SwitchFish extends Fish {

  onClick(event) {
    console.log(this instanceof Fish)
    this.makeNewVelocity(50)
  }
}
