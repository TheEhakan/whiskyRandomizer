const cocktailForm = document.getElementById('cocktail-form');
    const cocktailNameInput = cocktailForm['cocktailName'];
    const cocktailBaseSpirit = cocktailForm['cocktail-base-spirit'];
    const numOfIngredients = cocktailForm['ingredient-number'];
    const cocktailRecipe = cocktailForm['recipe-input'];
const recipeCardDiv = document.getElementById("recipe-cards");
const deleteCocktailModal = document.getElementById('delete-cocktail-modal');
const cocktailErrorModal = document.getElementById('cocktail-error-modal');
const cocktailErrorText = document.getElementById('cocktail-error-text');

//cocktails in storage
const cocktails = JSON.parse(localStorage.getItem('Cocktails')) || [];


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
        cocktailErrorModal.showModal();
        cocktailErrorText.innerText = 'Cocktail name must be provided';
        return;
    };
    if(cocktailBaseSpirit.value === ''){
        cocktailErrorModal.showModal();
        cocktailErrorText.innerText = 'Please provide the base Spirit.';
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
        cocktailErrorModal.showModal();
        cocktailErrorText.innerText = 'Please provide the ingredients for this cocktail';
        return;
    };

    if(cocktailRecipe.value === '') {
        cocktailErrorModal.showModal();
        cocktailErrorText.innerText = 'Please input a recipe for this cocktail';
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
    createCocktailCard({ name, spirit, ingredients, recipe }, recipeCardDiv);
};

function createCocktailCard({ name, spirit, ingredients, recipe }, location) {
    let ingredient, eachIngredient;
    const thisCocktail = cocktails.findIndex(n => n.name === name);

    eachIngredient = ''

    for(ingredient in ingredients){
        eachIngredient += `<li>${ingredients[ingredient]}</li>`;
    };

    const recipeCard = 
        `<div class="recipeCard" id="cocktail${thisCocktail}" name='cockails'>
            <h2>${name}</h2> 
            <ul>
                ${eachIngredient}
            </ul>
            <p>${recipe}</p>
            ${location === recipeCardDiv ? `<input type="button" onclick="editCocktail(cocktail${thisCocktail})" value="Edit Cocktial" />` : ``}
            ${location === recipeCardDiv ? `<input type='button' onclick='confirmDeleteCocktail(cocktail${thisCocktail})' value='Delete' />` : ``}
            ${location === thisCocktailDiv ? `<input type="button" onclick="closeModal(randomizerRecipeModal)" value="Close"/>` : ``}
        </div>`;

    location.innerHTML += recipeCard;  
};

let cocktailId;

function confirmDeleteCocktail(id){
    let cocktailNumber = id.id.slice(8, 10);
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
