let keys = [];
let selected, startPos, finalPos;
let playing = false;

function setup() {
  // Canvas
  createCanvas(windowWidth, windowHeight);
  updateSystem();

  // Font
  textFont('Georgia');

  // Keys
  createKeys();

  // Render loop
  //noLoop();
}

function windowResized() {
  // Update canvas
  resizeCanvas(windowWidth, windowHeight);
  updateSystem();

  // Update keys
  keys.forEach(k => k.setSize());

  // Sound

  // Redraw
  if (!playing)
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

  // Redraw
  if (!playing)
    redraw();
}

function touchEnded() {
  loop();
  if (selected > -1) {
    playing = true;
    keys[selected].play();
  }
}

function keyPressed() {
  
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
  let x1 = toScreenX(0.9);
  let x2 = toScreenX(2.1);
  let y = toScreenY(0);

  let jumps = [];
  keys.forEach(k => {
    if (k.played())
      jumps.push(toScreenX(k.getFrequency()));
  });
  jumps.sort();

  if (jumps.length > 0) {
    let offset = waveSize * 0.5;
    line(x1, y, jumps[0] - offset, y);
    for (let j = 0; j < jumps.length - 1; j++) {
      line(jumps[j] + offset, y, jumps[j + 1] - offset, y)
    }
    line(jumps[length] + offset, y, x2, y);
  } else {
    line(x1, y, x2, y);
  }
}

function drawWaves() {
  let keyPlaying = false;
  keys.forEach(k => {
    if (k.played()) {
      keyPlaying = true;
      drawDistortion(toScreenX(k.getFrequency()), yOrigin, k.getAmp());
      k.fade();
    }
  });
  if (playing && !keyPlaying) {
    playing = false;
    noLoop();
  }
}

function drawDistortion(x, y, amp) {
  push();
  translate(x - waveSize / 2, y)
  beginShape();
  for (let t = 0; t < waveSize; t += 0.5) {
    vertex(t, waveSize * distortion(t / waveSize * HALF_PI, amp));
  }
  endShape();
  pop();
}

function distortion(x, amp) {
  return -(x * (x - HALF_PI)) * amp * Math.sin(18 * x);
}

function draw() {
  // Background
  background(0);

  // Frequency line
  drawLine();

  // Distortions
  noFill();
  drawWaves();

  // Connections lines
  stroke(255);
  strokeWeight(1);
  keys.forEach(k => k.drawConnections());

  keys.forEach(k => k.drawKey());
}