const keyApi = 'fc62a6fd808153935c7f296d7d6c810d';
const background = document.querySelector('.Today');
const weatherInput = document.querySelector('#my-input');
const dash = document.querySelector('.hide');
const container = document.querySelector('.container');
const dashInput = document.querySelector('#card-text');
const button = document.querySelector('#btn-dash');
//dash detail
const city = document.querySelector('#city');
const date = document.querySelector('#date');
const time = document.querySelector('#time');
const temp = document.querySelector('#temp');
const temp_detail = document.querySelector('#temp-detail');
const description = document.querySelector('#clima');
const uv = document.querySelector('#uv');
const feelsLike = document.querySelector('#feels-like')
const pop = document.querySelector('#pop')
const speed = document.querySelector('#speed')
const humidity = document.querySelector('#humidity')
const icon = document.querySelector('#openWeatherIcon');
//

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
            responseForecast(data);
            const timeZoneData = await getTimeZoneData(data);
            displayTimeZone(timeZoneData);
        }
    } catch (ex) {
        console.log(`Erro ${ex}`);
    }
}

const getTimeZoneData = async (dados) => {
    const lat = dados.coord.lat;
    const lon = dados.coord.lon;

    try {
        const timeZoneApi = `https://api.ipgeolocation.io/timezone?apiKey=e3b1fc8a9a784de8b0159b3dff85ee21&lat=${lat}&long=${lon}`;

        const response = await fetch(timeZoneApi);
        if(response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Deu erro bigode');
    }
}

const displayTimeZone = (timeZoneData) => {
    time.innerText = timeZoneData.time_24;
    date.innerText = timeZoneData.date_time_txt;
}

const responseForecast =  async(data) => {
    const apiWeatherBit = 'a98cc1ab51f54b06987816d2657027f2';
    const lat = data.coord.lat;
    const lon = data.coord.lon;
    const weatherBit = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${apiWeatherBit}&days=5&lang=pt`;

    try 
    {
        const response = await fetch(weatherBit);
        if (response.ok) {
           const weatherBitData = await response.json();
            showWeather(weatherBitData);
        }
    } catch (erro) {
        console.log(`Erro ${erro}`);
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

const showWeather = (dado) => {
    const dados = dado;
    const detailElements = document.querySelectorAll('#temp-details');
    const weatherIcons = document.querySelectorAll('#weather-icon');
    const climaNext = document.querySelectorAll('#clima-next');

    dados.data.slice(0, 5).forEach((fiveDays, index) => {
        const temp_max = fiveDays.max_temp;
        const temp_min = fiveDays.min_temp;
        const cloud = fiveDays.clouds;
        const iconCode = fiveDays.weather.icon;
        const description = fiveDays.weather.description;
        const iconSrc = `https://www.weatherbit.io/static/img/icons/${iconCode}.png`;
        const detailDay = `Máx ${temp_max} C, Min ${temp_min}C, Cloud ${cloud}`;

        weatherIcons[index].src = iconSrc;
        climaNext[index].textContent = description;
        detailElements[index].innerHTML = detailDay;
        uv.innerText = fiveDays.uv;
        feelsLike.innerText = fiveDays.max_temp;
        pop.innerText = fiveDays.pop;
        speed.innerText = fiveDays.wind_spd;
        humidity.innerText = fiveDays.rh;
    });
}

const keyupLoader = () => { 
    dashInput.value = "";
    dash.classList.toggle('hide');
    container.classList.toggle('hide');
}

const validarInput = (input) => {return input === ""};