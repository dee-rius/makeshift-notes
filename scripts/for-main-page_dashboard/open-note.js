const clickToOpenNoteDivs = document.getElementsByClassName("click-to-open-note-div");
let storedNoteInfos = [];
let openedNoteInfo = {};


getNoteInfos();

function getNoteInfos(){
    storedNoteInfos = JSON.parse(localStorage.getItem("stored-notes"));
    openedNoteInfo = JSON.parse(localStorage.getItem("opened-note"));
}

for(let clickToOpenNoteDiv of clickToOpenNoteDivs){
    clickToOpenNoteDiv.addEventListener("click", openNote);
}

function openNote(){
    let foundNote = false;

    let notePreviewCardNameText = this.querySelector(".note-name-preview");
    let notePreviewCardContentText = this.querySelector(".note-content-preview");

    for(let storedNoteInfo of storedNoteInfos){
        if(foundNote == false && storedNoteInfo.noteName == notePreviewCardNameText.textContent && storedNoteInfo.noteContent == notePreviewCardContentText.textContent){
            openedNoteInfo.noteName = storedNoteInfo.noteName;
            openedNoteInfo.noteContent = storedNoteInfo.noteContent;
            foundNote = true;
        }
    }

    localStorage.setItem("opened-note", JSON.stringify(openedNoteInfo));
    getNoteInfos();

    location.href = "note-edit.html";
}