const URL = "http://localhost:8080";

function getUsers() {
    let out = $.ajax({ method: "GET", url: `${URL}/api/user/` });

    return out;
}

function getUser(id) {
    let out = $.ajax({ method: "GET", url: `${URL}/api/user/{id}` });
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
    let out = $.ajax({ method: "DELETE", url: `${URL}/api/user/${id}`});

    return out;
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

    fillUsersTable();
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
                    <td scope="col">
                        <button type="button" class="btn btn-warning" data-bs-dismiss="modal" onclick="editUserFromList('${user.id}')">Edit</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="deleteUserFromList('${user.id}')">Delete</button>
                    </td>
                </tr>
                `;
}

function mapUserTypeInCombobox(userType) {
    return `<option value=${userType.id}>${userType.description}</option>
                    `;
}

async function fillUserForm(id) {
    let user = await getUser(id);
}

async function editUserFromList(id) {
    fillUserForm(id);
}

async function deleteUserFromList(id) {
    let out = await deleteUser(id);

    fillUsersTable();
}

async function fillUsersTable() {
    const usersTableBody = $("#users-table__body");

    usersTableBody.empty();

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