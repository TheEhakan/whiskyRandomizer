
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

//the main bottle collection list
const bottlesWhisky = JSON.parse(localStorage.getItem("Whisky")) || [];

//items for the cocktail input
const cocktailForm = document.getElementById('cocktail-form');
    const cocktailNameInput = cocktailForm['cocktailName'];
    const cocktailBaseSpirit = cocktailForm['cocktail-base-spirit'];
    const numOfIngredients = cocktailForm['ingredient-number'];
    const cocktailRecipe = cocktailForm['recipe-input'];
const deleteCocktailModal = document.getElementById('delete-cocktail-modal');

//array of recipes available to make
const cocktails = JSON.parse(localStorage.getItem('Cocktails')) || [];

//style selector variables
const settings = JSON.parse(localStorage.getItem("settings")) || [false, false, false];
const optionalInfo = document.getElementById("optionalInfo");
const styleSelector = document.getElementById("styleSelector");
styleSelector.checked = settings[0];
styleSelector.addEventListener("click", styleSwitch);

//search bar variables
const search = document.getElementById("bottleSearch");
const searchSelector = document.getElementById("searchSelector");
searchSelector.checked = settings[1];
searchSelector.addEventListener("click", searchSwitch);

//toggle category variables
const categorySelector = document.getElementById("categorySelector");
categorySelector.checked = settings[2];
const tablink2 = document.getElementsByClassName("tablink2");
const tabcontent2 = document.getElementsByName("bottlesOmHand2");
categorySelector.addEventListener("click", categorySwitch);

//clears empty array units
bottlesWhisky.forEach(function () {
    for (let i = 0; i < bottlesWhisky.length; i++) {
        if (bottlesWhisky[i] === "") {
            bottlesWhisky.splice(i, 1);
        };
    };
    localStorage.setItem("Whisky", JSON.stringify(bottlesWhisky));
});
cocktails.forEach(function () {
    for (let i = 0; i < cocktails.length; i++) {
        if (cocktails[i] === "") {
            cocktails.splice(i, 1);
        };
    };
    localStorage.setItem("Cocktails", JSON.stringify(cocktails));
});

//sets a bottle count display
function totalBottles() {
    let total = bottlesWhisky.filter((t) => t.name);
    let bottleCount = document.getElementById("bottleCount");
    bottleCount.textContent = `Bottles on Hand: ${total.length}`;

    let totalWhisky = bottlesWhisky.filter((w) => w.type === "Whisky");
    let whiskyTotal = document.getElementById("defaultOpen2");
    whiskyTotal.textContent = `Whisky - ${totalWhisky.length}`;

    let totalRum = bottlesWhisky.filter((r) => r.type === "Rum");
    let rumTotal = document.getElementById("rumTotal");
    rumTotal.textContent = `Rum - ${totalRum.length}`;

    let totalGin = bottlesWhisky.filter((g) => g.type === "Gin");
    let ginTotal = document.getElementById("ginTotal");
    ginTotal.textContent = `Gin - ${totalGin.length}`;

    let totalTequila = bottlesWhisky.filter((t) => t.type === "Tequila/ Mezcal");
    let tequilaTotal = document.getElementById("tequilaTotal");
    tequilaTotal.textContent = `Tequila/ Mezcal - ${totalTequila.length}`;

    let totalCognac = bottlesWhisky.filter((c) => c.type === "Cognac/ Armagnac");
    let cognacTotal = document.getElementById("cognacTotal");
    cognacTotal.textContent = `Cognac/ Armagnac - ${totalCognac.length}`;

    let totalVodka = bottlesWhisky.filter((v) => v.type === "Vodka");
    let vodkaTotal = document.getElementById("vodkaTotal");
    vodkaTotal.textContent = `Vodka - ${totalVodka.length}`;

    let totalOther = bottlesWhisky.filter((o) => o.type === "Other");
    let otherTotal = document.getElementById("otherTotal");
    otherTotal.textContent = `Other - ${totalOther.length}`;
};

//items needed for startup
console.log(bottlesWhisky);
console.log(settings);
console.log(cocktails);
bottlesWhisky.forEach(createBottleList);
cocktails.forEach(createCocktailCard);
sortList();
styleSwitch();
searchSwitch();
categorySwitch();
totalBottles();
insertIngredient();


//allows the enter key to be used to submit 
bottleNameInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        addBottle();
    };
});

//checks to see if the first letter is a vowel
function isVowel(word) {
    let nameToCheck = word.toLowerCase().at(0);
    if(nameToCheck === 'a' || nameToCheck === 'e' || nameToCheck === 'i' || nameToCheck === 'o' || nameToCheck === 'u') {
        return true
    } else { return false };
};

//closes the specifiv modal
function closeModal(name) {
    name.close();
};

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


//makes div checkboxes for display only
function defultCheck(event) {
    event.preventDefault();
};

//the randomizer
let drinkRandom, style, cocktail;

function chooseDrink() {
    const neatq = document.querySelector("#neatq");
    const icedq = document.querySelector("#icedq");
    const mixedq = document.querySelector("#mixedq");
    let type = document.getElementById("bottleTypeq").value;
    const random = [];
    let result, bottleTypeChoice, drink, filteredCocktails;
    //Gets bottle options based off type
    if (type === "") {
        alert("Please select a bottle type");
        return;
    } else if (type === "Any") {
        bottleTypeChoice = bottlesWhisky;
    } else {
        bottleTypeChoice = bottlesWhisky.filter((b) => b.type == type);
    };

    if (bottleTypeChoice.length === 0) {
        if (type === "Any") {
            alert("No available bottles on hand.");
            return;
        } else {
            alert("No available " + type + " bottles on hand.");
            return;
        };
    };

    //looks at style options selected and chooses one
    if (neatq.checked) {
        random.push("Neat");
    };
    if (icedq.checked) {
        random.push("Iced");
    };
    if (mixedq.checked) {
        random.push("Mixed");
    };

    if (random.length === 0) {
        alert("Select at least one drink style.");
        return;
    } else {
        style = random[Math.floor(Math.random() * random.length)];
    };

    //filters bottles further based on style or drink
    if (style === "Neat") {
        result = bottleTypeChoice.filter((r) => r.neat == true);
    };
    if (style === "Iced") {
        result = bottleTypeChoice.filter((r) => r.iced == true);
    };
    if (style === "Mixed") {
        result = bottleTypeChoice.filter((r) => r.mixed == true);
    };
    if (result.length === 0) {
        alert(`There are not options for ${type} as ${isVowel(style) ? 'an' : 'a'} ${style} drink.`);
        return;
    };

    //chooses a single bottle to display
    drinkRandom = result[Math.floor(Math.random() * result.length)];
    drink = drinkRandom.name;
    type = drinkRandom.type;

    //chooses a cocktail based on the bottle choice
    if (style === "Mixed") {
        if (type === "Other") {
            style += ", as a cocktail of your choice!";
        } else {
            filteredCocktails = cocktails.filter(c => c.spirit === type);
            cocktail = filteredCocktails[Math.floor(Math.random() * filteredCocktails.length)].name;
            style += `, perhaps as ${isVowel(cocktail) ? 'an' : 'a' } <button id='display-cocktail-recipe'>${cocktail}</button>`;
        };
    };

    //displayes the choice based on all previous selections
    let drinkDisplay = document.getElementById("drink2");
    drinkDisplay.innerHTML = `<h3>You should drink ${drink} ${style}</h3>`;
    drinkEnjoy.style.display = "block";
    enjoyChoice.style.display = "block";
    let didEnjoy = document.getElementById("enjoyDisplay");
    didEnjoy.textContent = "";
    document.getElementById('enjoyedDrink').focus();
};

//changes objects if needed if you enjoyed the drink or not
let drinkEnjoy = document.getElementById("drinkEnjoy");
drinkEnjoy.style.display = "none";
let enjoyChoice = document.getElementById("enjoyChoice");
let enjoyDisplay = document.getElementById("enjoyDisplay");

function enjoyedThisDrink() {
    enjoyDisplay.textContent = "Wonderful! Glad it was a good choice.";
    enjoyChoice.style.display = "none";
};

function didNotEnjoy() {
    enjoyDisplay.textContent = "Sorry to hear that, this will no longer be an option for you.";
    enjoyChoice.style.display = "none";
    style = style.slice(0, 5).trim();
    let sampled = bottlesWhisky.indexOf(drinkRandom);
    console.log(sampled);
    if (style === "Neat") {
        bottlesWhisky[sampled].neat = false;
    };
    if (style === "Iced") {
        bottlesWhisky[sampled].iced = false;
    };
    if (style === "Mixed") {
        bottlesWhisky[sampled].mixed = false;
    };
    localStorage.setItem("Whisky", JSON.stringify(bottlesWhisky));
    document.getElementById(sampled).remove();
    document.getElementById(sampled).remove();
    createBottleList(bottlesWhisky[sampled]);
    sortList();
};

//style selector setting
function styleSwitch() {
    if (styleSelector.checked) {
        optionalInfo.style.display = "block";
    } else {
        document.getElementById("neato").checked = true;
        document.getElementById("icedo").checked = true;
        document.getElementById("mixedo").checked = true;
        optionalInfo.style.display = "none";
    };
    settings.splice(0, 1, styleSelector.checked);
    localStorage.setItem("settings", JSON.stringify(settings));
}

//search bar setting
function searchSwitch() {
    if (searchSelector.checked) {
        search.style.display = "block";
    } else {
        search.style.display = "none";
    };
    settings.splice(1, 1, searchSelector.checked);
    localStorage.setItem("settings", JSON.stringify(settings));
};

//toggle category setting
function categorySwitch() {
    bottlesOnHand = document.getElementById("bottlesOnHand");
    if (categorySelector.checked) {
        allbottlesOnHand.style.display = "none";
        bottlesOnHand.style.display = "block";
    } else {
        allbottlesOnHand.style.display = "block";
        bottlesOnHand.style.display = "none";
    };
    settings.splice(2, 1, categorySelector.checked);
    localStorage.setItem("settings", JSON.stringify(settings));
};

//search through bottles
function bottleSearch() {
    var input, filter, ul, li, a, i, b, txtValue;
    input = document.getElementById("bottleSearch");
    filter = input.value.toUpperCase();
    ul = document.getElementsByName("bottlesOnHand2");
    for (b = 0; b < ul.length; b++) {
        li = ul[b].getElementsByClassName("info");
        for (i = 0; i < li.length; i++) {
            a = li[i];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            };
        };
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

//functionality to switch and view tabs
function openPage(pageName, elmnt, color) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    };
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    };
    document.getElementById(pageName).style.display = "block";
    elmnt.style.backgroundColor = color;
};
document.getElementById("defaultOpen").click();

//makes bottle category tabs work
function openPage2(pageName, elmnt, color) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent2");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    };
    tablinks = document.getElementsByClassName("tablink2");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    };
    document.getElementById(pageName).style.display = "block";
    elmnt.style.backgroundColor = color;
};
document.getElementById("defaultOpen2").click();

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

//makes accordian panels work
function accOpen(event) {
    let i, panel, acc;
    panel = document.getElementsByClassName("panel");
    let accElement = event.target.nextElementSibling;
    if (accElement.style.display == "block") {
        acc = true;
    } else if (accElement.style.display == "none") {
        acc = false;
    };
    for (i = 0; i < panel.length; i++) {
        panel[i].style.display = "none";
    };
    if (acc) {
        accElement.style.display = "none";
    } else {
        accElement.style.display = "block";
    };
};

//sets the number of ingredients for a cocktail recipe
function insertIngredient() {
    let ingredientNumber = 1;
    const numberOfIngredients = document.getElementById('ingredient-number').value;
    const ingredientDiv = document.getElementById('ingredient-div');
    ingredientDiv.innerHTML = "";

    for(let i = 0; i < numberOfIngredients; i++) {
        const ingredientInput = `<input type="text" class="ingredient-input" id="ingredient${ingredientNumber}" placeholder='Ingredient ${ingredientNumber}'/>`;
        ingredientDiv.innerHTML += ingredientInput;
        ingredientNumber++;
    };
};

//adds a coctail to your setup
function addCocktail(name, spirit, recipe) {
    let ingredient;
    let index = 0;
    const ingredientInput = document.getElementsByClassName('ingredient-input');
    
    name = cocktailNameInput.value;
    spirit = cocktailBaseSpirit.value;
    const ingredients = {};
    recipe = cocktailRecipe.value;

    if(cocktailNameInput.value === ''){
        alert('Cocktail name must be provided');
        return;
    };
    if(cocktailBaseSpirit.value === ''){
        alert('Please provide the base Spirit.');
        return;
    };

    for(ingredient of ingredientInput){
        if(ingredient.value !== "") {
        ingredients[ingredient.id] = ingredient.value;
        ingredientInput[index].value = "";
        index ++;
        } else {
            continue;
        };
    };

    if(Object.keys(ingredients).length === 0){
        alert('Please provide the ingredients for this cocktail');
        return;
    };

    cocktails.push({
        name,
        spirit,
        ingredients,
        recipe
    });

    cocktailNameInput.value = "";
    cocktailRecipe.value = ""

    console.log(cocktails);
    localStorage.setItem("Cocktials", JSON.stringify(cocktails));
    createCocktailCard({ name, spirit, ingredients, recipe })
};

function createCocktailCard({ name, spirit, ingredients, recipe }) {
    let ingredient, eachIngredient;
    const recipeCardDiv = document.getElementById("recipe-cards");
    let thisCocktail = cocktails.findIndex(n => n.name === name);

    eachIngredient = ''

    for(ingredient in ingredients){
        eachIngredient += `<li>${ingredients[ingredient]}</li>`;
    };

    const recipeCard = 
        `<div class="recipeCard" id="cocktail${thisCocktail}" name='${spirit}Recipe'>
            <h2>${name}</h2> 
            <ul>
                ${eachIngredient}
            </ul>
            <p>${recipe}</p>
            <input type='button' onclick='editCocktail(cocktail${thisCocktail})' value='Edit Cocktial' />
            <input type='button' onclick='confirmDeleteCocktail(cocktail${thisCocktail})' value='Delete' />
        </div>`;

    recipeCardDiv.innerHTML += recipeCard;  
};

let cocktailId;

function confirmDeleteCocktail(id){
    console.log(id);
    let cocktailNumber = id.id.slice(8, 10);
    console.log(cocktailNumber)
    confirmName = cocktails[cocktailNumber].name;
    document.getElementById('delete-cocktail-text').innerText = `Are you sure you wish to delete your ${confirmName} recipe?`
    deleteCocktailModal.showModal();
    cocktailId = id;
};

function deleteCocktailTrue() {
    let thisDiv = document.getElementById(cocktailId.id);
    cocktails.splice(cocktailId, 1, "");
    localStorage.setItem("Cocktials", JSON.stringify(cocktails));
    thisDiv.remove();
    closeModal(deleteCocktailModal);
};




//allows for easy app testing
const test = document.getElementById("test");
if (bottlesWhisky.length > 0) {
    test.value = "Clear Bottle List";
};

function testApp() {
    if (test.value === "Test App") {
        bottlesWhisky.push(
            { name: "Ardbeg 10", type: "Whisky", neat: true, iced: false, mixed: true },
            { name: "Oban 14", type: "Whisky", neat: true, iced: false, mixed: false },
            { name: "Old Tub", type: "Whisky", neat: true, iced: true, mixed: true },
            { name: "Makers Mark 101", type: "Whisky", neat: true, iced: false, mixed: true },
            { name: "The Classic Laddie", type: "Whisky", neat: true, iced: true, mixed: true },
            { name: "Weller Special Reserve", type: "Whisky", neat: false, iced: true, mixed: true },
            { name: "Four Roses Single Barrel", type: "Whisky", neat: true, iced: true, mixed: false },
            { name: "Laphroaig 10", type: "Whisky", neat: false, iced: false, mixed: true },
            { name: "Wild Turkey Rare Breed", type: "Whisky", neat: true, iced: true, mixed: false },
            { name: "Smooth Ambler Old Scout", type: "Whisky", neat: false, iced: false, mixed: true },
            { name: "Suntory Toki", type: "Whisky", neat: false, iced: true, mixed: true },
            { name: "Hamilton 86", type: "Rum", neat: true, iced: false, mixed: true },
            { name: "Appleton Estate Reserve", type: "Rum", neat: false, iced: false, mixed: true },
            { name: "Watershed Four Peel", type: "Gin", neat: false, iced: true, mixed: true },
            { name: "Middle West Vim Petal", type: "Gin", neat: true, iced: false, mixed: true },
            { name: "El Tesoro Reposado", type: "Tequila/ Mezcal", neat: true, iced: false, mixed: true },
            { name: "Del Maguey Vida", type: "Tequila/ Mezcal", neat: true, iced: false, mixed: true },
            { name: "Pierra Ferrand 1840", type: "Cognac/ Armagnac", neat: true, iced: true, mixed: true },
            { name: "Castarède VSOP", type: "Cognac/ Armagnac", neat: true, iced: false, mixed: true },
            { name: "Watershed Vodka", type: "Vodka", neat: false, iced: true, mixed: true },
        );
        localStorage.setItem("Whisky", JSON.stringify(bottlesWhisky));
        location.reload();
    } else {
        if (confirm("Are you sure you want to clear all bottle data?")) {
            bottlesWhisky.length = 0;
            localStorage.setItem("Whisky", JSON.stringify(bottlesWhisky));
            location.reload();
        } else {
            return;
        };
    };
};

const cocktailTest = document.getElementById('cocktail-test');
if(cocktails.length > 0){
    cocktailTest.value = 'Clear Cocktails'
};

function testCocktails() {
    if(cocktailTest.value === 'Test Cocktails'){
        cocktails.push(
            { name: 'Old Fashioned', spirit: 'Whisky', ingredients: { ingredient1: '2 ounces Whisky', ingredient2: 'Barspoon of Syrup', ingredient3: '2 dashes Bitters' }, recipe: 'Stir all ingredients over ice in a glass until chilled. Garnish with orange twist.' },
            { name: 'Whisky Sour', spirit: 'Whisky', ingredients: { ingredient1: '2 ounce Whisky', ingredient2: '3/4 ounce Lemon Juice', ingredient3: '1/2 ounce Syrup',  ingredient4: '(Optional) Egg White'}, recipe: 'Dry shake all ingredients for 20 seconds. Add ice and shake for another 20 seconds, strain and serve with Bitters' },
            { name: 'Manhatten', spirit: 'Whisky', ingredients: { ingredient1: '2 ounce Whisky' , ingredient2: '1 ounce Sweet Vermouth' , ingredient3: '2 dashes Bitters' }, recipe: 'Stir all ingredients over ice in a glass until chilled, strain. Garnish with lemon twist.' },
            { name: 'Mojito', spirit: 'Rum', ingredients: { ingredient1: '2 ounce Rum', ingredient2: '1 ounce Lime Juice', ingredient3: '1/2 ounce Syrup', ingredient4: '5 Mint Leaves', ingredient5: 'Club Sode'}, recipe: 'Gently muddle syrup and mint, add Rum and Lime, shake with ice. Strain into glass with crushed ice and top with club soda. Garnish with lime wheel and mint' },
            { name: 'Daiquiri', spirit: 'Rum', ingredients: {ingredient1: '2 ounce Rum', ingredient2: '1 ounce Lime Juice', ingredient3: '3/4 ounce Syrup'}, recipe: 'Shake all ingredients with ice, strain and garnish with a lime twist' },
            { name: 'Mai Tai', spirit: 'Rum', ingredients: {ingredient1: '1 1/2 ounce Rum', ingredient2: '1 ounce Sweet Vermouth', ingredient3: '2 dashes Bitters'}, recipe: 'Stir all ingredients over ice in a glass until chilled, strain. Garnish with lemon twist.' },
            { name: 'Margarita', spirit: 'Tequila/ Mezcal', ingredients: {ingredient1: '2 ounce Tequila/ Mezcal', ingredient2: '3/4 ounce Lime juice', ingredient3: '1/2 ounce triple sec', ingredient4: 'Barspoon of Agave'}, recipe: 'Shake all ingredients with ice, strain over ice and garnish with a lime twist' },
            { name: 'Paloma', spirit: 'Tequila/ Mezcal', ingredients: {ingredient1: '2 ounce Tequila/ Mezcal', ingredient2: '2 ounces Grapefruit Juice', ingredient3: '2 ounces Sparkling Water', ingredient4: '1/2 ounce Lime Juice', ingredient5: '1/4 ounce Agave'}, recipe: 'Shake all ingredients except Sparkling Water with ice, strain over ice, top with Sparkling Water and garnish with a lime twist' },
            { name: 'Oaxaca Old Fashioned', spirit: 'Tequila/ Mezcal', ingredients: {ingredient1: '2 ounce Tequila/ Mezcal', ingredient2: 'Barspoon of Agave', ingredient3: '2 dashes Bitters'}, recipe: 'Stir all ingredients over ice in a glass until chilled. Garnish with orange twist.' },
            { name: 'Gin & Tonic', spirit: 'Gin', ingredients: {ingredient1: '2 ounce Gin', ingredient2: '4 ounces Tonic Water', ingredient3: '1 Lime, Quartered'}, recipe: 'Gently stir everything with ice, add Lime to taste.' },
            { name: 'Last Word', spirit: 'Gin', ingredients: {ingredient1: '3/4 ounce Gin', ingredient2: '3/4 ounce green Chartreuse', ingredient3: '3/4 ounce Maraschino Liqueur', ingredient4: '3/4 ounce Lime Juice'}, recipe: 'Shake everything with ice, strain into glass' },
            { name: "Bee's Knees", spirit: 'Gin', ingredients: {ingredient1: '2 ounce Gin', ingredient2: '3/4 ounce Honey Syrup', ingredient3: '3/4 ounce Lemon Juice'}, recipe: 'Shake everything with ice, strain into glass' },
            { name: 'Sidecar', spirit: 'Cognac/ Armagnac', ingredients: {ingredient1: '1 1/2 ounce Cognac/ Armagnac', ingredient2: '3/4 ounce Orange Liqueur', ingredient3: '3/4 ounce Lemon Juice'}, recipe: 'Shake everything with ice, strain into glass. Garnish with Orange Twist' },
            { name: 'Vieux Carré', spirit: 'Cognac/ Armagnac', ingredients: {ingredient1: '1 ounce Cognac/ Armagnac', ingredient2: '1 ounce rye Whisky', ingredient3: '1 ounce Sweet Vermouth', ingredient4: '1/4 ounce Bénédictine', ingredient5: '4 dashes Bitter'}, recipe: 'Stir over ice until chilled. Srain into glass, garnish with lemon peel.' },
            { name: 'French Connection', spirit: 'Cognac/ Armagnac', ingredients: {ingredient1: '1 1/2 ounce Cognac/ Armagnac', ingredient2: '1 ounce Amaretto'}, recipe: 'Stir over ice until chilled.' },
            { name: 'Espresso Martini', spirit: 'Vodka', ingredients: {ingredient1: '2 ounces Vodka', ingredient2: '1/2 ounce Coffee Liqueur', ingredient3: '1 ounce Espresso', ingredient4: '1/4 ounce Syrup'}, recipe: 'Shake everyhting with ice, strain into glass. garnish with coffee beans.' },
            { name: 'Moscow Mule', spirit: 'Vodka', ingredients: {ingredient1: '2 ounces Vodka', ingredient2: '1/2 ounce Lime Juice', ingredient3: '3 ounces Ginge Beer'}, recipe: 'Add vodka and Lime to glass with ice and stir. Top with Ginger Beer' },
            { name: 'Flatiron Martini', spirit: 'Vodka', ingredients: {ingredient1: '1 1/2 ounces Vodka', ingredient2: '1 1/2 ounces Lillet Blanc', ingredient3: '1/4 ounce Orange Liqueur'}, recipe: 'Stir over ice. Strain into glass and garnish with lemon twist' },
        );
        localStorage.setItem("Cocktails", JSON.stringify(cocktails));
        location.reload();
    } else {
        if (confirm("Are you sure you want to clear all cockatil data?")) {
            cocktails.length = 0;
            localStorage.setItem("Cocktails", JSON.stringify(cocktails));
            location.reload();
        } else {
            return;
        };
    };
};

//register service worker 

// if(`serviceWorker` in navigator){
//     navigator.serviceWorker.register(`./sw.js`)
//         .then(reg => console.log(`service worker has been registered`))
//         .catch(err => console.log(`error registering worker`, err))
// };  




