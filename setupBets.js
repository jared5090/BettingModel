var colorNames = ['red', 'green', 'blue'];
var arrayNames = ['IDs', 'RandomNames', 'Bets'];
var positions = ['1st', '2nd', '3rd', '4th'];
var colorArrays = {
  redPoints: 0,
  greenPoints: 0,
  bluePoints: 0,
  redNames: ['Flip', 'Boxer', 'Spacey', 'Ranger'],
  greenNames: ["Sammy", "Demon", "Cheetah", "Hot Dawg"],
  blueNames: ["Banderio", "Alpha", "Beast", "Quicksilver"]
};


//Purpose: create HTML and IDs for drop-down menus.
function createMenuRow(color) {
  var columnID = "#" + color + "FormCopy";
  var raceHTML = $(columnID).html();

  for (var i = 0; i < 3; i++) {
    //append a dropdown menu.
    $(columnID).append(raceHTML);
  }
  //append form submit button.
  $(columnID).append(
    "<td>" +
    "<input type='submit' class='betButton' value='Place Bets'>" +
    "</td>");
}


//Purpose: create HTML for understanding drop-down menus.
function createRankRow() {
  for (var i = 0; i < positions.length; i++) {
    //append ranking text.
    $('.rankRow').append(
      "<td>" +
      "<p class='position'></p>" +
      "</td>"
      );
  }
  var j = 0;
  $('.position').each( function() {  
    if (j % 4 === 0) {
      j = 0;
    }
    $(this).text(positions[j]);
    j += 1;   
  });
}


function createIDs(color) {
  var selectID = "";
  var selectID2 = color;
  var j = 1;
  var k = 0;

  colorArrays[color + 'IDs'].push(color + '0');
  for (var i = 0; i < 3; i++) {
  //create unique ID, store it in array and set it in DOM.
    selectID = selectID2.concat(j.toString());
    colorArrays[color + 'IDs'].push(selectID);
    j += 1;
  }

  $("#" + color + "BetsForm").find('select').each( function() {
    $(this).attr("id", colorArrays[color + 'IDs'][k]);
    k += 1;
  });
}


//Purpose: create randomised array with items from Names.
//Operation: each iteration, j = random number between 0 and 3.
//push random name to RandomNames array.
//perform loop until RandomNames is same length as Names. 
function randomiseNames(color) {
  var j = 0;
  var containsName = false;
  for (var i = 0; colorArrays[color + 'RandomNames'].length < colorArrays[color + 'Names'].length; i++) {
    j = Math.floor(Math.random() * 4);
    for (var i = 0; i < colorArrays[color + 'RandomNames'].length; i++) {
      if (colorArrays[color + 'RandomNames'][i] === colorArrays[color + 'Names'][j]) {
        containsName = true;
        console.log('duplicate');
        break;
      }
    }
    if (containsName === false) {
      colorArrays[color + 'RandomNames'].push(colorArrays[color + 'Names'][j]);
    }
    containsName = false;
  }
}


//Purpose: get options chosen by user.
//Operation: add event handler to submit feature of #userBets form.
//get value of each select tag and push it to userBets array.
//activate other functions.
function getBets(color) {
  $('#' + color + "BetsForm").on('submit', function(event) {
    event.preventDefault();
    randomiseNames(color);
    for (var i = 0; i < colorArrays[color + 'Names'].length; i++) {
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

createRankRow();
for (var i = 0; i < colorNames.length; i++) {
  //generateTags
  createMenuRow(colorNames[i]);
  createIDs(colorNames[i]);
  //setup event handlers
  getBets(colorNames[i]);
}
//testing
  for (var key in colorArrays) {
    console.log(key);
    console.log(colorArrays[key]);
  }

$('#checkBets').on('submit', function(event) {
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
     


