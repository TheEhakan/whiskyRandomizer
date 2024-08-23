

async function pushSettingsDataToServer() {
    const response = await fetch(`${path}/userData/settings`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        },
        body: JSON.stringify(settings)
    });
};

//changes the style display setting
function changeStyleSwitch(){
    settings.splice(0, 1, styleSelector.checked);
    pushSettingsDataToServer();
}

//adds or removes style selector from display
function styleSwitch() {
    if (settings[0]) {
        optionalInfo.style.display = "block";
    } else {
        document.getElementById("neato").checked = true;
        document.getElementById("icedo").checked = true;
        document.getElementById("mixedo").checked = true;
        optionalInfo.style.display = "none";
    };
};

//changes search bar display settings
function changeSearchSwitch() {
    settings.splice(1, 1, searchSelector.checked);
    pushSettingsDataToServer();
}

//adds or removes search bar from display
function searchSwitch(page) {
    const search = document.getElementById(`${page}-search`);
    if (settings[1]) {
        search.style.display = "block";
    } else {
        search.style.display = "none";
    };
    search.value = '';
};

//changes category display settings
function changeCategorySwitch() {
    settings.splice(2, 1, categorySelector.checked);
    pushSettingsDataToServer();
}

//adds or removes categories to the bottle display
function categorySwitch() {
    bottlesOnHand = document.getElementById("bottlesOnHand");
    if (settings[2]) {
        allbottlesOnHand.style.display = "none";
        bottlesOnHand.style.display = "block";
    } else {
        allbottlesOnHand.style.display = "block";
        bottlesOnHand.style.display = "none";
    };
};

//search through bottles
function bottleSearch() {
    let input, filter, ul, li, a, i, b, txtValue;
    input = document.getElementById("bottle-search");
    filter = input.value.toUpperCase();
    ul = document.getElementsByName("bottlesOnHand2");
    for (b = 0; b < ul.length; b++) {
        li = ul[b].getElementsByClassName("info");
        for (i = 0; i < li.length; i++) {
            a = li[i];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            };
        };
    };
};

//search cocktails
function cocktailSearch() {
    let input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("cocktail-search");
    filter = input.value.toUpperCase();
    ul = document.getElementById("recipe-cards");
    li = ul.getElementsByClassName("recipeCard");
        for (i = 0; i < li.length; i++) {
            a = li[i];
            txtValue = a.textContent || a.innerText || a.innerHTML;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            };
        };
};

