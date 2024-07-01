
//items needed for the bottle input
const addBottleForm = document.getElementById("bottleForm");
    const bottleNameInput = addBottleForm["bottleName"];
    const bottleTypeInput = addBottleForm['bottleType'];
    const neatInput = addBottleForm['neato'];
    const icedInput = addBottleForm['icedo'];
    const mixedInput = addBottleForm['mixedo'];
    const addBottleBtn = addBottleForm['addToList'];
const nameModal = document.getElementById('name-input-modal');
const typeModal = document.getElementById('type-input-modal');
const styleModal = document.getElementById('style-input-modal');
const repeatNameModal = document.getElementById('repeat-name-modal');
const deleteBottleModal = document.getElementById('delete-bottle-modal');

//all the bottle div elements in the DOM
let bottlesOnHand;
    const allbottlesOnHand = document.querySelector("#allbottlesOnHand");
    const whiskyOnHand = document.querySelector("#whiskyOnHand");
    const tequilaOnHand = document.querySelector("#tequilaOnHand");
    const rumOnHand = document.querySelector("#rumOnHand");
    const cognacOnHand = document.querySelector("#cognacOnHand");
    const ginOnHand = document.querySelector("#ginOnHand");
    const vodkaOnHand = document.querySelector("#vodkaOnHand");
    const otherOnHand = document.querySelector("#otherOnHand");

//bottle storage
const bottlesWhisky = JSON.parse(localStorage.getItem("Whisky")) || [];

//checks the inputs before submitting info
function bottleInputCheck(name, type, neat, iced, mixed) {
    name = bottleNameInput.value;
    type = bottleTypeInput.value;
    neat = neatInput.checked;
    iced = icedInput.checked;
    mixed = mixedInput.checked;
        if (bottleNameInput.value === "" || bottleNameInput.value === " ") {
            nameModal.showModal();
            return;
        };        
        if (bottleTypeInput.value === "") {
            typeModal.showModal();
            return;
        };
        if (!neatInput.checked && !icedInput.checked && !mixedInput.checked) {
            styleModal.showModal();
            return;
        };

        let n;
        for (n = 0; n < bottlesWhisky.length; n++) {
            if(addBottleBtn.value !== "Add Bottle") {
                break;
            }
            if (bottlesWhisky[n] === "") {
                continue;
            };
            if (bottlesWhisky[n].name.toLowerCase() === bottleNameInput.value.toLowerCase()) {
                const bottleNameModal = document.getElementById('bottleNameModal');
                bottleNameModal.innerText = `${bottlesWhisky[n].name} is already on your list, choose a different or more detailed name.`;
                repeatNameModal.showModal();
                return;
            };
        };

    if (addBottleBtn.value === "Add Bottle") {
        addBottle(name, type, neat, iced, mixed);
    } else { editBottleInfo(name, type, neat, iced, mixed) };
}

//pushes bottle info into an object and stores it
function addBottle(name, type, neat, iced, mixed) {

        bottlesWhisky.push({
            name,
            type,
            neat,
            iced,
            mixed
        });
        localStorage.setItem("Whisky", JSON.stringify(bottlesWhisky));
        document.getElementById("bottleName").value = "";
        createBottleList({ name, type, neat, iced, mixed });
        sortList();
        bottleNameInput.value = "";
        styleSwitch();
        totalBottles();
};

//creates a info div for every bottle
function createBottleList({ name, type, neat, iced, mixed }) {

    //finds the index to set as an ID
    let thisBottle = bottlesWhisky.findIndex(n => n.name === name);
    let smallName = name.replaceAll(/[^A-Za-z0-9]/g, "");

    //creates the div for each bottle 
    const bottleDiv = 
        `<div id='${thisBottle}' class='info' name='info'>
            <button class='accordion' onclick='accOpen(event)'>${name}</button>
            <div id='A${smallName}' class='panel' style='display: none;'>
                <p>${type}</p>
                <label class='container' for='display'>
                    Neat
                    <input type='checkbox' onclick='defaultCheck(event)' ${neat ? 'checked' : ''}/>
                    <span class='checkmark'></span>
                </label>
                <label class='container' for='display'>
                    Iced
                    <input type='checkbox' onclick='defaultCheck(event)' ${iced ? 'checked' : ''}/>
                    <span class='checkmark'></span>
                </label>
                <label class='container' for='display'>
                    Mixed
                    <input type='checkbox' onclick='defaultCheck(event)' ${mixed ? 'checked' : ''} />
                    <span class='checkmark'></span>
                </label>
                <input type='button' value='Edit Bottle' name='editBottle' onclick='editBottle(${thisBottle})' />
                <input type='button' value='Delete' name='deleteBottle' onclick='confirmDeleteBottle(${thisBottle})' />
            </div> 
        </div>`;

        //sets div based on bottle type
    switch (type) {
        case "Whisky":
            bottlesOnHand = whiskyOnHand;
            break;
        case "Rum":
            bottlesOnHand = rumOnHand;
            break;
        case "Tequila/ Mezcal":
            bottlesOnHand = tequilaOnHand;
            break;
        case "Gin":
            bottlesOnHand = ginOnHand;
            break;
        case "Cognac/ Armagnac":
            bottlesOnHand = cognacOnHand;
            break;
        case "Vodka":
            bottlesOnHand = vodkaOnHand;
            break;
        default:
            bottlesOnHand = otherOnHand;
            break;
    };

    //add to the DOM 
    allbottlesOnHand.innerHTML += bottleDiv;
    bottlesOnHand.innerHTML += bottleDiv;
}

//delete bottles
let bottleId;

function confirmDeleteBottle(id) {
    console.log(id);
    confirmName = bottlesWhisky[id].name;
    bottleId = id;
    document.getElementById(`delete-bottle-text`).innerText = `Are you sure you wish to delete ${confirmName}?`
    deleteBottleModal.showModal();
};

function deleteBottleTrue() {
    let thisDiv = document.getElementById(bottleId);
    closeModal(deleteBottleModal);
    bottlesWhisky.splice(bottleId, 1, "");
    localStorage.setItem("Whisky", JSON.stringify(bottlesWhisky));
    thisDiv.remove();
    thisDiv = document.getElementById(bottleId);
    thisDiv.remove();
    totalBottles();
};

//edit bottles
let id2;
const cancelEdit = document.getElementById("cancelEdit");
cancelEdit.style.visibility = "hidden";

function editBottle(id) {
    let bottleHeader = document.getElementById("bottleHeader");
    let bottleDisplay = document.getElementById("bottleDisplay");
    id2 = id;
    bottleNameInput.focus();
    bottleNameInput.value = bottlesWhisky[id].name;
    bottleTypeInput.value = bottlesWhisky[id].type;
    neatInput.checked = bottlesWhisky[id].neat;
    icedInput.checked = bottlesWhisky[id].iced;
    mixedInput.checked = bottlesWhisky[id].mixed;
    addBottleBtn.value = "Update Bottle";
    bottleHeader.textContent = "Update Bottle";
    bottleDisplay.style.display = "none";
    optionalInfo.style.display = "block";
    cancelEdit.style.visibility = "visible";
    console.log(bottlesWhisky[id]);
};

cancelEdit.addEventListener("click", function () {

    addBottleBtn.value = "Add Bottle";
    cancelEdit.style.visibility = "hidden";
    bottleNameInput.value = "";
    bottleTypeInput.value = "";
    bottleDisplay.style.display = "block";
    bottleHeader.textContent = "Add a bottle to the list";
    styleSwitch();
});

function editBottleInfo(name, type, neat, iced, mixed) {

    cancelEdit.style.visibility = "hidden";
    bottleDisplay.style.display = "block";
    bottlesWhisky[id2] = {
        name,
        type,
        neat,
        iced,
        mixed
    };
    localStorage.setItem("Whisky", JSON.stringify(bottlesWhisky));
    document.getElementById(id2).remove();
    document.getElementById(id2).remove();
    createBottleList(bottlesWhisky[id2]);
    bottleHeader.textContent = "Add a bottle to the list";
    addBottleBtn.value = "Add Bottle";
    bottleNameInput.value = "";
    styleSwitch();
    sortList();
};

//sorts bottle items alphabetically
function sortList() {
    let list = document.getElementsByName("bottlesOnHand2")
    let list2, shouldSwitch, i, b, c;
    let switching = true;
    for (c = 0; c < list.length; c++) {
        list2 = document.getElementById(list[c].id);
        switching = true;
        while (switching) {
            switching = false;
            b = list2.getElementsByClassName("info");
            for (i = 0; i < (b.length - 1); i++) {
                shouldSwitch = false;
                if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                };
            };
            if (shouldSwitch) {
                b[i].parentNode.insertBefore(b[i + 1], b[i]);
                switching = true;
            };
        };
    };
};