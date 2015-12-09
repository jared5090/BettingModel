
//create keys in colorArrays containing empty arrays.
for (var i = 0; i < arrayNames.length; i++) {
  for (var j = 0; j < colorNames.length; j++) {
    colorArrays[colorNames[j] + arrayNames[i]] = [];
  }
}

for (var i = 0; i < colorNames.length; i++) {
  //generateTags
  createMenuRow(colorNames[i]);
  createRankRow(colorNames[i]);
  //setup event handlers
  getBets(colorNames[i]);
}

$('#checkBetsButton').on('submit', function(event) {
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
     