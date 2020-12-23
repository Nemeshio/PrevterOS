function MatrixSymbol(xpos, ypos, f) {
    this.x = xpos;
    this.y = ypos;
    this.first = f;
    this.switchInterval = round(random(2, 20));
    this.c;
    this.value;
    
    this.setToRandomSymbol = function() {
        var charType = round(random(0, 5));
        if (frameCount % this.switchInterval == 0) {
            if (charType > 1) {
                c = 0x80 + round(random(0, 96));
                this.value = String.fromCharCode(c);
            } else if (charType > 0) {
                this.value = String.fromCharCode(round(random(42, 46)));
            } else {
                this.value = floor(random(0,10));
            }
        }
    }
    
    this.rain = function() {
        if (this.y >= screenH) {
            this.y = 0;
        } else {
            this.y++;
        } 
    }
}

function Stream(){
    this.totalSymbols = round(random(5, 10));
    this.symbols = [];
    this.first = round(random(0, 4)) == 1;

    this.generateSymbols = function(x, y) {
        for (var i = 0; i < this.totalSymbols; i++) {
            this.symbols.push(new MatrixSymbol(x, y, this.first));
            this.symbols[i].setToRandomSymbol();
            y -= 1;
            this.first = false;
        }
    }
  
    this.render = function() {
        for (var i = 0; i < this.totalSymbols; i++) {
            if (this.symbols[i].first) {
                RenderColorPos(this.symbols[i].value, this.symbols[i].x, this.symbols[i].y, color(180, 255, 180))
            } else {
                RenderColorPos(this.symbols[i].value, this.symbols[i].x, this.symbols[i].y, color(0, 255, 70))
            }
            
            this.symbols[i].rain();
            this.symbols[i].setToRandomSymbol();
        }
    }
}

function MatrixScreen(cmd){
    var x = 0;
    this.streams = [];

    for (var i = 0; i < screenW; i++) {
        this.streams.push(new Stream());
        this.streams[i].generateSymbols(x, random(-100, 0));
        x++;
    }

    this.draw = function()
    {
        for (var i = 0; i < this.streams.length; i++) {
            this.streams[i].render();
        }
    }
}