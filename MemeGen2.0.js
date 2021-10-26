
const formMeme = document.querySelector("#memeform");
const topTextInput = document.getElementById('top-text');
const bottomTextInput = document.getElementById('bottom-text');
const imageInput = document.getElementById('meme-file');
const generateBtn = document.getElementById('submit-btn');
const canvas = document.querySelector('#meme-canva');

formMeme.addEventListener("submit", function(event){
    event.preventDefault();
    const imageDataUrl = URL.createObjectURL(imageInput.files[0]);

    image = new Image();
    image.src = imageDataUrl;

    image.addEventListener("load", function(){
        makeMeme(canvas, image, topTextInput.value, bottomTextInput.value);
    }, {once: true}); //do not need to continuously check for the image 

   
});


function makeMeme (canvas, image, topText, bottomText) {
    const ctx = canvas.getContext("2d");
    const width= image.width;
    const height = image.height;
    const fontSize= Math.floor(width / 10);
    const yOffset = height / 25; //refers to space of top and bottom of image and texts
        //update canvas background now
    
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image,0,0);
        //prepare text
    ctx.strokeStyle = "black";
    ctx.lineWidth= Math.floor (fontSize / 4); //border for text stroke
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.lineJoin = "round"; //no weird spikes on text
    ctx.font = `${fontSize}px impact`;

        //add top text
    ctx.textBaseline = "top";
    ctx.strokeText (topText, width / 2, yOffset); //will render the text to the top of the image
    ctx.fillText (topText, width / 2, yOffset);

    ctx.textBaseline = "bottom";
    ctx.strokeText (bottomText, width / 2, height - yOffset); //we'll need the whole height of the text
    ctx.fillText (bottomText, width / 2, height - yOffset);

    let newMeme = document.createElement('canvas')
    document.body.appendChild(newMeme);

    
};