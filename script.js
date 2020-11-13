"use strict";

{
    const canvas = document.getElementById("canvas");
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
    /** @type {CanvasRenderingContext2D} */
    const ctx = canvas.getContext("2d", { alpha: true });

    class Flake {
        constructor(x, y, dx, dy, radius, alpha) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.radius = radius;
            this.alpha = alpha;
        }
        
        reset() {
            this.x = randomNum(0, window.innerWidth, true);
            this.y = randomNum(0, -window.innerHeight, true);
            this.dx = randomNum(-2, 2, true);
            this.dy = randomNum(2, 5, true);
            this.radius = randomNum(1, 4, true);
            this.alpha = randomNum(0.1, 0.9, false);
        }
        
        draw() {
            ctx.fillStyle = "#fff";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.globalAlpha = this.alpha;
            ctx.fill();
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
        
        const flakes = Math.floor(window.innerWidth / 3);

        for (let i = 0; i < flakes; i++) {
            let x = randomNum(0, window.innerWidth, true);
            let y = randomNum(0, -window.innerHeight, true);
            let dx = randomNum(-2, 2, true);
            let dy = randomNum(2, 5, true);
            let radius = randomNum(1, 4, true);
            let alpha = randomNum(0.1, 0.9, false).toFixed(4);

            totalFlakes.push(new Flake(x, y, dx, dy, radius, alpha));
        }
    }

    init();
    
    (function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < totalFlakes.length; i++) {
            totalFlakes[i].update();
        }
    })();
    
    function resize() {
        canvas.width = document.documentElement.clientWidth;
        canvas.height = document.documentElement.clientHeight;

        init();
    }

    window.onresize = resize; // Only call func on resize event
}