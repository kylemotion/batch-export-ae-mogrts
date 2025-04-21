#include "OS.jsx"

function joinPath(components){
  var pathSeparator = getPathSeparatorSymbol();
  return components.join(pathSeparator);
};

function getPathSeparatorSymbol(){
   return (OS.isWindows() ? "\\":"/");
};

function getUserDataFolderPath(){
  return Folder.userData.fsName;
};
