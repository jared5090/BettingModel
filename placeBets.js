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
  $('#results').append(resultsTable);
  $('#results').find('table').last().attr('id', 'results' + race);
  //print table rows.
  for (var i = 0; i < raceNames[race].length; i++) {
    $('#results' + race).find('tr').last().after(newRow);
    $('#results' + race).find('tr').last().find('td').first().append(raceRandomNames[race][i]);
    $('#results' + race).find('tr').last().find('td').first().next().append(positions[i]);
    //this column (Your Bets) finds and prints the position the user chose
    //for an athlete. E.g. if athlete is 'alpha', the betRanking object
    //is searched for a key with value of alpha.
    for (var j = 0; j < raceRandomNames[race].length; j++) {
      if (betRanking[positions[j]] === raceRandomNames[race][i]) {
        $('#results' + race).find('tr').last().find('td').last().append(positions[j]);
        if (positions[j] === positions[i]) {
          $('#results' + race).find('tr').last().find('td').first().addClass('highlight');
          $('#results' + race).find('tr').last().find('td').first().next().addClass('highlight');
          $('#results' + race).find('tr').last().find('td').last().addClass('highlight');
        }
        break;
      }   
    }
  }
  //display results table.
  $('#results' + race).closest('.container_table').addClass('display_table');
}


/*
Purpose: display bar for each race that corresponds to points scored.
*/
// function displayGraph(color) {
//   $('dd#' + 'race' + race).addClass('percentage-' + raceData['Points' + race]);
// }

function resetBets(race) {
  $('#reset_race' + race).on('click', function(event) {
    event.preventDefault();
    $('#reset_race' + race).hide();
    $('#submit_race' + race).show();
    $('#results' + race).remove();
    $('.betMenu').each( function() {
      $(this).find('option').first().html(
        "<option class='format_text' selected>select</option>");
    });
    raceRandomNames[race] = [];
    console.log('raceRandomNames: ' + raceRandomNames);
    raceData['Bets' + race] = [];
    raceData['Points' + race] = 0;

  });
}

