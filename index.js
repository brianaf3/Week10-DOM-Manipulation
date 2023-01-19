/* Get element by id method
let button = document.getElementById('my-button');
console.log(button); */

/* Get element by tag name
let buttonsByTag = document.getElementsByTagName('button');
console.log(buttonsByTag); */

/* get elements by class name
let buttonsByClassName = document.getElementsByClassName('my-class');
console.log(buttonsByClassName); */

/* get elements by css selectors/querySelectorAll
let buttonsByCssSelector = document.querySelectorAll('button.my-class');
console.log(buttonsByCssSelector); */

//Interacting with the DOM
let button = document.getElementById('btn');
let content = document.getElementById('content');

// document.getElementById('content').innerHTML = 'Goodbye.';

// change content
button.addEventListener('click',() => {
    if (content.innerHTML == "Goodbye.") {
        content.innerHTML = 'Hello.';
    } else {
        content.innerHTML = 'Goodbye.'
    }
});

// removing content
document.getElementById('remove').addEventListener('click', () => {
    let idToRemove = document.getElementById('remove-id').value;
    let elementToRemove = document.getElementById(idToRemove);
    elementToRemove.parentNode.removeChild(elementToRemove);
    document.getElementById('remove-id').value = '';
});

let id = 0;

//adding content
document.getElementById('add').addEventListener('click', () => {
    var parent = document.getElementById('paragraphs');
    var newElement = document.createElement('p');
    newElement.innerHTML = document.getElementById('new-text').value;
    newElement.setAttribute('id', id++);
    parent.appendChild(newElement);
    document.getElementById('new-text').value = '';
});