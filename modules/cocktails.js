
//sends new cocktail to server
async function pushCoctailsToServer(cocktail) {

    //gets the recipe card div to add to later
    const recipeCardDiv = document.getElementById("recipe-cards");

    //sends data to server
    const response = await fetch(`${path}/userData/cocktails`, {
        method: 'POST',
        headers: {
            'token': token,
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(cocktail)
        });
    const result = await response.json();

    //deconstructs data returned from server to store locally
    const { cocktail_id, cocktail_name, cocktail_base_spirit, cocktail_ingredients, cocktail_recipe, cocktail_active, user_id } = result[0];

    //reconstructs data and parses boolean values
    const thisCocktail = {
        cocktail_id,
        cocktail_name,
        cocktail_base_spirit,
        cocktail_ingredients: JSON.parse(cocktail_ingredients),
        cocktail_recipe,
        cocktail_active,
        user_id
    };

    //store locally and create recipe cards
    cocktails.push(thisCocktail);
    createCocktailCard(thisCocktail, recipeCardDiv);
    sortCocktails();

};

//sets the number of ingredients for a cocktail recipe
function insertIngredient() {

    //reads values to set up ingredient display
    let ingredientNumber = 1;
    const numberOfIngredients = document.getElementById('ingredient-number').value;
    const ingredientDiv = document.getElementById('ingredient-div');

    //resets div to create proper number of inputs
    ingredientDiv.innerHTML = "";

    //creats inputs for ingredients from provided value
    for(let i = 0; i < numberOfIngredients; i++) {
        const ingredientInput = `<input type="text" class="ingredient-input" id="ingredient${ingredientNumber}" placeholder='Ingredient ${ingredientNumber}'/>`;
        ingredientDiv.innerHTML += ingredientInput;
        ingredientNumber++;
    };

};

//looks to make sure all inputs are valid before submitting 
function checkCocktialInputs(name, spirit, recipe){

    //gathers all input elements
    const cocktailNameInput = document.getElementById('cocktailName');
    const cocktailBaseSpirit = document.getElementById('cocktail-base-spirit');
    const cocktailRecipe = document.getElementById('recipe-input');
    const submitCocktail = document.getElementById('recipe-sumbit');
    let ingredient;
    const ingredientInput = document.getElementsByClassName('ingredient-input');

    //gets modal elements to display errors
    const cocktailErrorModal = document.getElementById('cocktail-error-modal');
    const cocktailErrorText = document.getElementById('cocktail-error-text');

    //sets up values for later
    name = cocktailNameInput.value;
    spirit = cocktailBaseSpirit.value;
    const ingredients = {};
    recipe = cocktailRecipe.value;

    //checks the inputs for content
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

    //sends data to functions based of button value
    if (submitCocktail.value === 'Add Cocktail') {
        addCocktail(name, spirit, ingredients, recipe);
    } else editCocktailInfo(name, spirit, ingredients, recipe);

};


//adds a coctail to your list
function addCocktail(name, spirit, ingredients, recipe) {

    //gets cocktail inputs
    const cocktailNameInput = document.getElementById('cocktailName');
    const cocktailRecipe = document.getElementById('recipe-input');
    const ingredientInput = document.getElementsByClassName('ingredient-input');

    //sets up cocktail object to send to server    
    const cocktail = ({
        cocktail_name: name,
        cocktail_base_spirit: spirit,
        cocktail_ingredients: ingredients,
        cocktail_recipe: recipe,
        cocktail_active: true,
    });
    
    //clears inputs after submitting a new cocktail
    let index = 0;
    for (input of ingredientInput) {
        ingredientInput[index].value = "";
        index ++;
    }
    cocktailNameInput.value = "";
    cocktailRecipe.value = "";

    //sends cocktail info to server
    pushCoctailsToServer(cocktail);
};

//creates the visible cocktail cards in the dom
function createCocktailCard({ cocktail_id, cocktail_name, cocktail_base_spirit, cocktail_ingredients, cocktail_recipe, cocktail_active }, location) {

    //gathers recipe card divs for display
    const recipeCardDiv = document.getElementById("recipe-cards");
    const thisCocktailDiv = document.getElementById('randomizer-cocktail-recipe-card');

    
    //creates the individual ingredient lines
    let ingredient, eachIngredient;
    eachIngredient = ''
    for(ingredient in cocktail_ingredients){
        eachIngredient += `<li>${cocktail_ingredients[ingredient]}</li>`;
    };

    //the recipe card template
    const recipeCard = 
        `<div class="recipeCard" id="${cocktail_id}" name='${cocktail_base_spirit}Cockails'>
            <div class='${cocktail_active ? `active-cocktial` : `non-active-cocktail`}'>
                <div class="cocktail-header">
                    <p class='cocktail-header-name'>${cocktail_name}</p>
                    <p class='toggleDisplay'>Toggle on/off<input type="checkbox" id="toggle-cocktail" onclick="toggleCocktial(event, '${location === recipeCardDiv ? 'cocktailDisplay' : 'randomizer'}')" ${cocktail_active ? `checked` : ``}></p>
                </div>
                <ul>
                    ${eachIngredient}
                </ul>
                <p>${cocktail_recipe}</p>
                ${location === recipeCardDiv ? `<input type="button" onclick="editCocktail('${cocktail_id}')" value="Edit Cocktial" />` : ``}
                ${location === recipeCardDiv ? `<input type='button' onclick='confirmDeleteCocktail("${cocktail_id}")' value='Delete' />` : ``}
                ${location === thisCocktailDiv ? `<input type="button" onclick="closeModal('randomizer-cocktail-recipe')" value="Close"/>` : ``}
            </div>
        </div>`;

    //add the template to the dom in desired location
    location.innerHTML += recipeCard;  

};

//deletes cocktail from the list
let cocktailId, cocktailNumber;

//open modal to confirm deleting cocktail
function confirmDeleteCocktail(id){

    //sets up delete cocktail modal and prepares info to delete
    cocktailId = id;
    let confirmName = cocktails.find(({cocktail_id}) => cocktail_id === cocktailId).cocktail_name;
    cocktailNumber = cocktails.findIndex(n => n.cocktail_name === confirmName);
    document.getElementById('delete-cocktail-text').innerText = `Are you sure you wish to delete your ${confirmName} recipe?`
    
    //selects and opens delete cocktail modal
    const deleteCocktailModal = document.getElementById('delete-cocktail-modal');
    deleteCocktailModal.showModal();

};

//prepares to delete cocktail
function deleteCocktailTrue() {
    
    //removes cocktail from local data
    cocktails.splice(cocktailNumber, 1);
    sortArrays(cocktails);

    //removes display elements
    let thisDiv = document.getElementById(cocktailId);
    thisDiv.remove();

    //closes modal
    closeModal('delete-cocktail-modal');

    //deletes cocktail from server
    deleteCoctailFromServer(cocktailId);
};


//deletes cocktail from server
async function deleteCoctailFromServer(id) {

    //sends data to server to delete cocktail
    const response = await fetch(`${path}/userData/cocktails`, {
        method: 'DELETE',
        headers: {
            'token': token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id})
    });

}   

//allows you to edit cocktials and remakes the card as needed
let editCocktailId;

//gathers info for editing
function editCocktail(id) {

    //gathers cocktail inputs
    const cocktailNameInput = document.getElementById('cocktailName');
    const cocktailBaseSpirit = document.getElementById('cocktail-base-spirit');
    const numOfIngredients = document.getElementById('ingredient-number');
    const cocktailRecipe = document.getElementById('recipe-input');
    const submitCocktail = document.getElementById('recipe-sumbit');
    const recipeCardDiv = document.getElementById("recipe-cards");
    const cancelCocktailEditBtn = document.getElementById('cancel-cocktail-edit');

    //sets up display for editing cocktail info
    cocktailNumber = cocktails.findIndex(i => i.cocktail_id === id);
    editCocktailId = id;
    const thisCocktail = cocktails[cocktailNumber];
    const cocktailIngredients = thisCocktail.cocktail_ingredients;
    cocktailNameInput.value = thisCocktail.cocktail_name;
    cocktailBaseSpirit.value = thisCocktail.cocktail_base_spirit;
    numOfIngredients.value = Object.keys(cocktailIngredients).length;
    insertIngredient();
    let i = 0;
    for (ingredient of Object.values(cocktailIngredients)) {
        const ingredientInputs = document.getElementsByClassName('ingredient-input');
        ingredientInputs[i].value = ingredient;
        i++;
    }
    cocktailRecipe.value = thisCocktail.cocktail_recipe;

    //changed display to edit cocktail
    recipeCardDiv.style.visibility = 'hidden';
    submitCocktail.value = 'Update Cocktail';
    cancelCocktailEditBtn.style.visibility = '';

    //sets focus to top of cocktail form
    cocktailNameInput.focus();
};

//cancels the edit and makes everything dafault 
function cancelCocktailEdit() {

    //gathers cocktail inputs
    const cocktailNameInput = document.getElementById('cocktailName');
    const cocktailBaseSpirit = document.getElementById('cocktail-base-spirit');
    const numOfIngredients = document.getElementById('ingredient-number');
    const cocktailRecipe = document.getElementById('recipe-input');
    const submitCocktail = document.getElementById('recipe-sumbit');
    const recipeCardDiv = document.getElementById("recipe-cards");
    const cancelCocktailEditBtn = document.getElementById('cancel-cocktail-edit');

    //resets cocktail inputs after canceling edit
    cocktailNameInput.value = '';
    cocktailBaseSpirit.value = '';
    numOfIngredients.value = '';
    insertIngredient();
    cocktailRecipe.value = '';

    //resets display after cancelling cocktail edit
    recipeCardDiv.style.visibility = '';
    submitCocktail.value = 'Add Cocktail';
    cancelCocktailEditBtn.style.visibility = 'hidden';
};

//used to actually push the edit through
function editCocktailInfo( name, spirit, ingredients, recipe ) {

    //gathers cocktail inputs
    const cocktailNameInput = document.getElementById('cocktailName');
    const cocktailBaseSpirit = document.getElementById('cocktail-base-spirit');
    const numOfIngredients = document.getElementById('ingredient-number');
    const cocktailRecipe = document.getElementById('recipe-input');
    const submitCocktail = document.getElementById('recipe-sumbit');
    const recipeCardDiv = document.getElementById("recipe-cards");
    const cancelCocktailEditBtn = document.getElementById('cancel-cocktail-edit');

    //resets display after edit
    recipeCardDiv.style.visibility = '';
    submitCocktail.value = 'Add Cocktail';
    cancelCocktailEditBtn.style.visibility = 'hidden';

    //creates object to send to server
    const cocktail = {
        cocktail_id: editCocktailId,
        cocktail_name: name,
        cocktail_base_spirit: spirit,
        cocktail_ingredients: ingredients,
        cocktail_recipe: recipe,
        cocktail_active: cocktails[cocktailNumber].cocktail_active
    };

    //removes cocktail display
    document.getElementById(editCocktailId).remove();

    //sends edited cocktail to server
    editCocktailOnServer(cocktail, 'cocktail display')

    //resets input values after edit
    submitCocktail.value = 'Add Cocktail';
    cocktailNameInput.value = '';
    cocktailBaseSpirit.value = '';
    numOfIngredients.value = '';
    insertIngredient();
    cocktailRecipe.value = '';

}

//sends cocktail data to server
async function editCocktailOnServer(cocktail) {

    //gets cocktail diaplay
    const recipeCardDiv = document.getElementById("recipe-cards");

    //sends edited cocktail data to server
    const response = await fetch(`${path}/userData/cocktails`, {
        method: 'PUT',
        headers: {
            'token': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cocktail)
    });
    const result = await response.json();

    //deconstructs cocktail data from server
    const { cocktail_id, cocktail_name, cocktail_base_spirit, cocktail_ingredients, cocktail_recipe, cocktail_active, user_id } = result;

    //reconstructs cocktail data and parses boolean values
    const thisCocktail = {
        cocktail_id,
        cocktail_name,
        cocktail_base_spirit,
        cocktail_ingredients: JSON.parse(cocktail_ingredients),
        cocktail_recipe,
        cocktail_active,
        user_id
    };

    //stores data locally and creates cocktail card
    cocktails[cocktailNumber] = thisCocktail;

    //creates the cocktail card in on the cocktial page
    try {
        createCocktailCard(thisCocktail, recipeCardDiv);
        sortCocktails();
    } catch (error) {
        
    }
    
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

//toggle cocktails between active and non active for the randomizer
function toggleCocktial(event, location) {

    //gathers div element to change
    const thisDiv = event.target.parentElement.parentElement.parentElement;

    //gets cocktail info from parent div
    const thisCocktailId = thisDiv.parentElement.id;
    const thisCocktailNumber = cocktails.findIndex(i => i.cocktail_id == thisCocktailId);

    //gets cocktail to edit
    const thisCocktail = cocktails[thisCocktailNumber];

    //checks toggle to change display
    const toggleSwitch = event.target;
    if (toggleSwitch.checked) {
        thisCocktail.cocktail_active = true;
    } else {
        thisCocktail.cocktail_active = false;
    };

    //removes old display
    document.getElementById(thisCocktailId).remove();

    //close the randomizer modal
    if (location === 'randomizer') {
        closeModal('randomizer-cocktail-recipe');
    }

    //send data to server
    editCocktailOnServer(thisCocktail);
    
};
