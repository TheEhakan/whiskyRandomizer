const cocktailForm = document.getElementById('cocktail-form');
    const cocktailNameInput = cocktailForm['cocktailName'];
    const cocktailBaseSpirit = cocktailForm['cocktail-base-spirit'];
    const numOfIngredients = cocktailForm['ingredient-number'];
    const cocktailRecipe = cocktailForm['recipe-input'];
const deleteCocktailModal = document.getElementById('delete-cocktail-modal');

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
    const thisCocktail = cocktails.findIndex(n => n.name === name);
    const cocktialName = cocktails[thisCocktail].name;
    const smallName = cocktialName.replaceAll(/[^A-Za-z0-9]/g, "");

    eachIngredient = ''

    for(ingredient in ingredients){
        eachIngredient += `<li>${ingredients[ingredient]}</li>`;
    };

    const recipeCard = 
        `<div class="recipeCard" id="cocktail${thisCocktail}" name='${smallName}'>
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
