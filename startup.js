//register service worker 

// if(`serviceWorker` in navigator){
//     navigator.serviceWorker.register(`./sw.js`)
//         .then(reg => console.log(`service worker has been registered`))
//         .catch(err => console.log(`error registering worker`, err))
// };  

//jwt token storage
const token = JSON.parse(localStorage.getItem('token')) || [];

//path to fetch any data
const path = 'http://23.245.231.92:5000';

//function to set up all data for the app and check log-in
(async () => {
  
    //check if token exists or is valid
    const response = await fetch(`${path}/auth/is-verify`, {
        method: 'GET',
        headers: {
            'token': token
        }
    });
    const result = await response.json();

    //if user is not logged in displays log-in modal
    if(!result.user_name) {
        loginModal.showModal();
        return userNameDisplay.innerHTML = `<p id="userLoginButton"> <button id="changeUser" onclick="openLogin()">Log-in.</button>User: Guest</p>`;
        
        //if user is loggin in display user name in menu
    } else {
        userNameDisplay.innerHTML = `<p id="userLoginButton"> <button id="changeUser" onclick="logOut(event)">Log Out.</button>User: ${result.user_name}</p>`;
    };
    
    //if loged in get info from database
    await getSettings();
    await getBottles();
    await getCocktails();
    
    //sort arrays to improve load time
    sortArrays(bottlesWhisky);
    sortArrays(cocktails);
    
    //logs items in storage
    console.log(bottlesWhisky);
    console.log(settings);
    console.log(cocktails);
    
    //opens default page
    openPage('bottles.html');

})();