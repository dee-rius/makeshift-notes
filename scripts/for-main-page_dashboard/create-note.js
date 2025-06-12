const noteCreateButton = document.getElementById("create-note-button");
noteCreateButton.addEventListener("click", createAndStoreNote);

if(localStorage.getItem("stored-notes") !== null){
    let retrievedNotes = JSON.parse(localStorage.getItem("stored-notes"));

    for(let note of retrievedNotes){
        createNotePreviewCard(note.noteName, note.noteContent);
    }
}

function createAndStoreNote(){
    let retrievedNotes = [];

    if(localStorage.getItem("stored-notes") !== null){
        retrievedNotes = JSON.parse(localStorage.getItem("stored-notes"));
    }

    let noteInfo = {
        noteName: "New Note",
        noteContent: "",
    };

    retrievedNotes.push(noteInfo);

    localStorage.setItem("stored-notes", JSON.stringify(retrievedNotes));
    localStorage.setItem("opened-note", JSON.stringify(noteInfo));

    location.href = "note-edit.html";
}
/* adds button info to the local storage*/

function createNotePreviewCard(noteName, noteContent){
   let notePreviewCard = document.createElement("div");
   notePreviewCard.name = "note-preview-card";
   notePreviewCard.classList.add(notePreviewCard.name, "has-transition");

   let notePreviewCardDeleteButton = document.createElement("button");
   notePreviewCardDeleteButton.name = "note-delete-button";
   notePreviewCardDeleteButton.classList.add(notePreviewCardDeleteButton.name, "has-transition", "clickable");
   notePreviewCardDeleteButton.textContent = "Delete";

   let clickToOpenNoteDiv = document.createElement("div");
   clickToOpenNoteDiv.name = "click-to-open-note-div";
   clickToOpenNoteDiv.classList.add(clickToOpenNoteDiv.name, "clickable")

   let notePreviewCardNameText = document.createElement("h3");
   notePreviewCardNameText.name = "note-name-preview";
   notePreviewCardNameText.classList.add(notePreviewCardNameText.name, "has-transition");
   notePreviewCardNameText.textContent = noteName;

   let notePreviewCardContentText = document.createElement("p");
   notePreviewCardContentText.name = "note-content-preview";
   notePreviewCardContentText.classList.add(notePreviewCardContentText.name);
   notePreviewCardContentText.textContent = noteContent;

   clickToOpenNoteDiv.append(notePreviewCardNameText, notePreviewCardContentText);
   notePreviewCard.append(notePreviewCardDeleteButton, clickToOpenNoteDiv);

   document.getElementById("notes-preview-cards-container").appendChild(notePreviewCard);
}