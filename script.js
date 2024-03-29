const apiUrl = 'https://api.openweathermap.org/data/2.5/'
const apiKey = '00589bc158e6254153905d3d5020f489'

const setQuery = (e) => {
    if (e.keyCode == '13')
        getResult(search.value)
}

const getResult = (cityName) => {
    let query = `${apiUrl}weather?q=${cityName}&appid=${apiKey}&units=metric&lang=tr`
    fetch(query)
        .then(weather => {
            return weather.json()
        })
        .then(displayResult)
}

const displayResult = (result) => {
    let image = document.querySelector('.weather-box img')
    switch (result.weather[0].main) {
        case 'Clear':
            image.src = 'Photos/clear.png';
            break;

        case 'Rain':
            image.src = 'Photos/rain.png';
            break;

        case 'Snow':
            image.src = 'Photos/snow.png';
            break;

        case 'Clouds':
            image.src = 'Photos/cloud.png';
            break;

        case 'Fog':
            image.src = 'Photos/mist.png';
            break;

        default:
            image.src = '';
    }

    const city = document.querySelector('.weather-box .city')
    city.innerText = `${result.name}, ${result.sys.country}`

    const temp = document.querySelector('.temperature')
    temp.innerHTML = `${Math.round(result.main.temp)}<span>°C</span>`

    const desc = document.querySelector('.description')
    desc.innerText = result.weather[0].description

    const humidity = document.querySelector('.weather-details .humidty .text span');
    humidity.innerHTML = `${result.main.humidity}%`;

    const wind = document.querySelector('.weather-details .wind .text span');
    wind.innerHTML = `${parseInt(result.wind.speed)}Km/h`;

}

const search = document.querySelector('.search-box input')
search.addEventListener('keypress', setQuery)