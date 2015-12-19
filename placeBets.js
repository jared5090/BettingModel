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
  var newRow =
    "<tr>" +
      "<td></td>" +
      "<td></td>" +
      "<td></td>" +
    "</tr>";
  var resultsTable = $('#results').html();
  if ($('#results').children('table').last().attr('id') !== undefined ) {
    $('#results').append(resultsTable);
  }
  $('#results').children('table').last().attr('id', 'results' + race);
  for (var i = 0; i < raceNames[race].length; i++) {
    $('#results' + race).find('tr').last().after(newRow);
    $('#results' + race).find('tr').last().find('td').first().append(positions[i]);
    //this row lists the positions you chose for each athlete.
    for (var j = 0; j < raceRandomNames[race].length; j++) {
      if (betRanking[positions[j]] === raceRandomNames[race][i]) {
        $('#results' + race).find('tr').last().find('td').first().next().append(positions[j]);
        break;
      }   
    }
    $('#results' + race).find('tr').last().find('td').last().append(raceRandomNames[race][i]);
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

