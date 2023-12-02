var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

// 중앙에 위치하도록 y 좌표 조정
var groundLevel = canvas.height / 2;

var img1 = new Image();
img1.src = "dino.png";

var img2 = new Image();
img2.src = "relfire.png";
var dino = {
    x: 500,
    y: groundLevel - 50, 
    width: 50,
    height: 50,
    draw() {
        //ctx.fillStyle = "green";
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img1, this.x, this.y, this.width, this.height);
    }
};

class Cactus {
    constructor() {
        this.x = 1000;
        this.y = groundLevel - 50;
        this.width = 50;
        this.height = 50;
    }
    draw() {
        //ctx.fillStyle = "red";
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img2, this.x, this.y, this.width, this.height);
    }
}

var timer = 0;
var cactuses = [];
var jump = false;
var score = 0;
var animation;
var jumpHeight = 170;  // 점프 높이
var jumpSpeed = 3;     // 점프 속도

function executePerFrame() {
    animation = requestAnimationFrame(executePerFrame);
    timer++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 땅 선 그리기
    ctx.beginPath();
    ctx.moveTo(0, groundLevel);
    ctx.lineTo(canvas.width, groundLevel);
    ctx.stroke();

    if (timer % 120 === 0) {
        var cactus = new Cactus();
        cactuses.push(cactus);
    }

    cactuses.forEach((a, i, o) => {
        a.x -= 2;
        a.draw();
        if (isBumped(dino, a)) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            cancelAnimationFrame(animation);
            alert("Game Over. Score: " + score);
            document.location.reload();
        }
        if (a.x < 0) {
            o.splice(i, 1);
            score++;
        }
    });

    if (jump) {
        if (dino.y > groundLevel - 50 - jumpHeight) {
            dino.y -= jumpSpeed;
        } else {
            jump = false;
        }
    } else if (dino.y < groundLevel - 50) {
        dino.y += jumpSpeed;
    } 

    dino.draw();
    ctx.fillStyle = "black";
    ctx.fillText(`Score: ${score}`, 20, 20);
}

function isBumped(dino, cactus) {
    var xOverlap = dino.x < cactus.x + cactus.width && dino.x + dino.width > cactus.x;
    var yOverlap = dino.y < cactus.y + cactus.height && dino.y + dino.height > cactus.y;

    return xOverlap && yOverlap;
}


document.addEventListener("keydown", function (e) {
    if (e.code === "Space" && dino.y == groundLevel - 50) {
        jump = true;
    }
});


executePerFrame();



















