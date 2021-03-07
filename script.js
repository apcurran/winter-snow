"use strict";

{
    const canvas = document.getElementById("canvas");
    /** @type {CanvasRenderingContext2D} */
    const ctx = canvas.getContext("2d", { alpha: true });

    class Flake {
        constructor(x, y, radius, dx, dy) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.dx = dx;
            this.dy = dy;
        }
        
        reset() {
            // typedCanvasDimensionsArr[0] is canvas width
            // typedCanvasDimensionsArr[1] is canvas height
            this.x = randomNum(0, typedCanvasDimensionsArr[0], true);
            this.y = randomNum(0, -typedCanvasDimensionsArr[1], true);
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

            if (this.y + this.radius > typedCanvasDimensionsArr[1]) {
                this.reset();
            }
        }
    }
    
    function randomNum(min, max, boolean) {
        if (boolean === false) {
            // Calc float
            return min + Math.random() * (max - min);
        }
        // Calc int
        return Math.floor(min + Math.random() * (max - min));
    }
    
    // Cache width and height after init runs, to use during clearRect() and update() in animation loop
    // Array of [canvasWidth, canvasHeight]
    let typedCanvasDimensionsArr;
    let totalFlakes;
    
    function init() {
        // Re-calc canvas width and height, then re-assign vals
        resizeCanvas();

        // Reset and re-fill totalFlakes arr
        totalFlakes = [];
        // Reset initial ctx state
        ctx.fillStyle = "#fff";
        ctx.globalAlpha = "0.7";
        
        const flakes = Math.floor(typedCanvasDimensionsArr[0] / 3);

        for (let i = 0; i < flakes; i++) {
            let x = randomNum(0, typedCanvasDimensionsArr[0], true);
            let y = randomNum(0, -typedCanvasDimensionsArr[1], true);
            let radius = randomNum(1, 4, true);
            let dx = randomNum(-2, 2, false);
            let dy = randomNum(2, 5, false);

            totalFlakes.push(new Flake(x, y, radius, dx, dy));
        }
    }

    init();
    
    (function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, typedCanvasDimensionsArr[0], typedCanvasDimensionsArr[1]);
        
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
    
    function resizeCanvas() {
        // Re-size canvas
        canvas.width = document.documentElement.clientWidth;
        canvas.height = document.documentElement.clientHeight;

        // Re-cache canvas dimensions in typed array
        typedCanvasDimensionsArr = new Uint16Array([canvas.width, canvas.height]);
    }

    window.onresize = init;
}