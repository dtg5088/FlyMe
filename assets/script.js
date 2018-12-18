
/*$(".dropdown-menu").on("click", function(){

  $(this).toggle();

});*/

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAmWWHzoHV-zS1vGGz4qE-Dr9VjgF49bGg",
  authDomain: "flyme-b0c6d.firebaseapp.com",
  databaseURL: "https://flyme-b0c6d.firebaseio.com",
  projectId: "flyme-b0c6d",
  storageBucket: "flyme-b0c6d.appspot.com",
  messagingSenderId: "1003056365219"
};
               
firebase.initializeApp(config);

var database = firebase.database();



// 2. Button for adding Employees
$("#add-flight-btn").on("click", function(event) {
  event.preventDefault();

  var inputFormat = "MM/DD/YYYY";
  //var convertedDate = moment(randomDate, randomFormat);

  // Grabs user input
  var student = $("#student-input").val().trim();
  var airPlaneName = $("#plane-name-input").val().trim();
  var takeOff = moment($("#takeOff-input").val().trim(), "hh:mm A").format("h:mm A");
  var landTime = moment ($("#land-input").val().trim(), "hh:mm A").format("h:mm A");
  var fuel = $("#fuel-input").val().trim();
  
  //var timeIn = moment($("#start-input").val().trim(), "MM/DD/YYYY").format("X");

  console.log("This is the takeoff time"+takeOff);
  console.log("This is the fuel time"+fuel);

  // Creates local "temporary" object for holding employee data
  var newflight = {
    student: student,
    plane: airPlaneName,
    takeOff: takeOff,
    land: landTime,
    fuel: fuel,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  };

  // Uploads employee data to the database
  database.ref().push(newflight);

  // Logs everything to console
  console.log(newflight.student);
  console.log(newflight.plane);
  console.log(newflight.takeOff);
  console.log(newflight.land);
  console.log(newflight.fuel);

  alert("Flight successfully added");

  // Clears all of the text-boxes
  $("#student-input").val("");
  $("#plane-name-input").val("");
  $("#takeOff-input").val("");
  $("#land-input").val("");
  $("#fuel-input").val("");

});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  var list = [];
  console.log(childSnapshot.val());

  var snap = childSnapshot.val();

  // Store everything into a variable.
  var stuName = snap.student;
  var name = snap.plane;
  var depart = snap.takeOff;
  var arriv = snap.land;
  var freq = snap.fuel; //var freq = childSnapshot.val().frequnecy;
  var nextTrip;

  // Employee Info
  console.log(stuName);
  console.log(name);
  console.log(depart);
  console.log(arriv);
  console.log(freq);
  console.log("-------------------------------");


  
  // -------------Time Conversions and calculations-------------------
  var tHours = Math.floor(freq/60);
  var tMinutes = freq%60;
  var fuelTime;

  arrivChange = moment(arriv,"hh:mm A");
  // Cals for Fuel time
  if (freq>60){
    fuelTime = moment(tHours, "hours").format("h")+" H "+moment(tMinutes, "minutes").format("mm")+ " Mins";
    nextTrip = moment(arrivChange).add(tHours, "hours").format("h")+ moment(arrivChange).add(tMinutes, "minutes").format(":mm A");
    console.log("This is the arriv time: "+arriv);
  }
  else{
    fuelTime = moment(tMinutes, "minutes").format("mm")+" Mins";
    nextTrip = moment(arrivChange).add(tMinutes, "minutes").format("h:mm A");
    
    console.log("This is the next trip time "+nextTrip);
  }

  console.log(fuelTime);
  console.log(nextTrip);
  console.log("Conversion is " + tHours +" Hours and " + tMinutes + " Minutes");

  // Calculations for Next Trip time
  var startTime = moment();
  var start = moment(startTime, "HH:mm:ss A");
  var end = moment(nextTrip, "HH:mm:ss A");
  var seconds = end.diff(start, 'seconds');
  var intervalT = moment().hour(0).minute(0).seconds(seconds);
  var leaveTime = intervalT.format("H:mm:ss");// + " [hours : mins]";

  console.log("This is the LeaveTime "+leaveTime);
  console.log("This is interval "+intervalT);
  console.log("This is current time "+startTime);
  console.log("This is the (Leaves in:) time "+intervalT.format("H:mm"));
  console.log("this is the current time (start) "+start.format("hh:mm A"));
  console.log("this is the end time "+end.format("hh:mm A"));

  /*//developing the countdown counter
  var eventTime = end; 
  var currentTime = startTime; 
  var diffTime = intervalT;
  console.log("this is the diff time "+diffTime);//.format("hh:mm A"));
  var duration = moment.duration(diffTime*1000, 'milliseconds');
  var interval = 1000;

  setInterval(function(){
    diffTime = moment.duration((diffTime - interval)/1000, 'seconds');
      $('.countdown').text(diffTime.hours() + ":" + diffTime.minutes() + ":" + diffTime.seconds())
  }, interval);   */
  
  
  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(stuName),
    $("<td>").text(name),
    $("<td>").text(depart),
    $("<td>").text(arriv),
    $("<td>").text(fuelTime),
    $("<td>").text(nextTrip),
    $("<td>").text(leaveTime).addClass("countdown")
    //$("<td>").text(empBilled)
  );


  // Append the new row to the table
  $("#flight-table > tbody").append(newRow);
});


//countdown code
/* var eventTime= 1366549200; // Timestamp - Sun, 21 Apr 2013 13:00:00 GMT
var currentTime = 1366547400; // Timestamp - Sun, 21 Apr 2013 12:30:00 GMT
var diffTime = eventTime - currentTime;
var duration = moment.duration(diffTime*1000, 'milliseconds');
var interval = 1000;

setInterval(function(){
  duration = moment.duration(duration - interval, 'milliseconds');
    $('.countdown').text(duration.hours() + ":" + duration.minutes() + ":" + duration.seconds())
}, interval); */