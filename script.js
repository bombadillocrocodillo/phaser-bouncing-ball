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
let lives = 10; // Initialize lives with 10
let livesText; // Text object to display lives

function preload() {
    this.load.image("ball", "assets/ball.png"); // watch out for case sensitivity
}

function create() {
    ball = this.add.sprite(WIDTH / 2, HEIGHT / 2, "ball"); // x, y, and the ball "key"
    ball.setDisplaySize(ballSize, ballSize); // width, height

    // Enable input on the ball
    ball.setInteractive();

    // Add a click event listener to the ball
    ball.on('pointerdown', () => {
        // Increase the ball size by 10%
        ballSize *= 1.1;
        ball.setDisplaySize(ballSize, ballSize);

        // Increment lives by 1
        lives += 1;

        // Update the lives text
        livesText.setText(`Lives: ${lives}`);
    });

    // Add text to display lives
    livesText = this.add.text(10, 10, `Lives: ${lives}`, {
        fontSize: '20px',
        fill: '#ffffff'
    });
}

function update() {
    ball.y += yspeed;
    ball.x += xspeed;

    // Check for collision with the top or bottom edge
    if (ball.y >= HEIGHT - ballSize / 2 || ball.y <= ballSize / 2) {
        // Reverse the vertical direction
        yspeed *= -1;

        // Increase speed by 10%
        yspeed *= 1.1;
        xspeed *= 1.1;

        // Decrease ball size by 10%
        ballSize *= 0.9;
        ball.setDisplaySize(ballSize, ballSize);

        // Decrease lives by 1
        lives -= 1;

        // Update the lives text
        livesText.setText(`Lives: ${lives}`);
    }

    // Check for collision with the left or right edge
    if (ball.x >= WIDTH - ballSize / 2 || ball.x <= ballSize / 2) {
        // Reverse the horizontal direction
        xspeed *= -1;

        // Increase speed by 10%
        yspeed *= 1.1;
        xspeed *= 1.1;

        // Decrease ball size by 10%
        ballSize *= 0.9;
        ball.setDisplaySize(ballSize, ballSize);

        // Decrease lives by 1
        lives -= 1;
        if (lives <= 0) {
            // If lives are 0, stop the game
            this.scene.pause();
            alert("Game Over! No more lives left.");
            return;
            
        }




        // Update the lives text
        livesText.setText(`Lives: ${lives}`);
    }
}

