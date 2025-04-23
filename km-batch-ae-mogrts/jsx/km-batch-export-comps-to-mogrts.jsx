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
        var selCompIds = getSelCompIds(curProj);
        if(!selCompIds) return;
        var mogrtDest = mogrtDestination();
  
        if (!curProj.file) {
          var cmdId = app.findMenuCommandId('Save');
          app.executeCommand(cmdId);
        }

        exportMogrts(selCompIds, curProj,mogrtDest);
       

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
    
    function getSelCompIds(proj){
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
          selComps.push(item.id);
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
    

    function exportMogrts(compIds, proj,destination) {
      if (!compIds || !destination) return;
      
      var compsExported = 0;
      
      for(var i=0; i<compIds.length; i++){ 
        var currentCompId = compIds[i];
        var comp = null;

        for(var j = 1; j<=app.project.numItems;j++){
          var item = app.project.item(j);
          if(item instanceof CompItem && item.id === currentCompId){
            comp = item;
            comp.motionGraphicsTemplateName = comp.name;
            break
          }
        }
        
        if(comp){
          try{
              
            app.beginSuppressDialogs();
              comp.exportAsMotionGraphicsTemplate(true,destination);
              compsExported++
              
            app.endSuppressDialogs(true);
              continue;
          } catch (err) {
            alert("Failed exporting: " + comp.name + "\n" + err.toString());
          }
        } else {
          alert("Couldn't refind comp: " + comp);
        }
e
      }

      alert("Finished!\rExported " +compsExported + "/"+ compIds.length + " Mogrts to\r\r" + destination);
      var destinationFolder = new Folder(destination);
      destinationFolder.execute();
      return 
      
    }

}())
