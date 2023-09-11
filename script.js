const keyApi = 'fc62a6fd808153935c7f296d7d6c810d';
const weatherInput = document.querySelector('#my-input');
const dash = document.querySelector('.hide');
const container = document.querySelector('.container');
//dash detail
const dashInput = document.querySelector('#card-text');
const button = document.querySelector('#btn-dash');
const city = document.querySelector('#city');
const date = document.querySelector('#date');
const time = document.querySelector('#time');
const temp = document.querySelector('#temp');
const temp_detail = document.querySelector('#temp-detail');
const description = document.querySelector('#clima');
const icon = document.querySelector('#openWeatherIcon');

//Event
weatherInput.addEventListener('keyup', ({key}) => {
    const cityName = weatherInput.value;

    if (key === 'Enter') {

        if (validarInput(cityName)) {
            alert('Preencha o campo de pesquisa');
        } else {
            weatherInput.value = "";
            keyupLoader();
            responseApi(cityName);
        }
    }
});

button.addEventListener('click', (e) => {
    e.preventDefault();

    const input = dashInput.value;

    if (validarInput(input)) {
        alert('Preencha o campo de pesquisa');
    } else {
        dashInput.value = "";
        responseApi(input);
    }
});


//Function
const responseApi = async (city) => {
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${keyApi}`;

    try {
        const response = await fetch(API);
        if (response.ok) {
            const data =  await response.json();
            showDetail(data);
        }
    } catch (ex) {
        console.log(`Erro ${ex}`);
    }
}

const showDetail = (data) => {
    const dados = data;

    city.innerText = dados.name +','+ dados.sys.country;
    temp.innerText = parseInt(dados.main.temp) + 'ºC';
    temp_detail.innerText = parseInt(dados.main.temp_max) + 'ºC' + ' / ' + parseInt(dados.main.temp_min) + 'ºC';
    description.innerText = dados.weather[0].description;
    icon.setAttribute('src',`https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`);
}

const keyupLoader = () => { 
    dashInput.value = "";
    dash.classList.toggle('hide');
    container.classList.toggle('hide');
}

const validarInput = (input) => {return input === ""};