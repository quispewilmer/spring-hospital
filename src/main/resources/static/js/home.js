const URL = "http://localhost:8080";

function getUsers() {
    let out = $.ajax({ method: "GET", url: `${URL}/api/user/` });

    return out;
}

function getUserTypes() {
    let out = $.ajax({ method: "GET", url: `${URL}/api/user-type/` });

    return out;
}

function postUser(user) {
    let out = $.ajax({ method: "POST", url: `${URL}/api/user/`, data: JSON.stringify({
            username: user.username,
            password: user.password,
            cellphone: user.cellphone,
            email: user.email,
            birthdate: user.birthdate,
            userType: {
                id: user.userType.id,
                description: null
            }
        }), contentType: "application/json" });

    return out;
}

function deleteUser(id) {

}

async function saveUser() {
    let user = {
        username: $("#username").val(),
        password: $("#password").val(),
        cellphone: $("#cellphone").val(),
        email: $("#email").val(),
        birthdate: $("#birthdate").val(),
        userType: {
            id: parseInt($("#user-type").val(), 10),
            description: null
        }
    };

    let out = await postUser(user);

    console.log(out);
}

function mapUserInTableRow(user) {
    return `<tr>
                    <td scope="col">${user.id}</td>
                    <td scope="col">${user.username}</td>
                    <td scope="col">${user.password}</td>
                    <td scope="col">${user.cellphone}</td>
                    <td scope="col">${user.email}</td>
                    <td scope="col">${user.birthdate}</td>
                    <td scope="col">${user.userType.description}</td>
                </tr>
                `;
}

function mapUserTypeInCombobox(userType) {
    return `<option value=${userType.id}>${userType.description}</option>
                    `;
}

async function fillUsersTable() {
    const usersTableBody = $("#users-table__body");

    let users = await getUsers();

    users.forEach(user => {
        usersTableBody.append(mapUserInTableRow(user));
    })
}

async function fillUserTypesCombobox() {
    const userTypesCombobox = $("#user-type");

    let userTypes = await getUserTypes();

    userTypes.forEach(userType => {
        userTypesCombobox.append(mapUserTypeInCombobox(userType));
    })
}

function index() {
    let saveButton = $("#save-button");

    fillUsersTable();
    fillUserTypesCombobox();

    saveButton.on("click", e => {
        saveUser();
    })
}

$(document).ready(function() {
    index();
});