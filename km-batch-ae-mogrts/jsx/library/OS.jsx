var OS = (function(){
    function isWindows() {
        return $.os.indexOf("Windows") != -1;
    };

    function isMacOS(){
        return !isWindows();
    };


    function openUrl(url){
      if(isWindows()){
        openUrlWin(url);
      }
      else {
        openUrlMac(url);
      }
    }


    function openUrlMac(url){
      var command = 'open "'+url+'"';
      system.callSystem(command);
    }

    function openUrlWin(url){
      var command = 'start ' + url;
      executeWinCommandlineCommand(command);
    }

    function executeWinCommandlineCommand(command){
      var quotedCommand = quoteForWindowsCmd(command);
      var outerCommand = "cmd /c \""+quotedCommand+"\"";
      system.callSystem(outerCommand);
    }

    function quoteForWindowsCmd (string) {
      // put a ^ before every META character that has a special meaning in CMD
      var metaChars = ['^','(',')','%','!','"','<','>','&','|','\n'];
      var prefix ="^"
      for(var i=0; i< metaChars.length; i++){
        string = replaceAll(string, metaChars[i],prefix+metaChars[i]);
      }
      return string;
    };

    function replaceAll(string, search, replace){
      return string.split(search).join(replace);
      };
      
      return {
        isWindows: isWindows,
        isMacOS: isMacOS,
        openUrl: openUrl
      }

}())