// holds plain text for loaded files
var loaded_files = [];

// parsed objects
var saves = [];

// ace text editors
var editors = [];

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
				
				create_editors();
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
	saves[index].save_json = LZString.decompressFromBase64(loaded_files[index].text);
	saves[index].save_data = JSON.parse(saves[index].save_json);
	saves[index].save_json = JSON.stringify(saves[index].save_data, null, 4);
}

function create_editors() {
	editors = [];
	$(".editor").remove();
	$(".editor_title").remove();
	editors_parent = $("#editors");
	
	for (var i = 0; i < saves.length; i++) {
		editors_parent.append("<div id='save" + i + "title' class='editor_title good'>" + saves[i].file_name + " Editor</div>");
		editors_parent.append("<div id='save" + i + "editor' class='editor'></div>");
		editors[i] = ace.edit("save" + i + "editor");
		editors[i].setTheme("ace/theme/monokai");
		editors[i].getSession().setMode("ace/mode/json");
		editors[i].setValue(saves[i].save_json);
		editors[i].getSelection().clearSelection();
		editors[i].name = "ass";
		
		editors[i].on("change", update_saves);
	}
}

function update_saves() {
	for (var i = 0; i < saves.length; i++) {
		var json = editors[i].getValue();
		var good = true;
		try {
			JSON.parse(json);
		}
		catch (e) {
			good = false;
		}
		if (good) {
			saves[i].save_json = json;
			saves[i].save_data = JSON.parse(saves[i].save_json);
			
			var title = $("#save" + i + "title");
			title.addClass("good");
			title.removeClass("bad");
		}
		else {
			var title = $("#save" + i + "title");
			title.addClass("bad");
			title.removeClass("good");
		}
	}
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
	encode_files();
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