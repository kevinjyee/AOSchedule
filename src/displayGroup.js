var scheduleSheet;
var lori = "Lori's Group";
var yun = "Yun's Group";
var denise = "Denise's Group";

/*Function: displayGroup()
  ---------------------------------
  @ Params: groupName
  @ Description: Loops through groupValues array to search for matching group name's then hides Rows 
    which don't contain the same name
  * Return: N/A
*/
function displayGroup(groupName) 
{
  scheduleSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("AO Schedule")
  var fullSheetRange = scheduleSheet.getRange(1,2,scheduleSheet.getMaxRows(), scheduleSheet.getMaxColumns() )  
  scheduleSheet.unhideRow( fullSheetRange ); 
  
  var lori = "Lori's Group"
  var yun = "Yun's Group"
  var denise = "Denise's Group"
  
  var scheduleLastRow = scheduleSheet.getLastRow() //140
  
  TOP_DIFFERENCE = 4
  var columnwithGroup = 3
  
  /* Stores the group of each member into an array (Column C)*/
  var groupRange = scheduleSheet.getRange(TOP_DIFFERENCE,columnwithGroup,scheduleLastRow,1)
  var groupValues = groupRange.getValues()
  Logger.log("AssayValues Length:" + groupValues.length)
  
  for ( var i = 0; i < groupValues.length-TOP_DIFFERENCE + 1; i++) //length is 136
  {
    if ((groupValues[i][0].toString().indexOf(groupName)) != -1)
    {
      i+=2;
    }
    else if (((groupValues[i][0].toString().indexOf(groupName)) == -1))
    {
      scheduleSheet.hideRows(i+TOP_DIFFERENCE,3)
      i+=2;
    }
  }
}

/* Function: calls displayGroup to match Lori Group */
function filterLoriGroup()
{
  displayGroup(lori)
}

/* Function: calls displayGroup to match Yun Group */
function filterYunGroup()
{
  displayGroup(yun) 
}

/* Function: calls displayGroup to match Denise Group */
function filterDeniseGroup()
{
  displayGroup(denise) 
}