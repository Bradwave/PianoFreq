const timeUnit = 0.5;
const odeOfJoy = [["d", 1], ["d", 1], ["f", 1], ["g", 1], ["g", 1], ["f", 1], ["d", 1], ["s", 1],
["a", 1], ["a", 1], ["s", 1], ["d", 1], ["d", 1], ["s", 1.5], ["s", 1],
["d", 1], ["d", 1], ["f", 1], ["g", 1], ["g", 1], ["f", 1], ["d", 1],
["s", 1], ["a", 1], ["a", 1], ["s", 1], ["d", 1], ["s", 1], ["a", 1.5], ["a", 1]];

function autoPlay() {
    for (let i = 0; i < odeOfJoy.length; i++) {
        playNote(odeOfJoy[i][0], timeUnit * (i + odeOfJoy[i][1]));
    }
}   