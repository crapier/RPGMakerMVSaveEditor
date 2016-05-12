# RPG Maker MV Save Editor
Simple Proof of concept to view, edit (with js console), and save RPG Maker MV Save Files.

1. Load index.html into any decent modern browser. (Chrome tested)
2. Click Choose Files and select any rpgsave files
3. Open the javascript console (in developer tools on most browsers, F12 on Chrome)
4. Make any change via the editing the saves array
  * Type saves into the console to see the array then expand any objects->save_data to access the data
5. Click the save button to get back the edited save file

Thanks to
* [jQuery](https://jquery.com/)
* [LZ-String](https://github.com/pieroxy/lz-string)
* [FileSaver.js](https://github.com/eligrey/FileSaver.js/)
