//the randomizer
let drinkRandom, style, cocktail;
const randomizerErrorModal = document.getElementById('randomizer-error-modal');
const randomizerErrorText = document.getElementById('randomizer-error-text');
const randomizerRecipeModal = document.getElementById('randomizer-cocktail-recipe');
const thisCocktailDiv = document.getElementById('randomizer-cocktail-recipe-card');

function chooseDrink() {
    const neatq = document.querySelector("#neatq");
    const icedq = document.querySelector("#icedq");
    const mixedq = document.querySelector("#mixedq");
    let type = document.getElementById("bottleTypeq").value;
    const random = [];
    let result, bottleTypeChoice, drink, filteredCocktails;

    //Gets bottle options based off type
    if (type === "") {
        randomizerErrorModal.showModal();
        randomizerErrorText.innerText = 'PLease select a bottle type.';
        return;
    } else if (type === "Any") {
        bottleTypeChoice = bottlesWhisky;
    } else {
        bottleTypeChoice = bottlesWhisky.filter((b) => b.type == type);
    };

    if (bottleTypeChoice.length === 0) {
        if (type === "Any") {
            randomizerErrorModal.showModal();
            randomizerErrorText.innerText = 'No available bottles on hand.';
            return;
        } else {
            randomizerErrorModal.showModal();
            randomizerErrorText.innerText = `No available ${type} bottles on hand.`;
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
        randomizerErrorModal.showModal();
        randomizerErrorText.innerText = `Select at least one drink style.`;
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
        randomizerErrorModal.showModal();
        randomizerErrorText.innerText = `There are not options for ${type} as ${isVowel(style) ? 'an' : 'a'} ${style} drink.`;
        return;
    };

    //chooses a single bottle to display
    drinkRandom = result[Math.floor(Math.random() * result.length)];
    drink = drinkRandom.name;
    type = drinkRandom.type;

    //chooses a cocktail based on the bottle choice
    if (style === "Mixed") {
        if (type === "Other" || cocktails.length === 0) {
            style += ", as a cocktail of your choice!";
        } else {
            filteredCocktails = cocktails.filter(c => c.spirit === type);
            cocktail = filteredCocktails[Math.floor(Math.random() * filteredCocktails.length)].name;
            style += `, perhaps as ${isVowel(cocktail) ? 'an' : 'a' } <button id="display-cocktail-recipe" onclick="displayRecipe()">${cocktail}</button>`;
        };
    };

    //displayes the choice based on all previous selections
    let drinkDisplay = document.getElementById("drink2");
    drinkDisplay.innerHTML = `<p>You should drink ${drink} ${style}</p>`;
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

function displayRecipe() {
    const thisCocktail = cocktails.findIndex(n => n.name === cocktail)
    thisCocktailDiv.innerHTML = '';
    createCocktailCard(cocktails[thisCocktail], thisCocktailDiv);
    randomizerRecipeModal.showModal();
};