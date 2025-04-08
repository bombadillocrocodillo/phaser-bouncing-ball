let WIDTH = 400;
let HEIGHT = 300;

const config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let ball;
let ballSize = 80;
let yspeed = 0.5;
let xspeed = 1.0;
let lives = 10;
let livesText;
let clickstext;
let clicks = 0;
let maxSpeed = 12.0;

function preload() {
    this.load.image("ball", "assets/ball.png"); // Ensure the file path and name are correct
}

function create() {
    ball = this.add.sprite(WIDTH / 2, HEIGHT / 2, "ball");
    ball.setDisplaySize(ballSize, ballSize);
    ball.setInteractive();

    ball.on('pointerdown', () => {
        // Cap ball size to avoid it growing too large
        if (ballSize < 300) {
            ballSize *= 1.1;
            ball.setDisplaySize(ballSize, ballSize);
        }

        clicks += 1;
        clickstext.setText(`Clicks: ${clicks}`);

        lives += 1;
        livesText.setText(`Lives: ${lives}`);
    });

    livesText = this.add.text(10, 10, `Lives: ${lives}`, {
        fontSize: '20px',
        fill: '#ffffff'
    });

    clickstext = this.add.text(10, 40, `Clicks: ${clicks}`, {
        fontSize: '20px',
        fill: '#ffffff'
    });
}

function update() {
    ball.y += yspeed;
    ball.x += xspeed;

    if (ball.y >= HEIGHT - ballSize / 2 || ball.y <= ballSize / 2) {
        yspeed *= -1;
        handleBounce(this);
    }

    if (ball.x >= WIDTH - ballSize / 2 || ball.x <= ballSize / 2) {
        xspeed *= -1;
        handleBounce(this);
    }
}

function handleBounce(scene) {
    yspeed = Math.min(Math.abs(yspeed * 1.1), maxSpeed) * Math.sign(yspeed);
    xspeed = Math.min(Math.abs(xspeed * 1.1), maxSpeed) * Math.sign(xspeed);

    ballSize *= 0.9;
    ball.setDisplaySize(ballSize, ballSize);

    lives -= 1;
    livesText.setText(`Lives: ${lives}`);

    if (lives <= 0) {
        scene.scene.pause();
        clickstext.setText("clicks: 0");
        livesText.setText("lives: 0");
        ball.setDisplaySize(0, 0);
        alert("Game Over! No more lives left.");
        
    }
}


