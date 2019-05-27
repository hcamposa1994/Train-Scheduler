var firebaseConfig = {
    apiKey: "AIzaSyBWrczxpuv4SEKypPNlxaMljOgjD-AQ51w",
    authDomain: "train-scheduler-4f343.firebaseapp.com",
    databaseURL: "https://train-scheduler-4f343.firebaseio.com",
    projectId: "train-scheduler-4f343",
    storageBucket: "train-scheduler-4f343.appspot.com",
    messagingSenderId: "468499257399",
    appId: "1:468499257399:web:d6aa8d770f38932c"
  };
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainTime = $("#time-input").val().trim();
    var trainFreq = $("#frequency-input").val().trim();

    var newtrain = {
        name: trainName,
        destination: trainDest,
        time: trainTime,
        frequency: trainFreq
    };

    database.ref().push(newtrain);

    alert("Train schedule successfully added");

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
});

database.ref().on("child_added", function(snapshot) {
    console.log(snapshot.val());

    // Store everything into a variable.
    var trainName = snapshot.val().name;
    var trainDest = snapshot.val().destination;
    var trainTime = snapshot.val().time;
    var trainFreq = snapshot.val().frequency;

    // Employee Info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainTime);
    console.log(trainFreq);

    var firstTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % trainFreq;
    var minutesTillTrain = trainFreq - tRemainder;
    var nextTrain = moment().add(minutesTillTrain, "minutes");
    var nextTrainFormatted = nextTrain.format("LT");

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainFreq),
        $("<td>").text(nextTrainFormatted),
        $("<td>").text(minutesTillTrain)
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);

// Handle the errors
}, function(errorObject) {
console.log("Errors handled: " + errorObject.code);
});