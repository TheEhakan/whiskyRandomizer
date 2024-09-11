
//sets a bottle count display
function totalBottles() {

    let total = bottleCollection.filter((t) => t.bottle_name);
    let bottleCount = document.getElementById("bottleCount");
    bottleCount.textContent = `Bottles on Hand: ${total.length}`;

    let totalWhisky = bottleCollection.filter((w) => w.bottle_type === "Whisky");
    let whiskyTotal = document.getElementById("defaultOpen2");
    whiskyTotal.textContent = `Whisky - ${totalWhisky.length}`;

    let totalRum = bottleCollection.filter((r) => r.bottle_type === "Rum");
    let rumTotal = document.getElementById("rumTotal");
    rumTotal.innerText = `Rum - ${totalRum.length}`;

    let totalGin = bottleCollection.filter((g) => g.bottle_type === "Gin");
    let ginTotal = document.getElementById("ginTotal");
    ginTotal.textContent = `Gin - ${totalGin.length}`;

    let totalTequila = bottleCollection.filter((t) => t.bottle_type === "Tequila/ Mezcal");
    let tequilaTotal = document.getElementById("tequilaTotal");
    tequilaTotal.textContent = `Tequila/ Mezcal - ${totalTequila.length}`;

    let totalCognac = bottleCollection.filter((c) => c.bottle_type === "Cognac/ Armagnac");
    let cognacTotal = document.getElementById("cognacTotal");
    cognacTotal.textContent = `Cognac/ Armagnac - ${totalCognac.length}`;

    let totalVodka = bottleCollection.filter((v) => v.bottle_type === "Vodka");
    let vodkaTotal = document.getElementById("vodkaTotal");
    vodkaTotal.textContent = `Vodka - ${totalVodka.length}`;

    let totalOther = bottleCollection.filter((o) => o.bottle_type === "Other");
    let otherTotal = document.getElementById("otherTotal");
    otherTotal.textContent = `Other - ${totalOther.length}`;
};

//checks to see if the first letter is a vowel
function isVowel(word) {
    const nameToCheck = word.toLowerCase().at(0);
    const vowels = /[a,e,i,o,u]/g;
    const result = nameToCheck.match(vowels) ? true : false;
    return result;
};

//closes the specific modal
function closeModal(name) {
    const modal = document.getElementById(name)
    modal.close();
};

//makes div checkboxes for display only
function defultCheck(event) {
    event.preventDefault();
};

//makes bottle category tabs work
function displayBottles(pageName) {
    let tabcontent = document.getElementsByClassName("tabcontent2");
    for (let tab of tabcontent) {
        tab.style.display = "none";
    };
    document.getElementById(pageName).style.display = "block";
};


//makes accordian panels work
function accOpen(event) {
    let panels, acc;
    panels = document.getElementsByClassName("panel");
    let accElement = event.target.nextElementSibling;
    if (accElement.style.display == "block") {
        acc = true;
    } else if (accElement.style.display == "none") {
        acc = false;
    };
    for (let panel of panels) {
        panel.style.display = "none";
    };
    if (acc) {
        accElement.style.display = "none";
    } else {
        accElement.style.display = "block";
    };
};

//sorts various arrays to speed up loading
function sortArrays(arrayName) {

    arrayName.sort((a, b) => {
        const nameA = arrayName === bottleCollection ? a.bottle_name.toUpperCase() : a.cocktail_name.toUpperCase();
        const nameB = arrayName === bottleCollection ? b.bottle_name.toUpperCase() : b.cocktail_name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
};

//when sidebar is open prevents scrolling
function sidebarOpen() {

    const sidebarToggle = document.getElementById('sidebarCheck');

    if (sidebarToggle.checked) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    };
};