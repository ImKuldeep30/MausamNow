const apikey = 'f092feeffd7b44a59be82352250707'
const city = 'delhi,IN'

// current weather
function current_weather(city){
    const url = `https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}`
    fetch(url)
    .then(response => response.json())
    .then(data=>{
        const current = document.getElementById('curr')
        current.innerHTML = 
        `<div>
            <h2>${data.location.name}, ${data.location.country}</h2>
            <h2><strong>${data.current.temp_c}°C</strong></h2>
            <p>${data.current.condition.text}</p>
        </div>
        <img src="${data.current.condition.icon}"></img>
        <div class="info">
            <p>Feels like ${data.current.feelslike_c}°C</p>
            <p>Humidity ${data.current.humidity}%</p>
            <p>Visibility ${data.current.vis_km}km</p>
            <p>Air pressure ${data.current.pressure_mb} hPa</p>
            <p>Wind speed ${data.current.wind_kph} km/h</p>
        </div>
        `
    })
    .catch(error => { 
        alert("Ops something went wrong")
    })
}

current_weather(city)

// weather forecast

function weather_forecast(city){
    const fore = document.getElementById('forecast-container')
    fore.innerHTML = "";
    url2 = `https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${city}&days=7`
    fetch(url2)
    .then(response => response.json())
    .then(data =>{
        
        data.forecast.forecastday.forEach((items)=>{
            const dateObj = new Date(items.date)
            const dayName = dateObj.toLocaleDateString('en-US',{weekday: 'long'});
            const div = document.createElement('div')
            div.className='forecast-card'
            div.innerHTML=
            `<h2><strong>${dayName}</strong></h2>
            <p>${items.date}</p>
            <h2>${items.day.mintemp_c}°C - ${items.day.maxtemp_c}°C</h2>
            <p>${items.day.condition.text}</p>
            <img src="${items.day.condition.icon}"></img>
            `;
            fore.appendChild(div)
        })
    })
    .catch(error => {
        alert("Ops something went wrong")
    })
}

weather_forecast(city)

// search city weather
const form = document.getElementById('srch-form')
const input = document.getElementById('inpt')

form.addEventListener('submit', (e) =>{
    e.preventDefault()
    const srch_city = input.value.trim();
    const isCity = /^[a-zA-Z\s]+$/.test(srch_city);  

    if (srch_city !== "" && isCity) {
        current_weather(srch_city);
        weather_forecast(srch_city);
    } 
    else {
        alert("Please enter a valid city name.");
    }
    input.value = "";
})

