// Initialize Firebase
var config = {
    apiKey: "AIzaSyB0lJ0692c46AdStIP6c8MgSYZEF7P7e-Y",
    authDomain: "project-1-6583a.firebaseapp.com",
    databaseURL: "https://project-1-6583a.firebaseio.com",
    projectId: "project-1-6583a",
    storageBucket: "project-1-6583a.appspot.com",
    messagingSenderId: "916964143148"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

 $("#addTrainBtn").on("click", function(event) {
   event.preventDefault();
 
   var trainName= $("#nameInput").val().trim();
   var destination = $("#destinationInput").val().trim();
   var trainTime = $("#timeInput").val().trim();
   var frequency = $("#freqInput").val().trim();
   
  var newTrain = {
   name: trainName,
   place: destination,
   trainTime: trainTime,
   freq: frequency

  }
 
 console.log(newTrain);
  database.ref().push(newTrain);

   $("#NameInput").val("");
   $("#destinationInput").val("");
   $("#timeInput").val("");
   $("#freqInput").val("");

   return false;

 });

  database.ref().on("child_added", function(childSnapshot) {

   console.log(childSnapshot.val().name);
   console.log(childSnapshot.val().place);
   console.log(childSnapshot.val().trainTime);
   console.log(childSnapshot.val().freq);

 
   var trainName = childSnapshot.val().name;
   var destination = childSnapshot.val().place;
   var trainTime = childSnapshot.val().trainTime;
   var frequency = childSnapshot.val().freq;

   var firstTimeConverted = moment(trainTime, "HH:mm");

   var currentTime = moment().format("HH:mm");
 
   var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");

   var timeReminder = timeDiff % frequency;

   var minToTrain = frequency - timeReminder;

   var nextTrain = moment().add( minToTrain, "minutes").format("HH:mm");

   $("#trainTable").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>"+ frequency  + "</td><td>"  + nextTrain + "</td><td>" + minToTrain + "</td></tr>");

   });