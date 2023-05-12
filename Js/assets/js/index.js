const url = 'https://reqres.in/api/users?delay=3';
const btnRead = document.getElementById('btn-read');
btnRead.addEventListener('click', () => getUsersWithLocalStorage());
const cardContainer = document.getElementById('card-container');
let userList;

function getUsersWithLocalStorage() {

    if (localStorage.getItem('data') !== null) {
        showLoading();
        clearCardElements(cardContainer);
        userList = JSON.parse(localStorage.getItem('data'));
        displayItems(userList, cardContainer);
        hideLoading();
    } else {
        clearCardElements(cardContainer);
        getUsersFetch(url);
    }

    setInterval(() => {
        clearCardElements(cardContainer);
        getUsersFetch(url);
    }, 60_000);

}

function getUsersFetch(url) {
    showLoading();
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.data);
            updateDataLocalStorage('data', data.data);
            displayItems(userList, cardContainer);
            hideLoading();
        })
        .catch((error) => console.error(error));
}

function updateDataLocalStorage(key, data) {
    localStorage.clear();
    localStorage.setItem(key, JSON.stringify(data));
    userList = JSON.parse(localStorage.getItem(key));
}

function displayItems(userDataList, container) {

    userDataList.forEach((element) => {
        const card = document.createElement('div');
        card.classList.add('col');
        card.innerHTML = `
                   <div class="card" style="width: 18rem">
                        <img src="${element.avatar}" class="card-img-top rounded-circle mx-auto d-block img-card my-4" alt="avatar">
                        <div class="card-body mx-auto d-block text-center">
                        <h5 class="card-title">${element.first_name} ${element.last_name}</h5>
                        <p class="card-text">${element.email}</p>
                        </div>
                    </div>
               `
        container.appendChild(card);
    });
}

function clearCardElements(container) {
    const elements = container.querySelectorAll('div');
    elements.forEach(element => element.remove());
}


function getLoadingElement() {
    const loadingElement = document.getElementById('loading');
    return loadingElement;
}

function showLoading() {
    const loadingElement = getLoadingElement();
    loadingElement.classList.remove('d-none');
    loadingElement.classList.add('d-flex');
}

function hideLoading() {
    const loadingElement = getLoadingElement();
    loadingElement.classList.remove('d-flex');
    loadingElement.classList.add('d-none');
}