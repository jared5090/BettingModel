

var letters = ["A", "B", "C", "D"];
var colorNames = ['red', 'green', 'blue'];
var formIDs = ['redBetsForm', 'greenBetsForm', 'blueBetsForm'];
var arrayNames = ['IDs', 'RandomLetters', 'Bets'];
var colorArrays = {
  redPoints: 0,
  greenPoints: 0,
  bluePoints: 0
};

//Purpose: create HTML and IDs for drop-down menus.
function generateTags(color, formID) {
  //create variable storing select tag and its dropdown options.
  var selectHTML =
  "<select>" +
    "<option val='A'>A</option>" +
    "<option val='B'>B</option>" +
    "<option val='C'>C</option>" +
    "<option val='D'>D</option>" +
  "</select>";

  // each iteration: append a dropdown menu, then create and set a unique ID for it.
  // append submit button.
  var selectID = "";
  var selectID2 = color;
  var j = 0;
  for (var i = 0; i < letters.length; i++) {
    $('#' + formID).append(selectHTML);
    selectID = selectID2.concat(j.toString());
    colorArrays[color + 'IDs'].push(selectID);
    $('#' + formID).children('select').last().attr("id", selectID);
    j += 1;
  }
  $('#' + formID).append("<input type='submit' value='Place Bets'>")
}

//Purpose: create array with items from redLetters; the items are in random order.
//Operation: each iteration, j = random number between 0 and 3.
//push random letter to randomLetters array.
//perform loop until redRandomLetters is same length as redLetters. 
function randomiseLetters(color) {
  var j = 0;
  while (colorArrays[color + 'RandomLetters'].length < letters.length) {
    j = Math.floor(Math.random() * 4);
    colorArrays[color + 'RandomLetters'].unshift(letters[j]);
  }
}


//Purpose: do an index-by-index comparison of userBets array and redRandomLetters array.
// Add a point if there is a match.
function checkBets(color) {
  var j = 0;
  for (var i = 0; i < letters.length; i++) {
    if (colorArrays[color + 'Bets'][i] === colorArrays[color + 'RandomLetters'][j]) {
      colorArrays[color + 'Points'] += 1;
    }
    j += 1;
  }
}


/*
Purpose: display a background color based on point level.
function is designed for the css color format: rgb(0,0,0), specifically the red input.
the medianColors array contains 5 'median' values derived from 255.
*/
function displayColor() {
  $('#displayColor').css({'background-color': "rgb(" +
    (colorArrays['redPoints'] * 64) + "," +
    (colorArrays['greenPoints'] * 64) + "," +
    (colorArrays['bluePoints'] * 64) + ")" });
}


//Purpose: get options chosen by user.
//Operation: add event handler to submit feature of #userBets form.
//get value of each select tag and push it to userBets array.
//activate other functions.
function getBets(color, formID) {
  $('#' + formID).on('submit', function(event) {
    event.preventDefault();
    randomiseLetters(color);
    for (var i = 0; i < letters.length; i++) {
      colorArrays[color + 'Bets'].push($('#' + colorArrays[color + 'IDs'][i]).val() );
    }
    checkBets(color);
    //testing
    console.log(colorArrays[color + 'Bets']);
  });
}

function resetBets() {
  for (var i = 0; i < colorNames.length; i++) {
    colorArrays[colorNames[i] + 'RandomLetters'] = [];
    colorArrays[colorNames[i] + 'Bets'] = [];
    colorArrays[colorNames[i] + 'Points'] = 0;
  }
}


//create keys in colorArrays containing empty arrays.
for (var i = 0; i < arrayNames.length; i++) {
  for (var j = 0; j < colorNames.length; j++) {
    colorArrays[colorNames[j] + arrayNames[i]] = [];
  }
}

//generateTags
for (var i = 0; i < colorNames.length; i++) {
  generateTags(
    colorNames[i],
    formIDs[i] );
}

//setup event handlers
for (var i = 0; i < colorNames.length; i++) {
  getBets(
    colorNames[i],
    formIDs[i] );
}


$('#checkBetsButton').on('submit', function(event) {
  event.preventDefault();
  displayColor();
  //testing
  for (var key in colorArrays) {
    console.log(key);
    console.log(colorArrays[key]);
  }
  resetBets();
  for (var key in colorArrays) {
    console.log(key);
    console.log(colorArrays[key]);
  }
});
     


