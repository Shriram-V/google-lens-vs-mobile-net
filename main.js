var previous_result = "";

function setup() {
  canvas = createCanvas(200, 200);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();

  classifier = ml5.imageClassifier('MobileNet', modelLoaded);
  classifier_google = ml5.imageClassifier('GoogleLens', modelLoaded);
}

function draw() {
  image(video, 0, 0, 300, 300);
  classifier.classify(video, gotResult);
}

function modelLoaded() {
  console.log("Model Loaded");
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    if ((results[0].confidence > 0.5) && (previous_result != results[0].label)) {
      console.log(results);
      previous_result = results[0].label;
      var synth = window.speechSynthesis;
      speak_data = "Object Detected Is " + results[0].label;
      var utterThis = new SpeechSynthesisUtterance(speak_data);
      synth.speak(utterThis);

      document.getElementById("result_object_name").innerHTML = "Object: " + results[0].label;
      document.getElementById("result_object_accuracy").innerHTML = "Confidence" + (results[0].confidence.toFixed(2)) * 100;
    }
  }
}   