const LOGO_PATH = "assets/logo.png";

function Animation(p, imgs, elapseTime, _loop = true) {
    this.length = imgs.length;
    this.currentId = 0;
    this.width = imgs[0].width;
    this.height = imgs[0].height;
    this.delayRemain = elapseTime;
    this.elapseTime = elapseTime;
    this.isLoop = _loop;

    this.isAlive = function() {
        return this.isLoop || this.currentId < this.length;
    }
    this.copy = function() {
        return new Animation(p, imgs, this.elapseTime, this.isLoop);
    }

    this.draw = function(x, y, w = -1, h = -1) {
        if (!this.isAlive()) return;
        if (w < 0 || h < 0)
            p.image(imgs[this.currentId], x, y);
        else
            p.image(imgs[this.currentId], x, y, w, h);
    };

    this.update = function(deltaTime) {
        this.delayRemain -= deltaTime;
        while (this.delayRemain <= 0) {
            this.currentId += 1;
            this.delayRemain += this.elapseTime;
        }
        if (this.isLoop) {
            while (this.currentId >= this.length) {
                this.currentId = this.currentId - this.length;
            }
        }
    };

    this.noLoop = function() {
        this.isLoop = false;
    }

    this.loop = function() {
        this.isLoop = true;
    }

    this.reset = function() {
        this.currentId = 0;
        this.delayRemain = elapseTime;
    }

    this.getColor = function(x, y) {
        if (x < 0 || y < 0 || x >= this.width || y >= this.height) return 0;
        if (this.isAlive())
            return imgs[this.currentId].get(p.floor(x), p.floor(y));
    };
}





function BaseActivity(p) {
    var logo;
    p.loadImage(LOGO_PATH, function(im) {
        logo = im;
    });
    

    this.draw = function() {
        p.background(0);
        if (logo) {
            p.image(logo, p.width / 2 - logo.width / 2, p.height / 2 - logo.height / 2);
        }
    };


    this.update = function(deltaTime) {

    };


    this.keyPressed = function(keyCode) {

    };

    this.keyReleased = function(keyCode) {

    };
    this.onPause = function()
    {
        
    };
    
    this.onStop = function(){
        
    };
    this.onResume = function(){
        
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
