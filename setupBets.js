var arrayNames = ['IDs', 'Bets'];
var positions = ["1st", "2nd", "3rd", "4th", "5th", "6th"];
var letters = ["A", "B", "C", "D", "E", "F"];

var raceNames = [
  ['Flip', 'Boxer', 'Spacey', 'Ranger'],
  ["Sammy", "Demon", "Cheetah", "Hot Dawg", "Pilgrim", "K9"],
  ["Banderio", "Alpha", "Beast", "Quicksilver", "Chewtobacca"]
  ];
var raceRandomNames = [];

var raceData = {
  Points1: 0,
  Points2: 0,
  Points3: 0,
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
  var submitBet = "<td>" +
    "<input type='submit' class='betButton' value='Place Bets'>" +
    "</td>";

function printTable() {
  for (var i = 0; i < raceNames.length; i++) {
    $('#raceLists').append(raceTable);
    $('#raceLists').children('form').last().attr('id', 'race' + i);
    for (var j = 0; j < raceNames[i].length; j++) {
      $('#race' + i).find('.nameRow').append(nameTags);
      $('#race' + i).find('.name').last().text(raceNames[i][j]);
      $('#race' + i).find('.formRow').append(selectTags);
      for (var k = 0; k < raceNames[i].length; k++) {
        $('#race' + i).find('.betMenu').last().append(optionTags);
        $('#race' + i).find('option').last().attr('val', positions[k]);
        $('#race' + i).find('option').last().text(positions[k]);
      }
    }
    $('#race' + i).find('.nameRow').append(submitBet);
  }
}


function createIDs() {
  var selectID = '';
  var selectID2 = 'race';
  var j = 0;
  var k = 0;

  for (var j = 0; j < raceNames.length; j++) {
    //create unique ID, store it in array and place it in DOM.
    for (var i = 0; i < raceNames[j].length; i++) {
      selectID = selectID2.concat(j.toString(), letters[i]);
      raceData['IDs' + [j]].push(selectID);
      $('.betMenu').each( function() {
        $(this).attr("id", raceData['IDs' + [j]][k]);
        k += 1;
      });
    }
  }
}


//Create randomised array with items from Names.
//perform loop until RandomNames is same length as Names. 
function randomiseNames(race) {
  var n = 0;
  var containsName = false;

  //problem with array (undefined)
  raceRandomNames.push([]);
  for (var i = 0; raceRandomNames[race].length < raceNames[race].length; i++) {
    //n = random number between 0 and 3, used to get random index of Names array.
    n = Math.floor(Math.random() * 4);
    //check each index of RandomNames array to see if it already contains same item from Names array.
    for (var j = 0; j < raceRandomNames[race].length; j++) {
      if (raceRandomNames[race][j] === raceNames[race][n]) {
        containsName = true;
        console.log('duplicate');
        break;
      }
    }
    //if no match found, push item to RandomNames. 
    if (containsName === false) {
      raceRandomNames[race].push(raceNames[race][n]);
    }
    containsName = false;
  }
}


//Purpose: get options chosen by user.
//Operation: add event handler to submit button of #userBets form.
//get value of each select tag and push it to userBets array.
//activate other functions.
function getBets() {
  for (var i = 0; i < raceNames.length; i++) {
    $('#race' + [i]).on('submit', function(event) {
      event.preventDefault();
      randomiseNames(i);
      for (var j = 0; j < raceNames[i].length; j++) {
        raceData['Bets' + [i]].push($('#' + raceData['IDs' + [i]][j]).val() );
      }
      //testing
      console.log(raceData['Bets' + [i]]);
      checkBets(i);
      displayResults(i);
      // resetBets(i);
    });
  }
}


//create keys in raceData containing empty arrays.
for (var i = 0; i < arrayNames.length; i++) {
  for (var j = 0; j < raceNames.length; j++) {
    raceData[arrayNames[i] + [j]] = [];
  }
}

printTable();
createIDs();
getBets();

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
     


