//allows for easy app testing
const test = document.getElementById("test");

//adds 20 various bottles to storage for user to test app functions
function testApp() {

    //gets test button to check value
    const test = document.getElementById("test");

    //adds bottles to storage and sends them to server
    if (test.value === "Test Bottles") {
        const bottles = [
            { bottle_name: "Ardbeg 10", bottle_type: "Whisky", bottle_neat: true, bottle_iced: false, bottle_mixed: true },
            { bottle_name: "Oban 14", bottle_type: "Whisky", bottle_neat: true, bottle_iced: false, bottle_mixed: false },
            { bottle_name: "Old Tub", bottle_type: "Whisky", bottle_neat: true, bottle_iced: true, bottle_mixed: true },
            { bottle_name: "Makers Mark 101", bottle_type: "Whisky", bottle_neat: true, bottle_iced: false, bottle_mixed: true },
            { bottle_name: "The Classic Laddie", bottle_type: "Whisky", bottle_neat: true, bottle_iced: true, bottle_mixed: true },
            { bottle_name: "Weller Special Reserve", bottle_type: "Whisky", bottle_neat: false, bottle_iced: true, bottle_mixed: true },
            { bottle_name: "Four Roses Single Barrel", bottle_type: "Whisky", bottle_neat: true, bottle_iced: true, bottle_mixed: false },
            { bottle_name: "Laphroaig 10", bottle_type: "Whisky", bottle_neat: false, bottle_iced: false, bottle_mixed: true },
            { bottle_name: "Wild Turkey Rare Breed", bottle_type: "Whisky", bottle_neat: true, bottle_iced: true, bottle_mixed: false },
            { bottle_name: "Smooth Ambler Old Scout", bottle_type: "Whisky", bottle_neat: false, bottle_iced: false, bottle_mixed: true },
            { bottle_name: "Suntory Toki", bottle_type: "Whisky", bottle_neat: false, bottle_iced: true, bottle_mixed: true },
            { bottle_name: "Hamilton 86", bottle_type: "Rum", bottle_neat: true, bottle_iced: false, bottle_mixed: true },
            { bottle_name: "Appleton Estate Reserve", bottle_type: "Rum", bottle_neat: false, bottle_iced: false, bottle_mixed: true },
            { bottle_name: "Watershed Four Peel", bottle_type: "Gin", bottle_neat: false, bottle_iced: true, bottle_mixed: true },
            { bottle_name: "Middle West Vim Petal", bottle_type: "Gin", bottle_neat: true, bottle_iced: false, bottle_mixed: true },
            { bottle_name: "El Tesoro Reposado", bottle_type: "Tequila/ Mezcal", bottle_neat: true, bottle_iced: false, bottle_mixed: true },
            { bottle_name: "Del Maguey Vida", bottle_type: "Tequila/ Mezcal", bottle_neat: true, bottle_iced: false, bottle_mixed: true },
            { bottle_name: "Pierra Ferrand 1840", bottle_type: "Cognac/ Armagnac", bottle_neat: true, bottle_iced: true, bottle_mixed: true },
            { bottle_name: "Castarède VSOP", bottle_type: "Cognac/ Armagnac", bottle_neat: true, bottle_iced: false, bottle_mixed: true },
            { bottle_name: "Watershed Vodka", bottle_type: "Vodka", bottle_neat: false, bottle_iced: true, bottle_mixed: true },
        ];
        
        bottles.forEach(pushBottlesToServer, 'Test-Button');

        //changes value of button and opens bottlelist page
        test.value = 'Clear Bottles';
        document.getElementById('defaultOpen').click();

    } else {

        //promps user to confirm they want to delete all bottle data
        if (confirm("Are you sure you want to clear all bottle data?")) {

            //deletes all bottles on the server for current user
            bottlesWhisky.forEach(bottle => {
                deleteBottleFromServer(bottle.bottle_id)
            })

            //sets local storage it empty
            bottlesWhisky.length = 0;

            //changes value of button and opens bottle list
            test.value = 'Test Bottles';
            document.getElementById('defaultOpen').click();

        } else {

            //ends function if user does not want to delete data
            return;
        };
    };
};

//add various cocktail to test app functions
function testCocktails() {

    //gets cockatil button to check value
    const cocktailTest = document.getElementById('cocktail-test');

    //adds cocktails to storage and pushes them to server
    if(cocktailTest.value === 'Test Cocktails'){

        const cocktailArray = [
            { cocktail_name: 'Old Fashioned', cocktail_base_spirit: 'Whisky', cocktail_ingredients: { ingredient1: '2 ounces Whisky', ingredient2: 'Barspoon of Syrup', ingredient3: '2 dashes Bitters' }, cocktail_recipe: 'Stir all ingredients over ice in a glass until chilled. Garnish with orange twist.', cocktail_active: true },
            { cocktail_name: 'Whisky Sour', cocktail_base_spirit: 'Whisky', cocktail_ingredients: { ingredient1: '2 ounce Whisky', ingredient2: '3/4 ounce Lemon Juice', ingredient3: '1/2 ounce Syrup',  ingredient4: '(Optional) Egg White'}, cocktail_recipe: 'Dry shake all ingredients for 20 seconds. Add ice and shake for another 20 seconds, strain and serve with Bitters', cocktail_active: true },
            { cocktail_name: 'Manhatten', cocktail_base_spirit: 'Whisky', cocktail_ingredients: { ingredient1: '2 ounce Whisky' , ingredient2: '1 ounce Sweet Vermouth' , ingredient3: '2 dashes Bitters' }, cocktail_recipe: 'Stir all ingredients over ice in a glass until chilled, strain. Garnish with lemon twist.', cocktail_active: true },
            { cocktail_name: 'Mojito', cocktail_base_spirit: 'Rum', cocktail_ingredients: { ingredient1: '2 ounce Rum', ingredient2: '1 ounce Lime Juice', ingredient3: '1/2 ounce Syrup', ingredient4: '5 Mint Leaves', ingredient5: 'Club Sode'}, cocktail_recipe: 'Gently muddle syrup and mint, add Rum and Lime, shake with ice. Strain into glass with crushed ice and top with club soda. Garnish with lime wheel and mint', cocktail_active: true },
            { cocktail_name: 'Daiquiri', cocktail_base_spirit: 'Rum', cocktail_ingredients: {ingredient1: '2 ounce Rum', ingredient2: '1 ounce Lime Juice', ingredient3: '3/4 ounce Syrup'}, cocktail_recipe: 'Shake all ingredients with ice, strain and garnish with a lime twist', cocktail_active: true },
            { cocktail_name: 'Mai Tai', cocktail_base_spirit: 'Rum', cocktail_ingredients: {ingredient1: '1 1/2 ounce Rum', ingredient2: '1 ounce Sweet Vermouth', ingredient3: '2 dashes Bitters'}, cocktail_recipe: 'Stir all ingredients over ice in a glass until chilled, strain. Garnish with lemon twist.', cocktail_active: true },
            { cocktail_name: 'Margarita', cocktail_base_spirit: 'Tequila/ Mezcal', cocktail_ingredients: {ingredient1: '2 ounce Tequila/ Mezcal', ingredient2: '3/4 ounce Lime juice', ingredient3: '1/2 ounce triple sec', ingredient4: 'Barspoon of Agave'}, cocktail_recipe: 'Shake all ingredients with ice, strain over ice and garnish with a lime twist', cocktail_active: true },
            { cocktail_name: 'Paloma', cocktail_base_spirit: 'Tequila/ Mezcal', cocktail_ingredients: {ingredient1: '2 ounce Tequila/ Mezcal', ingredient2: '2 ounces Grapefruit Juice', ingredient3: '2 ounces Sparkling Water', ingredient4: '1/2 ounce Lime Juice', ingredient5: '1/4 ounce Agave'}, cocktail_recipe: 'Shake all ingredients except Sparkling Water with ice, strain over ice, top with Sparkling Water and garnish with a lime twist', cocktail_active: true },
            { cocktail_name: 'Oaxaca Old Fashioned', cocktail_base_spirit: 'Tequila/ Mezcal', cocktail_ingredients: {ingredient1: '2 ounce Tequila/ Mezcal', ingredient2: 'Barspoon of Agave', ingredient3: '2 dashes Bitters'}, cocktail_recipe: 'Stir all ingredients over ice in a glass until chilled. Garnish with orange twist.', cocktail_active: true },
            { cocktail_name: 'Gin & Tonic', cocktail_base_spirit: 'Gin', cocktail_ingredients: {ingredient1: '2 ounce Gin', ingredient2: '4 ounces Tonic Water', ingredient3: '1 Lime, Quartered'}, cocktail_recipe: 'Gently stir everything with ice, add Lime to taste.', cocktail_active: true },
            { cocktail_name: 'Last Word', cocktail_base_spirit: 'Gin', cocktail_ingredients: {ingredient1: '3/4 ounce Gin', ingredient2: '3/4 ounce green Chartreuse', ingredient3: '3/4 ounce Maraschino Liqueur', ingredient4: '3/4 ounce Lime Juice'}, cocktail_recipe: 'Shake everything with ice, strain into glass', cocktail_active: true },
            { cocktail_name: "Bee's Knees", cocktail_base_spirit: 'Gin', cocktail_ingredients: {ingredient1: '2 ounce Gin', ingredient2: '3/4 ounce Honey Syrup', ingredient3: '3/4 ounce Lemon Juice'}, cocktail_recipe: 'Shake everything with ice, strain into glass', cocktail_active: true },
            { cocktail_name: 'Sidecar', cocktail_base_spirit: 'Cognac/ Armagnac', cocktail_ingredients: {ingredient1: '1 1/2 ounce Cognac/ Armagnac', ingredient2: '3/4 ounce Orange Liqueur', ingredient3: '3/4 ounce Lemon Juice'}, cocktail_recipe: 'Shake everything with ice, strain into glass. Garnish with Orange Twist', cocktail_active: true },
            { cocktail_name: 'Vieux Carré', cocktail_base_spirit: 'Cognac/ Armagnac', cocktail_ingredients: {ingredient1: '1 ounce Cognac/ Armagnac', ingredient2: '1 ounce rye Whisky', ingredient3: '1 ounce Sweet Vermouth', ingredient4: '1/4 ounce Bénédictine', ingredient5: '4 dashes Bitter'}, cocktail_recipe: 'Stir over ice until chilled. Srain into glass, garnish with lemon peel.', cocktail_active: true },
            { cocktail_name: 'French Connection', cocktail_base_spirit: 'Cognac/ Armagnac', cocktail_ingredients: {ingredient1: '1 1/2 ounce Cognac/ Armagnac', ingredient2: '1 ounce Amaretto'}, cocktail_recipe: 'Stir over ice until chilled.', cocktail_active: true },
            { cocktail_name: 'Espresso Martini', cocktail_base_spirit: 'Vodka', cocktail_ingredients: {ingredient1: '2 ounces Vodka', ingredient2: '1/2 ounce Coffee Liqueur', ingredient3: '1 ounce Espresso', ingredient4: '1/4 ounce Syrup'}, cocktail_recipe: 'Shake everyhting with ice, strain into glass. garnish with coffee beans.', cocktail_active: true },
            { cocktail_name: 'Moscow Mule', cocktail_base_spirit: 'Vodka', cocktail_ingredients: {ingredient1: '2 ounces Vodka', ingredient2: '1/2 ounce Lime Juice', ingredient3: '3 ounces Ginge Beer'}, cocktail_recipe: 'Add vodka and Lime to glass with ice and stir. Top with Ginger Beer', cocktail_active: true },
            { cocktail_name: 'Flatiron Martini', cocktail_base_spirit: 'Vodka', cocktail_ingredients: {ingredient1: '1 1/2 ounces Vodka', ingredient2: '1 1/2 ounces Lillet Blanc', ingredient3: '1/4 ounce Orange Liqueur'}, cocktail_recipe: 'Stir over ice. Strain into glass and garnish with lemon twist', cocktail_active: true },
        ];

        cocktailArray.forEach(pushCoctailsToServer);

        //changes value of cocktail button
        cocktailTest.value = 'Clear Cocktails';

        //opens cocktail page
        document.getElementById('cocktail-page').click();

    } else {

        //check to confirm user wants to delete all cocktial data
        if (confirm("Are you sure you want to clear all cockatil data?")) {

            //deletes cocktails from server
            cocktails.forEach(cocktail => {
                deleteCoctailFromServer(cocktail.cocktail_id)
            });
            cocktails.length = 0;

            //changes value of cocktail button
            cocktailTest.value = 'Test Cocktails';

            //opens cocktail page
            document.getElementById('cocktail-page').click();

        } else {

            //stops function if user does not want to delete all cocktail data
            return;
        };
    };
};

//allows me to add my personal bottle list to the database
async function addBottlesJSON(event) {

    event.preventDefault();

    if (bottlesWhisky.length === 0) {
        const response = await fetch('../bottles.json');
        const result = await response.json();
        const bottles = [];
        result.forEach(b => {
            bottles.push({
            bottle_name: b.name,
            bottle_type: b.type,
            bottle_neat: b.neat,
            bottle_iced: b.iced,
            bottle_mixed: b.mixed
        })})
        bottles.forEach(pushBottlesToServer);
        sortList();
        totalBottles();
        document.getElementById('defaultOpen').click();
    } else {
        return;
    }
}