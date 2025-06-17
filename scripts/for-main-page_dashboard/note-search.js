const searchInput = document.getElementById("note-search-input");
const pastSearchInputsDataList = document.getElementById("past-search-inputs-data-list");
let pastInputValues = [];

if(localStorage.getItem("current-note-search-input-value") !== null){
    searchInput.value = localStorage.getItem("current-note-search-input-value");
}

getPastInputValues();
function getPastInputValues() {
    if (localStorage.getItem("past-note-search-inputs") !== null) {
        pastInputValues = JSON.parse(localStorage.getItem("past-note-search-inputs"));
    }

    pastSearchInputsDataList.innerHTML = "";
    for(pastInputValue of pastInputValues){
        retreivePastSearchInput(pastSearchInputsDataList, pastInputValue);
    }
}

function retreivePastSearchInput(datalist, listItemValue){
    let newDataListItem = document.createElement("option");
    newDataListItem.value = listItemValue;

    datalist.appendChild(newDataListItem);
}

//note preview cards has already been declared in quick-delte-note.js

searchInput.addEventListener("change", searchForNotes);

function searchForNotes() {

    for (notePreviewCard of notePreviewCards) {
        if (searchInput.value.trim() == "" || notePreviewCard.textContent.toLowerCase().includes(searchInput.value.trim().toLowerCase()) === true) {
            notePreviewCard.style.flexGrow = "1";
            notePreviewCard.style.order = "0";
        }
        else {
            notePreviewCard.style.flexGrow = "0";
            notePreviewCard.style.order = "1";
        }
    }

    if(searchInput.value !== "" && pastInputValues.includes(searchInput.value) === false){
        pastInputValues.push(searchInput.value);

        localStorage.setItem("past-note-search-inputs", JSON.stringify(pastInputValues));
    }

    //didm't json stringify beacuse the value is string
    localStorage.setItem("current-note-search-input-value", searchInput.value);
    getPastInputValues();
}