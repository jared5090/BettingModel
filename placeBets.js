var resultsTable = $('#results').html();

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
  console.log(' ran displayResults');
  var newRow =
    "<tr>" +
      "<td></td>" +
      "<td></td>" +
      "<td></td>" +
    "</tr>";
  //if last table has no ID, then it is the default empty table.
  if ($('#results').find('table').last().attr('id') !== undefined ) {
    $('#results').append(resultsTable);
  }
  $('#results').find('table').last().attr('id', 'results' + race);
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
  $('#results' + race).closest('.container_table').addClass('display_table');
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

