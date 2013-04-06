
// Saves options to localStorage.
function save_options() {
    localStorage["settings_names_mapping"] = document.getElementById("names_mapping").value;

    // Update status to let user know options were saved.
    document.getElementById("status").style.display = 'block';
    document.getElementById("save").style.display = 'none';
    setTimeout(function() {
        document.getElementById("status").style.display = 'none';
        document.getElementById("save").style.display = 'block';
    }, 3000);

    //chrome.extension.sendRequest({action: "restart"});
}

// Restores select box state to saved value from localStorage.
function restore_options() {
    document.getElementById("names_mapping").value = localStorage["settings_names_mapping"] || "";
}

restore_options();
document.querySelector('#save').addEventListener('click', save_options);
