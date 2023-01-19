// Create a member
class Member {
    constructor(name, position) {
        this.name = name;
        this.position = position;
    }
}

// Create a class for the team
class Team {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.members = [];
    }

    // add a method that takes a member and adds it to this.member
    addMember(member) {
        this.members.push(member);
    }

    // method for deleting a member 
    deleteMember(member) {
        let index = this.members.indexOf(member);
        this.member.splice(index,1);
    }
}

let teams = [];
let teamId = 0;

// creates new teams
onclick('new-team', () => {
    teams.push(new Team(teamId++, getValue('new-team-name')));
    drawDOM();
});

// creates event listeners
function onclick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

// get the value of an element by its id
function getValue(id) {
    return document.getElementById(id).value;
}

// itterate over the teams array & build tables for each one
function drawDOM() {
    let teamDiv = document.getElementById('teams');
    clearElement(teamDiv);
    for (team of teams) {
        let table = createTeamTable(team);
        let title = document.createElement('h2');
        title.innerHTML = team.name;
        title.appendChild(createDeleteTeamButton(team));
        teamDiv.appendChild(title);
        teamDiv.appendChild(table);
        for (member of team.members) {
            createMemberRow(team, table, member);
        }
    }
}

function createMemberRow(team, table, member) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = member.name;
    row.insertCell(1).innerHTML = member.position;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(team, member));
}

function createDeleteRowButton(team, member) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete';
    btn.onClick = () => {
        let index = team.members.indexOf(member);
        team.members.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createDeleteTeamButton(team) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete Team';
    btn.onClick = () => {
        let index = teams.indexOf(team);
        teams.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createNewMemberButton(team) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Create';
    btn.onClick = () => {
        team.members. push(new Member(getValue(`name-input-${team.id}`), getValue(`position-input-${team.id}`)));
        drawDOM(); 
    };
    return btn;
}

function createTeamTable(team) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-dark table-striped');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let positionColumn = document.createElement('th');
    nameColumn.innerHTML = 'Name';
    positionColumn.innerHTML = 'Position';
    row.appendChild(nameColumn);
    row.appendChild(positionColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let positionTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input${team.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let positionInput = document.createElement('input');
    positionInput.setAttribute('id', `position-input${team.id}`);
    positionInput.setAttribute('type', 'text');
    positionInput.setAttribute('class', 'form-control');
    let newMemberButton = createNewMemberButton(team);
    nameTh.appendChild(nameInput);
    positionTh.appendChild(positionInput);
    createTh.appendChild(newMemberButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(positionTh);
    formRow.appendChild(createTh);
    return table;
}

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}