function fileToBinaryString() {

        var input = File.openDialog("choose a file to convert to source code");//new File("path/to/my/file")
        if (input === null) return;

        var rawData = readBinaryFile(input);
        var variableName = stringToValidVariableName(input.name);
        var sourceCode = convertRawDataToSourceCode(rawData, variableName);
        writeTextFile(input.fsName + ".jsx", sourceCode);


        function convertRawDataToSourceCode(rawData, variableName) {
                var contentAsString = rawData.toSource();
                var sourceCode = "var " + variableName + " = " + contentAsString + ";\n";
                return sourceCode;
        };

        function readBinaryFile(file) {
                file.encoding = "BINARY";
                file.open("r");
                var content = file.read();
                file.close();
                return content;
        };

        function writeTextFile(filePath, content) {
                var output = new File(filePath);
                output.open("w");
                output.encoding = "UTF-8";
                output.write(sourceCode);
                output.close();
        };

        function stringToValidVariableName(string) {
                return string.replace(/\W/g, "")   // remove anything that is not letter, digit or _
                        .replace(/^\d+/, "");  // remove any digits at the beginning
        };
}

fileToBinaryString();