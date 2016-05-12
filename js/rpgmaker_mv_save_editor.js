// holds plain text for loaded files
var loaded_files = [];

// parsed objects
var saves = [];

// read the files selected into load_files
function load_saves(event) {
	// File list
	var file_list = event.target.files;

	if (file_list.length > 0) {
		// clear loaded_files
		loaded_files = [];
		saves = [];

		// read each file
		for (var i = 0; i < file_list.length; i++){
			var f_reader = new FileReader();
			f_reader.file_name = file_list[i].name;
			f_reader.file_index = i;

			// when finished reading place in loaded_files
			f_reader.onload = function(read_event) {
				loaded_files[this.file_index] = {text: read_event.target.result, file_name: this.file_name};
				parse_file(this.file_index);
			};

			// read as plain text
			f_reader.readAsText(file_list[i], "ASCII");
		}
	}
}

// parse a file into a javascript object
function parse_file(index) {
	saves[index] = {};
	saves[index].file_name = loaded_files[index].file_name;
	saves[index].save_data = LZString.decompressFromBase64(loaded_files[index].text);
	saves[index].save_data = JSON.parse(saves[index].save_data);
}

// save back all the javascript objects
function encode_files() {
	for (var i = 0; i < saves.length; i++) {
		if (saves[i].file_name == loaded_files[i].file_name) {
			loaded_files[i].text = JSON.stringify(saves[i].save_data);
			loaded_files[i].text = LZString.compressToBase64(loaded_files[i].text);
		}
		else {
			console.log("Somthings wrong, associated file names don't match.");
		}
	}
}

// save all the loaded files
function save_files() {
	for (var i = 0; i < loaded_files.length; i++) {
		var save_blob = new Blob([loaded_files[i].text], {type: "text/plain;charset=ASCII"});
		saveAs(save_blob, loaded_files[i].file_name) 
	}
}

// initialize event listeners
function init() {
	$("#save_file_loader").change(load_saves);
	$("#save_file_button").click(save_files);
}

// wait for document to be loaded/ready
$(document).ready(init);