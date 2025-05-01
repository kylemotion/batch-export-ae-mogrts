/**
 * @description a headless script that will batch export mogrts based on selected comps in the project panel
 * @name km-scriptname
 * @author Kyle Harter <kylenmotion@gmail.com>
 * @version 1.0.0
 * 
 * @license This script is provided "as is," without warranty of any kind, expressed or implied. In
 * no event shall the author be held liable for any damages arising in any way from the use of this
 * script.
 * 
 * 
 * 
 * 
*/




(function(){

    try {
      app.beginUndoGroup("batch export mogrts to selected folder");
      var curProj = getProj();
      var comps = getComps(curProj);
      if(!comps) return;
      var mogrtDest = mogrtDestination();
      
      if (!app.project.file) {
        app.project.save();
      }

      app.beginSuppressDialogs();
      exportMogrts(comps, curProj,mogrtDest);
      app.endSuppressDialogs(true);
       

      } catch(error) {
        alert("An error occured on line: " + error.line + "\nError message: " + error.message);

      } finally {
        app.endUndoGroup()
        // this always runs no matter what
      }
      
      

    function getProj(){
      var proj = app.project;

      if(!proj){
        alert("Whoops!\rYou don't have a project open currently. Open an already created AE file or create a new one and try again.")
        return
      }

      return proj
    }
    
    function getComps(proj){
      var selItems = proj.selection;
      var compIds = [];
      var compName = [];

      if(selItems.length < 1){
        var activeComp = proj.activeItem;
        activeComp.openInViewer();
        if(activeComp instanceof CompItem && activeComp.motionGraphicsTemplateControllerCount > 0){
          compIds.push(activeComp.id);
          compNames.push(activeComp.name);
        }
      } else {
        for(var i = 0; i<selItems.length; i++){
          var item = selItems[i];
          if(item instanceof CompItem && item.motionGraphicsTemplateControllerCount > 0){
            compIds.push(item.id);
            compName.push(item.name);
          }
        }
    }

      if(compIds.length === 0){
        alert("Whoops!\rYou don't have any comp items selected. Select atleast 1 comp item and try again.");
        return
      }

      return {
        compIDs: compIds,
        compNames: compName
      }

    }


    function mogrtDestination(){
      var folderPath = Folder.selectDialog("Select a folder destination for the exported mogrts");
      if (folderPath === null) {
        alert("Whoops!\rYou didn't select a valid folder.");
        return;
      }
      return folderPath.fsName
    }

    function getFile(fileName,destination){
      var file = File(destination + "/" + fileName + ".mogrt");
      return file.exists;
    }

    function exportMogrts(comps, proj,destination) {
      if (!comps || !destination) return;
      var compsExported = 0;
      var compsNotExported = 0;
      var compNamesExported = "Comps Exported:\r";
      var compNamesNotExported = "Comps NOT Exported:\r";
      var compNames = comps.compNames;

      // alert("Comp Names Length: " + compNames.length);
      for(var i=0; i<comps.compIDs.length; i++){ 
        var currentCompId = comps.compIDs[i];
        var comp = null;
        for(var j = 1; j<=app.project.numItems;j++){
          var item = app.project.item(j);
          if(item instanceof CompItem && item.id === currentCompId){
            comp = item;
            break;
          }
        }
        if(comp){
          try{     
            
          comp.openInViewer();
          comp.openInEssentialGraphics();
          comp.motionGraphicsTemplateName = comp.name;
          if(i !== 0){
            $.sleep(2000);
          }
           var exportComp = comp.exportAsMotionGraphicsTemplate(true,destination);
          
          } catch (err) {
            alert("Failed exporting: " + comp.name + "\n" + err.toString());
          }
        } else {
          alert("Couldn't export mogrt for: " + comp.name);
        }
      }
      for(var b = 0; b<compNames.length; b++){
        $.sleep(200);
        var compName = compNames[b]; 
        if(getFile(compName,destination)){
          compsExported++;
          compNamesExported += compName + "\r";
        } else{
          compsNotExported++
          compNamesNotExported += compName + "\r"
        }
      }


      if(compsNotExported === 0){
        compNamesNotExported = "";
      }
      var successMessage = "Finished!\rExported " + 
                          compsExported + "/"+ comps.compIDs.length + " Mogrts to:\r" 
                          + destination + "\r\r" + 
                          (compNamesExported !== "Comps Exported:\r" ? compNamesExported + "\r\r" : "") + 
                          (compNamesNotExported !== "" ? compNamesNotExported + "\r\r" : "") + 
                          "Click OK to reveal destination folder"


      alert(successMessage);
      var destinationFolder = new Folder(destination);
      destinationFolder.execute();
      return 
      
    }

}())
