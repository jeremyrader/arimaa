var whiteElephantImg, blackElephantImg, msPerFrame, frameCount, moveDist, elephantsDivWidth;
var botLeft;
var botRight;
var whiteElephantLeft;
var blackElephantLeft;
var center = 804;
var margin = 10;

function startAnimation() {
    
    whiteElephantImg = document.getElementById("white-elephant-img");
    blackElephantImg = document.getElementById("black-elephant-img");
    
    whiteElephantLeft = 804;
    blackElephantLeft = 804;
    
    msPerFrame =10;
    moveDist = 1;

    setTimeout(whiteRearBack, msPerFrame);

}


function whiteRearBack() {

    whiteElephantLeft -= moveDist;

    whiteElephantImg.style.left = whiteElephantLeft + "px";
    
    if (whiteElephantLeft > center - whiteElephantImg.width - margin) {
	   setTimeout(whiteRearBack, msPerFrame);
    }
    else {
        setTimeout(function() {
            setTimeout(whiteCharge, msPerFrame);
        }, 500);
        
    }

}

function whiteCharge() {
    
    whiteElephantLeft += moveDist;

    whiteElephantImg.style.left = whiteElephantLeft + "px";
    
    msPerFrame =3;
    
    if (whiteElephantLeft < center) {
	   setTimeout(whiteCharge, msPerFrame);
    }
    else {
       setTimeout(blackReact, msPerFrame);
    }
}

function blackReact() {

    blackElephantLeft += moveDist;

    blackElephantImg.style.left = blackElephantLeft + "px";
    
    msPerFrame = 3;
    
    if (blackElephantLeft < center + 25) {
        setTimeout(blackReact, msPerFrame);
    }
    else {
        setTimeout(function() {
            setTimeout(blackReturnToCenter, 100);
        }, 500);
        
    }
}

function blackReturnToCenter() {
    blackElephantLeft -= moveDist;

    blackElephantImg.style.left = blackElephantLeft + "px";
    
    msPerFrame = 50;
    
    if (blackElephantLeft > center) {
        setTimeout(blackReturnToCenter, msPerFrame);
    }
    else {
        setTimeout(function() {
            setTimeout(blackRearBack, msPerFrame);
        }, 500);
    }

}

function blackRearBack() {

    blackElephantLeft += moveDist;
    
    msPerFrame = 10;

    blackElephantImg.style.left = blackElephantLeft + "px";
    
    if (blackElephantLeft < center + whiteElephantImg.width + margin) {
	   setTimeout(blackRearBack, msPerFrame);
    }
    else {
        setTimeout(function() {
            setTimeout(blackCharge, msPerFrame);
        }, 500);
        
    }

}

function blackCharge() {
    
    blackElephantLeft -= moveDist;

    blackElephantImg.style.left = blackElephantLeft + "px";
    
    msPerFrame =3;
    
    if (blackElephantLeft > center) {
	   setTimeout(blackCharge, msPerFrame);
    }
    else {
       setTimeout(whiteReact, msPerFrame);
    }
}

function whiteReact() {

    whiteElephantLeft -= moveDist;

    whiteElephantImg.style.left = whiteElephantLeft + "px";
    
    msPerFrame = 3;
    
    if (whiteElephantLeft > center - 25) {
        setTimeout(whiteReact, msPerFrame);
    }
    else {
        setTimeout(function() {
            setTimeout(whiteReturnToCenter, 100);
        }, 500);
        
    }
}

function whiteReturnToCenter() {
    whiteElephantLeft += moveDist;

    whiteElephantImg.style.left = whiteElephantLeft + "px";
    
    msPerFrame = 50;
    
    if (whiteElephantLeft < center) {
        setTimeout(whiteReturnToCenter, msPerFrame);
    }

}