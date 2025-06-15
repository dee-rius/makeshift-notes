const pageTitle = document.querySelector("title");
const noteNameInput = document.getElementById("note-name-input");
const noteContentInput = document.getElementById("note-content-input");

let openedNoteInfo = [];
let storedNoteInfos = [];
getNoteInfos();

function getNoteInfos(){
    openedNoteInfo = JSON.parse(localStorage.getItem("opened-note"));
    storedNoteInfos = JSON.parse(localStorage.getItem("stored-notes"));
}

if(openedNoteInfo.noteName == "New Note" || openedNoteInfo.noteName == ""){
    noteNameInput.value = "";
    pageTitle.textContent = "New Note";
}
else{
    noteNameInput.value = openedNoteInfo.noteName;
    pageTitle.textContent = openedNoteInfo.noteName;
}

if(openedNoteInfo.noteContent == "..."){
    noteContentInput.value = "";
}
else{
    noteContentInput.value = openedNoteInfo.noteContent;
}


noteNameInput.addEventListener("change", storeChanges);
noteContentInput.addEventListener("change", storeChanges);

function storeChanges(){
    noteNameInput.value = noteNameInput.value.replaceAll("--", "—").trim();
    noteContentInput.value = noteContentInput.value.replaceAll("--", "—").trim();

    let newNoteInfoStored = false;
    let newNoteInfo = {
        noteName: "",
        noteContent: "",
    }

    if(noteNameInput.value == ""){
        newNoteInfo.noteName = "New Note";
        pageTitle.textContent = "New Note";
    }
    else{
        newNoteInfo.noteName = noteNameInput.value;
        //updates page title as well
        pageTitle.textContent = noteNameInput.value;
    }
    
    if(noteContentInput.value == ""){
        newNoteInfo.noteContent = "...";
    }
    else{
        newNoteInfo.noteContent = noteContentInput.value;
    }

    for(let storedNoteInfo of storedNoteInfos){
        if(newNoteInfoStored === false && storedNoteInfo.noteName == openedNoteInfo.noteName && storedNoteInfo.noteContent == openedNoteInfo.noteContent){
            storedNoteInfo.noteName = newNoteInfo.noteName;
            storedNoteInfo.noteContent = newNoteInfo.noteContent;

            newNoteInfoStored = true;
        }
    }

    localStorage.setItem("stored-notes", JSON.stringify(storedNoteInfos));
    localStorage.setItem("opened-note", JSON.stringify(newNoteInfo));

    getNoteInfos();
}