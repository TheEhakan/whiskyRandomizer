//the randomizer
let drinkRandom, style, cocktail;


function chooseDrink() {
    const neatq = document.querySelector("#neatq");
    const icedq = document.querySelector("#icedq");
    const mixedq = document.querySelector("#mixedq");
    let type = document.getElementById("bottleTypeq").value;
    const random = [];
    let result, bottleTypeChoice, drink, filteredCocktails, activeCocktails;

    const randomizerErrorModal = document.getElementById('randomizer-error-modal');
    const randomizerErrorText = document.getElementById('randomizer-error-text');

    //Gets bottle options based off type
    if (type === "") {
        randomizerErrorModal.showModal();
        randomizerErrorText.innerText = 'PLease select a bottle type.';
        return;
    } else if (type === "Any") {
        bottleTypeChoice = bottleCollection;
    } else {
        bottleTypeChoice = bottleCollection.filter((b) => b.bottle_type == type);
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
        result = bottleTypeChoice.filter((r) => r.bottle_neat == true);
    };
    if (style === "Iced") {
        result = bottleTypeChoice.filter((r) => r.bottle_iced == true);
    };
    if (style === "Mixed") {
        result = bottleTypeChoice.filter((r) => r.bottle_mixed == true);
    };
    if (result.length === 0) {
        randomizerErrorModal.showModal();
        randomizerErrorText.innerText = `There are not options for ${type} as ${isVowel(style) ? 'an' : 'a'} ${style} drink.`;
        return;
    };

    //chooses a single bottle to display
    drinkRandom = result[Math.floor(Math.random() * result.length)];
    drink = drinkRandom.bottle_name;
    type = drinkRandom.bottle_type;

    //chooses a cocktail based on the bottle choice
    if (style === "Mixed") {
        if (type === "Other" || cocktails.length === 0) {
            style += ", as a cocktail of your choice!";
        } else {

            //filters cocktail by spirit
            filteredCocktails = cocktails.filter(c => c.cocktail_base_spirit === type);

            //filters further to active cocktails
            activeCocktails = filteredCocktails.filter(a => a.cocktail_active === true);
            if (activeCocktails.length === 0) {
                randomizerErrorModal.showModal();
                randomizerErrorText.innerText = `There are no ${type} cocktails available to choose from`;
                return;
            };

            //checks if user has not enjoyed certain cockatails with this spirit
            const approvedCocktails = activeCocktails.filter(app => !drinkRandom.reject_cocktails.includes(app.cocktail_name));

            //if no cocktails available set this spirits mixed drink option to false and re runs
            if (approvedCocktails.length === 0 ) {
                drinkRandom.bottle_mixed = false;
                const thisBottle = bottleCollection.indexOf(drinkRandom);
                editBottleOnServer(bottleCollection[thisBottle], 'randomizer');
                chooseDrink();
                return;
            }

            //finally chooses the cocktail and updates the style display
            cocktail = approvedCocktails[Math.floor(Math.random() * approvedCocktails.length)].cocktail_name;
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

//changes display if drink was enjoyed
function enjoyedThisDrink() {
    enjoyDisplay.textContent = "Wonderful! Glad it was a good choice.";
    enjoyChoice.style.display = "none";
};

//removes options if the drink was not enjoyed
function didNotEnjoy() {
    enjoyDisplay.textContent = "Sorry to hear that, this will no longer be an option for you.";
    enjoyChoice.style.display = "none";
    style = style.slice(0, 5).trim();
    let sampled = bottleCollection.indexOf(drinkRandom);

    if (style === "Neat") {
        bottleCollection[sampled].bottle_neat = false;
    };
    if (style === "Iced") {
        bottleCollection[sampled].bottle_iced = false;
    };
    if (style === "Mixed") {
        bottleCollection[sampled].reject_cocktails.push(cocktail);
    };

    editBottleOnServer(bottleCollection[sampled], 'randomizer');
};

//shows the recipe of the chosen cocktail
function displayRecipe() {
    const thisCocktailDiv = document.getElementById('randomizer-cocktail-recipe-card');
    const randomizerRecipeModal = document.getElementById('randomizer-cocktail-recipe');
    const thisCocktail = cocktails.findIndex(n => n.cocktail_name === cocktail)
    thisCocktailDiv.innerHTML = '';
    createCocktailCard(cocktails[thisCocktail], thisCocktailDiv);
    randomizerRecipeModal.showModal();
};