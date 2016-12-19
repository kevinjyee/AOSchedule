function archiveWeek()
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sourceSheet = ss.getSheetByName("AO Schedule");
  var destinationSheet = ss.getSheetByName("Old Schedule");
  
  var rangeToArchive = sourceSheet.getRange("D1:J129");
  destinationSheet.insertColumnsAfter(destinationSheet.getLastColumn(),7)
  rangeToArchive.copyTo(destinationSheet.getRange(1,destinationSheet.getLastColumn()+1), { formatOnly: true});
  rangeToArchive.copyValuesToRange(destinationSheet, destinationSheet.getLastColumn()+1, destinationSheet.getLastColumn()+7,1,148 )
}