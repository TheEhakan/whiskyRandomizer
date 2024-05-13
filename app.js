
//items needed for the bottle input
const addBottleForm = document.getElementById("bottleForm");
let bottlesOnHand;
const allbottlesOnHand = document.querySelector("#allbottlesOnHand")
const whiskyOnHand = document.querySelector("#whiskyOnHand")
const tequilaOnHand = document.querySelector("#tequilaOnHand")
const rumOnHand = document.querySelector("#rumOnHand")
const cognacOnHand = document.querySelector("#cognacOnHand")
const ginOnHand = document.querySelector("#ginOnHand")
const otherOnHand = document.querySelector("#otherOnHand")
let bottleNameInput = addBottleForm['bottleName']
let bottleTypeInput = addBottleForm['bottleType']
let neatInput = document.querySelector("#neato")
let icedInput = document.querySelector("#icedo")
let mixedInput = document.querySelector("#mixedo")
let addBottleBtn = document.getElementById("addToList")
const displayCheck = document.getElementsByName("display")
const bottlesWhisky = JSON.parse(localStorage.getItem("Whisky")) || []
let bottleNumber = 0

//style selector variables
const settings = JSON.parse(localStorage.getItem("settings")) || [false]
const optionalInfo = document.getElementById("optionalInfo")
const styleSelector = document.getElementById("styleSelector")
styleSelector.checked = settings[0]
styleSelector.addEventListener("click", styleSwitch)

//search bar variables
const search = document.getElementById("bottleSearch");
const searchSelector = document.getElementById("searchSelector")
searchSelector.checked = settings[1]
searchSelector.addEventListener("click", searchSwitch)

//toggle category variables
const categorySelector = document.getElementById("categorySelector")
categorySelector.checked = settings[2]
const tablink2 = document.getElementsByClassName("tablink2")
const tabcontent2 = document.getElementsByName("bottlesOmHand2")
categorySelector.addEventListener("click", categorySwitch)

//clears empty array units
bottlesWhisky.forEach(function(){
    for(let i = 0; i < bottlesWhisky.length; i++){
        if (bottlesWhisky[i] === "") {
            bottlesWhisky.splice(i, 1)
        }
    }
    localStorage.setItem("Whisky", JSON.stringify(bottlesWhisky))
})

//sets a bottle count display
function totalBottles() {
    let total;
    total = bottlesWhisky.filter((t) => t.name)
    bottleCount = document.getElementById("bottleCount")
    bottleCount.textContent = `Bottles on Hand: ${total.length}`
}

//items needed for startup
console.log(bottlesWhisky)
console.log(settings)
bottlesWhisky.forEach(createBottleList);
sortList()
styleSwitch()
searchSwitch()
categorySwitch()
totalBottles()

//pushes bottle info into an object and stores it
function addBottle(name, type, neat, iced, mixed) {
    name = bottleNameInput.value
    type = bottleTypeInput.value,
    neat = neatInput.checked,
    iced = icedInput.checked,
    mixed = mixedInput.checked
    if (addBottleBtn.value === "Add Bottle") {
        if (bottleTypeInput.value === "") {
            alert("Select a type of liquor for this bottle.")
            return
        }
        if (bottleNameInput.value === "") {
            alert("Input a name for this bottle.")
            return
        }
        if (neatInput.checked === false && icedInput.checked === false && mixedInput.checked === false){
            alert("Choose at least one drink style for this bottle.")
            return
        }

        let n;
        for(n = 0; n < bottlesWhisky.length; n++){
            if(bottlesWhisky[n] === ""){
                continue
            }
            if(bottlesWhisky[n].name.toLowerCase() === bottleNameInput.value.toLowerCase()){
                if(confirm(`${bottlesWhisky[n].name} is already on your list, add it anyway?`)){
                } else {
                    return
                }
        }
    }

    bottlesWhisky.push({
        name,
        type,
        neat,
        iced,
        mixed
    });
    localStorage.setItem("Whisky", JSON.stringify(bottlesWhisky))
    document.getElementById("bottleName").value = ""
    createBottleList({ name, type, neat, iced, mixed })
    sortList()
    bottleNameInput.value = ""
    styleSwitch()
    totalBottles()
    } else {editBottleInfo()}
}

//creates new div for each bottle
function createBottleList({ name, type, neat, iced, mixed }) {
    let smallName = name.replaceAll(/[^A-Za-z0-9]/g, "")
    const bottleDiv = document.createElement("div");
    bottleDiv.setAttribute("class", "info")
    bottleDiv.setAttribute("name", "info")
    bottleDiv.setAttribute("id", bottleNumber)

    const bottleName = document.createElement("button")
    bottleName.setAttribute("class", "accordion")
    bottleName.setAttribute("onclick", `accOpen(A${smallName})`)

    const bottleInfo = document.createElement("div")
    bottleInfo.setAttribute("class", "panel")
    bottleInfo.setAttribute("id", `A${smallName}`)
    const bottleType = document.createElement('p')

    //neat checkbox in div
    const span1 = document.createElement("span")
    span1.setAttribute("class", "checkmark")
    const neatCheck = document.createElement("label")
    neatCheck.setAttribute("for", "display")
    neatCheck.setAttribute("class", "container")
    let neat2 = document.createElement("input")
    neat2.setAttribute("type", "checkbox")
    neat2.setAttribute("onclick", "defultCheck(event)")
    if (neat === true) {
        neat2.setAttribute("checked", "checked")
    }

    //iced checkbox in div
    const span2 = document.createElement("span")
    span2.setAttribute("class", "checkmark")
    const icedCheck = document.createElement("label")
    icedCheck.setAttribute("for", "display")
    icedCheck.setAttribute("class", "container")
    let iced2 = document.createElement("input")
    iced2.setAttribute("type", "checkbox")
    iced2.setAttribute("onclick", "defultCheck(event)")
    if (iced === true) {
        iced2.setAttribute("checked", "checked")
    }

    //mixed checkbox in div
    const span3 = document.createElement("span")
    span3.setAttribute("class", "checkmark")
    const mixedCheck = document.createElement("label")
    mixedCheck.setAttribute("for", "display")
    mixedCheck.setAttribute("class", "container")
    let mixed2 = document.createElement("input")
    mixed2.setAttribute("type", "checkbox")
    mixed2.setAttribute("onclick", "defultCheck(event)")
    if (mixed === true) {
        mixed2.setAttribute("checked", "checked")
    }

    //edit button in div
    let editBottle = document.createElement("input")
    editBottle.setAttribute("type", "button")
    editBottle.setAttribute("value", "Edit Bottle")
    editBottle.setAttribute("id", bottleNumber)
    editBottle.setAttribute("name", "editBottle")
    editBottle.setAttribute("onclick", `editBottle(${bottleNumber})`)

    //delete button in div
    let deleteBottle = document.createElement("input")
    deleteBottle.setAttribute("type", "button")
    deleteBottle.setAttribute("value", "Delete")
    deleteBottle.setAttribute("id", bottleNumber)
    deleteBottle.setAttribute("name", "deleteBottle")
    deleteBottle.setAttribute("onclick", `deleteBottle(${bottleNumber})`)
    bottleNumber++

    //values to add to div                    
    bottleName.innerText = name
    bottleType.innerText = type
    neatCheck.innerHTML = "Neat"
    neat2.innerText = neat
    icedCheck.innerHTML = "On Ice"
    iced2.innerHTML = iced
    mixedCheck.innerHTML = "Mixed"
    mixed2.innerHTML = mixed

    //making the div
    neatCheck.append(neat2, span1)
    icedCheck.append(iced2, span2)
    mixedCheck.append(mixed2, span3)
    bottleInfo.append(bottleType, neatCheck, icedCheck, mixedCheck, editBottle, deleteBottle)
    bottleDiv.append(bottleName, bottleInfo)

    //sets div based on bottle type
    switch (type) {
        case "Whisky":
            bottlesOnHand = whiskyOnHand
            break;
        case "Rum":
            bottlesOnHand = rumOnHand
            break;
        case "Tequila/ Mezcal":
            bottlesOnHand = tequilaOnHand
            break;
        case "Gin":
            bottlesOnHand = ginOnHand
            break;
        case "Cognac/ Armagnac":
            bottlesOnHand = cognacOnHand
            break;
        default:
            bottlesOnHand = otherOnHand
            break;
    }

    allbottlesOnHand.appendChild(bottleDiv.cloneNode(true))
    bottlesOnHand.appendChild(bottleDiv)
}

//makes div checkboxes for display only
function defultCheck(event) {
    event.preventDefault()
}

//the randomizer
let drinkRandom;
let style;
let cocktail

function chooseDrink() {
    const neatq = document.querySelector("#neatq")
    const icedq = document.querySelector("#icedq")
    const mixedq = document.querySelector("#mixedq")
    let type = document.getElementById("bottleTypeq").value
    const random = []
    let cocktails;
    let result;
    let bottleTypeChoice;
    let drink;
    //Gets bottle options based off type
    if (type === "") {
        alert("Please select a bottle type")
        return
    } else if (type === "Any") {
        bottleTypeChoice = bottlesWhisky
    } else {
        bottleTypeChoice = bottlesWhisky.filter((b) => b.type == type)
    }

    if (bottleTypeChoice.length === 0) {
        if(type === "Any"){
            alert("No available bottles on hand.")
            return
        } else {
            alert("No available " + type + " bottles on hand.")
            return
        }
    }

    //looks at style options selected and chooses one
    if (neatq.checked) {
        random.push(" Neat")
    }
    if (icedq.checked) {
        random.push(" Iced")
    }
    if (mixedq.checked) {
        random.push(" Mixed")
    }

    if (random.length === 0) {
        alert("Select at least one drink style.")
        return
    } else {
        style = random[Math.floor(Math.random() * random.length)]
    }

    //filters bottles further based on style or drink
    if (style == " Neat") {
        result = bottleTypeChoice.filter((r) => r.neat == true)
    }
    if (style == " Iced") {
        result = bottleTypeChoice.filter((r) => r.iced == true)
    }
    if (style == " Mixed") {
        result = bottleTypeChoice.filter((r) => r.mixed == true)
    }
    if (result.length === 0) {
        alert("There are not options for " + type + " as a(n)" + style + " drink.")
        return
    }

    //chooses a single bottle to display
    drinkRandom = result[Math.floor(Math.random() * result.length)]
    drink = drinkRandom.name
    type = drinkRandom.type

    //adjusts cocktails based on bottle type
    switch (type) {
        case "Whisky":
            cocktails = [" an Old Fashioned.", " a Whisky Sour.", " a Manhattan."]
            break;
        case "Rum":
            cocktails = [" a Mojito.", " a Daiquiri.", " Mai Tai."]
            break;
        case "Tequila/ Mezcal":
            cocktails = [" a Margarita.", " a Paloma.", " an Oaxaca Old Fashioned."]
            break;
        case "Gin":
            cocktails = [" a Gin & Tonic.", " a Last Word.", " a Bee's Knees."]
            break;
        case "Cognac/ Armagnac":
            cocktails = [" a Sidecar.", " a Vieux Carré", " a French Connection."]
            break;
        default:
            cocktails = [" a cocktail of your choice!"]
            break;
    }
    cocktail = cocktails[Math.floor(Math.random() * cocktails.length)]
    if (style === " Mixed") {
        if(type === "Other"){
            style += ", as" + cocktail
        } else {
            style += ", perhaps as" + cocktail
        }
    }

    //displayes the choice based on all previous selections
    let drinkDisplay = document.getElementById("drink")
    drinkDisplay.textContent = `You should drink ${drink} ${style}`
    drinkEnjoy.style.display = "block"
    enjoyChoice.style.display = "block"
    let didEnjoy = document.getElementById("enjoyDisplay")
    didEnjoy.textContent = ""
    console.log(cocktail)
}

//changes objects if needed if you enjoyed the drink or not
let drinkEnjoy = document.getElementById("drinkEnjoy")
drinkEnjoy.style.display = "none"
let enjoyChoice = document.getElementById("enjoyChoice")
let enjoyDisplay = document.getElementById("enjoyDisplay")

function enjoyedDrink() {
    enjoyDisplay.textContent = "Wonderful! Glad it was a good choice."
    enjoyChoice.style.display = "none"
}

function didNotEnjoy() {
    enjoyDisplay.textContent = "Sorry to hear that, this will no longer be an option for you."
    enjoyChoice.style.display = "none"
    style = style.slice(0, 6).trim()
    let sampled = bottlesWhisky.indexOf(drinkRandom)
    console.log(sampled)
    if(style == "Neat") {
        bottlesWhisky[sampled].neat = false
    } 
    if(style == "Iced") {
        bottlesWhisky[sampled].iced = false
    } 
    if(style == "Mixed") {
        bottlesWhisky[sampled].mixed = false
    }
    localStorage.setItem("Whisky", JSON.stringify(bottlesWhisky))
}

//style selector setting
function styleSwitch() {
    if (styleSelector.checked){
        optionalInfo.style.display = "block"
    } else {
        document.getElementById("neato").checked = true
        document.getElementById("icedo").checked = true
        document.getElementById("mixedo").checked = true
        optionalInfo.style.display = "none"       
    }
    settings.splice(0, 1, styleSelector.checked)
    localStorage.setItem("settings", JSON.stringify(settings))
}

//search bar setting
function searchSwitch() {
    if (searchSelector.checked) {
        search.style.display = "block"
    } else {
        search.style.display = "none"
    }
    settings.splice(1, 1, searchSelector.checked)
    localStorage.setItem("settings", JSON.stringify(settings))
}

//toggle category setting
function categorySwitch() {
    bottlesOnHand = document.getElementById("bottlesOnHand")
    if (categorySelector.checked) {
        allbottlesOnHand.style.display = "none"
        bottlesOnHand.style.display = "block"
    } else {
        allbottlesOnHand.style.display = "block"
        bottlesOnHand.style.display = "none"
    }
    settings.splice(2, 1, categorySelector.checked)
    localStorage.setItem("settings", JSON.stringify(settings))
} 

//search through bottles
function bottleSearch() {
    var input, filter, ul, li, a, i, b, txtValue;
    input = document.getElementById("bottleSearch");
    filter = input.value.toUpperCase();
    ul = document.getElementsByName("bottlesOnHand2");
    for(b = 0; b < ul.length; b++){
        li = ul[b].getElementsByClassName("info");
        for (i = 0; i < li.length; i++) {
            a = li[i];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }
}

//sorts all items alphabetically
function sortList() {
    let list = document.getElementsByName("bottlesOnHand2")
    let list2;
    let switching = true
    let shouldSwitch;
    let i;
    let b;
    let c;
    for(c = 0; c < list.length; c++){
        list2 = document.getElementById(list[c].id)
        switching = true
        while (switching) {
            switching = false
            b = list2.getElementsByClassName("info")
            for (i = 0; i < (b.length - 1); i++) {
                shouldSwitch = false
                if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
                    shouldSwitch = true
                    break
                }
            }
            if (shouldSwitch) {
                b[i].parentNode.insertBefore(b[i + 1], b[i])
                switching = true
            }
        }
    }
} 

//functionality to switch and view tabs
function openPage(pageName, elmnt, color) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(pageName).style.display = "block";
    elmnt.style.backgroundColor = color;
}
document.getElementById("defaultOpen").click();

//makes bottle category tabs work
function openPage2(pageName, elmnt, color) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent2");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink2");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(pageName).style.display = "block";
    elmnt.style.backgroundColor = color;
}
document.getElementById("defaultOpen2").click();

//delete bottles
function deleteBottle(id) {
    console.log(id)
    confirmName = bottlesWhisky[id].name
    let thisDiv = document.getElementById(id)
    console.log(thisDiv)
    if(confirm(`Are you sure you wish to delete ${confirmName}?`)){
        bottlesWhisky.splice(id, 1, "")
        localStorage.setItem("Whisky", JSON.stringify(bottlesWhisky))
        thisDiv.remove()
        thisDiv = document.getElementById(id)
        thisDiv.remove()
        totalBottles()
    } else {
        return
    }
}

//edit bottles
let id2;
const cancelEdit = document.getElementById("cancelEdit")
cancelEdit.style.visibility = "hidden"
function editBottle(id) {
    let bottleHeader = document.getElementById("bottleHeader")
    let bottleDisplay = document.getElementById("bottleDisplay")
    id2 = id
    bottleNameInput.focus()
    bottleNameInput.value = bottlesWhisky[id].name
    bottleTypeInput.value = bottlesWhisky[id].type
    neatInput.checked = bottlesWhisky[id].neat
    icedInput.checked = bottlesWhisky[id].iced
    mixedInput.checked = bottlesWhisky[id].mixed
    addBottleBtn.value = "Update Bottle"
    bottleHeader.textContent = "Update Bottle"
    bottleDisplay.style.display = "none"
    optionalInfo.style.display = "block"
    cancelEdit.style.visibility = "visible"
    console.log(bottlesWhisky[id])
}

cancelEdit.addEventListener("click", function(){
    addBottleBtn.value = "Add Bottle"
    cancelEdit.style.visibility = "hidden"
    bottleNameInput.value = ""
    bottleTypeInput.value = ""
    bottleDisplay.style.display = "block"
    bottleHeader.textContent = "Add a bottle to the list"
    styleSwitch()
})

function editBottleInfo() {
    if (bottleTypeInput.value === "") {
        alert("Select a type of liquor for this bottle.")
        return
    }
    if (bottleNameInput.value === "") {
        alert("Input a name for this bottle.")
        return
    }
    if (neatInput.checked === false && icedInput.checked === false && mixedInput.checked === false){
        alert("Choose at least one drink style for this bottle.")
        return
    }
    cancelEdit.style.visibility = "hidden"
    bottleDisplay.style.display = "block"
    bottleHeader.textContent = "Add a bottle to the list"
    console.log(id2)
    addBottleBtn.value = "Add Bottle"
    bottlesWhisky.splice(id2, 1, "")
    let thisDiv = document.getElementById(id2)
    thisDiv.remove()
    thisDiv = document.getElementById(id2)
    thisDiv.remove()
    addBottle()
}

//makes accordian panels work
function accOpen(accName) {
    let i, panel, acc;
    panel = document.getElementsByClassName("panel")
    if(accName.style.display === "block"){
        acc = true
    } else if (accName.style.display === "none"){
        acc = false
    }
    for(i = 0; i < panel.length; i++) {
        panel[i].style.display = "none"
    }
    if(acc){
        accName.style.display = "none"
    } else {
        accName.style.display = "block"
    }
}

//allows for easy app testing
const test = document.getElementById("test")
if (bottlesWhisky.length > 0) {
    test.value = "Clear List"
}
function testApp() {
    if(test.value === "Test App"){
        bottlesWhisky.push(
        {name: "Ardbeg 10", type: "Whisky", neat: true, iced: false, mixed: true},
        {name: "Oban 14", type: "Whisky", neat: true, iced: false, mixed: false},
        {name: "Old Tub", type: "Whisky", neat: true, iced: true, mixed: true},
        {name: "Makers Mark 101", type: "Whisky", neat: true, iced: false, mixed: true},
        {name: "The Classic Laddie", type: "Whisky", neat: true, iced: true, mixed: true},
        {name: "Weller Special Reserve", type: "Whisky", neat: false, iced: true, mixed: true},
        {name: "Four Roses Single Barrel", type: "Whisky", neat: true, iced: true, mixed: false},
        {name: "Laphroaig 10", type: "Whisky", neat: false, iced: false, mixed: true},
        {name: "Wild Turkey Rare Breed", type: "Whisky", neat: true, iced: true, mixed: false},
        {name: "Smooth Ambler Old Scout", type: "Whisky", neat: false, iced: false, mixed: true},
        {name: "Suntory Toki", type: "Whisky", neat: false, iced: true, mixed: true},
        {name: "Hamilton 86", type: "Rum", neat: true, iced: false, mixed: true},
        {name: "Appleton Estate Reserve", type: "Rum", neat: false, iced: false, mixed: true},
        {name: "Watershed Four Peel", type: "Gin", neat: false, iced: true, mixed: true},
        {name: "Middle West Vim Petal", type: "Gin", neat: true, iced: false, mixed: true},
        {name: "El Tesoro Reposado", type: "Tequila/ Mezcal", neat: true, iced: false, mixed: true},
        {name: "Del Maguey Vida", type: "Tequila/ Mezcal", neat: true, iced: false, mixed: true},
        {name: "Pierra Ferrand 1840", type: "Cognac/ Armagnac", neat: true, iced: true, mixed: true},
        {name: "Castarède VSOP", type: "Cognac/ Armagnac", neat: true, iced: false, mixed: true},
        {name: "Watershed Vodka", type: "Other", neat: false, iced: true, mixed: true},
    );
    localStorage.setItem("Whisky", JSON.stringify(bottlesWhisky))
    location.reload()
    } else {
        if(confirm("Are you sure you want to clear all bottle data?")) {
            bottlesWhisky.length = 0
            localStorage.setItem("Whisky", JSON.stringify(bottlesWhisky))
            location.reload()
        } else {
            return
        }
    }
}
