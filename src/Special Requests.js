/*Function: formatNewSpecialRequests()
  ---------------------------------
  @ Params: None
  @ Description: Loops through the schedule range and redraws borders
  * Return: N/A
*/

function formatNewSpecialRequests() {
  Logger.log("got called!");
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getSheetByName("Special Requests");
  
  var requestRow = sheet.getLastRow();
  
  
  
  var requestsheet = ss.getSheetByName("Approve Special Requests");
  var newRequestRange = requestsheet.getRange(requestRow, 1, 1, sheet.getLastColumn());
  
  newRequestRange.setBackground("#ff9900");
  newRequestRange.setWrap(true);
  newRequestRange.setVerticalAlignment("top");
  Logger.log("formatted correctly!"); 
}

/*Function: markAsResolved()
  ---------------------------------
  @ Params: None
  @ Description: Resolve Highlighted Row 
  * Return: N/A
*/

function markAsResolved() {
  
  
   

  // Implement email functionality
  //add heuristics, like make sure it's a good email address, make sure that it isn't already green, maybe a way to re-open the request?
  
  var ui = SpreadsheetApp.getUi();
  var sheet = SpreadsheetApp.getActiveSheet();
  var row = sheet.getActiveRange().getRow();
  var recipient = sheet.getRange(row, 2).getValue();
  var supervisorCol = 12;

  var numCols = sheet.getLastColumn();
  var requestRange = sheet.getRange(row, 1, 1, 12);
  
  
  
  //Setup Data
  var msPerDay = 24*60*60*1000;
  var offsetFromLeft = 4;
  var hideIndex = 11;

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var schedulingSheet = ss.getSheetByName("AO Schedule");
  var scheduleStartDate = schedulingSheet.getRange("S1").getValue();
  var rowRange = sheet.getRange(row, 1, 1,12).getValues() // Get row Range 


 
  var personName = rowRange [0][2] // Cell B Name Date 
  var requestType = rowRange[0][3]; // Cell D Request Type 
  var requestDescription = rowRange[0][4]

  var startDate = rowRange[0][6] //Cell G Start Date 
  var endDate = rowRange[0][7] // Cell H End Date
  var personRowNum = rowRange[0][10]; // Cell K Row Number to put block in 


  var offsetFromStart = ((startDate - scheduleStartDate)/msPerDay) + offsetFromLeft //Helps Determine Column to put block in  
  
  

  
   if(offsetFromStart > 18)
   {
   //  ui.alert("Cannot schedule, requests is over two weeks away");
     throw "Cannot schedule, requests is over two weeks away";
   
   }
   
  // Display a dialog box with a message, input field, and "Yes" and "No" buttons. The user can
  // also close the dialog by clicking the close button in its title bar.
  var response = ui.prompt('Who approved this? (Select \"No\" if request not approved or cancelled)', ui.ButtonSet.YES_NO);
  
  // Process the user's response.
  if (response.getSelectedButton() == ui.Button.YES) {
    sheet.getRange(row, supervisorCol).setValue(response.getResponseText());
    requestRange.setBackground("#00ff00"); //green 
  } else if (response.getSelectedButton() == ui.Button.NO) {
    requestRange.setBackground("#ff0000"); //red
  } else {
    Logger.log('The user clicked the close button in the dialog\'s title bar.');
    return;
  }
  
  if (recipient.length <= 0) return; 
  
  
  var time = sheet.getRange(row, 1).getValue();
  
  var minutes = time.getMinutes().toString();
  var seconds = time.getSeconds().toString();
  if (time.getMinutes() < 10) minutes = "0" + minutes;
  if (time.getSeconds() < 10) seconds = "0" + seconds;
  
  var requestCode = (time.getMonth()+1).toString() + "/" + time.getDate().toString() + 
    "/" + time.getYear().toString() + " " + time.getHours().toString() + ":" + 
      minutes + ":" + seconds;   
  
  var subject = "Resolved: Special Request from " + sheet.getRange(row, 3).getValue() + " - " + sheet.getRange(row, 4).getValue() +  " (" + requestCode + ")";   
  var message = "You are receiving this email because your schedule request has been processed for " + personName + " 's " + requestType + "\n\nFrom: " + startDate + "\n\nTo: " + endDate ;
  
  
  MailApp.sendEmail(recipient, subject, message); 
  
  requestRange.setWrap(false);
  Logger.log("completed markAsResolved");
  
  addRequestToSchedule(sheet, row)
  
}





function addRequestToSchedule(sheet, row)
{

var msPerDay = 24*60*60*1000;
var offsetFromLeft = 4;
var hideIndex = 11;

var ss = SpreadsheetApp.getActiveSpreadsheet();
var schedulingSheet = ss.getSheetByName("AO Schedule");
var scheduleStartDate = schedulingSheet.getRange("S1").getValue();
var rowRange = sheet.getRange(row, 1, 1,12).getValues() // Get row Range 


 
var personName = rowRange [0][2] // Cell B Name Date 
var requestType = rowRange[0][3]; // Cell D Request Type 
var requestDescription = rowRange[0][4]

var startDate = rowRange[0][6] //Cell G Start Date 
var endDate = rowRange[0][7] // Cell H End Date
var personRowNum = rowRange[0][10]; // Cell K Row Number to put block in 

var incomplete = false;
color = determineColor(requestType) //Determines what color background shoudld be 


Logger.log(personRowNum)
Logger.log(startDate)
Logger.log(endDate)


var numDaysRequested = (endDate - startDate)/msPerDay //Determines how many days the request lasts;

var offsetFromStart = ((startDate - scheduleStartDate)/msPerDay) + offsetFromLeft //Helps Determine Column to put block in

if(offsetFromStart - offsetFromLeft < 0 &&  endDate > scheduleStartDate)
{
  startDate = scheduleStartDate
  offsetFromStart = offsetFromLeft
  incomplete = true;
}


if(endDate/msPerDay > scheduleStartDate/msPerDay + 13)
{
  
  numDaysRequested = (scheduleStartDate/msPerDay + 13) - (startDate/msPerDay)
  incomplete = true;

}

var rangeToModify = schedulingSheet.getRange(personRowNum,offsetFromStart,2,numDaysRequested+1)

rangeToModify.activate()

var scheduleData = new Array(2);

Logger.log("numCols" + numDaysRequested + 1);

for(var i = 0; i < 2; i ++)
{
/*Each person will always take up 2 rows*/

  scheduleData[i] = new Array(numDaysRequested+1); // Determine how long the request was for and assign it to each row
  
  for(var j = 0; j < numDaysRequested + 1; j++)
  {
  
    if(i == 0)
    {
    /*Only put information on top row and leave bottom row blank*/
    scheduleData[i][j] = requestType 
    }
    else
    {
  
    scheduleData[i][j] = requestDescription;
    }
  
  }

}



rangeToModify.setValues(scheduleData)
rangeToModify.setBackground(color);

if(incomplete){

var requestRange = sheet.getRange(row, 1, 1, 12);
requestRange.setBackground("#ff9900");
  requestRange.setWrap(true);
  requestRange.setVerticalAlignment("top");
}

}


/*Function determineColor*/

function determineColor(requestType)
{
 var blue = "#38ACEC";
 var orange = "#F3E5AB";
 var grey = "#999999";
 var white = "#ffffff";
 var color = "";
if(requestType == "Assay Run")
{

return orange;

}

else if(requestType == "Training")
{

return blue;
}
  
else if(requestType == "Development")
{

return white;
}

else
{

return grey;
}


}


function UserException()
{
  return "";
   
}

function resolveRequests()
{
var ui = SpreadsheetApp.getUi();
try
{

  markAsResolved()

}

catch(e)
{



}

}
