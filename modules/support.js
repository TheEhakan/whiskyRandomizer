



//sets a bottle count display
function totalBottles() {
    let total = bottlesWhisky.filter((t) => t.name);
    let bottleCount = document.getElementById("bottleCount");
    bottleCount.textContent = `Bottles on Hand: ${total.length}`;

    let totalWhisky = bottlesWhisky.filter((w) => w.type === "Whisky");
    let whiskyTotal = document.getElementById("defaultOpen2");
    whiskyTotal.textContent = `Whisky - ${totalWhisky.length}`;

    let totalRum = bottlesWhisky.filter((r) => r.type === "Rum");
    let rumTotal = document.getElementById("rumTotal");
    rumTotal.textContent = `Rum - ${totalRum.length}`;

    let totalGin = bottlesWhisky.filter((g) => g.type === "Gin");
    let ginTotal = document.getElementById("ginTotal");
    ginTotal.textContent = `Gin - ${totalGin.length}`;

    let totalTequila = bottlesWhisky.filter((t) => t.type === "Tequila/ Mezcal");
    let tequilaTotal = document.getElementById("tequilaTotal");
    tequilaTotal.textContent = `Tequila/ Mezcal - ${totalTequila.length}`;

    let totalCognac = bottlesWhisky.filter((c) => c.type === "Cognac/ Armagnac");
    let cognacTotal = document.getElementById("cognacTotal");
    cognacTotal.textContent = `Cognac/ Armagnac - ${totalCognac.length}`;

    let totalVodka = bottlesWhisky.filter((v) => v.type === "Vodka");
    let vodkaTotal = document.getElementById("vodkaTotal");
    vodkaTotal.textContent = `Vodka - ${totalVodka.length}`;

    let totalOther = bottlesWhisky.filter((o) => o.type === "Other");
    let otherTotal = document.getElementById("otherTotal");
    otherTotal.textContent = `Other - ${totalOther.length}`;
};

//checks to see if the first letter is a vowel
function isVowel(word) {
    let nameToCheck = word.toLowerCase().at(0);
    if(nameToCheck === 'a' || nameToCheck === 'e' || nameToCheck === 'i' || nameToCheck === 'o' || nameToCheck === 'u') {
        return true
    } else { return false };
};

//closes the specific modal
function closeModal(name) {
    name.close();
};

//makes div checkboxes for display only
function defultCheck(event) {
    event.preventDefault();
};

//sorts bottle items alphabetically
function sortList() {
    let list = document.getElementsByName("bottlesOnHand2")
    let list2, shouldSwitch, i, b, c;
    let switching = true;
    for (c = 0; c < list.length; c++) {
        list2 = document.getElementById(list[c].id);
        switching = true;
        while (switching) {
            switching = false;
            b = list2.getElementsByClassName("info");
            for (i = 0; i < (b.length - 1); i++) {
                shouldSwitch = false;
                if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                };
            };
            if (shouldSwitch) {
                b[i].parentNode.insertBefore(b[i + 1], b[i]);
                switching = true;
            };
        };
    };
};

//functionality to switch and view tabs
function openPage(pageName, elmnt, color) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    };
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    };
    document.getElementById(pageName).style.display = "block";
    elmnt.style.backgroundColor = color;
};
document.getElementById("defaultOpen").click();

//makes bottle category tabs work
function openPage2(pageName, elmnt, color) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent2");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    };
    tablinks = document.getElementsByClassName("tablink2");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    };
    document.getElementById(pageName).style.display = "block";
    elmnt.style.backgroundColor = color;
};
document.getElementById("defaultOpen2").click();

//makes accordian panels work
function accOpen(event) {
    let i, panel, acc;
    panel = document.getElementsByClassName("panel");
    let accElement = event.target.nextElementSibling;
    if (accElement.style.display == "block") {
        acc = true;
    } else if (accElement.style.display == "none") {
        acc = false;
    };
    for (i = 0; i < panel.length; i++) {
        panel[i].style.display = "none";
    };
    if (acc) {
        accElement.style.display = "none";
    } else {
        accElement.style.display = "block";
    };
};

