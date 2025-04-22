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
        var selComps = getSelCompNames(curProj);
        if(!selComps) return;
        var mogrtDest = mogrtDestination();
  
        exportMogrts(selComps, curProj,mogrtDest);
       

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
    
    function getSelCompNames(proj){
      var selItems = proj.selection;

      if(selItems.length < 1){
        alert("Whoops!\rYou don't have any items selected. Select at least one item in the project panel and try again.");
        return
      }



      var selComps = [];

      var found = false;

      for(var i = 0; i<selItems.length; i++){
        var item = selItems[i];
        if(item instanceof CompItem && item.motionGraphicsTemplateControllerCount > 0){
          found = true;
          selComps.push(item.name);
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
    

    function exportMogrts(compNames, proj,destination) {
      if (!compNames || !destination) return;
    
      if (!proj.file) {
        var cmdId = app.findMenuCommandId('Save');
        proj.executeCommand(cmdId);
      }
      
      
      for(var i=0; i<compNames.length; i++){ 
        var currentCompName = compNames[i];
        var comp = null;

        for(var j = 1; j<=app.project.numItems;j++){
          var item = app.project.item(j);
          if(item instanceof CompItem && item.name === currentCompName){
            comp = item;
            break
          }
        }
        
        if(comp){
          try{
              // alert("Exporting Mogrt for: " + comp.name);
            app.beginSuppressDialogs();
              comp.motionGraphicsTemplateName = comp.name;
              comp.exportAsMotionGraphicsTemplate(true,destination);
              // alert("Export successful");
            app.endSuppressDialogs(true);
              continue;
          } catch (err) {
            alert("Failed exporting: " + comp.name + "\n" + err.toString());
          }
        } else {
          alert("Couldn't refind comp: " + comp);
        }

      }

      alert("Finished!\rExported " +compNames.length + "/"+ compNames.length + " Mogrts to\r\r" + destination);
      var destinationFolder = new Folder(destination);
      destinationFolder.execute();
      return 
      
    }

}())
