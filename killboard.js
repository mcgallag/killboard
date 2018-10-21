// font is in a spritesheet PNG
var font_img;
var source_w, source_h;
var playerName, playerSorties, playerKills;
var frame_rate = 1;
var seconds_between_updates = 5;
var startFrame = true;


function preload() {
  font_img = loadImage("work/better_font.png");
  getPlayerInfoFromJSON();
}

function setup() {
  var canvas = createCanvas(800, 600);

  canvas.parent('div-chalkboard');
  background(0, 0, 0, 0);

  /*  bitmap font in this application is 7x7 characters,
   *  so character w/h can be determined with division
   */
  source_w = int(font_img.width / 7);
  source_h = int(font_img.height / 6);

  // very low framerate, save some computation time
  frameRate(frame_rate);
}

/*
 * blits a string to the canvas
 */
function bmpPrintString(s, dx, dy) {
  s = s.toUpperCase();

  var dw, dh;
  var sx, sy, sw, sh;

  for (var i = 0; i < s.length; i++) {
    // by default we will be drawing a source_w*source_h character
    sw = source_w;
    sh = source_h;

    var c = s[i];

    switch (c) {
      case '-':
        sx = 0; sy = 0;
        sw = 23;
        break;
      case '.':
        sx = 1; sy = 0;
        sw = 12;
        break;
      case '0':
        sx = 2; sy = 0;
        break;
      case '1':
        sx = 3; sy = 0;
        sw = 15;
        break;
      case '2':
        sx = 4; sy = 0;
        break;
      case '3':
        sx = 5; sy = 0;
        break;
      case '4':
        sx = 6; sy = 0;
        break;

      case '5':
        sx = 0; sy = 1;
        break;
      case '6':
        sx = 1; sy = 1;
        break;
      case '7':
        sx = 2; sy = 1;
        break;
      case '8':
        sx = 3; sy = 1;
        break;
      case '9':
        sx = 4; sy = 1;
        break;
      case ' ':
        sw = int(sw / 2); // space characters only print half-width
        dx += sw;
        continue;

      case 'A':
        sx = 0; sy = 2;
        break;
      case 'B':
        sx = 1; sy = 2;
        break;
      case 'C':
        sx = 2; sy = 2;
        break;
      case 'D':
        sx = 3; sy = 2;
        break;
      case 'E':
        sx = 4; sy = 2;
        break;
      case 'F':
        sx = 5; sy = 2;
        sw = 23;
        break;
      case 'G':
        sx = 6; sy = 2;
        sw = 23;
        break;
      
      case 'H':
        sx = 0; sy = 3;
        sw = 23;
        break;
      case 'I':
        sx = 1; sy = 3;
        sw = 13;
        break;
      case 'J':
        sx = 2; sy = 3;
        break;
      case 'K':
        sx = 3; sy = 3;
        break;
      case 'L':
        sx = 4; sy = 3;
        sw = 23;
        break;
      case 'M':
        sx = 5; sy = 3;
        break;
      case 'N':
        sx = 6; sy = 3;
        break;

      case 'O':
        sx = 0; sy = 4;
        break;
      case 'P':
        sx = 1; sy = 4;
        break;
      case 'Q':
        sx = 2; sy = 4;
        break;
      case 'R':
        sx = 3; sy = 4;
        break;
      case 'S':
        sx = 4; sy = 4;
        break;
      case 'T':
        sx = 5; sy = 4;
        break;
      case 'U':
        sx = 6; sy = 4;
        break;

      case 'V':
        sx = 0; sy = 5;
        break;
      case 'W':
        sx = 1; sy = 5;
        break;
      case 'X':
        sx = 2; sy = 5;
        break;
      case 'Y':
        sx = 3; sy = 5;
        break;
      case 'Z':
        sx = 4; sy = 5;
        break;

      case '\n':
        dy += 18 + 30;
        dx = 0;
        break;

      default:
        // if we are given an unprintable char, draw a '-'
        // HACK
        sx = 0; sy = 0;
        break;
    }
    sx *= source_w;
    sy *= source_h;

    dw = sw;
    dh = sh;

    image(font_img, dx, dy, dw, dh, sx, sy, sw, sh);
    dx += dw; // add char width to destination x offset
    dx += 2; // kerning
  }
}

function getPlayerInfoFromJSON() {
  loadJSON("fromgame.json", getPlayerInfoCallback, loadError);
}

function loadError(e) {
  console.log("Error! " + e);
}

function getPlayerInfoCallback(playerData) {
  playerName = playerData.name;
  playerSorties = playerData.sorties;
  playerKills = playerData.kills;
}

function draw() {
  if (frameCount % seconds_between_updates != 1) {
    startFrame = false;
    return;
  }
  clear();

  getPlayerInfoFromJSON();

  // static text
  bmpPrintString("Carrier - Tigers Claw", 144, 12);
  bmpPrintString("Pilot", 142, 54);
  bmpPrintString("Sorties Kills", 455, 54);

  // dynamic text
  bmpPrintString(playerName, 10, 114);
  bmpPrintString(str(playerSorties), 564, 114);
  bmpPrintString(str(playerKills), 696, 114);
}