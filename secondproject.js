// here is a comment to prove i included them in this assignment ↓
// comment

// variables attached to html ↓
let cameraBtn = document.querySelector("#startCamera");
let securityFootage = document.querySelector("#securityFootage");
let clickBtn = document.querySelector("#clickPhoto");
let canvas = document.querySelector("#canvas");
let dataurl = document.querySelector("#dataurl");
let dataurl_container = document.querySelector("#dataurl-container");
let analyseBtn = document.getElementById("analyseBtn");
let results = document.getElementById("myText");
let statBox = document.querySelector("#statisticsTextBox");

// here is an array
var faces = [];

// variables that represent emotions ↓
let angerInfo = "";
let disgustInfo = "";
let happyInfo = "";
let sadInfo = "";

// when "Start Camera" is clicked, the video space will show the camera
cameraBtn.addEventListener("click", async function () {
  let stream = null;

  let finalInfo = "click 4 something to happen";
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
  } catch (error) {
    alert(error.message);
    return;
  }

  securityFootage.srcObject = stream;

  securityFootage.style.display = "block";
  cameraBtn.style.display = "none";
  clickBtn.style.display = "block";
});

// when "Click Photo" is clicked, the picture of the video space will show on the canvas
clickBtn.addEventListener("click", function () {
  canvas.getContext("2d").drawImage(securityFootage, 0, 0, canvas.width, canvas.height);
  let image_data_url = canvas.toBlob(function(blob) {});
});

// when "Analyse Button" is clicked, the picture on the canvas will be analysed by the Image API
analyseBtn.addEventListener("click", function () {
    //here is a function that will get the API's analysis of whatever photo is on the canvas
    canvas.toBlob(function (blob) {
        ImageAPI.analyseFacesBlob(blob, function(data) {
            // When the photo is analysed, based on the numberal value of the emotion, the emotion variables will equal different strings
            console.log(data);
            // if the percentage of the emotion is > 0.25, the emotion variable = "the customer doesn't look very ___". If it is 0.251 < x < 0.5, the emotion variable = "the custome looks slightly ___". If it is > 0.5, the emotion variable = "the customer looks ___"
            // here are a bunch of binary and multiway selections that prove i included them in this assignment
            if (data[0].faceAttributes.emotion.anger >= 0 && data[0].faceAttributes.emotion.anger <= 0.25) {
                angerInfo = "The customer doesn't look very angry, "
            }
            if (data[0].faceAttributes.emotion.anger >= 0.251 && data[0].faceAttributes.emotion.anger <= 0.5) {
                angerInfo = "The customer looks slightly angry, "
            }
            if (data[0].faceAttributes.emotion.anger >= 0.501 && data[0].faceAttributes.emotion.anger <= 1) {
                angerInfo = "The customer looks angry, "
            }
            if (data[0].faceAttributes.emotion.disgust >= 0 && data[0].faceAttributes.emotion.disgust <= 0.25) {
                disgustInfo = "the customer doesn't look very disgusted, "
            }
            if (data[0].faceAttributes.emotion.disgust >= 0.251 && data[0].faceAttributes.emotion.disgust <= 0.5) {
                disgustInfo = "the customer looks slightly disgusted, "
            }
            if (data[0].faceAttributes.emotion.disgust >= 0.501 && data[0].faceAttributes.emotion.disgust <= 1) {
                disgustInfo = "the customer looks disgusted, "
            }
            if (data[0].faceAttributes.emotion.happiness >= 0 && data[0].faceAttributes.emotion.happiness <= 0.25) {
                happyInfo = "the customer doesn't look very happy, "
            }
            if (data[0].faceAttributes.emotion.happiness >= 0.251 && data[0].faceAttributes.emotion.happiness <= 0.5) {
                happyInfo = "the customer looks slightly happy, "
                //If the customer looks slightly happy, the following string will be "pushed" onto the array "faces"
                faces.push(" satisfied with their purchase")
            }
            if (data[0].faceAttributes.emotion.happiness >= 0.501 && data[0].faceAttributes.emotion.happiness <= 1) {
                happyInfo = "the customer looks happy, "
                //If the customer looks happy, the following string will be "pushed" onto the array "faces"
                faces.push(" very satisfied with their purchase")
            }
            if (data[0].faceAttributes.emotion.neutral > 0.5) {
                //If the customer looks neutral, the following string will be "pushed" onto the array "faces"
                faces.push(" neither unsatisfied or satisfied with their purchase")
            }
            if (data[0].faceAttributes.emotion.sadness >= 0 && data[0].faceAttributes.emotion.happiness <= 0.25) {
                sadInfo = "the customer doesn't look very sad, "
            }
            if (data[0].faceAttributes.emotion.sadness >= 0.251 && data[0].faceAttributes.emotion.happiness <= 0.5) {
                sadInfo = "the customer looks slightly sad, "
                //If the customer looks slightly sad, the following string will be "pushed" onto the array "faces"
                faces.push(" unsatisfied with their purchase")
            }
            if (data[0].faceAttributes.emotion.sadness >= 0.501 && data[0].faceAttributes.emotion.happiness <= 1) {
                sadInfo = "the customer looks sad, "
                //If the customer looks sad, the following string will be "pushed" onto the array "faces"
                faces.push(" unsatisfied with their purchase")
            }
            results.innerHTML = angerInfo + disgustInfo + happyInfo + sadInfo;
            console.log(faces);
            statBox.innerHTML = "Your customers have been:" + faces;
        });
    });
});
// results.innerHTML = angerInfo + disgustInfo + happyInfo + sadInfo;