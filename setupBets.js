var arrayNames = ['IDs', 'Bets'];
var positions = ["1st", "2nd", "3rd", "4th", "5th", "6th"];
var letters = ["A", "B", "C", "D", "E", "F"];

var raceNames = [
  ['Flip', 'Boxer', 'Alpha', 'Ranger'],
  ["Sammy", "Demon", "Cheetah", "Hot Dawg", "Pilgrim", "K9"],
  ["Demon", "Alpha", "Pilgrim", "Quicksilver", "Chewtobacca"]
  ];
var raceRandomNames = [];

var raceData = {
  Points0: 0,
  Points1: 0,
  Points2: 0,
};

  var raceTable = 
  "<form>" +
    "<table class='raceTable'>" +
      "<tr class='headRow'>" +
        "<th>" +
          "<p>Rank</p>" +
        "</th>" +
        "<th>" +
          "<p>Athlete</p>" +
        "</th>" +
      "</tr>" +
      "<tr class='formRow'>" +
      "</tr>" +
      "<tr class='nameRow'>" +
      "</tr>" +
    "</table>" +
  "</form>";
  var selectTags = 
    "<td>" +
      "<select class='betMenu'>" +
      "</select>" +
    "</td>";
  var optionTags = "<option></option>";
  var nameTags =
    "<td>" +
      "<p class='name'></p>" +
    "</td>";
  var submitBet = "<input type='submit' class='betButton' value='Place Bets'>";

function printTable() {
  for (var i = 0; i < raceNames.length; i++) {
    $('#raceLists').append(raceTable);
    $('#raceLists').children('form').last().attr('id', 'race' + i);
    for (var j = 0; j < raceNames[i].length; j++) {
      $('#race' + i).find('.nameRow').append(nameTags);
      $('#race' + i).find('.name').last().text(raceNames[i][j]);
      $('#race' + i).find('.formRow').append(selectTags);
      $('#race' + i).find('.betMenu').last().attr('val', raceNames[i][j]);
      for (var k = 0; k < raceNames[i].length; k++) {
        $('#race' + i).find('.betMenu').last().append(optionTags);
        $('#race' + i).find('option').last().attr('val', k);
        $('#race' + i).find('option').last().text(positions[k]);
      }
    }
    $('#race' + i).append(submitBet);
  }
}


function createIDs() {
  var selectID = '';
  var selectID2 = 'race';
  var k = 0;

  for (var i = 0; i < raceNames.length; i++) {
    //create unique ID, store it in array and place it in DOM.
    for (var j = 0; j < raceNames[i].length; j++) {
      selectID = selectID2.concat(i.toString(), letters[j]);
      raceData['IDs' + [i]].push(selectID);
    }
    k = 0;
    $('#race' + i).find('.betMenu').each( function() {
      $(this).attr("id", raceData['IDs' + [i]][k]);
      k += 1;
    });
  }
  
}


//Create randomised array with items from Names.
//perform loop until RandomNames is same length as Names. 
function randomiseNames(race) {
  var n = 0;
  var containsName = false;
  for (var i = 0; raceRandomNames[race].length < raceNames[race].length; i++) {
    //n = random number between 0 and 3, used to get random index of Names array.
    n = Math.floor(Math.random() * raceNames[race].length);
    //check each index of RandomNames array to see if it already contains same item from Names array.
    for (var j = 0; j < raceRandomNames[race].length; j++) {
      if (raceRandomNames[race][j] === raceNames[race][n]) {
        containsName = true;
        break;
      }
    }
    //if no match found, push item to RandomNames. 
    if (containsName === false) {
      raceRandomNames[race].push(raceNames[race][n]);
    }
    containsName = false;
  }
  console.log(raceRandomNames[race]);
}


//Purpose: get options chosen by user.
//Operation: add event handler to submit button of #userBets form.
//get value of each select tag and push it to userBets array.
//activate other functions.
function getBets(race) {
  $('#race' + [race]).on('submit', function(event) {
    event.preventDefault();
    randomiseNames(race);
    var position = '';
    var name = '';
    var ranking = {};
    for (var j = 0; j < raceNames[race].length; j++) {
      position = $('#' + raceData['IDs' + [race]][j]).val();
      name = $('#' + raceData['IDs' + [race]][j]).attr('val');
      console.log("name: " + name + "\nposition: " + position);
      ranking[position] = name;
    }
    for (var key in ranking) {
        console.log("key: " + key + "\nvalue: " + ranking[key]);
      }
    for (var j = 0; j < raceNames[race].length; j++) {
      raceData['Bets' + [race]].push(ranking[positions[j]]);
    }

    //testing
    console.log(raceData['Bets' + [race]]);
    checkBets(race);
    console.log("Points" + race + ": " + raceData['Points' + race]);
    displayResults(race);
    // resetBets(i);
  });
}


//create keys in raceData containing empty arrays.
for (var i = 0; i < arrayNames.length; i++) {
  for (var j = 0; j < raceNames.length; j++) {
    raceData[arrayNames[i] + [j]] = [];
  }
}


printTable();
createIDs();

for (var i = 0; i < raceNames.length; i++) {
  raceRandomNames.push([]);
  getBets(i);
}

//testing
  for (var key in raceData) {
    console.log(key);
    console.log(raceData[key]);
  }

$('#checkBets').on('submit', function(event) {
  event.preventDefault();
  //testing
  for (var key in raceData) {
    console.log(key);
    console.log(raceData[key]);
  }
  // for (var i = 0; i < colorNames.length; i++) {
  //   displayGraph(colorNames[i]);
  // }
  
});
     


