const canvasBox = document.querySelector("#canvasBox");
const CANVAS_WIDTH = 200;
const CANVAS_HEIGHT = 312;
const Monster_Width = 200;
const Monster_Height = 312;
const everything = document.querySelector("#everything");
let scale = 1;
const animationSlower = 5;
let monsterID = 0;
let score = 10;
let hearts = 3;
let monsters_on_screen = 0;
let game_over = false;
let score_text = document.querySelector("#score-text");
let heart_box = document.querySelector("#hearts-box");
const screen_width = window.innerWidth;



everything.addEventListener("click", () => {
    score = score-3;
    console.log("click");
    updateScore();
})

class MonsterObject{
    constructor(speed, positionY, scale){
    this.id = ++monsterID;
    this.speed = speed;
    this.y = positionY; 
    this.animationFrame = 0;
    this.x = 0;
    this.scale = scale;
    this.in_game = true;
    this.create_canvas();
    this.anim_start();

    }

    create_canvas(){
        

        canvasBox.insertAdjacentHTML(`beforeend`,
        `
        <canvas id="canvas_${this.id}" width="${Monster_Width*scale}" height="${Monster_Height*scale}" style="position:absolute; right:${this.x}px; bottom:-${this.y}px" ></canvas>
        
        `)
        this.canvas = document.querySelector(`#canvas_${this.id}`);
        this.ctx = document.querySelector(`#canvas_${this.id}`).getContext("2d");


        
    }


    

    anim_start(){
        let id = this.id;
        let in_game = this.in_game;
        let canvas = document.querySelector(`#canvas_${this.id}`);
        console.log(canvas);
        const ctx = this.ctx;
        let frame = this.animationFrame;
        let speed = this.speed;
        let x = this.x;
        let scale = this.scale;
        console.log(speed);


        function animate(){
            canvas.addEventListener("click", () => {
                in_game = false;
            })
            ctx.clearRect(0,0,Monster_Width,Monster_Height);
            ctx.drawImage(monsterImage, Monster_Width*frame,0, Monster_Width, Monster_Height, 0,0, Monster_Width*scale,Monster_Height*scale);
            canvas.style.right = `${x+speed}px`;
            x = x + speed;
            if(frame<9){
                frame++;
            }else{
                frame = 0;
            }
            if(x<screen_width && in_game == true){
                requestAnimationFrame(animate);
                
            }else if(x>screen_width) {
                console.log(`monster ${id} out of screen`);
                canvas.remove();
                hearts--;
                heartPrinter();
                if (checkGameOver() = true){
                    game_over = true;
                };

            }else{
                score = score + 13;
                canvas.remove();
                console.log(`Score: ${score}`);
            }
        };
        animate();
    }

}


function updateScore(){
    score_text.innerHTML = `<h1>Wynik: ${score}</h1>`;
}

function checkGameOver(){
    if(hearts==0){
        console.log("KONIEC GRY!!!")
        canvasBox.remove();
        everything.insertAdjacentHTML(`beforeend`,`<h1 style="margin: auto; font-size: 64px; color: white">GAME OVER</h1>`);
        return true;

    }


}


function heartPrinter(){
    switch(hearts){
        case 3:
            heart_box.innerHTML = 
            `<div><img src="img/full_heart.png"></div>
            <div><img src="img/full_heart.png"></div>
            <div><img src="img/full_heart.png"></div>`
            break;
            case 2:
                heart_box.innerHTML = 
                `<div><img src="img/full_heart.png"></div>
                <div><img src="img/full_heart.png"></div>
                <div><img src="img/empty_heart.png"></div>`
            break;
            case 1:
                heart_box.innerHTML = 
                `<div><img src="img/full_heart.png"></div>
                <div><img src="img/empty_heart.png"></div>
                <div><img src="img/empty_heart.png"></div>`
                break;
            case 0:
                heart_box.innerHTML = 
                `<div><img src="img/empty_heart.png"></div>
                <div><img src="img/empty_heart.png"></div>
                <div><img src="img/empty_heart.png"></div>`
                break;
                
            }
        }

heartPrinter();



const monsterImage = new Image();
monsterImage.src = 'img/walkingdead.png';







const createMonster = setInterval(monsterCreateFunction, 700);

function monsterCreateFunction(){
    if(game_over==false && monsters_on_screen<6){
            new MonsterObject(Math.floor(Math.random() * 10) + 5, Math.floor(Math.random() * 150) + 1, Math.random() * (1 - 0.3) + 0.3);
        }else if(game_over==true){
            clearInterval(createMonster);
    }
}

