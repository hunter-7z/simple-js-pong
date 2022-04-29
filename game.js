const canvas = document.querySelector("canvas");
canvas.width = 600;
canvas.height = 300;
const ctx = canvas.getContext("2d");


// listeners
addEventListener("keydown", e => {
    switch(e.key){
        case "ArrowUp":
            playerOne.moveUp()
            playerTwo.moveUp()
            break;
        case "ArrowDown":
            playerOne.moveDown()
            playerTwo.moveDown()
            break;
    }
})

// instances
const playerOne = getPlayer({});
const playerTwo = getPlayer({x:canvas.width-7});
const ball = getBall({});
const score = {
    left: 0,
    right: 0
}

// Game Loop
function game(){
    clearScreen();
    drawCourt();
    drawScore();
    playerOne.draw();
    playerTwo.draw();
    ball.draw();
    checkCollition();
    requestAnimationFrame(game);
}
requestAnimationFrame(game);


// functions
function getBall({}){
    return {
        x: canvas.width / 2 - 3.5,
        y: canvas.height / 2 - 3.5,
        w: 7,
        h: 7,
        color: "white",
        speedX: 1,
        speedY: 1,
        ballSpeed: .7,
        directionX: "right",
        directionY: "up",
        movement(){
            // Direction - Left Right
            if(this.x < 0){
                this.directionX = "right";
            }else if(this.x > canvas.width - this.w){
                this.directionX = "left";
            }
            if(this.directionX === "right")  this.speedX++
            else this.speedX--;

            this.speedX*= this.ballSpeed;
            this.x += this.speedX;

            // Direction - Up Down
            if(this.y < 0){
                this.directionY = "down"
            }else if(this.y > canvas.height - this.h){
                this.directionY = "up"
            }
            if(this.directionY === "down")  this.speedY++
            else this.speedY--;

            this.speedY*= this.ballSpeed;
            this.y+= this.speedY;
        },
        draw(){
            this.movement()
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x,this.y,this.w,this.h);
        }
    }
}

function getPlayer({
    x=0,
    color="white"
}) {
    return {
        x,
        y: 0,
        w: 7,
        h: 50,
        speed: 10,
        color,
        draw(){
            ctx.fillStyle = color;
            ctx.fillRect(this.x,this.y,this.w,this.h);
        },
        moveUp(){
            if(this.y < 10) return;
            this.y-= this.speed;
        },
        moveDown(){
            if(this.y > canvas.height - 60) return;
            this.y+= this.speed;
        },
        contains(b){
            return (this.x < b.x + b.w) &&
                    (this.x + this.w > b.x) &&
                    (this.y < b.y + b.h) &&
                    (this.y + this.h > b.y);

        }
    }
}


// independent functions
function clearScreen(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function drawScore(){
    ctx.fillStyle = "white"
    ctx.font = '44px "Press Start 2P"'
    ctx.fillText(score.left,canvas.width - canvas.width*.7 - 22,canvas.height/2+ 22);
    ctx.fillText(score.right,canvas.width - canvas.width*.3 - 22,canvas.height/2+ 22);
}

function drawCourt(){
    let color = "white"

    ctx.fillStyle = "black"
    ctx.fillRect(0,0,canvas.width,canvas.height);
    
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeRect(0,0,canvas.width,canvas.height);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(canvas.width/2, 0);
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.stroke();
    ctx.closePath;
}
function checkCollition() {
    if(playerOne.contains(ball)){
        ball.directionX = "right";
    }else if(playerTwo.contains(ball)) {
        ball.directionX = "left";
    }
    if(ball.x < 0){
        ball.x = canvas.width / 2 - 3.5;
        ball.y = canvas.height / 2 - 3.5;
        score.right++;
        ball.directionX = "right";
    }else if(ball.x > canvas.width - ball.w){
        ball.x = canvas.width / 2 - 3.5;
        ball.y = canvas.height / 2 - 3.5;
        score.left++;
        ball.directionX = "left"
    }
}
function getLoser({}){
    return {
        draw(){
            ctx.fillStyle = "red"
            ctx.fillRect(0,0,canvas.width,canvas.height);
        }
    }
}