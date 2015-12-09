
var letters = ["A", "B", "C", "D"];
var colorNames = ['red', 'green', 'blue'];
var arrayNames = ['IDs', 'RandomLetters', 'Bets'];
var positions = ['2nd', '3rd', '4th'];
var colorArrays = {
  redPoints: 0,
  greenPoints: 0,
  bluePoints: 0
};

//Purpose: create HTML and IDs for drop-down menus.
function createMenuRow(color) {
  var formID = "#" + color + "BetsForm";
  var raceHTML = $(formID).html();
  var selectID = "";
  var selectID2 = color;
  var j = 1;

  for (var i = 0; i < positions.length; i++) {
    //append a dropdown menu.
    $(formID).append(raceHTML);

    //create unique ID, store it in array and set it in DOM.
    selectID = selectID2.concat(j.toString());
    colorArrays[color + 'IDs'].push(selectID);
    $(formID).find('select').last().attr("id", selectID);
    j += 1;
  }
  //append form submit button.
  $(formID).append(
    "<td class='formColumn'>" +
    "<input type='submit' class='betButton' value='Place Bets'>" +
    "</td>");
}

//Purpose: create HTML for understanding drop-down menus.
function createRankRow(color) {
  var rank = '#' + color + 'Rank';
  var rankHTML = $(rank).html();

  for (var i = 0; i < positions.length; i++) {
    //append ranking text.
    $(rank).append(rankHTML);
    $(rank).find('.position').last().text(positions[i]);
  }
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


//Purpose: get options chosen by user.
//Operation: add event handler to submit feature of #userBets form.
//get value of each select tag and push it to userBets array.
//activate other functions.
function getBets(color) {
  $('#' + color + "BetsForm").on('submit', function(event) {
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


//create keys in colorArrays containing empty arrays.
for (var i = 0; i < arrayNames.length; i++) {
  for (var j = 0; j < colorNames.length; j++) {
    colorArrays[colorNames[j] + arrayNames[i]] = [];
  }
}

for (var i = 0; i < colorNames.length; i++) {
  //generateTags
  createMenuRow(colorNames[i]);
  createRankRow(colorNames[i]);
  //setup event handlers
  getBets(colorNames[i]);
}

$('#checkBetsButton').on('submit', function(event) {
  event.preventDefault();
  displayColor();
  //testing
  for (var key in colorArrays) {
    console.log(key);
    console.log(colorArrays[key]);
  }
  for (var i = 0; i < colorNames.length; i++) {
    displayGraph(colorNames[i]);
    resetBets(colorNames[i]);
  }
  
});
     


