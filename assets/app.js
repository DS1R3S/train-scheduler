// Initialize Firebase
var config = {
    apiKey: "AIzaSyAId2p8fKOmSdvYPMJt92wAfK3DZBVwdHo",
    authDomain: "train-scheduler-ds-491ee.firebaseapp.com",
    databaseURL: "https://train-scheduler-ds-491ee.firebaseio.com",
    projectId: "train-scheduler-ds-491ee",
    storageBucket: "",
    messagingSenderId: "613832980274"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$(document).on("click", "#add-train", function (event) {
    event.preventDefault();
    // console.log('hi');
    var frequency = $('#frequency').val().trim();
    var trainName = $('#train-name').val().trim();
    console.log(trainName)
    var destination = $('#destination').val().trim();
    console.log(destination)
    var firstTime = $('#time').val().trim();
    // console.log(firstTime)
    var firstTimeConverted = moment(firstTime, 'hh:mm').subtract(1, 'years');
    // console.log(firstTimeConverted);
    var currentTime = moment();
    console.log('Current Time: ' + moment(currentTime).format('hh:mm'));
    var timeDiff = moment().diff(moment(firstTimeConverted), 'minutes');
    // console.log(timeDiff);
    var tRemainder = timeDiff % frequency;
    // console.log(tRemainder);
    // Minutes until next train
    var tMinutesTillTrain = frequency - tRemainder;
    var nextTrainArrival = moment().add(tMinutesTillTrain, 'minutes');
    var formattedTime = moment(nextTrainArrival).format('hh:mm')
    // console.log(formattedTime);
    console.log("Arrival time: " + moment(nextTrainArrival).format('hh:mm'));
    console.log('Minutes till next train: ' + tMinutesTillTrain);
    console.log('------------------------------------------------------');

    database.ref("train").push({
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        formattedTime: formattedTime,
        tMinutesTillTrain: tMinutesTillTrain,
    })


});

database.ref("train").on("child_added", function (snapshot) {
    var sv = snapshot.val();
    // console.log(sv.trainName)
    // console.log(sv.destination)
    // console.log(sv.frequency)
    // console.log(sv.tMinutesTillTrain)
    // console.log(sv.nextTrainArrival)

    var nameX = sv.trainName;
    var desinationX = sv.destination;
    var frequencyX = sv.frequency;
    var nextTrainX = sv.formattedTime;
    var minutesTillTrainX = sv.tMinutesTillTrain;

    var newRow = $("<tr>");
    var newTrainName = $("<td>" + nameX + "</td>");
    var newTrainDestination = $("<td>" + desinationX + "</td>");
    var newTrainFrequency = $("<td>" + frequencyX + "</td>");
    var newNextArrival = $("<td>" + nextTrainX + "</td>");
    var newMinutesAway = $("<td>" + minutesTillTrainX + "</td>");


    newRow.append(newTrainName).append(newTrainDestination).append(newTrainFrequency).append(newNextArrival).append(newMinutesAway);

    $("#table-body").append(newRow);

// }, function (errorObject) {
//     console.log("Errors handled: " + errorObject.code);
});