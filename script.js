"use strict";

{
    const canvas = document.getElementById("canvas");
    /** @type {CanvasRenderingContext2D} */
    const ctx = canvas.getContext("2d", { alpha: true });

    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;

    class Flake {
        constructor(x, y, radius, dx, dy) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.dx = dx;
            this.dy = dy;
        }
        
        reset() {
            this.x = randomNum(0, canvasDimensions.width, true);
            this.y = randomNum(0, -canvasDimensions.height, true);
            this.radius = randomNum(1, 4, true);
            this.dx = randomNum(-2, 2, false);
            this.dy = randomNum(2, 5, false);
        }
        
        draw() {
            ctx.moveTo(this.x, this.y);
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        }
        
        update() {
            this.x += this.dx;
            this.y += this.dy;

            if (this.y + this.radius > canvasDimensions.height) {
                this.reset();
            }
        }
    }
    
    function randomNum(min, max, boolean) {
        if (boolean === false) {
            // Calculate float
            return min + Math.random() * (max - min);
        }
        // Calculate int
        return Math.floor(min + Math.random() * (max - min));
    }
    
    // Cache width and height after init runs, to use during update() in animation loop
    let canvasDimensions = {
        width: null,
        height: null
    };
    let totalFlakes;
    
    function init() {
        // Re-calc window width and height, then re-assign val
        canvasDimensions.width = canvas.width;
        canvasDimensions.height = canvas.height;
        // Reset and re-fill totalFlakes arr
        totalFlakes = [];
        // Reset initial ctx state
        ctx.fillStyle = "#fff";
        ctx.globalAlpha = "0.7";
        
        const flakes = Math.floor(canvasDimensions.width / 3);

        for (let i = 0; i < flakes; i++) {
            let x = randomNum(0, canvasDimensions.width, true);
            let y = randomNum(0, -canvasDimensions.height, true);
            let radius = randomNum(1, 4, true);
            let dx = randomNum(-2, 2, false);
            let dy = randomNum(2, 5, false);

            totalFlakes.push(new Flake(x, y, radius, dx, dy));
        }
    }

    init();
    
    (function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Begin path
        ctx.beginPath();

        for (let i = 0; i < totalFlakes.length; i++) {
            // Update and trace all flakes in one batch.
            totalFlakes[i].update();
            totalFlakes[i].draw();
        }

        // Call fill() only after batch tracing all flakes.
        ctx.fill();
    })();
    
    function resize() {
        canvas.width = document.documentElement.clientWidth;
        canvas.height = document.documentElement.clientHeight;

        init();
    }

    window.onresize = resize;
}