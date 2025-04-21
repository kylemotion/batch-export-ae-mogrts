/**
 * Kyle Harter function library
 * @author kylenmotion@gmail.com
 */


/**
 * @param {string} mainColor 6-digit hex code
 * @return {Object} RGB values from a hex code input 
 */


function hexToRGB(hexValue) {
    var hexTrim = hexValue.trim();
    var hexString = hexTrim;
    var finalHex = hexString.replace(/[#]/g, "");
    var hexColor = "0x" + finalHex;
    var r = hexColor >> 16;
    var g = (hexColor & 0x00ff00) >> 8;
    var b = hexColor & 0xff;

    return [r / 255, g / 255, b / 255]
} 


//// Dockable or window ui


(function (thisObj) {
    buildUI(thisObj);

    function buildUI(thisObj) {
        var win = (thisObj instanceof Panel) ? thisObj : new Window("palette", "script", undefined, {
            resizeable: true
        });

        var button = win.add('button', undefined, 'Click me');
        button.onClick = function () {
            alert('Hello World');
        };

        win.onResizing = win.onResize = function () {
            this.layout.resize();
        };

        if (win instanceof Window) {
            win.center();
            win.show();
        } else {
            win.layout.layout(true);
            win.layout.resize();
        }
    }

})(this);



////// Copy to Clipboard

function copyToClipboard(string) {
	var cmd, isWindows;

	string = (typeof string === 'string') ? string : string.toString();
	isWindows = $.os.indexOf('Windows') !== -1;
	
	cmd = 'echo "' + string + '" | pbcopy';
	if (isWindows) {
		cmd = 'cmd.exe /c cmd.exe /c "echo ' + string + ' | clip"';
	}

	system.callSystem(cmd);
}




//// Populate Dropdown Expression Control
function buildDropdownMenu(layersel, ddParams){
         
        var selLayers = new Array();

        for(var i = 1; i<=comp.layersel; i++){
	    selLayers.push(layerEffects.property(i))

        
        }

        var finalDropdown
        var ddBuild = finalDropdown.property(1).setPropertyParameters(ddParams);
        ddBuild.propertyGroup(1).name = "Enter Dropdown Name;
        return finalDropdown
	}



///// Populate Script UI DD

var layerList = init(mainButtonDD);



function init(dropDown){
    var globalLayers = [];
    var globalLayerNames = [];
    dropDown.removeAll();
    
    var existingComp = app.project.activeItem;

    if(existingComp && existingComp instanceof CompItem){
	for(var i = 1; i<=existingComp.numLayers; i++){
	    globalLayers.push(existingComp.layer(i));
	    globalLayerNames.push(i.toString() + ". " + existingComp.layer(i).name);
	    dropDown.add("item", globalLayerNames[globalLayerNames.length-1])

	}
    } 
    
    return dropDown.selection = 0;
    }


/// Convert dropdown UI to text - no numbers in front

var dropdownSel = dropDown.selection;

function dropDownSelection(dropDownSel){
    var dropwDownSrc = dropDownSel.selection.text;
    var ddSplit = dropwDownSrc.split(" ");
    var ddSlice = ddSplit.slice(1);
    var ddJoin = ddSlice.join(" ");
    return ddJoin
}


//// return selected properties

function getSelectedProperties() {
    var comp = app.project.activeItem;
    var selectedProperties = comp.selectedProperties;
    return selectedProperties
}



/// referesh dropdown menu UI
refreshButton.onClick = function(){
    try{
	app.beginUndoGroup("refresh Dropdown");
	var comp = app.project.activeItem;

	if (!(comp && comp instanceof CompItem)) {
	    alert("Open a comp first!")
	    return
	}

	init(mainButtonDD)
    } catch(error) {
	alert("An error occured on line: " + error.line + "\nError message: " + error.message);
	} finally {
	// this always runs no matter what
	app.endUndoGroup()
      }
}    


//// add control layer to composition

addControlLayerButton.onClick = function(){
    try{
	app.beginUndoGroup("Add Controller");
	var comp = app.project.activeItem;

	if (!(comp && comp instanceof CompItem)) {
	    alert("Open a comp first!")
	    return
	}
	


	createControlLayer = comp.layers.addShape();
	createControlLayer.name = "Controls";

	init(mainButtonDD)
    } catch(error) {
	alert("An error occurred on line: " + error.line + "\nError message: " + error.message);
	} finally {
	// this always runs no matter what
	app.endUndoGroup()
      }
}
