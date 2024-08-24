
const loginModal = document.getElementById('userLogin');
const registerModal = document.getElementById('userRegister');
const userNameDisplay = document.getElementById('userLoginButton');


function openLogin() {
    loginModal.showModal();
};

async function logUserIn(event) {
    event.preventDefault();
    const emailLogin = document.getElementById('userEmailLogin');
    const passwordLogin = document.getElementById('userLoginPassword');
    const user = {
        email: emailLogin.value,
        password: passwordLogin.value
    };

    const response = await fetch(`${path}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    const result = await response.json();

    if (!result[0].token) {
        document.getElementById('successMessage').innerText = result;
        return result;
    };

    token[0] = result[0].token;

    localStorage.setItem('token', JSON.stringify(token));

    location.reload();

};

function changeToRegister(event) {
    event.preventDefault();
    loginModal.close();
    registerModal.showModal();
};

async function registerNewUser(event) {
    event.preventDefault();
    const userNameRegister = document.getElementById('userNameRegister');
    const userDOBRegister = document.getElementById('userDOB');
    const userEmailRegister = document.getElementById('userEmailRegister');
    const userPasswordRegister = document.getElementById('userPasswordRegister');
    const confirmPassword = document.getElementById('confirmPassword');
    const errorMessage = document.getElementById('errorMessage');

    if (userPasswordRegister.value !== confirmPassword.value) {
        errorMessage.innerText = 'Passwords do not match';
        return;
    };

    const userAge = new Date(userDOBRegister.value)
    const currentTime = Date.now();
    const checkAge = (currentTime - userAge) / 1000 / 60 / 60 / 24 / 365;


    if (checkAge < 21) {
        errorMessage.innerText = `You must be 21 or older to use this app`;
        return;
    }

    const user = {
        name: userNameRegister.value,
        email: userEmailRegister.value,
        dob: userDOBRegister.value,
        password: userPasswordRegister.value
    };

    const response = await fetch(`${path}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    const result = await response.json();


    if (!result.token) {
        errorMessage.innerText = result;
    } else {

        token[0] = result.token;

        localStorage.setItem('token', JSON.stringify(token));

        location.reload();
    }
    
};

function changeToLogin(event) {
    event.preventDefault();
    registerModal.close();
    loginModal.showModal();
};

function logOut(event) {
    event.preventDefault();
    localStorage.setItem('token', "[]");
    location.reload();
};

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