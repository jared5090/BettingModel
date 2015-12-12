//Purpose: do an index-by-index comparison of Bets array and RandomNames array.
// Add a point if there is a match.
function checkBets(color) {
  for (var i = 0; i < colorArrays[color + 'Names'].length; i++) {
    if (colorArrays[color + 'Bets'][i] === colorArrays[color + 'RandomNames'][i]) {
      colorArrays[color + 'Points'] += 1;
    }
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

/*
Purpose: display bar for each race that corresponds to points scored.
*/
function displayGraph(color) {
  $('dd#' + color + 'Race').addClass('percentage-' + colorArrays[color + 'Points']);
}

function resetBets(color) {
  colorArrays[color + 'RandomNames'] = [];
  colorArrays[color + 'Bets'] = [];
  colorArrays[color + 'Points'] = 0;
}

