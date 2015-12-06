var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var factor = 10;

console.log(canvas.width);
console.log(canvas.height);
var ancho = canvas.width / factor;
var alto = canvas.height / factor;
var log = true;

var mundo = new Array(ancho);

for (var i = 0; i < ancho; i++) {
    mundo[i] = new Array(alto);
}

for (var x = 0; x < ancho; x++) {
    for (var y = 0; y < alto; y++) {
        mundo[x][y] = false;
    }
}

function copyMundo() {
    var newArr = new Array(ancho);

    for (var i = 0; i < ancho; i++) {
        newArr[i] = new Array(alto);
    }

    for (var x = 0; x < ancho; x++) {
        for (var y = 0; y < alto; y++) {
            newArr[x][y] = mundo[x][y];
        }
    }
    return newArr;
}

function write(string) {
    console.log(string);
}

function writeln(string) {
    console.log(string);
}

function getPositionState(x, y, imundo) {
    if (x < 0) x = ancho + x;
    if (x >= ancho) x = x - ancho;
    if (y < 0) y = alto + y;
    if (y >= alto) y = y - alto;
    return imundo[x][y];
}

function getPositionStateMundo(x, y) {
    return getPositionState(x, y, mundo);
}

function setPositionState(x, y, value, imundo) {
    if (x < 0) x = ancho + x;
    if (x >= ancho) x = x - ancho;
    if (y < 0) y = alto + y;
    if (y >= alto) y = y - alto;
    imundo[x][y] = value;
}

function setPositionStateMundo(x, y, value) {
    setPositionState(x, y, value, mundo);
}

function getVecinos(x, y, imundo) {
    var totalVecinos = 0;
    var cx = 0;
    var cy = y - 1;
    for (cx = x - 1; cx <= x + 1; cx++) {
        if (getPositionState(cx, cy, imundo))
            totalVecinos++;
    }
    cy++;
    cx = x;
    if (getPositionState(cx - 1, cy, imundo))
        totalVecinos++;
    if (getPositionState(cx + 1, cy, imundo))
        totalVecinos++;
    cy++;
    for (cx = x - 1; cx <= x + 1; cx++) {
        if (getPositionState(cx, cy, imundo))
            totalVecinos++;
    }
    return totalVecinos;
}

function regla1(x, y, imundo) {
    var vecinos = getVecinos(x, y, imundo);
    if (vecinos == 3) {
        //        if (log) writeln("Position (" + x + "," + y + ") has " + vecinos + " neighbors. Life~");
        mundo[x][y] = true;
    }
}

function regla23(x, y, imundo) {
    if (imundo[x][y]) {
        var vecinos = getVecinos(x, y, imundo);
        if (vecinos < 2) {
            mundo[x][y] = false;
        }
        if (vecinos > 3) {
            mundo[x][y] = false;
        }

    }
}

function printWorld() {
    // THIS IS FOR PRINTING PIXEL BY PIXEL
    //    for (var x = 0; x < ancho; x++) {
    //        for (var y = 0; y < alto; y++) {
    //            if (mundo[x][y])
    //                drawPixel(x, y, 255, 0, 0, 255);
    //        }
    //    }
    //    updateCanvas();


    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'white';
    for (var x = 0; x < ancho; x++) {
        for (var y = 0; y < alto; y++) {
            if (mundo[x][y]) {
                ctx.fillRect(x * factor, y * factor, factor, factor);
                ctx.strokeRect(x * factor, y * factor, factor, factor);
            }
        }
    }


}

function randomInitialize() {
    console.log("Initializing world randomly");
    for (var x = 0; x < ancho; x++) {
        for (var y = 0; y < alto; y++) {
            if (Math.random() > .9)
                mundo[x][y] = true;
        }
    }
}




function gameCycle() {

    var nMundo = copyMundo();
    if (log) writeln("================ NEW CYLE ===============")
    printWorld();
    for (var x = 0; x < ancho; x++) {
        for (var y = 0; y < alto; y++) {
            regla1(x, y, nMundo);
            regla23(x, y, nMundo);
        }
    }

}


$(document).ready(function () {
    console.log("Starting game");
    randomInitialize();
    setInterval(gameCycle, 1000);
});