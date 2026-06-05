// So I wrote some python Code that makes a cool vaporwavey cardback
// And I wanted to use it as the background for the site too
// But I don't know much Javascript, so I asked Gemini to translate the
// Python code to Javascript Code. Feel guilty about not doing it myself
// so consider this my confession.

document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('hexCanvas');
    const ctx = canvas.getContext('2d');

    const hexRadius = 30;
    const hexWidth = Math.sqrt(3) * hexRadius;
    const hexHeight = 2 * hexRadius;
    const noiseScale = 100.0;

    function pseudoNoise(x, y, scale) {
        let nx = x / scale;
        let ny = y / scale;
        let val1 = Math.sin(nx * 1.5 + ny);
        let val2 = Math.cos(nx * 3.0 - ny * 1.5) * 0.5;
        let val3 = Math.sin(nx * 5.0 + ny * 5.0) * 0.25;
        return (val1 + val2 + val3) / 1.75;
    }

    function getHexPoints(cx, cy, r) {
        let points = [];
        for (let i = 0; i < 6; i++) {
            let angle_deg = 60 * i - 30;
            let angle_rad = (Math.PI / 180) * angle_deg;
            points.push({
                x: cx + r * Math.cos(angle_rad),
                y: cy + r * Math.sin(angle_rad)
            });
        }
        return points;
    }

    function drawGrid() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#00a88f'); // Teal Top
        gradient.addColorStop(1, '#ff5c97'); // Pink Bottom

        ctx.strokeStyle = gradient;
        ctx.lineJoin = 'round';

        const randomOffsetX = Math.random() * 1000;
        const randomOffsetY = Math.random() * 1000;

        let row = 0;
        let y = 0;

        while (y < canvas.height + hexRadius) {
            let x = (row % 2 === 0) ? 0 : (hexWidth / 2);
            
            while (x < canvas.width + hexRadius) {
                let nVal = pseudoNoise(x + randomOffsetX, y + randomOffsetY, noiseScale);
                let normalizedN = Math.max(0.0, Math.min(1.0, (nVal + 1) / 2));
                ctx.lineWidth = 1 + (normalizedN * 4); 

                let pts = getHexPoints(x, y, hexRadius);
                
                ctx.beginPath();
                ctx.moveTo(pts[0].x, pts[0].y);
                for (let i = 1; i < pts.length; i++) {
                    ctx.lineTo(pts[i].x, pts[i].y);
                }
                ctx.closePath();
                ctx.stroke();

                x += hexWidth;
            }
            y += hexHeight * 0.75;
            row++;
        }
    }

    drawGrid();
    window.addEventListener('resize', drawGrid);
});
