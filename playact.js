const BAR_PATH = "assets/bar.png";
const BAR_YELLOW_PATH = "assets/baryellow.png";
/*global p5*/
var THREDHOLD = 2.5;
var DELAY_NOTE = 125;
const TIME_RUN = 1600;

function Note(p, im, note, cx, cy, hs) {

    this.size = 1;
    this.r = 0;
    this.isHit = false;
    var e = p.PI - note * p.PI / 5;

    this.isAlive = function() {
        return (this.size > 0) && (this.size < 1.8);
    };
    this.hit = function() {
        this.isHit = true;
    };
    this.miss = function() {
        this.size = -1;
    };

    this.update = function(deltaTime) {
        if (this.r < 1) this.r += deltaTime / TIME_RUN;
        if (this.r > 1) this.r = 1;
        if (this.isHit) {
            this.size *= 1 + deltaTime / 500;
        }
    };

    this.draw = function() {
        if (this.size < 0) return;
        p.push();
        p.translate(cx + hs * this.r * this.r * p.cos(e), cy + hs * this.r * this.r * p.sin(e));
        p.scale(this.r * this.size);
        p.image(im, -im.width / 2, -im.height / 2);
        p.pop();
    }


}


function PlayActivity(p) {
    var startTime;
    var timex = 0;
    var centerX;
    var centerY;
    var centerNote;
    var buttonNotes;
    var circles;
    var rGame;
    var fft;
    var combo = 0;
    var comboTextS = 4;
    var comboText = "";
    var score = 0;
    var dancer;
    var noteQueues = [
        [],
        [],
        [],
        [],
        [],
        []
    ];
    var energy = [0, 0, 0];
    var exp = [];
    this.draw = function() {
        this.drawBg();
        this.drawTile();
        this.drawGame();
        this.drawPerfect();
        this.drawScore();
        //  p.text(""+ combo,100, 100);
        
    };

    this.drawBg = function() {
        p.image(p.dataSheet.gamebg, 0, 0, p.width, p.height);
    };

    this.drawTile = function() {
        p.stroke(155, 190, 100);
        p.strokeWeight(8);
        p.line(p.width, 150, p.width - 500, 150);
        p.strokeWeight(1);
        p.noStroke();
        p.fill(100, 255, 255);
        p.textSize(80);
        p.textAlign(p.RIGHT, p.BOTTOM);
        p.text(p.dataSheet.songName, p.width - 150, 120);
        dancer.draw( p.width - 140, 20);
    };

    this.drawScore = function() {
        p.stroke(155, 190, 100);
        p.strokeWeight(2);
        p.fill(28, 3, 255);
        p.textSize(60);
        p.textAlign(p.RIGHT, p.TOP);
        p.text(score + " POINTS", p.width - 30, 170);
        p.strokeWeight(1);
    }

    this.drawGame = function() {
        p.push();
        p.translate(centerX, centerY);
        p.scale(0.8 + energy[2] / 500);
        p.image(centerNote, -centerNote.width / 2, -centerNote.height / 2);
        p.pop();
        var e = p.PI;
        for (var i = 0; i < 6; ++i) {
            p.image(buttonNotes[i],
                centerX + rGame * p.cos(e) - buttonNotes[i].width / 2,
                centerY + rGame * p.sin(e) - buttonNotes[i].height / 2
            );
            e -= p.PI / 5;
        }
        this.drawNote();
    };

    var lastCombo = -1;
    this.drawPerfect = function() {
        if (comboTextS <= 4) {
            if (lastCombo != combo) {
                lastCombo = combo;
                if (combo > 5) {
                    comboText = "-" + combo + "-";
                    if (combo > 9)
                        comboText = comboText + "\ncharming";
                }
                else
                    comboText = "";
            }
            else
                comboText = "";
        }
        if (comboText.length > 2) {
            comboTextS = comboTextS + 2;
            p.textAlign(p.CENTER, p.CENTER);
            p.textSize(comboTextS);
            p.fill(250, 5, 146);
            p.noStroke();
            p.text(comboText, centerX, centerY + 120);
            if (comboTextS > 50) comboTextS = 4;
        }
        else {
            comboTextS = 4;
        }
    };


    var isStop =false;
    
    this.update = function(deltaTime) {
        timex = p.millis() - startTime;
        
        dancer.update(deltaTime);
        
        if (!dancer.isAlive()) {
            if (p.mouseY< 148 && p.mouseY>20 && p.mouseX>p.width - 140 &&p.mouseX<p.width - 32 ){
             dancer = p.dataSheet.dancers[9];
             if (p.mouseIsPressed)
             {
                 if (!isStop){
                   p.popActivity();
                   p.dataSheet.music.stop();
                 } 
                 isStop = true;
             }
            }
             else
            if (p.random(100) > 60)
                dancer = p.random(p.dataSheet.dancers);
            dancer.reset();
            dancer.noLoop();
        }
        // combo = p.floor(p.frameCount / 60);
        fft.analyze();
        energy.shift();
        energy.push(fft.getEnergy("highMid"));
        if (p.dataSheet.notes.length > 0) {
            if (p.dataSheet.notes[0].millis <= timex + TIME_RUN) {
                this.addNote(p.dataSheet.notes[0].note);
                p.dataSheet.notes.shift();
            }
        }
        this.updateNote(deltaTime);
        if (!p.dataSheet.music.isPlaying()) {
            p.popActivity();
        }
    };

    var lastAddNote = -1;
    this.addNote = function(ix) {
        noteQueues[ix].push(new Note(p, p.random(circles), ix, centerX, centerY, rGame));
    };

    this.drawNote = function() {
        for (var i = 0; i < noteQueues.length; ++i) {
            for (var k = 0; k < noteQueues[i].length; ++k)
                noteQueues[i][k].draw();
        }
        for (var i = 0; i < exp.length; ++i)
            exp[i].draw();
    }

    this.updateNote = function(deltaTime) {
        for (var i = 0; i < noteQueues.length; ++i) {
            for (var k = 0; k < noteQueues[i].length; ++k)
                noteQueues[i][k].update(deltaTime);
            if (noteQueues[i].length > 1)
                if (noteQueues[i][0].r >= 1 && noteQueues[i][1].r >= 1) {
                    noteQueues[i][0].miss();
                    noteQueues[i].shift();
                    combo = 0;
                }

        }
        for (var i = 0; i < exp.length; ++i)
            exp[i].update(deltaTime);
        while (exp.length > 0) {
            if (!exp[0].isAlive()) exp.shift();
            else break;
        }

    }

    this.hitOne = function() {
        lastCombo = -1;
        combo++;
        score += 1 + p.floor(p.log(1 + combo));
    };

    var lastCheckId = -1;
    var lastCheckTime = 0;
    this.checkHit = function(id) {
        if (noteQueues[id].length < 1) {
            if (lastCheckId != id || timex - lastCheckTime > 128)
                combo = 0;
        }
        else {
            if (noteQueues[id][0].r >= 0.7) {

                noteQueues[id][0].hit();
                exp.push(noteQueues[id][0]);
                noteQueues[id].shift();
                this.hitOne();
            }
            else {
                combo = 0;
            }
        }
        lastCheckId = id;
        lastCheckTime = timex;

    };

    this.keyPressed = function(keyCode) {

        if (keyCode == 83)
            this.checkHit(0);
        if (keyCode == 68)
            this.checkHit(1);
        if (keyCode == 70)
            this.checkHit(2);
        if (keyCode == 74)
            this.checkHit(3);
        if (keyCode == 75)
            this.checkHit(4);
        if (keyCode == 76)
            this.checkHit(5);

    };

    this.keyReleased = function(keyCode) {

    };
    this.onPause = function() {

    };

    this.onStop = function() {

    };
    this.onResume = function() {

        p.textFont(p.dataSheet.menuFont);
        centerX = p.width / 3;
        centerY = p.height / 4;
        centerNote = p.dataSheet.noteCenter;
        buttonNotes = p.dataSheet.noteButtonImgs;
        rGame = p.height - centerY - buttonNotes[0].height;
        circles = p.dataSheet.circleImgs;
        fft = new p5.FFT();
        p.dataSheet.music.play();
        startTime = p.millis();
        timex = 0;
        dancer = p.random(p.dataSheet.dancers);
        dancer.reset();
        dancer.noLoop();
    };




    this.mousePressed = function() {
        var e = p.PI;
        var x;
        var y;

        for (var i = 0; i < 6; ++i) {
            x = centerX + rGame * p.cos(e);
            y = centerY + rGame * p.sin(e);
            if (p.dist(x, y, p.mouseX, p.mouseY) < circles[0].width / 2.1) {
                this.checkHit(i);
                return;
            }
            e -= p.PI / 5;
        }

    };

    this.mouseReleased = function() {

    };

    this.mouseMoved = function() {

    };
}




function GenActivity(p) {
    var startTime;
    var timex = 0;
    var centerX;
    var centerY;
    var centerNote;
    var buttonNotes;
    var circles;
    var rGame;
    var fft;
    var combo = 0;
    var comboTextS = 4;
    var comboText = "";
    var score = 0;
    var genNotes = [];
    var noteQueues = [
        [],
        [],
        [],
        [],
        [],
        []
    ];
    var sound;
    var m = p.dataSheet.music;
    sound = m;
    timex = 0;
    m.play();
    startTime = p.millis();

    var energy = [0, 0, 0];
    var exp = [];

    this.draw = function() {
        this.drawBg();
        this.drawTile();
        this.drawGame();
        this.drawPerfect();
        this.drawScore();
    };

    this.drawBg = function() {
        p.image(p.dataSheet.gamebg, 0, 0, p.width, p.height);
    };

    this.drawTile = function() {
        p.stroke(155, 190, 100);
        p.strokeWeight(8);
        p.line(p.width, 70, p.width - 500, 70);
        p.strokeWeight(1);
        p.noStroke();
        p.fill(100, 255, 255);
        p.textSize(50);
        p.textAlign(p.RIGHT, p.BOTTOM);
        p.text(p.dataSheet.songName, p.width - 20, 60);
    };

    this.drawScore = function() {
        p.stroke(155, 190, 100);
        p.strokeWeight(2);
        p.fill(28, 3, 255);
        p.textSize(50);
        p.textAlign(p.RIGHT, p.TOP);
        p.text(score + " POINTS", p.width - 30, 90);
        p.strokeWeight(1);
    }

    this.drawGame = function() {

        p.push();
        p.translate(centerX, centerY);
        p.scale(0.8 + energy[2] / 500);
        p.image(centerNote, -centerNote.width / 2, -centerNote.height / 2);
        p.pop();
        var e = p.PI;
        for (var i = 0; i < 6; ++i) {
            p.image(buttonNotes[i],
                centerX + rGame * p.cos(e) - buttonNotes[i].width / 2,
                centerY + rGame * p.sin(e) - buttonNotes[i].height / 2
            );
            e -= p.PI / 5;
        }
        this.drawNote();
        p.text("" + combo, 100, 100);
    };

    var lastCombo = -1;
    this.drawPerfect = function() {
        if (comboTextS == 4) {
            if (lastCombo != combo) {
                lastCombo = combo;
                if (combo > 3) {
                    comboText = "-" + combo + "-";
                    if (combo > 9)
                        comboText = comboText + "\ncharming";
                }
                else
                    comboText = "";
            }
            else
                comboText = "";
        }
        comboTextS = comboTextS + 2;
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(comboTextS);
        p.fill(250, 5, 146);
        p.noStroke();
        p.text(comboText, centerX, centerY + 120);
        if (comboTextS > 50) comboTextS = 4;
    };




    this.update = function(deltaTime) {
        timex = p.millis() - startTime;
        // combo = p.floor(p.frameCount / 60);
        fft.analyze();
        energy.shift();
        energy.push(fft.getEnergy("highMid"));
        if (energy[0] - energy[1]) {
            if (energy[2] - energy[1] > THREDHOLD * (deltaTime * 60 / 1000))

                this.addNote();
        }
        this.updateNote(deltaTime);
        if (genNotes.length > 0)
            if (!sound.isPlaying()) {
                p.saveJSON(genNotes, "track08.json");
                genNotes = [];
            }
    };

    var lastAddNote = -1;
    this.addNote = function() {
        if (timex - lastAddNote < DELAY_NOTE) return;
        lastAddNote = timex;
        var m = 1000;
        var id = [];
        for (var i = 0; i < noteQueues.length; ++i) {
            if (noteQueues[i].length < m) {
                id = [i];
                m = noteQueues[i].length;
            }
            else
            if (noteQueues[i].length == m) {
                id.push(i);

            }
        }
        var ix = p.random(id);
        genNotes.push({
            millis: timex,
            note: ix
        });
        noteQueues[ix].push(new Note(p, p.random(circles), ix, centerX, centerY, rGame));
    };

    this.drawNote = function() {
        for (var i = 0; i < noteQueues.length; ++i) {
            for (var k = 0; k < noteQueues[i].length; ++k)
                noteQueues[i][k].draw();
        }
        for (var i = 0; i < exp.length; ++i)
            exp[i].draw();
    }

    this.updateNote = function(deltaTime) {
        for (var i = 0; i < noteQueues.length; ++i) {
            for (var k = 0; k < noteQueues[i].length; ++k)
                noteQueues[i][k].update(deltaTime);
            if (noteQueues[i].length > 1)
                if (noteQueues[i][0].r >= 1 && noteQueues[i][1].r >= 1) {
                    {
                        noteQueues[i][0].miss();
                        noteQueues[i].shift();
                        combo = 0;
                    }

                }

        }
        for (var i = 0; i < exp.length; ++i)
            exp[i].update(deltaTime);
        while (exp.length > 0) {
            if (!exp[0].isAlive()) exp.shift();
            else break;
        }

    }

    this.hitOne = function() {
        lastCombo = -1;
        combo++;
        score += 1 + p.floor(p.log(1 + combo));
    };

    var lastCheckId = -1;
    var lastCheckTime = 0;
    this.checkHit = function(id) {
        if (noteQueues[id].length < 1) {
            if (lastCheckId != id || timex - lastCheckTime > 128)
                combo = 0;
        }
        else {
            if (noteQueues[id][0].r >= 0.8) {

                noteQueues[id][0].hit();
                exp.push(noteQueues[id][0]);
                noteQueues[id].shift();
                this.hitOne();
            }
            else {
                combo = 0;
            }
        }
        lastCheckId = id;
        lastCheckTime = timex;

    };

    this.keyPressed = function(keyCode) {

        if (keyCode == 83)
            this.checkHit(0);
        if (keyCode == 68)
            this.checkHit(1);
        if (keyCode == 70)
            this.checkHit(2);
        if (keyCode == 74)
            this.checkHit(3);
        if (keyCode == 75)
            this.checkHit(4);
        if (keyCode == 76)
            this.checkHit(5);

    };

    this.keyReleased = function(keyCode) {

    };
    this.onPause = function() {

    };

    this.onStop = function() {

    };
    this.onResume = function() {

        p.textFont(p.dataSheet.menuFont);
        centerX = p.width / 3;
        centerY = p.height / 4;
        centerNote = p.dataSheet.noteCenter;
        buttonNotes = p.dataSheet.noteButtonImgs;
        rGame = p.height - centerY - buttonNotes[0].height;
        circles = p.dataSheet.circleImgs;
        fft = new p5.FFT();
    };




    this.mousePressed = function() {
        var e = p.PI;
        var x;
        var y;
        for (var i = 0; i < 6; ++i) {
            x = centerX + rGame * p.cos(e);
            y = centerY + rGame * p.sin(e);
            if (p.dist(x, y, p.mouseX, p.mouseY) < circles[0].width / 2) {
                this.checkHit(i);
                return;
            }
            e -= p.PI / 5;
        }

    };

    this.mouseReleased = function() {

    };

    this.mouseMoved = function() {

    };
}





// function GenatorActivity(p) {

//     p.dataSheet.music.play();
//     var startTime = p.millis();
//     var timex = 0;
//     var uLine = new Vec2D(p, 0, 0).to3D();
//     var notesh = new NotesSheet();
//     console.log(p.dataSheet);
//     this.draw = function() {
//         this.drawBg();
//         drawLineTime();
//         notesh.drawRv(p, timex);

//     };

//     this.drawBg = function() {
//         p.image(p.dataSheet.gamebg, -0.7 * p.width, -p.height * 0.1, p.width * 2.4, p.height * 1.1);
//     }




//     this.update = function(deltaTime) {
//         timex = p.millis() - startTime;


//     };


//     this.keyPressed = function(keyCode) {
//         if (keyCode == 32) {
//             notesh.startTime = timex;
//         }
//         if (keyCode == 83)
//             notesh.push(p.round((timex - notesh.startTime) / 250), 0);
//         if (keyCode == 68)
//             notesh.push(p.round((timex - notesh.startTime) / 250), 1);
//         if (keyCode == 70)
//             notesh.push(p.round((timex - notesh.startTime) / 250), 2);
//         if (keyCode == 74)
//             notesh.push(p.round((timex - notesh.startTime) / 250), 3);
//         if (keyCode == 75)
//             notesh.push(p.round((timex - notesh.startTime) / 250), 4);
//         if (keyCode == 76)
//             notesh.push(p.round((timex - notesh.startTime) / 250), 5);
//     };

//     this.keyReleased = function(keyCode) {

//     };
//     this.onPause = function() {

//     };

//     this.onStop = function() {

//     };
//     this.onResume = function() {

//     };

//     // var drawLineTime = function() {
//     //     p.stroke(255, 255, 0);
//     //     p.strokeWeight(3);
//     //     //p.line(0, 0, uLine.x, uLine.y);
//     //     p.line(uLine.x - p.width / 2, uLine.y, uLine.x + p.width / 2, uLine.y);
//     //     p.strokeWeight(1);
//     //     var t, t1;
//     //     for (var i = -3; i <= 3; ++i) {
//     //         t = new Vec2D(p, i * 0.2, 0).to3D();
//     //         t1 = new Vec2D(p, i * 0.2, 3).to3D();
//     //         p.line(t.x, t.y, t1.x, t1.y);
//     //     }

//     //     // var d = ((timex - notesh.startTime) % 2000) / 2000;

//     //     // for (var i = -15; i < 15; ++i) {
//     //     //     t = new Vec2D(p, 0, i * 0.125 + d).to3D();
//     //     //     if ((i + 16) % 4 == 0) {
//     //     //         p.strokeWeight(2);
//     //     //         p.stroke(255, 100, 100);
//     //     //     }
//     //     //     else {
//     //     //         p.strokeWeight(1);
//     //     //         p.stroke(100, 100, 255);
//     //     //     }
//     //     //     p.line(t.x - p.width / 2, t.y, t.x + p.width / 2, t.y);
//     //     // }
//     //     p.strokeWeight(1);
//     // }


//     this.mousePressed = function() {

//     };

//     this.mouseReleased = function() {

//     };

//     this.mouseMoved = function() {

//     };


// }






// function Vec2D(p, _x, _y) {
//     this.x = _x;
//     this.y = _y;
//     this.to3D = function() {
//         var k = 0.5 + 0.5 * (4 - _y) * (4 - _y) / 16;
//         return new Vec2D(p, p.width / 2 + _x * k * p.width / 2, 0.9 * p.height - 0.8 * p.height * _y * k);
//     };

//     this.add = function(v) {
//         return new Vec2D(p, this.x + v.x, this.y + v.y);
//     };
// }


// // function Note(_tick, _note) {
// //     this.tick = _tick;
// //     this.note = _note;
// // }

// // function NotesSheet() {
// //     this.notes = [];
// //     this.startTime = 0;
// //     var lowId = 0;
// //     var hightId = 0;
// //     this.push = function(_tick, _note) {
// //         this.notes.push(new Note(_tick, _note));
// //     };


// //     this.drawRv = function(p, timex) {
// //         if (this.notes.length == 0) return;
// //         lowId = this.notes.length;
// //         while (true) {
// //             if (lowId > 0) {
// //                 if (timex - this.notes[lowId - 1].tick * 250 + this.startTime < 12000)
// //                     lowId--;
// //                 else break;
// //             }
// //             else break;
// //         }

// //         while (true) {
// //             if (hightId < this.notes.length - 1) {
// //                 if (this.notes[hightId + 1].tick * 250 + this.startTime < timex)
// //                     hightId++;
// //                 else break;
// //             }
// //             else break;
// //         }
// //         for (var i = lowId; i <= hightId; ++i) {
// //             var y = (timex - this.notes[i].tick * 250 - this.startTime) / 2000;
// //             this.drawBar(p, y, this.notes[i].note);
// //         }

// //     };



// //     this.drawBar = function(p, y, _note) {
// //         var x = -0.6 + _note * 0.2;
// //         p.noStroke();
// //         p.fill(120, 100, 255);
// //         var t;
// //         //console.log(_note);
// //         p.beginShape(); {
// //             t = new Vec2D(p, x + 0.02, y + 0.02).to3D();
// //             p.vertex(t.x, t.y);

// //             t = new Vec2D(p, x + 0.18, y + 0.02).to3D();
// //             p.vertex(t.x, t.y);

// //             t = new Vec2D(p, x + 0.18, y - 0.02).to3D();
// //             p.vertex(t.x, t.y);

// //             t = new Vec2D(p, x + 0.02, y - 0.02).to3D();
// //             p.vertex(t.x, t.y);
// //         }
// //         p.endShape();
// //     }
// // }
