const keyApi = 'fc62a6fd808153935c7f296d7d6c810d';
const searchInput = document.querySelector('#my-input');



//Event
searchInput.addEventListener('keyup', ({key}) => {
    const cityName = searchInput.value;

    if (key === 'Enter') {

        if (validarInput(cityName)) {
            alert('Preencha o campo de pesquisa');
        } else {
            responseApi(cityName);
        }
    }
});


//Function
const responseApi = async(city) => {
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang={pt_br}&appid=${keyApi}`;

    try {
        const response = await fetch(API);
        if (response.ok) {
            const data =  await response.json();
            console.log(data);
        }
    } catch (ex) {
        console.log(`Erro ${ex}`);
    }
}

const validarInput = (input) => {return input === ""};