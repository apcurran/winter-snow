"use strict";

{
    const canvas = HTMLCanvasElement.prototype.transferControlToOffscreen ? document.getElementById("canvas").transferControlToOffscreen() : document.getElementById("canvas");
    console.log(canvas);
    /** @type {CanvasRenderingContext2D} */
    const ctx = canvas.getContext("2d", { alpha: true });

    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;

    class Flake {
        constructor(x, y, dx, dy, radius) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.radius = radius;
        }
        
        reset() {
            this.x = randomNum(0, window.innerWidth, true);
            this.y = randomNum(0, -window.innerHeight, true);
            this.dx = randomNum(-2, 2, true);
            this.dy = randomNum(2, 5, true);
            this.radius = randomNum(1, 4, true);
        }
        
        draw() {
            ctx.moveTo(this.x, this.y);
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        }
        
        update() {
            this.x += this.dx;
            this.y += this.dy;

            if (this.y + this.radius > viewWindowHeight) {
                this.reset();
            }
            
            this.draw();
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
    
    // Cache window height after init runs, to use during update() in animation loop
    let viewWindowHeight;
    let totalFlakes;
    
    function init() {
        // Re-calc window height and re-assign to var
        viewWindowHeight = window.innerHeight;
        // Reset and re-fill totalFlakes arr
        totalFlakes = [];
        // Reset initial ctx state
        ctx.fillStyle = "#fff";
        ctx.globalAlpha = "0.7";
        
        const flakes = Math.floor(window.innerWidth / 3);

        for (let i = 0; i < flakes; i++) {
            let x = randomNum(0, window.innerWidth, true);
            let y = randomNum(0, -window.innerHeight, true);
            let dx = randomNum(-2, 2, true);
            let dy = randomNum(2, 5, true);
            let radius = randomNum(1, 4, true);

            totalFlakes.push(new Flake(x, y, dx, dy, radius));
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
        }

        // Call fill() only after batch tracing all flakes.
        ctx.fill();
    })();
    
    function resize() {
        canvas.width = document.documentElement.clientWidth;
        canvas.height = document.documentElement.clientHeight;

        init();
    }

    window.onresize = resize; // Only call func on resize event.
}