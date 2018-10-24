function Star(c) {
  this.x = random(-width, width);
  this.y = random(-height, height);
  this.z = random(width);
  this.color = c;
  this.pz = this.z;
  if (i % 3 == 0) {
    this.speed = random(13,17);
    //this.speed = 1;
  } else {
    this.speed = random(1, 2);
  }

  this.update = function() {
    this.z = this.z - this.speed;
    if (this.z < 1) {
      this.z = width;
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.pz = this.z;
      this.color = random(starColorsArray);
    }
  }

  this.show = function() {
    fill(this.color);
    noStroke();

    var sx = map(this.x / this.z, 0, 1, 0, width);
    var sy = map(this.y / this.z, 0, 1, 0, height);

    var r = map(this.z, 0, width, 12, 0);
    ellipse(sx, sy, r, r);

    var px = map(this.x / this.px, 0, 1, 0, width);
    var py = map(this.y / this.pz, 0, 1, 0, height);

    this.pz = this.z
    
    stroke(this.color);
    line(px, py, sx, sy);
  }
}