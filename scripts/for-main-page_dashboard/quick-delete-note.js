let notePreviewCards = [];
let noteDeleteButtons = [];

let storedNoteInfos = [];

getDeleteButtonsAndPreviewCards();

function getDeleteButtonsAndPreviewCards(){
    notePreviewCards = document.getElementsByClassName("note-preview-card");
    noteDeleteButtons = document.getElementsByClassName("note-delete-button");
    
    storedNoteInfos = JSON.parse(localStorage.getItem("stored-notes"));
}

for(let noteDeleteButton of noteDeleteButtons){
    noteDeleteButton.addEventListener("click", deleteNotePreviewCard);
}


function deletNotePreviewCard(){

    let notePreviewCard = this.parentElement;
    let notePreviewCardNameText = notePreviewCard.getElementsByClassName("note-name-preview");
    let notePreviewCardContentText = notePreviewCard.getElementsByClassName("note-content-preview");

    let noteDeleted = false;

    for(let i = 0; i < storedNoteInfos.length - 1; i++){
        if(storedNoteInfos[i].noteName == notePreviewCardNameText.textContent 
            && storedNoteInfos[i].noteContent == notePreviewCardContentText.textContent){
            storedNoteInfos.splice(i, 1);
            localStorage.setItem("stored-notes", JSON.stringify(storedNoteInfos));

            noteDeleted = true;
        }
    }

    notePreviewCard.classList.add("note-preview-card-exit");

    setTimeout(150, () => {notePreviewCard.parentElement.removeChild(notePreviewCard)});
    /*Get the list of stored notes. Get this button's parent element. Check for which of the stored inputs does this page have the same name and content buy looking at the textontents of its children*/
}


