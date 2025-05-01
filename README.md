# Batch Export Comps To Mogrts

## About

km-batch-ae-mogrts will export mogrts from your selected comps in your project panel. Upon launching the script you will be prompted to choose a location for your exported mogrts. Once you've selected a folder destination, then the script will run and export your mogrts. Your mogrts will be named based on your comp names. Upon finishing exporting, you will see a dialog box showing you the location of your mogrts along with how many were exported. Once you click okay on that dialog box your system folder destination will reveal itself.

## Installation

Download the .jsxbin file from the repo above to use in your version of After Effects.
The script must be placed in the Scripts directory in the After Effects application folder. That folder will be named “Adobe After Effects [version]” which has been replaced with “AE” below.

Mac OS X

```
/Applications/AE/Scripts/
```

Windows

```
\Program Files\AE\Support Files\Scripts\
```

If After Effects was running when you installed the script, you’ll need to restart it.

Also, you’ll need to allow After Effects to write files.
To do that follow this path:

```
Preferences > General > Check-off “Allow Scripts to Write Files and Access Network” > Close
Preferences
```

## Step 1

Select compositions in the project panel or open 1 composition to export current composition.

## Step 2

Launch the script from your favorite script launcher (e.g., Kbar) or launch it inside After Effects by navigating to **File > Scripts > Run Script File**

## Step 3

Choose the folder destination.

## Step 4

Mogrts exported to your destination of choice!

![til](./km-batch-ae-mogrts/reference/km_batch_export_comps_to_mogrts.gif);

## Known Issues

Incorrect logging of exported mogrts on final alert even though the correct amount of mogrts were exported.
There is no current indicator for which mogrt is currently being exported. A progress bar will be implemented in the future.
