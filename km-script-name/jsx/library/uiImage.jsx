#include "binaryFile.jsx"
#include "filePath.jsx"

﻿function getUiImage(fileName, toolName,rawData){

  var filePath = getImagePath(fileName, toolName);
  var file = getBinaryFile(filePath, rawData);
  return file;

  function getImagePath(fileName, toolName){
    var filePath = joinPath([getUserDataFolderPath(), toolName, fileName]);
    return filePath;
  };
};
