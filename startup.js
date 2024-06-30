
//clears empty array units
bottlesWhisky.forEach(function () {
    for (let i = 0; i < bottlesWhisky.length; i++) {
        if (bottlesWhisky[i] === "") {
            bottlesWhisky.splice(i, 1);
        };
    };
    localStorage.setItem("Whisky", JSON.stringify(bottlesWhisky));
});
cocktails.forEach(function () {
    for (let i = 0; i < cocktails.length; i++) {
        if (cocktails[i] === "") {
            cocktails.splice(i, 1);
        };
    };
    localStorage.setItem("Cocktails", JSON.stringify(cocktails));
});

//items needed for startup
console.log(bottlesWhisky);
console.log(settings);
console.log(cocktails);
bottlesWhisky.forEach(createBottleList);
cocktails.forEach(createCocktailCard);
sortList();
styleSwitch();
searchSwitch();
categorySwitch();
totalBottles();
insertIngredient();
