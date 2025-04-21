// bring in OS library for cross OS compatibility
//@include "../library/OS.jsx"

var scriptName = "Script Name";

var settingsWindow = new Window("palette", "About " + scriptName, undefined, {closeButton: true, resizeable: true});
settingsWindow.orientation = 'column';
settingsWindow.alignChildren = ["fill", "fill"];

var editTextGroup = settingsWindow.add("group", undefined, "Middle Info Group");
editTextGroup.orientation = 'column';
editTextGroup.alignChildren = ["left", "top"];
var helpMessage = 
'ABOUT '+scriptName+'\r\r\
What this script does.\r\r\
Why this script is so helpful.\
------------------------\
HOW TO USE '+scriptName+':\r\r\
FEATURE #1:\r\
Information about this feature\r\r\
-----------\r\
FEATURE #2:\r\
Informtation about this feature\r\r\
-----------\r\
FEATURE #3:\r\
Click: What happens when you click\r\
Shift-Click: What happens when you modify while clicking\r\r\
'
var textBox = editTextGroup.add("edittext", undefined, helpMessage, {multiline: true, readonly: true ,scrollable: true});
textBox.justify = "left";
textBox.alignment = ["fill","fill"];
textBox.preferredSize = [600,200];

var creatorInfo = 
''+scriptName+' v1.0\r\
Script created by Kyle Harter\r\
www.kylemotion.com'


var bottomGroup = settingsWindow.add("group", undefined, "bottomGroup");
bottomGroup.orientation = "row";
bottomGroup.alignChildren = ["fill", "center"];
var creatorGroup = bottomGroup.add("group", undefined, "Creator Info Group")
var creatorStatic = creatorGroup.add("statictext", undefined, creatorInfo, {multiline: true});
var closeGroup = bottomGroup.add("group", undefined, "Close Group");
closeGroup.alignChildren = ["right", "center"];
var closeButton = closeGroup.add("button", undefined, "Close");
closeButton.preferredSize = [-1, 30];


creatorStatic.addEventListener("mousedown", creatorClick);

closeButton.addEventListener("mousedown", function(){settingsWindow.close()}) 


function creatorClick(){
    var userOS = OS
    var launchCode = userOS.openUrl("https://www.kylemotion.com/")

    return userOS
}


function optionInfo_Click() {
    settingsWindow.hide();
    settingsWindow.show();
};


