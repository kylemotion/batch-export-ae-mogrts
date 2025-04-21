function getBinaryFile(filePath,rawData){
  var file = new File(filePath);
  if(!file.exists){
    createFile(file,rawData);
  }
  return file;


  function createFile(file, rawData){
    makeSureFolderExists(file.parent);
    file.encoding = "BINARY";
    file.open( "w" );
    file.write( rawData );
    file.close();
    if(file.error != "") throw new Error("could not write file: "+file.error)
  };


  function makeSureFolderExists(folder){
    if(!folder.exists) {
      folder.create();
    }
  };
};
