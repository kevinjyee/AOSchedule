function hideBlanks() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Copy of AO Schedule");
  

  
  for( var i =6; i < 130; i+=3)
  {
  
   
    sheet.hideRows(i)
    
  }
}
