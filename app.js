
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

// ----------------------to do list app----------------------------

const TO_DO_DONE = 'TO_DO_DONE';
const TO_DO_PROCESSING = 'TO_DO_PROCESSING';
const LABEL_TO_DO_LIST_STORAGE = 'dataToDoListJavascript';

let toDoList = [];

window.onload = () => {
    try {
        const dataToDoList = localStorage.getItem(LABEL_TO_DO_LIST_STORAGE);
        const dataInitial = JSON.parse(dataToDoList);
        toDoList = Array.isArray(dataInitial) ? dataInitial : [];
        console.log(toDoList)
        toDoList.forEach((toDoItem, index) => {
            addLiEl(toDoItem);
        })
    } catch (e) {

    }
}

const onkeydownInput = (event) => {
    if (event.key === 'Enter') {
        clickAddToDo();
    }
}

const clickAddToDo = () => {
    const toDoInput = document.getElementById('toDoInput');
    const toDoText = toDoInput.value;
    if (toDoText !== '') {
        const dataToDo = addToDo(toDoText);
        addLiEl(dataToDo);
        toDoInput.value = '';
    }
}

const addLiEl = (dataToDo) => {
    const id = dataToDo.id;
    const toDoText = dataToDo.label;
    const liEle = document.createElement('li')
    liEle.setAttribute('id', id.toString());
    if (dataToDo.status === TO_DO_DONE) {
        liEle.setAttribute('class', 'checked');
    }
    liEle.setAttribute('onclick', `toggleStatusToDo(${id})`)

    // span checkIcon
    const spanChecked = document.createElement('span');
    spanChecked.setAttribute('class', 'checkedIcon');
    liEle.appendChild(spanChecked);

    // span label
    const spanLabel = document.createElement('span');
    spanLabel.setAttribute('class', 'label');
    spanLabel.innerText = toDoText;
    liEle.appendChild(spanLabel);

    // span label
    const spanClose = document.createElement('span');
    spanClose.setAttribute('class', 'close');
    spanClose.setAttribute('onclick', `clickRemoveToDo(${id})`)
    spanClose.innerText = '×';
    liEle.appendChild(spanClose);

    document.getElementById('toDoList').prepend(liEle);
}

const addToDo = (toDo) => {

    const now = new Date();
    const dataToDo = {
        id: now.valueOf(),
        label: toDo,
        status: TO_DO_PROCESSING,
        createdAt: now,
    };
    toDoList.push(dataToDo)
    updateDataLocalStorage(toDoList);
    return dataToDo;
}

const clickRemoveToDo = (id) => {
    const liEle = document.getElementById(id);
    liEle.remove();
    removeToDo(id);
}

const removeToDo = (id) => {
    toDoList = toDoList.filter((toDoItem, index) => {
        return toDoItem.id !== id;
    })
    updateDataLocalStorage(toDoList);
}

const toggleStatusToDo = (id) => {
    const toDoToggle = toDoList.find((toDoItem, index) => {
        return toDoItem.id === id;
    })
    if (toDoToggle) {
        console.log(toDoToggle)
        const liEle = document.getElementById(id);
        if (toDoToggle.status === TO_DO_DONE) {
            liEle.classList.remove('checked');
        } else {
            liEle.classList.add('checked')
        }
    }
    onChangeToDoStatus(id);
}

const onChangeToDoStatus = (id) => {
    toDoList = toDoList.map((toDoItem, index) => {
        if (toDoItem.id === id) {
            return {
                ...toDoItem,
                status: toDoItem.status === TO_DO_DONE ? TO_DO_PROCESSING : TO_DO_DONE
            }
        } else {
            return toDoItem;
        }
    })
    updateDataLocalStorage(toDoList);
}

const updateDataLocalStorage = (toDoList) => {
    localStorage.setItem(LABEL_TO_DO_LIST_STORAGE, JSON.stringify(toDoList))
}