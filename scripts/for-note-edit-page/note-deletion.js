const deleteButton = document.getElementById("delete-button");

/*
Variables already decalared in note-editing.js:
- noteNameInout
- noteContentInput
- openedNoteInfo
-  storedNoteInfo
*/

deleteButton.addEventListener("click", deleteThisNote);

function deleteThisNote(){
    let noteDeleted = false;
    for(let noteInfo of storedNoteInfos){

        if(noteDeleted === false){
            if(noteInfo.noteName == noteNameInput.value && noteInfo.noteContent == noteContentInput.value){
                storedNoteInfos.splice(storedNoteInfos.indexOf(noteInfo), 1);

                noteDeleted = true;
            }
        }
    }

    localStorage.setItem("stored-notes", JSON.stringify(storedNoteInfos));
    localStorage.setItem("opened-note", JSON.stringify({}));

    location.href = "index.html";
}