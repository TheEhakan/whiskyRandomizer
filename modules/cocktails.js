
const cocktailForm = document.getElementById('cocktail-form');
    const cocktailNameInput = cocktailForm['cocktailName'];
    const cocktailBaseSpirit = cocktailForm['cocktail-base-spirit'];
    const numOfIngredients = cocktailForm['ingredient-number'];
    const cocktailRecipe = cocktailForm['recipe-input'];
    const submitCocktail = cocktailForm['recipe-sumbit'];
const recipeCardDiv = document.getElementById("recipe-cards");
const deleteCocktailModal = document.getElementById('delete-cocktail-modal');
const cocktailErrorModal = document.getElementById('cocktail-error-modal');
const cocktailErrorText = document.getElementById('cocktail-error-text');
const cancelCocktailEditBtn = document.getElementById('cancel-cocktail-edit');
cancelCocktailEditBtn.style.visibility = 'hidden';

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

//looks to make sure all inputs are valid before submitting 
function checkCocktialInputs(name, spirit, recipe){

    let ingredient;
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

    if (submitCocktail.value === 'Add Cocktail') {
        addCocktail(name, spirit, ingredients, recipe);
    } else editCocktailInfo(name, spirit, ingredients, recipe);

};


//adds a coctail to your list
function addCocktail(name, spirit, ingredients, recipe) {

    let index = 0;
    const ingredientInput = document.getElementsByClassName('ingredient-input');

    cocktails.push({
        name,
        spirit,
        ingredients,
        recipe
    });

    //clears inputs after submitting a new cocktail
    for (input of ingredientInput) {
        ingredientInput[index].value = "";
        index ++;
    }
    cocktailNameInput.value = "";
    cocktailRecipe.value = ""

    localStorage.setItem("Cocktials", JSON.stringify(cocktails));
    createCocktailCard({ name, spirit, ingredients, recipe }, recipeCardDiv);
};

//creates the visible cocktail cards in the dom
function createCocktailCard({ name, spirit, ingredients, recipe }, location) {

    let ingredient, eachIngredient;
    //finds the index to set as an id
    const thisCocktail = cocktails.findIndex(n => n.name === name);
    
    //creates the individual ingredient lines
    eachIngredient = ''
    for(ingredient in ingredients){
        eachIngredient += `<li>${ingredients[ingredient]}</li>`;
    };

    //the recipe card template
    const recipeCard = 
        `<div class="recipeCard" id="cocktail${thisCocktail}" name='${spirit}Cockails'>
            <h2>${name}</h2> 
            <ul>
                ${eachIngredient}
            </ul>
            <p>${recipe}</p>
            ${location === recipeCardDiv ? `<input type="button" onclick="editCocktail(cocktail${thisCocktail})" value="Edit Cocktial" />` : ``}
            ${location === recipeCardDiv ? `<input type='button' onclick='confirmDeleteCocktail(cocktail${thisCocktail})' value='Delete' />` : ``}
            ${location === thisCocktailDiv ? `<input type="button" onclick="closeModal(randomizerRecipeModal)" value="Close"/>` : ``}
        </div>`;

    //add the template to the dom in desired location
    location.innerHTML += recipeCard;  
};

//deletes cocktail from the list
let cocktailId;

function confirmDeleteCocktail(id){
    const cocktailNumber = id.id.slice(8, 10);
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

//allows you to edit cocktials and remakes the card as needed
let editCocktailId, editCocktailDiv;

//gathers info for editing
function editCocktail(id) {
    const cocktailNumber = id.id.slice(8, 10);
    editCocktailDiv = id;
    editCocktailId = cocktailNumber;
    const thisCocktail = cocktails[cocktailNumber];
    const cocktailIngredients = thisCocktail.ingredients;
    cocktailNameInput.value = thisCocktail.name;
    cocktailBaseSpirit.value = thisCocktail.spirit;
    numOfIngredients.value = Object.keys(cocktailIngredients).length;
    insertIngredient();
    let i = 0;
    for (ingredient of Object.values(cocktailIngredients)) {
        const ingredientInputs = document.getElementsByClassName('ingredient-input');
        ingredientInputs[i].value = ingredient;
        i++;
    }
    cocktailRecipe.value = thisCocktail.recipe;
    recipeCardDiv.style.visibility = 'hidden';
    submitCocktail.value = 'Update Cocktail';
    cancelCocktailEditBtn.style.visibility = '';
    cocktailNameInput.focus();
};

//cancels the edit and makes everything dafault 
function cancelCocktailEdit() {
    cocktailNameInput.value = '';
    cocktailBaseSpirit.value = '';
    numOfIngredients.value = '';
    insertIngredient();
    cocktailRecipe.value = '';
    recipeCardDiv.style.visibility = '';
    submitCocktail.value = 'Add Cocktial';
    cancelCocktailEditBtn.style.visibility = 'hidden';
};

//used to actually push the edit through
function editCocktailInfo( name, spirit, ingredients, recipe ) {
    recipeCardDiv.style.visibility = '';
    submitCocktail.value = 'Add Cocktail';
    cancelCocktailEditBtn.style.visibility = 'hidden';
    cocktails[editCocktailId] = {
        name,
        spirit,
        ingredients,
        recipe
    };
    localStorage.setItem('Cocktails', JSON.stringify(cocktails));
    editCocktailDiv.remove();
    createCocktailCard(cocktails[editCocktailId], recipeCardDiv);
    submitCocktail.value = 'Add Cocktail';
    cocktailNameInput.value = '';
    cocktailBaseSpirit.value = '';
    numOfIngredients.value = '';
    insertIngredient();
    cocktailRecipe.value = '';
}

//sorts cocktails by name
function sortCocktails() {
    let list, i, switching, b, shouldSwitch;
    list = document.getElementById("recipe-cards");
    switching = true;
    while (switching) {
      switching = false;
      b = list.getElementsByClassName("recipeCard");
      for (i = 0; i < (b.length - 1); i++) {
        shouldSwitch = false;
        if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        b[i].parentNode.insertBefore(b[i + 1], b[i]);
        switching = true;
      }
    }
  }

