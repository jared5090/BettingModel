var arrayNames = ['IDs', 'Bets'];
var positions = ["1st", "2nd", "3rd", "4th", "5th", "6th"];
var letters = ["A", "B", "C", "D", "E", "F"];

var raceNames = [
  ['Flip', 'Boxer', 'Alpha', 'Ranger'],
  ["Sammy", "Demon", "Cheetah", "Hot Dawg", "Pilgrim", "K9"],
  ["Demon", "Alpha", "Pilgrim", "Quicksilver", "Chewtobacca"]
  ];
var raceRandomNames = [];
var betRanking = {};

var raceData = {
  Points0: 0,
  Points1: 0,
  Points2: 0,
};

var raceTable = $('#currentRace').html();
var optionTags = "<option class='format_text'></option>";
var button = "<button></button>";

function printButtons(race) {
  $('#raceList').append(button);
  $('#raceList').find('button').last().attr('id', 'button_race' + race);
  $('#button_race' + race).text('Race ' + race);
  $('#button_race' + race).on('click', function(event) {
    event.preventDefault();
    if (!(document.getElementById('race' + race)) ) {
      printTable(race);
      createIDs(race);
    }
    $('.container_table').removeClass('display_table');
      $('#race' + race).closest('.container_table').addClass('display_table');
  });
}

function printTable(race) {
  var newRow = 
    "<tr>" +
      "<td>" +
        "<select class='betMenu'></select>" +
      "</td>" +
      "<td></td>" +
    "</tr>";
  if ($('#currentRace').find('form').last().attr('id')) {
    $('#currentRace').append(raceTable);
  }
  $('#currentRace').find('form').last().attr('id', 'race' + race);
  var raceID = $('#race' + race);
  raceID.before('<h3>Race ' + (race + 1).toString() + '</h3>');
  for (var j = 0; j < raceNames[race].length; j++) {
    raceID.find('tr').last().after(newRow);
    raceID.find('tr').last().find('td').last().text(raceNames[race][j]);
    raceID.find('.betMenu').last().attr('val', raceNames[race][j]);
    for (var k = 0; k < raceNames[race].length; k++) {
      raceID.find('.betMenu').last().append(optionTags);
      raceID.find('option').last().attr('val', k);
      raceID.find('option').last().text(positions[k]);
    }
  }
}


function createIDs(race) {
  var selectID = '';
  var selectID2 = 'race';
  var k = 0;

  //create unique ID, store it in array and place it in DOM.
  for (var j = 0; j < raceNames[race].length; j++) {
    selectID = selectID2.concat(race.toString(), letters[j]);
    raceData['IDs' + [race]].push(selectID);
  }
  k = 0;
  $('#race' + race).find('.betMenu').each( function() {
    $(this).attr("id", raceData['IDs' + [race]][k]);
    k += 1;
  });
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
  $('#race' + race).on('submit', function(event) {
    event.preventDefault();
    randomiseNames(race);
    var position = '';
    var name = '';
    for (var j = 0; j < raceNames[race].length; j++) {
      position = $('#' + raceData['IDs' + [race]][j]).val();
      name = $('#' + raceData['IDs' + [race]][j]).attr('val');
      console.log("name: " + name + "\nposition: " + position);
      betRanking[position] = name;
    }
    for (var key in betRanking) {
        console.log("key: " + key + "\nvalue: " + betRanking[key]);
      }
    for (var j = 0; j < raceNames[race].length; j++) {
      raceData['Bets' + [race]].push(betRanking[positions[j]]);
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


//call functions


$('#submit_bet').on('click', function(event) {
  var formID = $('#currentRace').find('.display_table').find('form').attr('id');
  console.log(formID);
  $('#' + formID).submit();
  event.preventDefault();
});

for (var i = 0; i < raceNames.length; i++) {
  printButtons(i);
}

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
     


