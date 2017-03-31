/*global LoadingActivity*/
const musicSheet = [
    "https://raw.githubusercontent.com/duthienkt/SoundVirtualizationJS/master/aba57ad95c1ff41468ab12c66f02b0b1.mp3"
];

const GAME_BG_PATH = "assets/playing.png";
const NOTE_CENTER_PATH = "assets/note_center.png";

const BUTTON_NOTE_PATH = [
    "assets/BT_S.png", "assets/BT_D.png", "assets/BT_F.png",
    "assets/BT_J.png", "assets/BT_K.png", "assets/BT_L.png"
];

const CIRCLE_PATH = [
    "assets/C1.png","assets/C2.png","assets/C3.png",
    "assets/C4.png","assets/C5.png"
];

const PLAY_LIST_PATH = "assets/musics/playlist.json";


const MENU_FONT_PATH = "assets/Menuetto.ttf";

const DANCE_PATH = [
    "assets/dance_0.png",
    "assets/dance_1.png",
    "assets/dance_2.png",
    "assets/dance_3.png",
    "assets/dance_4.png",
    "assets/dance_5.png",
    "assets/dance_6.png",
    "assets/dance_7.png",
    "assets/dance_8.png",
    "assets/dance_9.png"
];

function loadImageFromArray(p, arr, success) {
    var res = [];
    //  g.print("loadImageFromArray(arr, success, fail) len\n".concat(arr));
    function loader(id, arr, ret) {
        if (id < arr.length)
            p.loadImage(arr[id], function(pic) {
                ret.push(pic);
                p.loadingAct.addText("load  ".concat(arr[id]))
                loader(id + 1, arr, ret);
            });
        else {
            p.loadingAct.addText("load images complete!");
            success(res);
        }

    }
    loader(0, arr, res);
}

function loadAnimationFromArray(p, arr, success) {
    var res = [];
    //  g.print("loadImageFromArray(arr, success, fail) len\n".concat(arr));
    function loader(id, arr, ret) {
        if (id < arr.length)
            p.createAnimation(arr[id], 8, 125,true, function(pic) {
                ret.push(pic);
                p.loadingAct.addText("load  ".concat(arr[id]))
                loader(id + 1, arr, ret);
            });
        else {
            p.loadingAct.addText("load animation complete!");
            success(res);
        }

    }
    loader(0, arr, res);
}


function DataSheet(p) {
    this.playList;
    this.music;
    this.songName;
    this.notes;
    this.gamebg;
    this.barYellow;
    this.noteButtonImgs;
    this.circleImgs;
    this.noteCenter;
    this.menuFont;
    this.lastScore;
    this.dancers;
    var THIS = this;
    this.loadMainData = function(onComplete) {
        p.loadFont(MENU_FONT_PATH, function(fo) {
            THIS.menuFont = fo;
            p.loadingAct.addText("load ".concat(GAME_BG_PATH));
            p.loadImage(GAME_BG_PATH, function(im) {
                THIS.gamebg = im;
                p.loadingAct.addText("load ".concat(NOTE_CENTER_PATH));
                p.loadImage(NOTE_CENTER_PATH, function(im1) {
                    THIS.noteCenter = im1;
                    loadImageFromArray(p, BUTTON_NOTE_PATH, function(res) {
                        THIS.noteButtonImgs = res;
                        loadImageFromArray(p, CIRCLE_PATH, function(res1){
                            THIS.circleImgs = res1;
                            p.loadJSON(PLAY_LIST_PATH, function(obj){
                                THIS.playList = obj;
                                loadAnimationFromArray(p, DANCE_PATH, function(res) {
                                    THIS.dancers = res;
                                   onComplete(); 
                                });
                                 
                            });
                           
                        });
                    });
                });

            });
        });

    };

}
