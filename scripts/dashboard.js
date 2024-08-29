
//displays user information on open
async function displayUserInfo() {

    //elements to display user info
    const userName = document.getElementById('user-name');
    const userEmail = document.getElementById('user-email');
    const userDOB = document.getElementById('user-DOB');

    //get user info from the server
    const response = await fetch(`${path}/dashboard/`,{
        method: 'GET',
        headers: {
            'token': token
        }
    });
    const result = await response.json();

    //make the date useable
    const dob = new Date(result.user_dob);

    //display info to user
    userName.innerText = `Name: ${result.user_name}`;
    userEmail.innerText = `Email: ${result.user_email}`;
    userDOB.innerText = `DOB: ${dob.toLocaleDateString()}`;

};

function checkBtnValue() {

    //button to be checked
    const userEditBtn = document.getElementById('user-edit-btn');

    //check value and perform related action
    if (userEditBtn.value === 'Confirm') {
        openUserEdit();
    } else {
        updateUser();
    };
}

//allows user to edit personal info
function editUserInfo() {

    //gets the modal to edit info
    const userModal = document.getElementById('user-info-edit');
    const userEdited = document.getElementById('new-user-info');

    //get elements with user info
    const userNameDiv = document.getElementById('user-name');
    const userEmailDiv = document.getElementById('user-email');
    const userDOBDiv = document.getElementById('user-DOB');

    //gets the user info from elements
    const userName = userNameDiv.innerText.slice(6);
    const userEmail = userEmailDiv.innerText.slice(6);
    const userDOB = userDOBDiv.innerText.slice(4);

    const userYear = userDOB.slice(5);
    const userMonth = userDOB.slice(1, 2);
    const userDay = userDOB.slice(3, 4);

    //allows user to edit info
    userEdited.innerHTML = `Name: <input type='text' id='user-name-input' value='${userName}' />
        Email: <input type='email' id='user-email-input' value='${userEmail}' />
        DOB: <input type='date' id='user-dob-input' value='${userYear}-${userMonth.padStart(2, '0')}-${userDay.padStart(2, '0')}'/>`

    //opens modal to edit info
    userModal.showModal();

};

//opens modal to confirm info and update
function openUserEdit() {

    //get modal and its div from dom
    const userEditBtn = document.getElementById('user-edit-btn');
    const userEdited = document.getElementById('new-user-info');

    //get element values from display
    const userName = document.getElementById('user-name-input').value;
    const userEmail = document.getElementById('user-email-input').value;
    const userDOB = document.getElementById('user-dob-input').value;

    //checks inputs for null
    if (userName === '' || userEmail === '' || userDOB === '') {
        return document.getElementById('user-info-error').innerText = 'Please fill out all information';
    };
    document.getElementById('user-info-error').innerText = '';

    //displays edited information
    userEdited.innerHTML = `<p id='editedName'>Name: ${userName}</p>
    <p id='editedEmail'>Email: ${userEmail}</p>
    <p id='editedDOB'>DOB: ${userDOB}</p>`;

    //changes value of button
    userEditBtn.value = 'Submit';

}

//sends info to server to save any edits
async function updateUser() {
    
    //gather new user info
    const userNameDisplay = document.getElementById('editedName');
    const userEmailDisplay = document.getElementById('editedEmail');
    const userDOBDisplay = document.getElementById('editedDOB');
    const userEditBtn = document.getElementById('user-edit-btn');

    
    //parse the values from the display
    const userName = userNameDisplay.innerText.slice(6);
    const userEmail = userEmailDisplay.innerText.slice(7);
    const userDOB = userDOBDisplay.innerText.slice(5);

    //make user info object
    const userInfo = {
        name: userName,
        email: userEmail,
        dob: userDOB
    };

    //sends new data to the server
    const response = await fetch(`${path}/dashboard/`,{
        method: 'PUT',
        headers: {
            'token': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
    });
    const result = await response.json();

    //if no user results display error message and reset
    if (!result.user_name) {
        editUserInfo();
        userEditBtn.value = 'Confirm';
        return document.getElementById('user-info-error').innerText = result;
    }

    //changes view back to the normal
    document.getElementById('user-password').style.visibility = '';
    document.getElementById('cancelBtn').style.visibility = 'hidden';
    document.getElementById('editBtn').value = 'Edit Info';

    //elements to display user info
    const userNameDiv = document.getElementById('user-name');
    const userEmailDiv = document.getElementById('user-email');
    const userDOBDiv = document.getElementById('user-DOB');

    //make the date useable
    const dob = new Date(result.user_dob);

    //display info to user
    userNameDiv.innerText = `Name: ${result.user_name}`;
    userEmailDiv.innerText = `Email: ${result.user_email}`;
    userDOBDiv.innerText = `DOB: ${dob.toLocaleDateString()}`;

    //close the modal and reset button
    userEditBtn.value = 'Confirm';
    closeModal('user-info-edit');

}

//open the modal to set new password
function resetPassword() {

    //open modal
    document.getElementById('user-password-edit').showModal();

};

//change the password for the user
async function changePassword() {

    //get password elements
    const newPass = document.getElementById('new-password').value;
    const newPassConfirm = document.getElementById('new-password-confirm').value;
    const passError = document.getElementById('password-error');
    
    //check new passwords
    if (newPass === '') {
        return passError.innerText = 'Please provide a password';
    } else if (newPass !== newPassConfirm) {
        return passError.innerText = 'Passwords must match.';
    }

    //make object to send server
    const userPassowrd = { password: newPass};
    
    //send new password to server
    const response = await fetch(`${path}/dashboard/change-pass`,{
        method: 'PUT',
        headers: {
            'token': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userPassowrd)
    });
    const result = await response.json();

    if (result === 'Missing Credentials') {
        return passError.innerText = 'Please provide a password';
    }

    //close password modal
    closeModal('user-password-edit');

    // temporary changes display to show password was changed
    document.getElementById('user-password').innerText = result;
    setTimeout( () => {
        document.getElementById('user-password').innerHTML = `<button id="changeUser" onclick="resetPassword()">Reset Password</button>`
    }, 2000)

}