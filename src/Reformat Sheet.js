/*Function: reformatSheet()
  ---------------------------------
  @ Params: None
  @ Description: Loops through the schedule range and redraws borders
  * Return: N/A
*/
function reformatsheet() {
  /*
   Provides a function to redraw all lines if copy and pasting has removed cell border formatting, and maintain background color of all weekend cells as grey 
*/
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var schedule = ss.getSheetByName('AO Schedule');
  var extraSpace = 8;
  var maxColOffset = 15 ; //number of days in schedule
  var maxRowOffset = (schedule.getLastRow())-3;
  var firstRowInSched = 4; //D4, first row in schedule
  var firstColInSched = 3; //D4, first column in schedule 

  Logger.log(maxRowOffset);
  
  
  schedule.getRange(firstRowInSched, firstColInSched, maxRowOffset, maxColOffset).setBorder(false,false,false,false,false,false); 
  
  for (var i = firstRowInSched; i < maxRowOffset + firstRowInSched; i = i + 3) {
    var range = schedule.getRange(i, firstColInSched, 2, maxColOffset); //select cell range for each trained personnel
    range.setBorder(true, true, true, null,true, false); // sets borders on the top and bottom, but leaves the left and right unchanged
  }
  
  var range = schedule.getRange(firstRowInSched, firstColInSched + maxColOffset, maxRowOffset); //column after last column in schedule 
  range.setBorder(null, true, null, false, false, false); //add border for the right side of the table 
  
  

    
    for (var j = firstColInSched; j < maxColOffset + firstColInSched; j++) {
      if (j == 4 || j == 10 || j == 11 || j == 17){
      var range = schedule.getRange(firstRowInSched, j, maxRowOffset, 1);  //select cell range for all weekends
        range.setBackgroundColor("#CCCCCC");
      }
    }
}