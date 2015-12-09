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

function displayGraph(color) {
  for (var i = 0; i < colorArrays[color + 'Points']; i++) {
    if (colorArrays[color + 'Points'] === i) {
      $('dd#' + color + 'Race').addClass('percentage-' + i);
    }
  }
}

function resetBets(color) {
    colorArrays[color + 'RandomLetters'] = [];
    colorArrays[color + 'Bets'] = [];
    colorArrays[color + 'Points'] = 0;
}

