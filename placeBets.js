//Purpose: do an index-by-index comparison of Bets array and RandomNames array.
// Add a point if there is a match.
function checkBets(race) {
  for (var i = 0; i < raceNames[race].length; i++) {
    if (raceData['Bets' + race][i] === raceRandomNames[race][i]) {
      raceData['Points' + race] += 1;
    }
  }
}

function displayResults(race) {
  $('#raceLists').append(raceTable).attr('id', '#results' + race);
  for (var i = 0; i < raceRandomNames[race].length; i++) {
    $('#results' + race).find('.formRow').append(nameTags);
    $('#results' + race).find('.formRow').children('span').append(positions[i]);
    $('#results' + race).find('.nameRow').append(nameTags);
    $('#results' + race).find('.nameRow').children('span').append(raceRandomNames[race][i]);
  }
}


/*
Purpose: display bar for each race that corresponds to points scored.
*/
// function displayGraph(color) {
//   $('dd#' + 'race' + race).addClass('percentage-' + raceData['Points' + race]);
// }

// function resetBets(race) {
//   raceData['RandomNames' + race] = [];
//   raceData['Bets' + race] = [];
//   raceData['Points' + race] = 0;
// }

