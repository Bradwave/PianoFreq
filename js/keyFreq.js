class PianoKey {

  constructor(x = 10, y = 10, flat) {
    // Position
    this.x = x;
    this.y = y;

    // Flat or Sharp
    this.flat = flat;

    // Size
    this.scale = this.flat ? 1 : 0.5;
    this.setSize();
  }

  getX() {
    return this.x;
  }

  translate(x, y) {
    this.x -= x * descaleFactor;
    this.y += y * descaleFactor;
  }

  setSize() {
    this.width = 0.08 * scaleFactor * this.scale;
    this.height = 0.25 * scaleFactor * this.scale;
  }

  drawConnections() {
    let p = toScreen(this.x, this.y);

    stroke(255);
    strokeWeight(1);
    line(p.x, p.y, p.x, yOrigin);
  }

  drawKey() {
    // Position
    let p = toScreen(this.x, this.y);

    // Render
    let c = this.flat ? 0 : 1;
    stroke(255 * c);
    strokeWeight(3 - 1 * c);
    fill(255 * (1 - c));
    rect(p.x - this.width * 0.5, p.y, this.width, this.height);
  }

  selected(x, y) {
    // Position
    let p = toScreen(this.x, this.y);

    return (x > p.x - this.width * 0.5 && x < p.x + this.width * 0.5)
      && (y > p.y && y < p.y + this.height);
  }

}

let keys = [];
let selected, startPos, finalPos;
let synth;

function setup() {
  // Canvas
  createCanvas(windowWidth, windowHeight);
  updateSystem();

  // Font
  textFont('Georgia');

  // Keys
  createKeys();

  // Render loop
  noLoop();
}

function windowResized() {
  // Update canvas
  resizeCanvas(windowWidth, windowHeight);
  updateSystem();

  // Update keys
  keys.forEach(k => k.setSize());

  // Sound
  synth = new p5.MonoSynth();

  // Redraw
  redraw();
}

function touchStarted() {
  selected = -1;
  keys.forEach(function (k, i) {
    if (k.selected(mouseX, mouseY)) selected = i;
  });
  startPos = { x: mouseX, y: mouseY };
}

function touchMoved() {
  finalPos = { x: mouseX, y: mouseY };
  if (selected > -1) {
    keys[selected].translate(startPos.x - finalPos.x, startPos.y - finalPos.y);
  }
  startPos = finalPos;
  redraw();
}

function keyPressed() {
  let freq = 440;
  if (keyCode === 90) {
    freq += 440 * (keys[0].getX() - 1);
  } else if (keyCode === 88) {
    freq += 440 * (keys[1].getX() - 1);
  } else if (keyCode === 67) {
    freq += 440 * (keys[2].getX() - 1);
  } else if (keyCode === 86) {
    freq += 440 * (keys[3].getX() - 1);
  } else if (keyCode === 66) {
    freq += 440 * (keys[4].getX() - 1);
  } else if (keyCode === 78) {
    freq += 440 * (keys[5].getX() - 1);
  } else if (keyCode === 77) {
    freq += 440 * (keys[6].getX() - 1);
  } else if (keyCode === 83) {
    freq += 440 * (keys[7].getX() - 1);
  } else if (keyCode === 68) {
    freq += 440 * (keys[8].getX() - 1);
  } else if (keyCode === 71) {
    freq += 440 * (keys[9].getX() - 1);
  } else if (keyCode === 72) {
    freq += 440 * (keys[10].getX() - 1);
  } else if (keyCode === 74) {
    freq += 440 * (keys[11].getX() - 1);
  }

  playNote(freq, 40);

  return false; // prevent default
}

function touchEnded() {
  
  playNote(440 + 440 * (keys[selected].getX() - 1), 40)

}

// create web audio api context
var audioCtx = new(window.AudioContext || window.webkitAudioContext)();

function playNote(frequency, duration) {
  // create Oscillator node
  var oscillator = audioCtx.createOscillator();

  oscillator.type = 'sine';
  oscillator.frequency.value = frequency; // value in hertz
  oscillator.connect(audioCtx.destination);
  oscillator.start();

  setTimeout(
    function() {
      oscillator.stop();
      playMelody();
    }, duration);
}

function playMelody() {
  
}

function createKeys() {
  keys.push(new PianoKey(1, -0.1, true));
  keys.push(new PianoKey(1.167, -0.1, true));
  keys.push(new PianoKey(1.332, -0.1, true));
  keys.push(new PianoKey(1.5, -0.1, true));
  keys.push(new PianoKey(1.667, -0.1, true));
  keys.push(new PianoKey(1.833, -0.1, true));
  keys.push(new PianoKey(2, -0.1, true));

  keys.push(new PianoKey(1.083, -0.1, false));
  keys.push(new PianoKey(1.25, -0.1, false));
  keys.push(new PianoKey(1.583, -0.1, false));
  keys.push(new PianoKey(1.75, -0.1, false));
  keys.push(new PianoKey(1.917, -0.1, false));
}

function drawLine() {
  stroke(255);
  strokeWeight(4);
  let p1 = toScreen(1, 0);
  let p2 = toScreen(2, 0);
  line(p1.x, p1.y, p2.x, p2.y);
}

function draw() {
  background(0);

  /* Test grid *
  stroke('red'); strokeWeight(2);
  let p = toScreen(1,0); point(p.x,p.y);
  p = toScreen(2,0); point(p.x,p.y);
  p = toScreen(1,0.25); point(p.x,p.y);
  p = toScreen(2,0.25); point(p.x,p.y);
  p = toScreen(1,-0.25); point(p.x,p.y);
  p = toScreen(2,-0.25); point(p.x,p.y);
  /* */

  drawLine();
  keys.forEach(k => k.drawConnections());
  keys.forEach(k => k.drawKey());
}