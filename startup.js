//register service worker 

// if(`serviceWorker` in navigator){
//     navigator.serviceWorker.register(`./sw.js`)
//         .then(reg => console.log(`service worker has been registered`))
//         .catch(err => console.log(`error registering worker`, err))
// };  

const token = JSON.parse(localStorage.getItem('token')) || [];
const path = 'http://23.245.231.92:5000';

//grabs bottle info from external source
const bottlesWhisky = [];

async function getBottles() {

  const response = await fetch(`${path}/userData/bottles`, {
      method: 'GET',
      headers: {
          'token': token
      }
  });
  const result = await response.json();
  if (result === 'Not Authorized, invalid token') {
      console.log(result);
      return result;
  };

  for (let bottle of result) {
      bottlesWhisky.push(bottle)
  };
};

//cocktails in storage
const cocktails = [];

const getCocktails = async () => {
    
    const response = await fetch(`${path}/userData/cocktails`, {
        method: 'GET',
        headers: {
            'token': token
        }
    });
    const result = await response.json();

    if (result === 'Not Authorized, invalid token') {
        console.log(result);
        return result;
    };

    for (let cocktail of result) {
        const { cocktail_id, cocktail_name, cocktail_base_spirit, cocktail_ingredients, cocktail_recipe, cocktail_active, user_id } = cocktail;
        try {

            const thisCocktail = {
                cocktail_id,
                cocktail_name,
                cocktail_base_spirit,
                cocktail_ingredients: JSON.parse(cocktail_ingredients),
                cocktail_recipe,
                cocktail_active,
                user_id
            }
            cocktails.push(thisCocktail);
        } catch (error) {
            console.error(error.message, cocktail_name)
        }

    };
};

//gets settings data
const settings = [];

const getSettings = async () => {

    const response = await fetch(`${path}/userData/settings`, {
        method: 'GET',
        headers: {
            'token': token
        }
    });
    const result = await response.json();

    if (result === 'Not Authorized, invalid token') {
        console.log(result);
        return result;
    };

    for (let setting of result) {
        settings.push(JSON.parse(setting))
    };

};



(async () => {

  //check if token exists or is valid
  const response = await fetch(`${path}/auth/is-verify`, {
      method: 'GET',
      headers: {
          'token': token
      }
  });
  const result = await response.json();

  if(!result.user_name) {
    loginModal.showModal();
    userNameDisplay.innerHTML = `<p id="userLoginButton"> <button id="changeUser" onclick="openLogin()">Log-in.</button>User: Guest</p>`
  } else if (result.user_id === '56daa9d4-6cef-466f-aae1-93f7dd08433b') {
    userNameDisplay.innerHTML = `<p id="userLoginButton"> <button id="changeUser" onclick="logOut(event)">Log Out.</button>User: ${result.user_name}</p>`;
    document.getElementById('versionNumber').innerHTML = `<button onclick='addBottlesJSON(event)'>Add JSON bottle</button>`
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

  //items needed for startup
  console.log(bottlesWhisky);
  console.log(settings);
  console.log(cocktails);

  openPage('bottles.html');

})();