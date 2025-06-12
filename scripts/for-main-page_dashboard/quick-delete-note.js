let deleteButtons = [];
let notePreviewCards = [];
//storedNoteInfos has already been declared in open-note.js
getVariableValues();

function getVariableValues(){
    deleteButtons =Array.from(document.getElementsByClassName("note-delete-button"));
    notePreviewCards = document.getElementsByClassName("note-preview-card");
    storedNoteInfos = JSON.parse(localStorage.getItem("stored-notes"));
}

for(i = 0; i < deleteButtons.length; i++){
    deleteButtons[i].addEventListener("click", deleteThisNote)
}

function deleteThisNote(){
    let notePreviewCardsContainer = document.getElementById("notes-preview-cards-container");
    let thisNotePreviewCard = this.parentElement;
    thisNotePreviewCard.style.flexGrow = "0";
    thisNotePreviewCard.classList.add("preview-card-exit");
    
    smoothDeletion();
    
    function smoothDeletion(){
        let animationDuration = eval(String(thisNotePreviewCard.clientWidth / thisNotePreviewCard.style.animationDuration / 1000)); 
        console.log(animationDuration);
        console.log(thisNotePreviewCard.clientWidth);
        console.log(thisNotePreviewCard.style.animationDuration);

        setTimeout(() => {notePreviewCardsContainer.removeChild(thisNotePreviewCard)}, animationDuration);
    }


    storedNoteInfos.splice(deleteButtons.indexOf(this), 1);
    localStorage.setItem("stored-notes", JSON.stringify(storedNoteInfos));

    getVariableValues();
}


//for loop to answer event listeners by index

//function to remove note preview card when button is click along with stiored info that has the note preview cards note name and content