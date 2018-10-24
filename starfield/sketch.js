var stars = [];
var numStars = 800;
var i = 0;

var speed;
var starColorsArray;

function preload() {
  starColorsArray = loadStrings('starfield.dat');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (i = 0; i < numStars; i++) {
    stars[i] = new Star(random(starColorsArray));
  }
}

function draw() {
  //speed = map(mouseX, 0, width, 0, 15);
  background(0);
  translate(width / 2, height / 2);
  for (var i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
  }
}