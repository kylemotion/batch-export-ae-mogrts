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
      var selcompIDs = getSelcompIDs(curProj);
      if(!selcompIDs) return;
      var mogrtDest = mogrtDestination();
      
      if (!curProj.file) {
        var cmdId = app.findMenuCommandId('Save');
        app.executeCommand(cmdId);
      }
      app.beginSuppressDialogs();
      exportMogrts(selcompIDs, curProj,mogrtDest);
      app.endSuppressDialogs(true);
       

      } catch(error) {
        alert("An error occured on line: " + error.line + "\nError message: " + error.message);

      } finally {
        // this always runs no matter what
        app.endUndoGroup()
      }
      
      

    function getProj(){
      var proj = app.project;

      if(!proj){
        alert("Whoops!\rYou don't have a project open currently. Open an already created AE file or create a new one and try again.")
        return
      }

      return proj
    }
    
    function getSelcompIDs(proj){
      var selItems = proj.selection;

      var selComps = [];
      
      var found = false;

      if(selItems.length < 1){
        var activeComp = proj.activeItem;
        if(activeComp && activeComp instanceof CompItem && activeComp.motionGraphicsTemplateControllerCount > 0){
          found = true;
          selComps.push(activeComp.id);
        }
      } else {
        for(var i = 0; i<selItems.length; i++){
          var item = selItems[i];
          if(item instanceof CompItem && item.motionGraphicsTemplateControllerCount > 0){
            found = true;
            selComps.push(item.id);
          }
        }
    }

      if(!found){
        alert("Whoops!\rYou don't have any comp items selected. Select atleast 1 comp item and try again.");
        return
      }

      return selComps

    }


    function mogrtDestination(){
      var folderPath = Folder.selectDialog("Select a folder destination for the exported mogrts");
      if (folderPath === null) {
        alert("Whoops!\rYou didn't select a valid folder.");
        return;
      }
      return folderPath.fsName
    }

    function exportMogrts(compIDs, proj,destination) {
      if (!compIDs || !destination) return;
      
      var compsExported = 0;
      
      for(var i=0; i<compIDs.length; i++){ 
        var currentCompId = compIDs[i];
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
          comp.openInEssentialGraphics();
          comp.motionGraphicsTemplateName = comp.name
           var exportComp = comp.exportAsMotionGraphicsTemplate(true,destination);
           compsExported++
          } catch (err) {
            alert("Failed exporting: " + comp.name + "\n" + err.toString());
          }
        } else {
          alert("Couldn't export mogrt for: " + comp.name);
        }
      }

      alert("Finished!\rExported " +compsExported + "/"+ compIDs.length + " Mogrts to\r\r" + destination);
      var destinationFolder = new Folder(destination);
      destinationFolder.execute();
      return 
      
    }

}())
