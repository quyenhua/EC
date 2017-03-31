/*global LoadingActivity*/
/*global Animation*/
/*global DataSheet*/
/*global BaseActivity*/
/*global PlayActivity*/
/*global GAME_BG_PATH*/
/*global  SongActivity*/
/*global GenatorActivity*/

const CURSOR_PATH = "assets/cursor.png";
const CURSOR_LEN = 5;



var context = function(p) {
  var animationCache = {};
  var lastTime;
  var currentTime;
  var deltaTime = 0;
  var activityStack = [];
  var currentActivity = new BaseActivity(p);
  var cursorAni;
  this.loadingAct;
  var THIS = this;
  p.dataSheet;
  p.preload = function() {
    p.createAnimation(CURSOR_PATH, CURSOR_LEN, 200, true, function(e) {
      cursorAni = e;
    });
  };

  p.setup = function() {
    p.noCursor();
    p.createCanvas(screen.width, p.floor(screen.height * 0.82));
    currentTime = p.millis();
    deltaTime = 0;
    
    p.dataSheet = new DataSheet(p);
    p.loadingAct = new LoadingActivity(p);
    p.startActivity(this.loadingAct);
    //p.dataSheet.songName = "Generator";
    //this.loadingAct.addText("Downloading track01.mp3");
    //p.loadSound("assets/musics/track01.mp3", function(m){
      // p.dataSheet.songName = "Track 01";
       p.loadingAct.addText("loading...");
      p.dataSheet.loadMainData(function(){
        p.replaceActivity(new SongActivity(p));
        
      //p.startActivity(new GenActivity(p));
        // p.replaceActivity(new GenActivity(p));
       
      });
    // });
   
  };

  p.draw = function() {
    lastTime = currentTime;
    currentTime = p.millis();
    deltaTime = currentTime - lastTime;
    
    currentActivity.update(deltaTime);

    currentActivity.draw();
    if (cursorAni) {
      cursorAni.update(deltaTime);
      cursorAni.draw(p.mouseX, p.mouseY);
    }
  };

  p.createAnimation = function(path, length, elapseTime, loop, onSuccess) {
    var res = animationCache[path];
    if (!res) {
      p.loadImage(path, function(im) {
        var imgs = p.splitImage(im, length);
        res = new Animation(p, imgs, elapseTime, loop);
        animationCache[path] = res;
        onSuccess(res.copy());
      });
    }
    else
      onSuccess(res.copy());
  };
  p.splitImage = function(im, length) {
    var imgs = [];
    var w = Math.floor(im.width / length);
    for (var i = 0; i < length; ++i) {
      imgs.push(im.get(w * i, 0, w, im.height));
    }
    return imgs;
  };

  p.startActivity = function(act) {
    
    if (currentActivity)
      currentActivity.onPause();
    activityStack.push(currentActivity);
    currentActivity = act;
    act.onResume();
  };

  p.popActivity = function() {
    if (currentActivity)
    currentActivity.onStop();
    if (activityStack.length>0)
    currentActivity = activityStack.pop();
    else
    p.exit();
  };
  
  p.replaceActivity = function(act)
  {
    if (currentActivity)
      currentActivity.onStop();
    currentActivity = act;
    act.onResume();
  };
  
  p.exit = function(){
    //todo: emplement exit function here
  };
  
  
  p.keyPressed = function()
  {
     currentActivity.keyPressed(p.keyCode);
  };
  
  p.keyReleased = function()
  {
    currentActivity.keyReleased(p.keyCode);
  }
  p.mousePressed  = function()
  {
    
   currentActivity.mousePressed(); 
  };
  
  p.mouseMoved = function ()
  {
    
    currentActivity.mouseMoved();
  };
  
  p.mouseDragged = function ()
  {
   currentActivity.mouseMoved();
  }
  
  p.mouseReleased = function()
  {
    currentActivity.mouseReleased();
  };
};

var myp5 = new p5(context, "gameContainer");
