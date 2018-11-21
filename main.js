var canvas = document.getElementById('memecanvas');
ctx = canvas.getContext('2d');

canvas.width = 512;
canvas.height = 350;

//  Grab the nodes
var img = document.getElementById('start-image');
var topText = document.getElementById('top-text');
var bottomText = document.getElementById('bottom-text');


// When the image has loaded...
img.onload = function () {
    drawMeme()
}

topText.addEventListener('keydown', drawMeme)
topText.addEventListener('keyup', drawMeme)
topText.addEventListener('change', drawMeme)

bottomText.addEventListener('keydown', drawMeme)
bottomText.addEventListener('keyup', drawMeme)
bottomText.addEventListener('change', drawMeme)

function drawMeme() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 4;
    ctx.font = '20pt sans-serif';
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    var text1 = document.getElementById('top-text').value;
    text1 = text1.toUpperCase();
    x = 350;
    y = 150;

    wrapText(ctx, text1, x, y, 300, 28, false);


}

function wrapText(context, text, x, y, maxWidth, lineHeight, fromBottom) {

    var pushMethod = (fromBottom) ? 'unshift' : 'push';

    lineHeight = (fromBottom) ? -lineHeight : lineHeight;

    var lines = [];
    var y = y;
    var line = '';
    var words = text.split(' ');

    for (var n = 0; n < words.length; n++) {
        var testLine = line + ' ' + words[n];
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;

        if (testWidth > maxWidth) {
            lines[pushMethod](line);
            line = words[n] + ' ';
        } else {
            line = testLine;
        }
    }
    lines[pushMethod](line);

    for (var k in lines) {
        context.strokeText(lines[k], x, y + lineHeight * k);
        context.fillText(lines[k], x, y + lineHeight * k);
    }


}