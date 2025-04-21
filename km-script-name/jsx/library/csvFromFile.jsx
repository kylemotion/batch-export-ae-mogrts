function loadCSVFromFile(file, options){
    function parseCSVString(csvString, options){
        options = options || {};
        var separatorSymbol = options.separatorSymbol || ",";
    
        var currentRow = 0;
        var currentColumn = -1; // will be increased to 0 during first loop iteration
        var thisCell = "";
        var i;
        var token;
        var cellStart = true;
        var insideQuote;
    
       
    
        
    
        function nextTokenLookAhead(){
            var nextTokenId = i + 1;
            return (nextTokenId <csvString.length ? csvString[nextTokenId]:"")
        }
    
        function processLineBreaks(){
            addCsvCellToData(thisCell, currentRow, currentColumn);
            cellStart = true;
            currentRow++;
            currentColumn = -1;
        }
    
        
    
        function processCellStart(){
            
                    thisCell = "";
                    currentColumn++;
                    insideQuote = (token == '"');
                    if(insideQuote){
                        i++;
                        token = csvString[i]
                    }

                    if(!insideQuote){
                        thisCell += token;
                    }

            cellStart = false;
        }
        
        for (i=0; i< csvString.length; i++){
            token = csvString[i];
            if(cellStart){
                processCellStart();
            }
    
            else if(!insideQuote && token == separatorSymbol){
                addCsvCellToData(thisCell, currentRow, currentColumn);
                cellStart = true;
    
            }
    
            else  if(!insideQuote && token == "\n"){
                processLineBreaks()
            }
    
            else  if(!insideQuote && token == "\r" && nextTokenLookAhead() == "\n"){
                i++;
                processLineBreaks();
            }
            else if(insideQuote && token == '"'){
                if(nextTokenLookAhead() == '"'){
                    i++;
                    thisCell += '"';
                } 
                else {
                    insideQuote = false;
                }
            }
            else {
                thisCell += token;
            }
        }
        return data
    
    };
   
    function addCsvCellToData(cellData, row, column){
        if(data == undefined){
           data = [];
        }
   
        if(data[row] == undefined){
           data[row] = [];
        }
   
        data[row][column] = cellData
   }
    
    var data;
    options = options || {}
    file.encoding = options.encoding || "utf-8";
    if(!(file.open("r"))){
        throw new Error("Could not open file: " + file.error) ;
    }

    var rawData = file.read();
    file.close();
    if(file.error != "") throw new Error("Could not read file:" + file.error);

    return parseCSVString(rawData, options);

};




