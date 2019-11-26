"use strict";

const anim = (() => {
    const canvas = document.getElementById("canvas");
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
    const ctx = canvas.getContext("2d", { alpha: false });

    class Flake {
        constructor(x, y, dx, dy, radius, alpha) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.radius = radius;
            this.color = "#fff";
            this.alpha = alpha;
        }

        reset() {
            this.x = randomNum(0, window.innerWidth, true);
            this.y = randomNum(0, -window.innerHeight, true);
            this.dx = randomNum(-3, 3, true);
            this.dy = randomNum(2, 5, true);
            this.radius = randomNum(1, 4, true);
            this.alpha = randomNum(0.1, 0.9, false);
        }

        draw() {
            ctx.save();
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.globalAlpha = this.alpha;
            ctx.fill();
            ctx.restore();
        }

        update() {
            this.x += this.dx;
            this.y += this.dy;

            if (this.y + this.radius > window.innerHeight) {
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
    
    let totalFlakes;

    function init() {
        totalFlakes = [];
        const flakes = Math.floor(window.innerWidth / 3);

        for (let i = 0; i < flakes; i++) {
            let x = randomNum(0, window.innerWidth, true);
            let y = randomNum(0, -window.innerHeight, true);
            let dx = randomNum(-3, 3, true);
            let dy = randomNum(2, 5, true);
            let radius = randomNum(1, 4, true);
            let alpha = randomNum(0.1, 0.9, false);

            totalFlakes.push(new Flake(x, y, dx, dy, radius, alpha));
        }
    };

    init();
    
    (function animate() {
        requestAnimationFrame(animate);
        ctx.fillStyle = "#2A4365"; // Dark blue bg clr
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
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
})();