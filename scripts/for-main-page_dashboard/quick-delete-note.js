let deleteButtons = [];
let notePreviewCards = [];
//storedNoteInfos has already been declared in open-note.js

getVariableValues();

function getVariableValues() {
    deleteButtons = document.getElementsByClassName("note-delete-button");
    notePreviewCards = document.getElementsByClassName("note-preview-card");
    storedNoteInfos = JSON.parse(localStorage.getItem("stored-notes"));
}

for (i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", deleteThisNote);
}

function deleteThisNote() {
    if (!confirm("This note will be permanently deleted. Would you like to continue?")) {
        return;
    }
    else {
        //this is used because the button index is shared by its parent element as well as the appropriate note info in the array of stored infos
        let noteIndex = Array.from(deleteButtons).indexOf(this);

        let notePreviewCardsContainer = document.getElementById("notes-preview-cards-container");
        let thisNotePreviewCard = this.parentElement;

        //remove from stored note infos
        storedNoteInfos.splice(noteIndex, 1);
        console.log("stored note arr", storedNoteInfos);
        localStorage.setItem("stored-notes", JSON.stringify(storedNoteInfos));

        //start animation and reduce width
        thisNotePreviewCard.style.flexGrow = "0";
        thisNotePreviewCard.classList.add("preview-card-exit");

        smoothDeletion();

        function smoothDeletion() {
            let animationDuration = 300;

            //uses an equation similar to time = distance/speed to determine how long the animation should las and how long to wait before deleting
            let waitDuration = parseInt(thisNotePreviewCard.clientWidth / animationDuration * 100);
            thisNotePreviewCard.style.animationDuration = String(waitDuration) + "ms";

            console.log(waitDuration);
            console.log(thisNotePreviewCard.clientWidth);
            console.log(animationDuration);

            setTimeout(() => { notePreviewCardsContainer.removeChild(thisNotePreviewCard) }, waitDuration);
        }

        getVariableValues();
    }
}


//for loop to answer event listeners by index

//function to remove note preview card when button is click along with stiored info that has the note preview cards note name and content