/* Sketch.js
 * creates a starfield-like display using p5.js
 *
 * adapted by Michael Gallagher <mcgallag@gmail.com>

 * from code written by
 *   Daniel Shiffman
 *     http://codingtra.in
 *     http://patreon.com/codingtrain
 *     https://youtu.be/17WoOqgXsRM
 */


var stars = [];
var numStars = 800;
var i = 0;

var speed;

// load the array of star colors from the external data
// function preload() {
// }

// create the canvas and fill the array with stars
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (i = 0; i < numStars; i++) {
    stars[i] = new Star(random(starColorsArray));
  }
}

// per frame draw function
function draw() {
  background(0);
  translate(width / 2, height / 2);
  for (var i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
  }
}