const URL = "http://localhost:8080";

function getUsers() {
    let users = $.ajax({ method: "GET", url: `${URL}/api/user/` });

    return users;
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

async function fillUsersTable() {
    const usersTableBody = $("#users-table__body");

    let users = await getUsers();

    users.forEach(user => {
        usersTableBody.append(mapUserInTableRow(user));
    })
}

function index() {
    fillUsersTable();
}

$(document).ready(function() {
    index();
});