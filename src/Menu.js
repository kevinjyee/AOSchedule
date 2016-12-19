function onOpen() 
{
  var ui =  SpreadsheetApp.getUi()
  ui.createMenu('Weekly Controls')
  .addItem('Hide Week 1','hideWeek1')
  .addItem('Hide Week 2','hideWeek2')
  .addItem('Hide Weekends','hideWeekends')
  .addItem('Unhide All', 'unhideColumns')
  .addItem('Add New Week', 'newWeek')
  .addToUi()
  
  ui.createMenu('Filter By Group')
  .addItem('Lori\'s Group','filterLoriGroup')
  .addItem('Yun\'s Group','filterYunGroup')
  .addItem('Denise\'s Group','filterDeniseGroup')
  .addItem('Unhide', 'unhideRows')
  .addToUi()
  
  ui.createMenu('Reformat Sheet') 
  .addItem('Reformat Sheet','reformatsheet')
  .addToUi()
  
  ui.createMenu('Email Schedule') 
  .addItem('Send Email','emailGoogleSpreadsheetAsPDF')
  .addToUi()
}


