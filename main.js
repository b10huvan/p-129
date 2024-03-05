song1="";
song2="";
scoreLeftWrist=0;
song1status="";
song2status="";
scoreRightWrist=0;
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
function preload(){
    song2 = loadSound("peaceful.mp3");
    song1 = loadSound("duet.mp3");
    
    
}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('Posenet Is Initialized');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
scoreLeftWrist = results[0].pose.keypoints[9].score;

       scoreleftWrist=results[0].pose.keypoints[9].score;
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX" + leftWristX + "leftWristY" + leftWristY);

        scorerightWrist=results[0].pose.keypoints[10].score;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX" + rightWristX + "rightWristY" + rightWristY);

    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#800000");
    stroke("#8B0000");
    song1status=song1.isPlaying();
    song2status=song2.isPlaying();
    if(scoreRightWrist > 0.2) {
        circle(rightWristX,rightWristY,20);
        
        song2.stop();
        if(song1status==false) {
            song1.play();
            document.getElementById("song").innerHTML = "duet";
        }
    }
    if(scoreLeftWrist > 0.2) {
        circle(leftWristX,leftWristY,20);
        song1.stop();
        if(song2status==false) {
            song2.play();
            document.getElementById("song").innerHTML = "peaceful music";
        }
    }
    
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}