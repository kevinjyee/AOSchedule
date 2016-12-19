function newWeek()
{
  archiveWeek()
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("AO Schedule");
  
  var rangeToClear = sheet.getRange("D4:J148");
  rangeToClear.clearContent();
  rangeToClear.clearFormat();
  
  var rangeToMove = sheet.getRange("K4:Q148")
  rangeToMove.copyTo(rangeToClear);
  rangeToMove.clearContent();
  rangeToMove.clearFormat();
  var addToDate = sheet.getRange("S2").getValue();
  
  var newDate = addToDate  + 7
  sheet.getRange("S2").setValue(newDate);
   
  reformatsheet()
}