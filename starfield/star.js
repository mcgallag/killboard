/* Star.js
 * creates a star for display in a starfield-like canvas in p5
 *
 * adapted by Michael Gallagher <mcgallag@gmail.com>

 * from code written by
 *   Daniel Shiffman
 *     http://codingtra.in
 *     http://patreon.com/codingtrain
 *     https://youtu.be/17WoOqgXsRM
 */

function Star(c) {
  // constructor, set initial positions to random
  this.x = random(-width, width);
  this.y = random(-height, height);
  this.z = random(width);
  this.color = c;
  this.pz = this.z;

  // HACK
  // 1 out of 3 stars should be very fast, 2 out of 3 should be very slow
  if (i % 3 == 0) {
    this.speed = random(13,17);
    //this.speed = 1;
  } else {
    this.speed = random(1, 2);
  }

  // per frame update function
  this.update = function() {
    // update Z based on speed
    this.z = this.z - this.speed;
    // if the star has passed beyond the scope of the frame, reset to random
    if (this.z < 1) {
      this.z = width;
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.pz = this.z;
      this.color = random(starColorsArray);
    }
  }

  // per frame display function
  this.show = function() {
    fill(this.color);
    noStroke();

    // scale x and y based on z, as explained in the coding train video
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