//register service worker 

if(`serviceWorker` in navigator){
    navigator.serviceWorker.register(`./sw.js`)
        .then(reg => console.log(`service worker has been registered`))
        .catch(err => console.log(`error registering worker`, err))
};  

//clears empty array units
for (bottle in bottlesWhisky) {
    if (bottlesWhisky[bottle] === "") {
        bottlesWhisky.splice(bottle, 1);
    };
    localStorage.setItem("Whisky", JSON.stringify(bottlesWhisky));
};

for (cocktail in cocktails) {
    if (cocktails[cocktail] === "") {
        cocktails.splice(cocktail, 1);
    };
    localStorage.setItem("Cocktails", JSON.stringify(cocktails));
};

//sorts the arrays to make loading faster
bottlesWhisky.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
localStorage.setItem('Whisky', JSON.stringify(bottlesWhisky));

cocktails.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
localStorage.setItem('Cocktails', JSON.stringify(cocktails));

//items needed for startup
console.log(bottlesWhisky);
console.log(settings);
console.log(cocktails);
for (cocktail of cocktails) {
    createCocktailCard(cocktail, recipeCardDiv);
};
bottlesWhisky.forEach(createBottleList);
sortList();
sortCocktails();
styleSwitch();
searchSwitch();
categorySwitch();
totalBottles();
insertIngredient();


fetch('https://127.0.0.1:3000/bottles', {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
    },
  body: JSON.stringify(bottlesWhisky)
})
.then((response) => console.log(response))