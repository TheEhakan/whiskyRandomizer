
//gets the login display elements
const loginModal = document.getElementById('userLogin');
const registerModal = document.getElementById('userRegister');
const userNameDisplay = document.getElementById('userLoginButton');

//show the login modal
function openLogin() {
    loginModal.showModal();
};

//send request to server to log users in
async function logUserIn(event) {

    //prevents automatic refresh
    event.preventDefault();

    //user login inputs
    const emailLogin = document.getElementById('userEmailLogin');
    const passwordLogin = document.getElementById('userLoginPassword');

    //create object to send to server
    const user = {
        email: emailLogin.value,
        password: passwordLogin.value
    };

    //send user details to server to log in
    const response = await fetch(`${path}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    const result = await response.json();

    //displays error message if any
    if (!result[0].token) {
        document.getElementById('successMessage').innerText = result;
        return result;
    };

    //sets the JWT for authentication
    token[0] = result[0].token;

    localStorage.setItem('token', JSON.stringify(token));

    //reloads the page after user is logged in to set up app
    location.reload();

};

//change from login to register modal
function changeToRegister(event) {

    //prevents auto refresh
    event.preventDefault();

    //switches modals
    loginModal.close();
    registerModal.showModal();
};

//register new user and sends to server
async function registerNewUser(event) {

    // prevents auto refresh
    event.preventDefault();

    //new user inputs
    const userNameRegister = document.getElementById('userNameRegister');
    const userDOBRegister = document.getElementById('userDOB');
    const userEmailRegister = document.getElementById('userEmailRegister');
    const userPasswordRegister = document.getElementById('userPasswordRegister');
    const confirmPassword = document.getElementById('confirmPassword');
    const errorMessage = document.getElementById('errorMessage');

    //check password for matching values
    if (userPasswordRegister.value !== confirmPassword.value) {
        errorMessage.innerText = 'Passwords do not match';
        return;
    };

    //compares age to make sure they are old enough
    const userAge = new Date(userDOBRegister.value)
    const currentTime = Date.now();
    const checkAge = (currentTime - userAge) / 1000 / 60 / 60 / 24 / 365;

    if (checkAge < 21) {
        errorMessage.innerText = `You must be 21 or older to use this app`;
        return;
    }

    //creates user object to send to server
    const user = {
        name: userNameRegister.value,
        email: userEmailRegister.value,
        dob: userDOBRegister.value,
        password: userPasswordRegister.value
    };

    //sends data to server to try and create new user
    const response = await fetch(`${path}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    const result = await response.json();

    //displays error message if any
    if (!result.token) {
        errorMessage.innerText = result;

    } else {
        
        //if create is successfull set the JWT token for later auth
        token[0] = result.token;
        localStorage.setItem('token', JSON.stringify(token));

        //reload page to set up app for user
        location.reload();
    }
    
};

//seitch from register modal to login
function changeToLogin(event) {

    //prevents auto reload
    event.preventDefault();

    //switch from register modal to login modal
    registerModal.close();
    loginModal.showModal();

};

//log out current user
function logOut(event) {

    //prevents auto reload
    event.preventDefault();

    //clears JWT token and reloads page to prepare for new user
    localStorage.setItem('token', "[]");
    location.reload();

};

//check if user is logged in when modal is closed
async function checkIfLoggedIn(location) {

    //check if jtw token is valid
    const response = await fetch(`${path}/auth/valid-token`, {
        method: 'GET',
        headers: {
            'token': token
        }
    });
    const result = await response.json();

    //if token is valid close modal else promp user to log in
    if (result === true) {
        closeModal(location);
    } else {
        closeModal(location);
        loginModal.showModal()
        document.getElementById('successMessage').innerText = 'Please log in.'
    };
}