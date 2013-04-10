
// Saves options to localStorage.
function saveOptions() {
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

// Load options from localStorage
function loadOptions() {
    document.getElementById("names_mapping").value = localStorage["settings_names_mapping"] || "";
}

loadOptions();
document.querySelector('#save').addEventListener('click', saveOptions);
