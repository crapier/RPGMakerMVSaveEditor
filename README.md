# RPG Maker MV Save Editor
Simple Proof of concept to view, edit (with js console), and save RPG Maker MV Save Files.

This is for games that compress the save using LZ-String, default saves can be directly edited with a text editor. I don't have any default engine saves, but it would be easy to make something similar for them as well.

1. Load index.html into any decent modern browser. (Chrome tested)
2. Click Choose Files and select any rpgsave files
3. Edit any Saves JSON in editors that appear
  * CTRL-F to search an editor when it is in focus
  * If JSON parses title will stay green, else the title will turn red those changes will not be saved for export
5. Click the save button to get back the edited save file

Alternately Use the old method to edit by replacing step 3 above with

1. Open the javascript console (in developer tools on most browsers, F12 on Chrome)
2. Make any change via the editing the saves array
  * Type saves into the console to see the array then expand any objects->save_data to access the data

Thanks to
* [jQuery](https://jquery.com/)
* [LZ-String](https://github.com/pieroxy/lz-string)
* [FileSaver.js](https://github.com/eligrey/FileSaver.js/)
* [Ace](https://ace.c9.io/)
