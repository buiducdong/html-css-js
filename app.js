
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        //toggle
        nav.classList.toggle('nav-active');
        //animation links
        navLinks.forEach((elementLink, index) => {
            
            if(elementLink.style.animation) {
                elementLink.style.animation = ''
            } else {
                elementLink.style.animation = `
                navLinkFadeOut 1s ease forwards ${index / 6}s`
            }
        });

        //burger animation
        burger.classList.toggle('toggle')
    });
}

navSlide();



var fakeApi = "http://localhost:3000/content"

function start() {
    getContent((contents) => {
        renderContent(contents)
    });
    handleForm();
}
start();

function getContent(callback) {
    fetch(fakeApi)
        .then((api) => {
            return api.json()
        })
        .then(callback);
}

function createContetn(data) {
    fetch(fakeApi,{
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((api) => {
        return api.json()
    })
    .then(getContent((contents) => {
        renderContent(contents)
    }))
}

function renderContent(contents) {
    const listContent = document.getElementById('listContent')
    const content = contents.map((content) => {
        return `<li class = "item-${content.id}">
        <h4>${content.content} - ${content.date}</h4>
        <button onclick="deleteContent(${content.id})" style="margin-left: 20px;cursor: pointer; background-color: red; border-radius: 4px; padding: 4px 4px">delete</button>
        </li>`
    })
    listContent.innerHTML = content;
}

function deleteContent(id) {
    fetch(fakeApi + '/' + id,{
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        headers: {
        'Content-Type': 'application/json'
        }
    })
    .then((api ) => {
        return api.json()
    })
    .then(function() {
        const item = document.querySelector('.item-' + id)
        if(item) {
            item.remove();
        }
    })
}
 
function handleForm() {
    var addBtn = document.querySelector('#add');
    addBtn.onclick = function() {
        var content = document.querySelector('input[name="content"]').value;
        var date = document.querySelector('input[name="date"]').value;
        
        var formData = {
            content: content,
            date: date
        }

        createContetn(formData)
    }
}