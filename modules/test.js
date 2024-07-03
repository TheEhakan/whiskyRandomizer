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
            { name: 'Old Fashioned', spirit: 'Whisky', ingredients: { ingredient1: '2 ounces Whisky', ingredient2: 'Barspoon of Syrup', ingredient3: '2 dashes Bitters' }, recipe: 'Stir all ingredients over ice in a glass until chilled. Garnish with orange twist.', active: true },
            { name: 'Whisky Sour', spirit: 'Whisky', ingredients: { ingredient1: '2 ounce Whisky', ingredient2: '3/4 ounce Lemon Juice', ingredient3: '1/2 ounce Syrup',  ingredient4: '(Optional) Egg White'}, recipe: 'Dry shake all ingredients for 20 seconds. Add ice and shake for another 20 seconds, strain and serve with Bitters', active: true },
            { name: 'Manhatten', spirit: 'Whisky', ingredients: { ingredient1: '2 ounce Whisky' , ingredient2: '1 ounce Sweet Vermouth' , ingredient3: '2 dashes Bitters' }, recipe: 'Stir all ingredients over ice in a glass until chilled, strain. Garnish with lemon twist.', active: true },
            { name: 'Mojito', spirit: 'Rum', ingredients: { ingredient1: '2 ounce Rum', ingredient2: '1 ounce Lime Juice', ingredient3: '1/2 ounce Syrup', ingredient4: '5 Mint Leaves', ingredient5: 'Club Sode'}, recipe: 'Gently muddle syrup and mint, add Rum and Lime, shake with ice. Strain into glass with crushed ice and top with club soda. Garnish with lime wheel and mint', active: true },
            { name: 'Daiquiri', spirit: 'Rum', ingredients: {ingredient1: '2 ounce Rum', ingredient2: '1 ounce Lime Juice', ingredient3: '3/4 ounce Syrup'}, recipe: 'Shake all ingredients with ice, strain and garnish with a lime twist', active: true },
            { name: 'Mai Tai', spirit: 'Rum', ingredients: {ingredient1: '1 1/2 ounce Rum', ingredient2: '1 ounce Sweet Vermouth', ingredient3: '2 dashes Bitters'}, recipe: 'Stir all ingredients over ice in a glass until chilled, strain. Garnish with lemon twist.', active: true },
            { name: 'Margarita', spirit: 'Tequila/ Mezcal', ingredients: {ingredient1: '2 ounce Tequila/ Mezcal', ingredient2: '3/4 ounce Lime juice', ingredient3: '1/2 ounce triple sec', ingredient4: 'Barspoon of Agave'}, recipe: 'Shake all ingredients with ice, strain over ice and garnish with a lime twist', active: true },
            { name: 'Paloma', spirit: 'Tequila/ Mezcal', ingredients: {ingredient1: '2 ounce Tequila/ Mezcal', ingredient2: '2 ounces Grapefruit Juice', ingredient3: '2 ounces Sparkling Water', ingredient4: '1/2 ounce Lime Juice', ingredient5: '1/4 ounce Agave'}, recipe: 'Shake all ingredients except Sparkling Water with ice, strain over ice, top with Sparkling Water and garnish with a lime twist', active: true },
            { name: 'Oaxaca Old Fashioned', spirit: 'Tequila/ Mezcal', ingredients: {ingredient1: '2 ounce Tequila/ Mezcal', ingredient2: 'Barspoon of Agave', ingredient3: '2 dashes Bitters'}, recipe: 'Stir all ingredients over ice in a glass until chilled. Garnish with orange twist.', active: true },
            { name: 'Gin & Tonic', spirit: 'Gin', ingredients: {ingredient1: '2 ounce Gin', ingredient2: '4 ounces Tonic Water', ingredient3: '1 Lime, Quartered'}, recipe: 'Gently stir everything with ice, add Lime to taste.', active: true },
            { name: 'Last Word', spirit: 'Gin', ingredients: {ingredient1: '3/4 ounce Gin', ingredient2: '3/4 ounce green Chartreuse', ingredient3: '3/4 ounce Maraschino Liqueur', ingredient4: '3/4 ounce Lime Juice'}, recipe: 'Shake everything with ice, strain into glass', active: true },
            { name: "Bee's Knees", spirit: 'Gin', ingredients: {ingredient1: '2 ounce Gin', ingredient2: '3/4 ounce Honey Syrup', ingredient3: '3/4 ounce Lemon Juice'}, recipe: 'Shake everything with ice, strain into glass', active: true },
            { name: 'Sidecar', spirit: 'Cognac/ Armagnac', ingredients: {ingredient1: '1 1/2 ounce Cognac/ Armagnac', ingredient2: '3/4 ounce Orange Liqueur', ingredient3: '3/4 ounce Lemon Juice'}, recipe: 'Shake everything with ice, strain into glass. Garnish with Orange Twist', active: true },
            { name: 'Vieux Carré', spirit: 'Cognac/ Armagnac', ingredients: {ingredient1: '1 ounce Cognac/ Armagnac', ingredient2: '1 ounce rye Whisky', ingredient3: '1 ounce Sweet Vermouth', ingredient4: '1/4 ounce Bénédictine', ingredient5: '4 dashes Bitter'}, recipe: 'Stir over ice until chilled. Srain into glass, garnish with lemon peel.', active: true },
            { name: 'French Connection', spirit: 'Cognac/ Armagnac', ingredients: {ingredient1: '1 1/2 ounce Cognac/ Armagnac', ingredient2: '1 ounce Amaretto'}, recipe: 'Stir over ice until chilled.', active: true },
            { name: 'Espresso Martini', spirit: 'Vodka', ingredients: {ingredient1: '2 ounces Vodka', ingredient2: '1/2 ounce Coffee Liqueur', ingredient3: '1 ounce Espresso', ingredient4: '1/4 ounce Syrup'}, recipe: 'Shake everyhting with ice, strain into glass. garnish with coffee beans.', active: true },
            { name: 'Moscow Mule', spirit: 'Vodka', ingredients: {ingredient1: '2 ounces Vodka', ingredient2: '1/2 ounce Lime Juice', ingredient3: '3 ounces Ginge Beer'}, recipe: 'Add vodka and Lime to glass with ice and stir. Top with Ginger Beer', active: true },
            { name: 'Flatiron Martini', spirit: 'Vodka', ingredients: {ingredient1: '1 1/2 ounces Vodka', ingredient2: '1 1/2 ounces Lillet Blanc', ingredient3: '1/4 ounce Orange Liqueur'}, recipe: 'Stir over ice. Strain into glass and garnish with lemon twist', active: true },
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
