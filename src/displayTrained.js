var scheduleSheet;
var TOP_DIFFERENCE;

/*Function: displayTrainedEmployee()
  ---------------------------------
  @ Params: None
  @ Description: Find which employees are trained and display trained employees
  * Return: N/A
*/

function displayTrainedEmployee()
{
  Logger.clear();
  
  scheduleSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("AO Schedule")
  var fullSheetRange = scheduleSheet.getRange(1,2,scheduleSheet.getMaxRows(), scheduleSheet.getMaxColumns() )  
  scheduleSheet.unhideRow( fullSheetRange ) ; 
  
  var enteredAssayCodeValuesRange = scheduleSheet.getRange("U1:U3") //stores to-be-searched Assay Codes in range to Array
  var enteredAssayCodeValues = enteredAssayCodeValuesRange.getValues()
  Logger.log("EnteredAssayCodeValues:" + enteredAssayCodeValues[0])
  Logger.log("EnteredAssayCodeValues:" + enteredAssayCodeValues[1])
  Logger.log("EnteredAssayCodeValues:" + enteredAssayCodeValues[2])
  
  var scheduleLastRow = scheduleSheet.getLastRow() //140
  
  TOP_DIFFERENCE = 4
  var columnwithAssay = 2
  
  /* Stores the trainings of each member into an array (Column B)*/
  var assayRange = scheduleSheet.getRange(TOP_DIFFERENCE,columnwithAssay,scheduleLastRow,1)
  var assayValues = assayRange.getValues()
  Logger.log("AssayValues Length:" + assayValues.length)
  
  var assayCodeArray = []
  assayCodeArray = ridNonEmptyRows(enteredAssayCodeValues, assayCodeArray)
  Logger.log("AssayCodeArray Length:" + assayCodeArray.length)
  Logger.log("AssayCodeArray Values:" + assayCodeArray[0])
  Logger.log("AssayCodeArray Values:" + assayCodeArray[1])
  Logger.log("AssayCodeArray Values:" + assayCodeArray[2])
  //var assayRowArray = []
  //CacheService.getScriptCache()
  
  /* This loop will determine which rows contain which assay names and in which rows those assay names are in */
  for ( var i = 0; i < assayValues.length-TOP_DIFFERENCE + 1; i++) //length is 136
  { 
    if ( assayCodeArray.length == 0 )
    {
      Logger.log("Length 0")
      break;
    }
    else if ( assayCodeArray.length == 1 )
    {
      Logger.log("Length 1")
      i = hideFunc1(assayValues, assayCodeArray,i)
    }
    else if ( assayCodeArray.length == 2 )
    {
      Logger.log("Length 2")
      i = hideFunc2(assayValues, assayCodeArray,i)
      Logger.log("Length of i after hideFunc2 call: " + i)
    }
    else if ( assayCodeArray.length == 3 )
    {
      Logger.log("Length 3")
      i = hideFunc3(assayValues, assayCodeArray,i)
    }
    
  
  }
  
  generateTemplates();
  }
  
  /*Function: ridNonEmptyRows()
  ---------------------------------
  @ Params: enteredAssayCodeValues, assayCodeArray
  @ Description: Loops through enteredAssayCodeValues array to get rid of the null characters and
  * store the non-null values into assayCodeArray
  * Return: assayCodeArray
  */
  function ridNonEmptyRows(enteredAssayCodeValues, assayCodeArray)
  {
    for ( var y = 0; y < enteredAssayCodeValues.length; y++)
    {
      if ( enteredAssayCodeValues[y][0].toString() != "" )
      {
        assayCodeArray.push(enteredAssayCodeValues[y][0].toString())
      }
      else
      {
        continue;
      }
    }
    return assayCodeArray;
  }
  
  /*Function: hideFunc1()
  ---------------------------------
  @ Params: assayValues,assayCodeArray,i
  @ Description: Compares the string of combined assays trained with the first assay code
  * that is to be searched in the combined assays. Function will increment index by 2
  * for more efficient search due to multiple lines containing same strings for each name
  * Return: i
  */
  function hideFunc1(assayValues,assayCodeArray,index)
  {   
      if ((assayValues[index][0].toString().indexOf(assayCodeArray[0].toString())) == -1)
      {
        scheduleSheet.hideRows(index+TOP_DIFFERENCE,3)
      }
      return index+=2;
  }
  
  /*Function: hideFunc2()
  ---------------------------------
  @ Params: assayValues,assayCodeArray,i
  @ Description: Compares the string of combined assays trained with the first 2 assay codes
  * that are to be searched in the combined assays. Function will increment index by 2
  * for more efficient search due to multiple lines containing same strings for each name
  * Return: i
  */
  function hideFunc2(assayValues,assayCodeArray,index)
  {   
      if ((assayValues[index][0].toString().indexOf(assayCodeArray[0]) != -1) && (assayValues[index][0].toString().indexOf(assayCodeArray[1]) != -1))
      {
        return index+=2;
        Logger.log("Length of i in func call: " + (index + 2)) 
      }
      else
      {
        scheduleSheet.hideRows(index+TOP_DIFFERENCE,3)
        return index+=2;
      }
      Logger.log("hideFunc2 called")
   }
  
  /*Function: hideFunc3()
  ---------------------------------
  @ Params: assayValues,assayCodeArray,i
  @ Description: Compares the string of combined assays trained with the first 3 assay codes
  * that are to be searched in the combined assays. Function will increment index by 2
  * for more efficient search due to multiple lines containing same strings for each name
  * Return: i
  */
  function hideFunc3(assayValues,assayCodeArray,index)
  {   
      if ((assayValues[index][0].toString().indexOf(assayCodeArray[0].toString()) != -1) && (assayValues[index][0].toString().indexOf(assayCodeArray[1].toString()) != -1) && (assayValues[index][0].toString().indexOf(assayCodeArray[2].toString()) != -1))
      {
        return index+=2;
      }
      else
      {
        scheduleSheet.hideRows(index+TOP_DIFFERENCE,3)
        return index+=2;
      }
   }








