// Create class for a Dish
class Dish {
    constructor(name, protien) {
        this.name = name;
        this.protien = protien;
    }
}

// Create a class for the Category
class Category {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.dishes  = [];
    }

    // add a method that takes a dish and adds it to this.dishes
    addDish(dish) {
        this.dishes.push(dish);
    }

    // method for deleting a dish 
    deleteDish(dish) {
        let index = this.dishes.indexOf(dish);
        this.dishes.splice(index,1);
    } 
}

let categories = [];
let categoryId = 0;

// creates new categories
onclick('new-category', () => {
    categories.push(new Category(categoryId++, getValue('new-category-name')));
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

// itterate over the categories array & build tables for each one
function drawDOM() {
    let categoryDiv = document.getElementById('categories');
    clearElement(categoryDiv);
    for (category of categories) {
        let table = createCategoryTable(category);
        let title = document.createElement('h2');
        title.innerHTML = category.name;
        title.appendChild(createDeleteCategoryButton(category));
        categoryDiv.appendChild(title);
        categoryDiv.appendChild(table);
        for (dish of category.dishes) {
            createDishRow(category, table, dish);
        }
    }
}

// Row that displays a dish
function createDishRow(category, table, dish) {
    let row = table.insertRow(3);
    row.insertCell(0).innerHTML = dish.name;
    row.insertCell(1).innerHTML = dish.protien;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(category, dish));
}

function createDeleteRowButton(category, dish) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-light';
    btn.innerHTML = 'Delete';
    btn.onClick = () => {
        let index = category.dishes.indexOf(dish);
        category.dishes.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createDeleteCategoryButton(category) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-secondary';
    btn.innerHTML = 'Delete Category';
    btn.onClick = () => {
        let index = categories.indexOf(category);
        categories.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createNewDishButton(category) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-light';
    btn.innerHTML = 'Create';
    btn.onClick = () => {
        category.dishes.push(new Dish(getValue(`name-input-${category.id}`), getValue(`protien-input-${category.id}`)));
        drawDOM(); 
    };
    return btn;
}

//creates tables for each category of dishes
function createCategoryTable(category) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-success table-striped');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let protienColumn = document.createElement('th');
    nameColumn.innerHTML = 'Name';
    protienColumn.innerHTML = 'Protien';
    row.appendChild(nameColumn);
    row.appendChild(protienColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let protienTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input${category.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let protienInput = document.createElement('input');
    protienInput.setAttribute('id', `position-input${category.id}`);
    protienInput.setAttribute('type', 'text');
    protienInput.setAttribute('class', 'form-control');
    let newDishButton = createNewDishButton(category);
    nameTh.appendChild(nameInput);
    protienTh.appendChild(protienInput);
    createTh.appendChild(newDishButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(protienTh);
    formRow.appendChild(createTh);
    return table;
}

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}