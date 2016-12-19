function generateTemplates() 
{
   var columnStart = 25;
   var rowStart = 1;

   var ss = SpreadsheetApp.getActiveSpreadsheet();
   var sheet = ss.getSheetByName("AO Schedule");
   var sheet1 = ss.getSheetByName("Assay Long Names");
    
   var assayArray = sheet.getRange("V1:V3").getValues();
   var numberArray = sheet.getRange("W1:W3").getValues();
   var colorArray = sheet.getRange("X1:X3").getValues();
    
   var data = new Array(assayArray.length);
   var rangeArray = []
   var specialAssayRowIndex;
  
   for( var i = 0; i < assayArray.length; i++)
   {
      data[i] = new Array(4);
//      //Figure out how to assign values to the empty spot in the array
//      if ( assayArray[i] == "YPQA1_L" || assayArray[i] == "YPQA1_A2" || assayArray[i] == "YPQA1_A3" || assayArray[i] == "YPQA2_L" 
//          || assayArray[i] == "YPQA2_A2" || assayArray[i] == "YPQA2_A3" || assayArray[i] == "YPQA3_L" || assayArray[i] == "YPQA3_A2"
//          || assayArray[i] == "YPQA3_A3" || assayArray[i] == "YPQA4_L" || assayArray[i] == "YPQA4_A2" || assayArray[i] == "YPQA4_A3"
//          || assayArray[i] == "Process1 PQA" || assayArray[i] == "Process2 PQA" || assayArray[i] == "Process3 PQA" || assayArray[i] == "Y90 Day 2")
//      {
//        Logger.log("function entered")
//        rangeArray.push(numberArray[i])  
//        for(var j =0; j <= 4; j++)
//        {
//          data[i][j] = ""; 
//        }
//        specialAssayRowIndex = i+1
//      }
//      else
//      {  
        data[i][0] = assayArray[i] //Sets Col 1 of array to the Assay Name
       
        for(var j =1; j <= 4; j++)
        {
//          if ( assayArray[i] == "YPQA1_L" || assayArray[i] == "YPQA1_A2" || assayArray[i] == "YPQA1_A3" || assayArray[i] == "YPQA2_L" 
//          || assayArray[i] == "YPQA2_A2" || assayArray[i] == "YPQA2_A3" || assayArray[i] == "YPQA3_L" || assayArray[i] == "YPQA3_A2"
//          || assayArray[i] == "YPQA3_A3" || assayArray[i] == "YPQA4_L" || assayArray[i] == "YPQA4_A2" || assayArray[i] == "YPQA4_A3"
//          || assayArray[i] == "Process1 PQA" || assayArray[i] == "Process2 PQA" || assayArray[i] == "Process3 PQA" || assayArray[i] == "Y90 Day 2")
//          {
//            data[i][j] = "";    
//          }
          //Do nothing for first column
          //If number of days is 1, then assign blank next to Assay Name
          if(numberArray[i] == 1 && j == 1)
          {
            data[i][j] = "ok";
          } 
          //If number of days is 2, then assign arrow next to Assay Name
          if(numberArray[i] == 2 && j == 1)
          {
            data[i][j] = "-------------->";
          }
          //The last day of operation should contain the arrow
          if( (numberArray[i]> 2) && j == numberArray[i]-1)
          {
            data[i][j] = "-------------->"
          }
          //All days before the last day should have the dashes
          if((numberArray[i]> 1) && j != (numberArray[i]-1))
          {
            data[i][j] = "---------------"        
          }
          //If operation ends before loop, only fill blanks
          if(numberArray[i] == "" || j >= numberArray[i])
          {
            data[i][j] = "";
          }        
        }
//      }
    }
    //Set templates for Assays
    var area = sheet.getRange(rowStart, columnStart, 3, 5);
    area.clear()
    Logger.log(data);
    Logger.log(data.length + " x " + data[0].length)
    area.setValues(data);
     
    //Set templates for Special Assays
//    if ( rangeArray.length > 0 )
//    {
//      Logger.log("function entered")
//      for ( var z = 0; z < rangeArray.length; z++)
//      {
//         var copySpecialRange = sheet.getRange(rangeArray[z]).getA1Notation()
//         Logger.log(copySpecialRange)
//         Logger.log(specialAssayRowIndex)
//         sheet1.getRange(copySpecialRange).copyTo(sheet.getRange(specialAssayRowIndex,25))
//      }
//    }
    for(var i = 0; i < colorArray.length; i++)
    {
       Logger.log("Loop Entered")
       Logger.log(isNaN(numberArray[i]))
       if(colorArray[i] != "" && isNaN(numberArray[i]) == false) //Checks if there is a number in Col W
       {
          Logger.log("Color Entered")
          var numBlocks = parseInt(numberArray[i])  + 1;
          var partition = sheet.getRange(rowStart + i,columnStart,1,numBlocks)
          partition.clearFormat();
          Logger.log(colorArray[i])
          partition.setFontColor(colorArray[i])
          partition.setFontWeight("bold")
       }     
    }     
}
   
   
   

