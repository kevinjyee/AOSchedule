/* Email Google Spreadsheet as PDF */
function emailGoogleSpreadsheetAsPDF() 
{
  // Get the currently active sheet by name
  var originalSpreadsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("AO Schedule");
  var sourcerange = originalSpreadsheet.getRange('C:C');  // range to get - here I get all of the columns we want
  var sourcevalues = sourcerange.getValues();
  var data = originalSpreadsheet.getDataRange().getValues();
  
  // Send the PDF of the spreadsheet to this email address
  var email = "tadesse.belen@gene.com"
  //cc these relevant parties
  var cc = "linj49@gene.com"
  // Subject of email message
  var subject = "PDF generated from spreadsheet " + originalSpreadsheet.getName();  
  // Email Body can  be HTML too 
  var body = "Attached is the PDF file for the AO Weekly Digest and Schedule";
  // get AO Weekly Digest File Source
  //var file = DriveApp.getFileById('1iF6UYEhZ7qI-Rz-9wOHEpIzb3pB9XKYvlBvqjdFoPMY');
  // UnHide all Rows
  unhideRows()
  //Redraw Lines
  reformatsheet()

  
  // Insert new sheet in the spreadsheet to copy data values over
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  try{
    spreadsheet.insertSheet('Sheet to Export', {template: originalSpreadsheet});
  }
  catch(e)
  {
     
  }
  spreadsheet.getSheetByName('Sheet to Export').activate()
  spreadsheet.getRange("C:C").clearContent()
  sourcerange.copyTo(spreadsheet.getRange("C:C"), { contentsOnly: true});
  
  // Create a new Spreadsheet and copy the current sheet into it.
  //var newSpreadsheet = SpreadsheetApp.create("Spreadsheet to export");

  var exportsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet to Export")
  //exportsheet.copyTo(newSpreadsheet) 
  //spreadsheet.deleteSheet(exportsheet);
  
  // Find and delete the default "Sheet 1"
  //newSpreadsheet.getSheetByName('Sheet1').activate();
  //newSpreadsheet.deleteActiveSheet();
  //var sheetToExport = newSpreadsheet.getSheetByName('Copy of Sheet to Export')
  //sheetToExport.activate()
  //sheetToExport.deleteColumns(20, 27);
  var newSpreadsheetReference = SpreadsheetApp.getActiveSpreadsheet()
  var newSheetRef = newSpreadsheetReference.getSheetByName('Sheet to Export')
  newSheetRef.showColumns(3)
  newSheetRef.setColumnWidth(16,2)
  newSheetRef.setColumnWidth(17,2)
  newSheetRef.setColumnWidth(18,2)
  newSheetRef.setColumnWidth(19,2)
  newSheetRef.setColumnWidth(20,2)
  newSheetRef.setColumnWidth(21,2)
  newSheetRef.setColumnWidth(22,2)
  newSheetRef.setColumnWidth(23,2)
  newSheetRef.setColumnWidth(24,2)
  
  
  
  //Set Column Width to Minimum for all outside schedule
  for ( var x = 19; x < newSheetRef.getLastColumn(); x ++)
  {
    newSheetRef.hideColumns(20,5)
    newSheetRef.deleteColumns(20,(newSheetRef.getLastColumn()-x))
    
  }
  
  // Set Column Width to fit sheet
  for (var i = 1; i < 17; i++)
  {
    newSheetRef.setColumnWidth(i,120)
  }
  
   // Set Row Height to fit sheet
  for ( var y = 1; y < newSheetRef.getLastRow(); y ++)
  {
    newSheetRef.setRowHeight(y, 21)
  }
  
  // Base URL
  var url = "https://docs.google.com/spreadsheets/d/SS_ID/export?".replace("SS_ID", newSpreadsheetReference.getId());
  Logger.log(SpreadsheetApp.getActiveSpreadsheet().getId())
   /* Specify PDF export parameters
  From: https://code.google.com/p/google-apps-script-issues/issues/detail?id=3579
  */
  
    var url_ext = 'exportFormat=pdf&format=pdf'        // export as pdf / csv / xls / xlsx
    + '&size=tabloid'                       // paper size legal / letter / A4
    + '&portrait=true'                    // orientation, false for landscape
    + '&fitw=false&source=labnol'           // fit to page width, false for actual size
    + '&sheetnames=false&printtitle=false' // hide optional headers and footers
    + '&pagenumbers=false&gridlines=false' // hide page numbers and gridlines
    + '&fzr=false'                         // do not repeat row headers (frozen rows) on each page
    + '&gid=';                             // the sheet's Id
    
    var token = ScriptApp.getOAuthToken();
    var sheet = newSheetRef
    Logger.log(sheet.getSheetId());
    //Convert individual worksheet to PDF
    var response = UrlFetchApp.fetch(url + url_ext + sheet.getSheetId(), {
      muteHttpExceptions: true,
      headers: {
          'Authorization': 'Bearer ' +  token
        }
      });
    
    //convert the response to a blob and store in our array
    var blob = response.getBlob().setName(originalSpreadsheet.getName() + '.pdf');
    //var blob = DriveApp.getFileById(newSpreadsheet.getId()).getAs("application/pdf");
  
    //blob.setName(originalSpreadsheet.getName() + ".pdf");
  
  //If allowed to send emails, send the email with the PDF attachment
      GmailApp.sendEmail(email, subject, body, {
        cc: cc,
        htmlBody: body,
        attachments: [ blob ]    
      });  
  
    spreadsheet.deleteSheet(newSheetRef);
}
