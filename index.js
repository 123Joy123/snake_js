function SnakeInit(){
    this.dom={
        'btn':document.getElementsByClassName('startGame')[0],
        'main':document.getElementsByClassName('gameArea')[0],
        'actScore':document.getElementsByClassName('actScore')[0]
    };
    this.timer1;
    this.bodyPosition={x:[],y:[]};
    this.applePosition={x:[],y:[]};
    this.detectPosition={x:[],y:[]};
    this.currentDiret="";
    this.bindStartEvent();
    this.score=0;
}
SnakeInit.prototype.crashDetect=function(){
    let snakeHead=document.getElementById('snakeHead'),
        snakeBlock=document.getElementById('snakeBlock'),
        snakeBody=document.getElementsByClassName('snakeBody'),
        self=this;
    cashTimer=setInterval(function(){
        let x=parseInt(getComputedStyle(snakeHead).left),
            y=parseInt(getComputedStyle(snakeHead).top),
            BX=parseInt(getComputedStyle(snakeBlock).left),
            BY=parseInt(getComputedStyle(snakeBlock).top),
            len=snakeBlock.children.length;
        if((x+BX)<0 || (x+BX)>1200){
            alert("Game over! Your score is : "+self.score);
            clearInterval(self.timer1);
            clearInterval(cashTimer);
        }
        else if ((y+BY)<0 || (y+BY)>560){
            alert("Game over! Your score is : "+self.score);
            clearInterval(self.timer1);
            clearInterval(cashTimer);
        }
        for(let i=0;i<len;i++){
            self.detectPosition.x[i]=parseInt(getComputedStyle(snakeBlock.children[i]).left);
            self.detectPosition.y[i]=parseInt(getComputedStyle(snakeBlock.children[i]).top);
        }
        for(let i=1;i<len;i++){
            if(x==self.detectPosition.x[i]){
                if(y==self.detectPosition.y[i]){
                    alert("Game over! Your score is : "+self.score);
                    clearInterval(self.timer1);
                    clearInterval(cashTimer);
                }
            }
        }
    },100)
}
SnakeInit.prototype.bindStartEvent=function() {
    let self =this;
    this.dom.btn.addEventListener('click',function(){
        this.style.display="none";
        self.init('right');
    },false);
}
SnakeInit.prototype.bindKeyEvent = function () {
    let snakeHead = document.getElementById('snakeHead'),
        snakeBody = document.getElementsByClassName('snakeBody'),
        snakeBlock = document.getElementById('snakeBlock'),
        len = snakeBody.length,
        self = this;
        document.addEventListener('keydown',function (e) {
        e.preventDefault();
        switch(e.key) {
            case 'ArrowDown' : 
                console.log(e.key);
                if(self.currentDiret == "up" || self.currentDiret == "down"){
                    break;
                }
                self.move("down"); break;
            case 'ArrowUp' : 
                if(self.currentDiret == "up" || self.currentDiret == "down"){
                    break;
                }               
                self.move("up"); break;
            case 'ArrowLeft' : 
                if(self.currentDiret == "left" || self.currentDiret == "right"){
                    break;
                }
                self.move("left"); break;
            case 'ArrowRight' :
                if(self.currentDiret == "left" || self.currentDiret == "right"){
                    break;
                } 
                self.move("right"); break;
        }
        return false;
    } )
}

SnakeInit.prototype.move = function (direction) {
    if(this.timer1){
        clearInterval(this.timer1);
    }
    let snakeBlock = document.getElementById('snakeBlock'),
        snakeHead = document.getElementById('snakeHead'),
        snakeBody = document.getElementsByClassName('snakeBody'),
        x = parseInt(getComputedStyle(snakeHead).left),
        y = parseInt(getComputedStyle(snakeHead).top),
    self = this;

    this.timer1 = setInterval(function () {
        let len = snakeBlock.children.length;
        for(let i = 0; i < len; i++){
            self.bodyPosition.x[i] = parseInt(getComputedStyle(snakeBlock.children[i]).left);
            self.bodyPosition.y[i] = parseInt(getComputedStyle(snakeBlock.children[i]).top);
        }
        if(document.getElementsByClassName('apple')){                         //判断游戏中是否出现了食物
            var apple = document.getElementsByClassName('apple'),
                appleNum = apple.length;
            for(var i = 0; i < appleNum; i++ ){
                self.applePosition.x[i] = parseInt(getComputedStyle(apple[i]).left);
                self.applePosition.y[i] = parseInt(getComputedStyle(apple[i]).top);
            }
        }
        switch(direction) {
            case "right" : 
                snakeHead.style.left = self.bodyPosition.x[0] + 40 + "px";
                snakeHead.style.transform = "rotateZ(0deg)";
                self.currentDiret = "right";
                for(var i = 0; i < len -1; i ++){
                    snakeBody[i].style.left = self.bodyPosition.x[i] + "px";
                    snakeBody[i].style.top = self.bodyPosition.y[i] + "px";
                }
                break;
            case "left" :
                snakeHead.style.left = self.bodyPosition.x[0] - 40 + "px";
                snakeHead.style.transform = "rotateZ(180deg)" ;
                self.currentDiret = "left";
                for(var i = 0; i < len -1; i ++){
                    snakeBody[i].style.left = self.bodyPosition.x[i] + "px";
                    snakeBody[i].style.top = self.bodyPosition.y[i] + "px";
                }
                break;
            case "up" :
                snakeHead.style.top = self.bodyPosition.y[0] - 40 + "px";
                snakeHead.style.transform = "rotateZ(-90deg)" ;
                self.currentDiret = "up";
                for(var i = 0; i < len -1; i ++){
                    snakeBody[i].style.left = self.bodyPosition.x[i] + "px";
                    snakeBody[i].style.top = self.bodyPosition.y[i] + "px";
                }
                break;
            case "down" :
                snakeHead.style.top = self.bodyPosition.y[0] + 40 + "px";
                snakeHead.style.transform = "rotateZ(90deg)";
                self.currentDiret = "down";
                for(var i = 0; i < len -1; i ++){
                    snakeBody[i].style.left = self.bodyPosition.x[i] + "px";
                    snakeBody[i].style.top = self.bodyPosition.y[i] + "px";
                }
                break;
        }
        if(apple){
            var mapX = parseInt(getComputedStyle(snakeHead).left) + parseInt(getComputedStyle(snakeBlock).left),
                mapY = parseInt(getComputedStyle(snakeHead).top) + parseInt(getComputedStyle(snakeBlock).top);
            for(var i =0; i < appleNum; i++){
                if(mapX == self.applePosition.x[i] && mapY == self.applePosition.y[i]){
                    self.addBody(mapX,mapY);
                }
            }
        }
        self.dom.actScore.innerHTML = self.score;
    },200)
}
SnakeInit.prototype.addBody = function (x,y) {
    //  删除苹果  新加入苹果   加长身体
    let apple = document.getElementsByClassName('apple');
    let n = apple.length,
        snakeBody = document.createElement('div'),
        snakeBlock = document.getElementById('snakeBlock');
        len = snakeBlock.children.length;
    for(let i = 0; i < n; i++){
        if(x == this.applePosition.x[i]){
            let index = i;
            this.dom.main.removeChild(apple[i]);
            break;
        }
    }
    snakeBody.className = "snakeBody"
    snakeBody.style.left = this.bodyPosition.x[len-1] +"px";
    snakeBody.style.top = this.bodyPosition.y[len-1] + "px" ;
    snakeBlock.appendChild(snakeBody);
    this.appleShow();
    this.score++;
}
SnakeInit.prototype.appleShow = function () {
    let apple = document.getElementsByClassName('apple');
    let n = Math.floor(Math.random()*2 + 1);   // 确定是随机生成1个或者2个果实
    if(apple.length >= 1){                          //保证同时只能存在两个果实
        this.generate(1);
    }else{
        this.generate(n);            
    }
    
}
SnakeInit.prototype.generate = function (n) {
    for(let i = 0; i < n; i++){
        let apple = document.createElement('div'),
            x = Math.floor(Math.random()*30) * 40;
            y = Math.floor(Math.random()*15) * 40;
        apple.className = "apple";
        apple.style.left = x + "px";
        apple.style.top = y + "px";
        this.dom.main.appendChild(apple);
    }
}
SnakeInit.prototype.init = function (direction) {
    let self = this,
        bodyPositionX = 40,
        bodyPositionY = 40;
    let positionX = Math.floor(Math.random() * 12 + 3) * 40,
        positionY = Math.floor(Math.random() *15) * 40,
        moveLeft = positionX;
    let snakeBlock = document.createElement('div'),
        snakeHead = document.createElement('div');
    snakeBlock.id = 'snakeBlock';
    snakeBlock.style.left = positionX + "px";
    snakeBlock.style.top = positionY + "px";
    snakeHead.id = 'snakeHead';
    snakeBlock.appendChild(snakeHead);
    for(let i = 0; i < 3; i++) {
        let snakeBody = document.createElement('div');
            snakeBody.className = 'snakeBody';
            snakeBody.style.left = -bodyPositionX + 'px';
            bodyPositionX += 40;
            snakeBlock.appendChild(snakeBody);
    }
    this.dom.main.appendChild(snakeBlock);
    this.move('right');
    this.currentDiret = direction;
    this.bindKeyEvent();
    this.crashDetect();      //检测是否碰壁或者撞到自己  
    this.appleShow();

}

let snake = new SnakeInit();