//const PLAY_LIST_PATH = "assets/musics/playlist.json";
const PLAY_LIST_BG_PATH = "assets/songbg.png";
const PLAY_LIST_FONT = "assets/beauty.ttf";
const LOCK_PATH = "assets/lock.png";
const OPEN_PATH = "assets/song.png";
/*global PlayActivity*/
function SongActivity(p) {

    var playList;
    var bg;
    var ofsY = 0;
    var maxOfsY = 0;
    var textFont;
    var lockIcon;
    var openIcon;
    var hoverId = -1;

    p.loadImage(PLAY_LIST_BG_PATH, function(im) {
        bg = im;
    });

    p.loadImage(LOCK_PATH, function(im) {
        lockIcon = im;
    });


    p.loadImage(OPEN_PATH, function(im) {
        openIcon = im;
    });

    p.loadFont(PLAY_LIST_FONT, function(f) {
        textFont = f;
    });

    this.draw = function() {
        p.textAlign(p.LEFT, p.BOTTOM);
        p.background(79, 30, 103);
        if (bg) {
            var h = p.min(bg.height, p.height);
            var w = bg.width * (h / bg.height)
            p.image(bg, p.width - w, p.height - h, w, h);
        }
        if (playList)
            this.drawPlayList();
    };

    this.drawPlayList = function() {
        if (textFont) {
            p.textFont(textFont);
        }
        for (var i = 0; i < playList.songs.length; ++i) {
            if (-ofsY + i * 100 > p.height) continue;
            if (-ofsY + i * 100 + 100 < 0) continue;
            if (i == hoverId) {
                p.fill(100, 250, 100);
            }
            else
                p.fill(200, 250, 250);
            p.stroke(100, 255, 255);
            p.strokeWeight(2);
            p.rect(15, -ofsY + 5 + 100 * i, 90, 90);
            if (playList.songs[i].open) {
                if (openIcon)
                    p.image(openIcon, 33, -ofsY + 5 + 100 * i + 18);
            }
            else {
                if (lockIcon)
                    p.image(lockIcon, 33, -ofsY + 5 + 100 * i + 18);
            }
            p.fill(50, 50, 50, 100);
            p.rect(105, -ofsY + 5 + 100 * i, 500, 90);
            p.noStroke();
            if (i == hoverId)
                p.fill(0, 250, 0);
            else
                p.fill(200, 0, 0);
            p.textSize(50);
            p.text(playList.songs[i].name, 115, -ofsY + 5 + 100 * i + 75);
        }

    };

    this.update = function(deltaTime) {
        if (!p.mouseIsPressed) {
            if (ofsY < 0) ofsY += deltaTime / 10;
        }

    };

    this.keyPressed = function(keyCode) {

    };

    this.keyReleased = function(keyCode) {

    };

    var hovery;
    var ofsYt;
    var ofsYtPress;

    var pressId = -100;
    this.mousePressed = function() {

        hovery = p.mouseY;
        ofsYt = ofsY;
        ofsYtPress = ofsY;
        pressId = hoverId;
    };

    this.mouseReleased = function() {

        ofsY = p.min(maxOfsY + 100, p.max(-100, ofsYt - p.mouseY + hovery));
        if (hoverId == pressId) {
            if (hoverId >= 0)
                this.onClickItem(hoverId);
        }
    };

    this.onClickItem = function(id) {
        if (playList.songs[id].open) {
            p.startActivity(p.loadingAct);
            p.loadingAct.addText("load music and notes");
            p.loadSound(playList.songs[id].path, function(m) {
                p.dataSheet.songName = playList.songs[id].name;
                p.dataSheet.music = m;
                p.loadJSON(playList.songs[id].note, function(obj) {
                    p.dataSheet.notes = obj;
                    //  p.replaceActivity(new GenActivity(p));
                    p.replaceActivity(new PlayActivity(p));
                });
            });
        }
        else {
            alert("Bạn chưa mở khóa bài hát này");
        }
    };

    this.mouseMoved = function() {
        if (p.mouseIsPressed) {
            if (p.abs(ofsY - ofsYtPress) > 50) pressId = -100;
            ofsY = p.min(maxOfsY + 100, p.max(-100, ofsYt - p.mouseY + hovery));
        }
        hoverId = -1;
        if (playList) {
            for (var i = 0; i < playList.songs.length; ++i) {
                var x = 15;
                var y = -ofsY + 5 + 100 * i;
                if (p.mouseX > x && p.mouseY > y && p.mouseX < x + 590 && p.mouseY < y + 90)
                    hoverId = i;
            }
        }
    };


    this.onPause = function() {

    };

    this.onStop = function() {

    };
    this.onResume = function() {
        
        playList = p.dataSheet.playList;
    };
}
