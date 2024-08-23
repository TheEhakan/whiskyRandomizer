
//the div to display each page
const displayContent = document.getElementById('displayContent');

//function to load and display pages
async function openPage(pageName) {

    //fetch page data from local files
    const response = await fetch(`../pages/${pageName}`);
    const result = await response.text();

    //sets display to needed page
    displayContent.innerHTML = result;

    //closes sidebar
    const sidebarToggle = document.getElementById('sidebarCheck');
    sidebarToggle.checked = false;
    sidebarOpen();

    //loads different elements based on page loaded
    switch (pageName) {

        case 'bottles.html':

            //creates visible bottle list
            bottlesWhisky.forEach(createBottleList);

            //hides cancel edit button on load
            const cancelEdit = document.getElementById("cancelEdit");
            cancelEdit.style.visibility = "hidden";

            //sets the category display to whisky as default
            document.getElementById("defaultOpen2").click();

            //runs functions for loading the page
            totalBottles();
            styleSwitch();
            searchSwitch('bottle');
            categorySwitch();

            break;

        case 'settings.html':

            //style selector variables
            const styleSelector = document.getElementById("styleSelector");

            //search bar variables
            const searchSelector = document.getElementById("searchSelector");

            //toggle category variables
            const categorySelector = document.getElementById("categorySelector");

            //changes testing button values as needed
            const bottleTest = document.getElementById('test');
            if(bottlesWhisky.length > 0){
                bottleTest.value = 'Clear Bottles'
            };

            const cocktailTest = document.getElementById('cocktail-test');
            if(cocktails.length > 0){
                cocktailTest.value = 'Clear Cocktails'
            };

            //sets settings based on data from server
            styleSelector.checked = settings[0];
            searchSelector.checked = settings[1];
            categorySelector.checked = settings[2];

            break;

        case 'cocktails.html':

            //creates cocktail recipe cards on load
            const recipeCardDiv = document.getElementById("recipe-cards");
            for (cocktail of cocktails) {
                createCocktailCard(cocktail, recipeCardDiv);
            };

            //hides cancel edit button on load
            const cancelCocktailEditBtn = document.getElementById('cancel-cocktail-edit');
            cancelCocktailEditBtn.style.visibility = 'hidden';

            //sets up page based on settings
            insertIngredient();
            searchSwitch('cocktail');
            sortCocktails();

            break;

        case 'randomizer.html':

            //hides enjoyed drink display 
            let drinkEnjoy = document.getElementById("drinkEnjoy");
            drinkEnjoy.style.display = "none";

            break;

        case 'dashboard.html':

            //hides cancel edit button on load
            document.getElementById('cancelBtn').style.visibility = 'hidden';

            //gets user info from server to display
            displayUserInfo();

            break;
    }
};

