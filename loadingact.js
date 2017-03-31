var ANI_CAT_PATH = "assets/cat_sleepy.png";
var BG_R = 255;
var BG_G = 235;
var BG_B = 225;

function LoadingActivity(p) {
  this.cat;
  this.texts = [];
  this.textSize = 40;
  this.percent = 0;
  var THIS = this;
  var logFunc;
  p.createAnimation(ANI_CAT_PATH, 20, 130, true, function(an) {
    THIS.cat = an;
  });

  this.draw = function() {
    p.background(BG_R, BG_G, BG_B);
    p.noStroke();
    p.fill(255, 0, 0);
    p.rect(0, p.height - 30, p.width * this.percent / 100.0, 30);
    p.textSize(this.textSize);
    var y = p.height - 40;
    for (var i = this.texts.length - 1; i >= 0; --i) {
      p.fill(20 * (this.texts.length - i) + 13, 255 - (this.texts.length - i) * 10);
      p.text(this.texts[i], 10, y);
      y -= this.textSize * 1.5;
    }
    if (this.cat) {
      if (this.cat)
        this.cat.draw(p.width - 300, p.height - 250);
    }
  };

  this.addText = function(str) {
    if (this.texts.length > 10) this.texts.shift();
    this.texts.push(str);
  };


  this.update = function(deltaTime) {
    if (this.cat)
      this.cat.update(deltaTime);
  };

  this.keyPressed = function(keyCode) {

  };

  this.keyReleased = function(keyCode) {

  };

  this.onPause = function() {
  // console.log = logFunc; 
  };

  this.onStop = function() {
   

  };
  this.onResume = function() {
    // logFunc = console.log;
    // console.log = this.addText;
     p.textAlign(p.LEFT, p.BOTTOM);
  };
  
  
  this.mousePressed = function()
  {
      
  };
  
  this.mouseReleased = function()
  {
      
  };
  
  this.mouseMoved = function()
  {
      
  };
}
