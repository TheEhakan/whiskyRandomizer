
//local bottle data
const bottlesWhisky = [];

//sends request to server to get bottles
async function getBottles() {

    //send request to server
    const response = await fetch(`${path}/userData/bottles`, {
        method: 'GET',
        headers: {
            'token': token
        }
    });
    const result = await response.json();

    //check if user is auth
    if (result === 'Not Authorized, invalid token') {
        console.log(result);
        return result;
    };

    //adds each bottle from server to local data
    for (let bottle of result) {
        bottlesWhisky.push(bottle)
    };
};


//updates bottle list on server
async function pushBottlesToServer(bottle, location) {

    //send bottle data to server
    const response = await fetch(`${path}/userData/bottles`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        },
        body: JSON.stringify(bottle)
    });
    const result = await response.json();

    //changes bottle locally
    bottlesWhisky.push(result[0]);

    //if bottles are added normally
    if (location === 'Bottle-Page') {

        //creates bottle display and updates info
        createBottleList(result[0]);
        totalBottles();
        sortList();

    };

};

//checks the inputs before submitting info
function bottleInputCheck(name, type, neat, iced, mixed) {

    //gathers bottle input info
    const bottleNameInput = document.getElementById("bottleName");
    const bottleTypeInput = document.getElementById('bottleType');
    const neatInput = document.getElementById('neato');
    const icedInput = document.getElementById('icedo');
    const mixedInput = document.getElementById('mixedo');
    const addBottleBtn = document.getElementById('addToList');

    //gets the modals to show errors
    const nameModal = document.getElementById('name-input-modal');
    const typeModal = document.getElementById('type-input-modal');
    const styleModal = document.getElementById('style-input-modal');
    const repeatNameModal = document.getElementById('repeat-name-modal');

    //sets values based on inputs
    name = bottleNameInput.value;
    type = bottleTypeInput.value;
    neat = neatInput.checked;
    iced = icedInput.checked;
    mixed = mixedInput.checked;

    //checks inputs for content
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

    //checks for duplicate bottle
    for (let bottle of bottlesWhisky) {
        if(addBottleBtn.value !== "Add Bottle") {
            break;
        }
        if (bottle.bottle_name.toLowerCase() === bottleNameInput.value.toLowerCase()) {
            const bottleNameModal = document.getElementById('bottleNameModal');
            bottleNameModal.innerText = `${bottle.bottle_name} is already on your list, choose a different or more detailed name.`;
            repeatNameModal.showModal();
            return;
        };
    };

    //changes what happens based on button value
    if (addBottleBtn.value === "Add Bottle") {
        addBottle(name, type, neat, iced, mixed);
    } else { editBottleInfo(name, type, neat, iced, mixed) };

}

//pushes bottle info into an object and stores it
function addBottle(name, type, neat, iced, mixed) {

    //get name input
    const bottleNameInput = document.getElementById("bottleName");

    //created obect to send to server
    const bottle = ({
        bottle_name: name,
        bottle_type: type,
        bottle_neat: neat,
        bottle_iced: iced,
        bottle_mixed: mixed,
    });

    //resets name for next bottle
    bottleNameInput.value = "";

    //change display back to normal
    sortList();
    styleSwitch();

    //sends data to server
    pushBottlesToServer(bottle, 'Bottle-Page');
};

//creates a info div for every bottle
function createBottleList({ bottle_id, bottle_name, bottle_type, bottle_neat, bottle_iced, bottle_mixed }) {

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

    //replaces characters in the name to make it useful
    let smallName = bottle_name.replaceAll(/[^A-Za-z0-9]/g, "");

    //creates the div for each bottle 
    const bottleDiv = 
        `<div id='${bottle_id}' class='info' name='info'>
            <button class='accordion' onclick='accOpen(event)'>${bottle_name}</button>
            <div id='A${smallName}' class='panel' style='display: none;'>
                <p>${bottle_type}</p>
                <label class='display-container' for='display'>
                    Neat
                    <input type='checkbox' onclick='defaultCheck(event)' ${bottle_neat ? 'checked' : ''}/>
                    <span class='display-checkmark'></span>
                </label>
                <label class='display-container' for='display'>
                    Iced
                    <input type='checkbox' onclick='defaultCheck(event)' ${bottle_iced ? 'checked' : ''}/>
                    <span class='display-checkmark'></span>
                </label>
                <label class='display-container' for='display'>
                    Mixed
                    <input type='checkbox' onclick='defaultCheck(event)' ${bottle_mixed ? 'checked' : ''} />
                    <span class='display-checkmark'></span>
                </label>
                <div id='button-div'>
                    <input type='button' value='Edit Bottle' name='editBottle' onclick='editBottle("${bottle_id}")' />
                    <input type='button' value='Delete' name='deleteBottle' onclick='confirmDeleteBottle(event, "${bottle_id}")' />
                </div>
            </div> 
        </div>`;

    //sets div based on bottle type
    switch (bottle_type) {
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

//delete/ edit bottle variables
let bottleId;
let bottleNumber;

//open modal to confirm delete
function confirmDeleteBottle(event, id) {

    //prevents refresh
    event.preventDefault();

    //sets up values to prepare to delete bottle
    bottleId = id;
    let confirmName = bottlesWhisky.find(({bottle_id}) => bottle_id === bottleId).bottle_name;
    bottleNumber = bottlesWhisky.findIndex(n => n.bottle_name === confirmName);
    document.getElementById(`delete-bottle-text`).innerText = `Are you sure you wish to delete ${confirmName}?`;

    //selects and opens modal
    const deleteBottleModal = document.getElementById('delete-bottle-modal');
    deleteBottleModal.showModal();

};

//confirms the choice to delete bottle data
function deleteBottleTrue(event) {
    
    //prevents reload of page
    event.preventDefault();

    //close modal
    closeModal('delete-bottle-modal');

    //deletes local data
    bottlesWhisky.splice(bottleNumber, 1);

    //selects and removes bottle info div
    let thisDiv = document.getElementById(bottleId);
    thisDiv.remove();
    thisDiv = document.getElementById(bottleId);
    thisDiv.remove();
    totalBottles();

    //sends delete request to server
    deleteBottleFromServer(bottleId);

};

//sends delete request to server
async function deleteBottleFromServer(id) {

    //sends data to server to delete bottle
    const response = await fetch(`${path}/userData/bottles`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        },
        body: JSON.stringify({id})
    })

};

//edit bottles
function editBottle(id) {

    //gathers elements needed to edit bottle info
    const bottleNameInput = document.getElementById("bottleName");
    const bottleTypeInput = document.getElementById('bottleType');
    const neatInput = document.getElementById('neato');
    const icedInput = document.getElementById('icedo');
    const mixedInput = document.getElementById('mixedo');
    const addBottleBtn = document.getElementById('addToList');
    const cancelEdit = document.getElementById("cancelEdit");

    let bottleHeader = document.getElementById("bottleHeader");
    let bottleDisplay = document.getElementById("bottleDisplay");

    //gathers info to prepare bottle edit 
    bottleId = id;
    let confirmName = bottlesWhisky.find(({bottle_id}) => bottle_id === bottleId).bottle_name;
    bottleNumber = bottlesWhisky.findIndex(n => n.bottle_name === confirmName);

    //sets focus to bottle name input for ease of access
    bottleNameInput.focus();

    //sets displayed inputs to current bottle info 
    bottleNameInput.value = bottlesWhisky[bottleNumber].bottle_name;
    bottleTypeInput.value = bottlesWhisky[bottleNumber].bottle_type;
    neatInput.checked = bottlesWhisky[bottleNumber].bottle_neat;
    icedInput.checked = bottlesWhisky[bottleNumber].bottle_iced;
    mixedInput.checked = bottlesWhisky[bottleNumber].bottle_mixed;

    //sets up display to edit bottle info
    addBottleBtn.value = "Update Bottle";
    bottleHeader.textContent = "Update Bottle";
    bottleDisplay.style.display = "none";
    optionalInfo.style.display = "block";
    cancelEdit.style.visibility = "visible";
};

//cancel the bottle edit
function cancelBottleEdit() {

    //gets bottle inputs and resets values
    const bottleNameInput = document.getElementById("bottleName");
    const bottleTypeInput = document.getElementById('bottleType');
    bottleNameInput.value = "";
    bottleTypeInput.value = "";

    //resets button value
    const addBottleBtn = document.getElementById('addToList');
    addBottleBtn.value = "Add Bottle";

    //resets display to normal
    cancelEdit.style.visibility = "hidden";
    bottleDisplay.style.display = "block";
    bottleHeader.textContent = "Add a bottle to the list";
    styleSwitch();
};

//prepares info to send to server
function editBottleInfo(name, type, neat, iced, mixed) {

    //creates object to send to server
    const bottle = {
        bottle_id: bottleId,
        bottle_name: name,
        bottle_type: type,
        bottle_neat: neat,
        bottle_iced: iced,
        bottle_mixed: mixed
    };
    
    //remove old divs after bottle edit 
    document.getElementById(bottleId).remove();
    document.getElementById(bottleId).remove();
    
    //resets input display after edit
    bottleHeader.textContent = "Add a bottle to the list";
    const bottleNameInput = document.getElementById("bottleName");
    const addBottleBtn = document.getElementById('addToList');
    addBottleBtn.value = "Add Bottle";
    bottleNameInput.value = "";
    cancelEdit.style.visibility = "hidden";
    bottleDisplay.style.display = "block";
    styleSwitch();

    //sends data to server
    editBottleOnServer(bottle, 'bottle list');
};

//send info to server to edit bottle
async function editBottleOnServer(bottle, location) {

    //sends new info to server
    const response = await fetch(`${path}/userData/bottles`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        },
        body: JSON.stringify(bottle)
    });
    const result = await response.json();

    //changes local bottle info
    bottlesWhisky[bottleNumber] = result;

    //creates bottle divs if on the bottle list page
    if (location === 'bottle list') {
        createBottleList(bottlesWhisky[bottleNumber]);
        sortList();
    };
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
