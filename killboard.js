// font is in a spritesheet PNG, this will store it for reference
var font_img;
// maximum size of each glyph in the PNG
var source_w, source_h;
// store in-game data for ultimate display
var playerName, playerRank, playerSorties, playerKills;

// we will not need to update very often
var frame_rate = 1;
var seconds_per_frame = 2;

// p5 preload function
// make sure the image is loaded and prepare the initial data
function preload() {
  font_img = loadImage("images/better_font.png");
  getPlayerInfoFromJSON();
}

// p5 setup function
function setup() {
  var canvas = createCanvas(800, 70);
  canvas.parent("div-chalkboard");
  background(0, 0, 0, 0);

  /*
   *  bitmap font in this application is 7x7 characters,
   *  so character w/h can be determined with integer division
   */
  source_w = int(font_img.width / 7);
  source_h = int(font_img.height / 6);

  // very low framerate, save some computation time
  frameRate(frame_rate);
}

/*
 * blits a string to the canvas
 * s - string to display
 * dx - destination location x-coordinate
 * dy - destination location y-coordinate
 */
function bmpPrintString(s, dx, dy) {
  // this particular font only has uppercase
  s = s.toUpperCase();

  /*
   * We will be using p5's image function that has the prototype
   *    image(img, dx, dy, dWidth, dHeight, sx, sy, [sWidth], [sHeight])
   * 
   *    Reference: https://p5js.org/reference/#/p5/image
   * 
   *    img - source image
   *    dx, dy - destination location on canvas
   *    dWidth, dHeight - destination width/height on canvas
   *    sx, sy - source location coordinates in img
   *    sWidth, sHeight - source width/height in img
   */

  var dw, dh;
  var sx, sy, sw, sh;

  var linespacing = sh * 0.6; // for newline increment of dy
  var kerning = 2; // character spacing

  // iterate through the string character by character
  for (var i = 0; i < s.length; i++) {
    // by default we will be drawing a glyph of size sw by sh
    sw = source_w;
    sh = source_h;

    var c = s[i];

    /*
     * This huge switch determines the sx, sy, and sw of each character
     * assuming the following layout of the font:
     *      0123456
     *   0  -.01234
     *   1  56789
     *   2  ABCDEFG
     *   3  HIJKLMN
     *   4  OPQRSTU
     *   5  VWXYZ
     * sx and sy will be scaled up to image size later
     * it is all very case dependant so there is room for improvement
     */
    switch (c) {
      case "-":
        sx = 0;
        sy = 0;
        sw = 23;
        break;
      case ".":
        sx = 1;
        sy = 0;
        sw = 12;
        break;
      case "0":
        sx = 2;
        sy = 0;
        break;
      case "1":
        sx = 3;
        sy = 0;
        sw = 15;
        break;
      case "2":
        sx = 4;
        sy = 0;
        break;
      case "3":
        sx = 5;
        sy = 0;
        break;
      case "4":
        sx = 6;
        sy = 0;
        break;

      case "5":
        sx = 0;
        sy = 1;
        break;
      case "6":
        sx = 1;
        sy = 1;
        break;
      case "7":
        sx = 2;
        sy = 1;
        break;
      case "8":
        sx = 3;
        sy = 1;
        break;
      case "9":
        sx = 4;
        sy = 1;
        break;

      case "A":
        sx = 0;
        sy = 2;
        break;
      case "B":
        sx = 1;
        sy = 2;
        break;
      case "C":
        sx = 2;
        sy = 2;
        break;
      case "D":
        sx = 3;
        sy = 2;
        break;
      case "E":
        sx = 4;
        sy = 2;
        break;
      case "F":
        sx = 5;
        sy = 2;
        sw = 23;
        break;
      case "G":
        sx = 6;
        sy = 2;
        sw = 23;
        break;

      case "H":
        sx = 0;
        sy = 3;
        sw = 23;
        break;
      case "I":
        sx = 1;
        sy = 3;
        sw = 13;
        break;
      case "J":
        sx = 2;
        sy = 3;
        break;
      case "K":
        sx = 3;
        sy = 3;
        break;
      case "L":
        sx = 4;
        sy = 3;
        sw = 23;
        break;
      case "M":
        sx = 5;
        sy = 3;
        break;
      case "N":
        sx = 6;
        sy = 3;
        break;

      case "O":
        sx = 0;
        sy = 4;
        break;
      case "P":
        sx = 1;
        sy = 4;
        break;
      case "Q":
        sx = 2;
        sy = 4;
        break;
      case "R":
        sx = 3;
        sy = 4;
        break;
      case "S":
        sx = 4;
        sy = 4;
        break;
      case "T":
        sx = 5;
        sy = 4;
        break;
      case "U":
        sx = 6;
        sy = 4;
        break;

      case "V":
        sx = 0;
        sy = 5;
        break;
      case "W":
        sx = 1;
        sy = 5;
        break;
      case "X":
        sx = 2;
        sy = 5;
        break;
      case "Y":
        sx = 3;
        sy = 5;
        break;
      case "Z":
        sx = 4;
        sy = 5;
        break;

      case " ":
        // edge case, spaces don't require blitting so just increment dx
        // a little for the next character
        sw = int(sw * 0.5); // space characters only print half-width
        dx += sw;
        continue; // iterate for-loop to next character

      case "\n":
        // edge case, in case we're given a newline (unlikely)
        // increment dy by the calculated linespacing and the glyph height
        dy += linespacing + sh;
        dx = 0;
        break;

      default:
        // if we are given an unprintable char, draw a '-'
        // HACK - consider some proper error checking here
        sx = 0;
        sy = 0;
        break;
    }

    // scale sx/sy to the appropriate size for the glyph
    sx *= source_w;
    sy *= source_h;

    // destination w/h are the same as source in this case
    dw = sw;
    dh = sh;

    // now we can finally display the glyph to the canvas
    image(font_img, dx, dy, dw, dh, sx, sy, sw, sh);
    dx += dw; // add char width to destination x offset
    dx += kerning; // kerning
  }
}

/*
 * rankToString - converts an internal rank to a text representation
 * WC stores rank as an integer:
 *  0 - 2nd Lieutenant
 *  1 - 1st Lieutenant
 *  2 - Captain
 *  3 - Major
 */
function rankToString(rank) {
  switch(rank) {
    case 0:
      return "2nd Lt.";
    case 1:
      return "1st Lt.";
    case 2:
      return "Captain";
    case 3:
      return "Major";
    default:
      return "err";
  }
}

/*
 * getPlayerInfoFromJSON - loads relevant game data from local JSON file
 * utilizes p5's builtin loadJSON function
 * Reference - https://p5js.org/reference/#/p5/loadJSON
 */
function getPlayerInfoFromJSON() {
  loadJSON("fromgame.json", getPlayerInfoCallback, loadErrorCallback);
}

/*
 * loadErrorCallback - callback if the JSON load encounters an error
 * most likely will be triggered if the data simply doesn't exist yet
 */
function loadErrorCallback(e) {
  // give it some default values so the program can continue
  playerName = "ERROR";
  playerRank = 0;
  playerSorties = 0;
  playerKills = 0;
}

/*
 * getPlayerInfoCallback - callback for successful load of JSON data
 * simply copies the data into local variables
 */
function getPlayerInfoCallback(playerData) {
  playerName = playerData.name;
  playerRank = playerData.rank;
  playerSorties = playerData.sorties;
  playerKills = playerData.currentKills + playerData.boardKills;
}

// p5 draw function, called every frame
function draw() {
  // we've set the framerate very slow but we want it even slower
  if (frameCount % seconds_per_frame != 1) {
    return;
  }
  clear();

  // load the latest player info from the JSON
  // there might be some synchronization problems here but worst-case
  // it will use previous frame's data and update by the next frame
  getPlayerInfoFromJSON();

  // static text
  /*bmpPrintString("Carrier - Tigers Claw", 144, 12);
  bmpPrintString("Pilot", 142, 54);
  bmpPrintString("Sorties Kills", 455, 54);*/

  // dynamic text (y 114)
  bmpPrintString(rankToString(playerRank) + " " + playerName, 10, 15);
  bmpPrintString(str(playerSorties), 564, 15);
  bmpPrintString(str(playerKills), 696, 15);
}
