
//loads settings preferences
const settings = JSON.parse(localStorage.getItem("settings")) || [false, false, false];

//style selector variables
const optionalInfo = document.getElementById("optionalInfo");
const styleSelector = document.getElementById("styleSelector");
styleSelector.checked = settings[0];
styleSelector.addEventListener("click", styleSwitch);

//search bar variables
const search = document.getElementById("bottleSearch");
const cocktailSearchBar = document.getElementById('cocktail-search')
const searchSelector = document.getElementById("searchSelector");
searchSelector.checked = settings[1];
searchSelector.addEventListener("click", searchSwitch);

//toggle category variables
const categorySelector = document.getElementById("categorySelector");
categorySelector.checked = settings[2];
const tablink2 = document.getElementsByClassName("tablink2");
const tabcontent2 = document.getElementsByName("bottlesOmHand2");
categorySelector.addEventListener("click", categorySwitch);



//style selector setting
function styleSwitch() {
    if (styleSelector.checked) {
        optionalInfo.style.display = "block";
    } else {
        document.getElementById("neato").checked = true;
        document.getElementById("icedo").checked = true;
        document.getElementById("mixedo").checked = true;
        optionalInfo.style.display = "none";
    };
    settings.splice(0, 1, styleSelector.checked);
    localStorage.setItem("settings", JSON.stringify(settings));
}

//search bar setting
function searchSwitch() {
    if (searchSelector.checked) {
        search.style.display = "block";
        cocktailSearchBar.style.display = "block";
    } else {
        search.style.display = "none";
        cocktailSearchBar.style.display = "none";
    };
    search.value = '';
    cocktailSearchBar.value = '';
    settings.splice(1, 1, searchSelector.checked);
    localStorage.setItem("settings", JSON.stringify(settings));
};

//toggle category setting
function categorySwitch() {
    bottlesOnHand = document.getElementById("bottlesOnHand");
    if (categorySelector.checked) {
        allbottlesOnHand.style.display = "none";
        bottlesOnHand.style.display = "block";
    } else {
        allbottlesOnHand.style.display = "block";
        bottlesOnHand.style.display = "none";
    };
    settings.splice(2, 1, categorySelector.checked);
    localStorage.setItem("settings", JSON.stringify(settings));
};

//search through bottles
function bottleSearch() {
    let input, filter, ul, li, a, i, b, txtValue;
    input = document.getElementById("bottleSearch");
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
