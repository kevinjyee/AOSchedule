function unhideRows() 
{
  var scheduleSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("AO Schedule");
  scheduleSheet.showRows(4,125)
}

function hideWeek1()
{
  var scheduleSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("AO Schedule")
  scheduleSheet.hideColumns(4,7)
}

function hideWeek2()
{
  var scheduleSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("AO Schedule")
  scheduleSheet.hideColumns(11,7)
}

function hideWeek3()
{
  var scheduleSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("AO Schedule")
  scheduleSheet.hideColumns(18,7)
}

function hideWeekends()
{
  var scheduleSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("AO Schedule")
  scheduleSheet.hideColumns(4)
  scheduleSheet.hideColumns(10,2)
  scheduleSheet.hideColumns(17,2)
  scheduleSheet.hideColumns(24)
}

function unhideColumns()
{
  var scheduleSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("AO Schedule")
  scheduleSheet.showColumns(4,21)
}
