const APIKEY = "98eaf8d3fb414253a82134104221301"

const inputEl = document.getElementById("location-input")
const searchBtnEl = document.querySelector(".search-btn")
const locationBtn = document.querySelector(".location-btn")
const locationEl = document.getElementById("location")
const tempEl = document.getElementById("temp")
const conditionEl = document.getElementById("condition")
const humidityEl = document.getElementById("humidity")
const windEl = document.getElementById("wind")
const condIcon = document.getElementById("condition-icon")
const errorEl = document.querySelector(".error")
const infoEl = document.querySelector(".info-section")

async function getWeather(location) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${location}&aqi=no1`)
    
    if (response.status !== 200) {
        return displayError(await response.json())
    } else {
        const data = await response.json()
        return displayWeather(data)
    }
}

function displayWeather(data) {
    const { location, current } = data
    const { condition } = current

    locationEl.textContent = location.name
    tempEl.innerHTML = current.temp_c + "&#176;C"
    conditionEl.textContent = condition.text
    humidityEl.textContent = `Humidity: ${current.humidity}%`
    windEl.textContent = `Wind: ${current.wind_kph}kmp`
    condIcon.src = condition.icon
    document.body.style.backgroundImage = `url("https://source.unsplash.com/random/1920x1080/?${condition.text}")`
    infoEl.style.display = "flex"
    errorEl.style.display = "none"
}

function displayError(error) {
    const { message } = error.error

    errorEl.style.display = "block"
    infoEl.style.display = "none"
    errorEl.innerHTML = `<h3>${message}</h3>`
}

searchBtnEl.addEventListener("click", () => {
    getWeather(inputEl.value)
})

// Retrieves the user location
locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            getWeather(`${position.coords.latitude}, ${position.coords.longitude}`)
        })
    }
})

inputEl.addEventListener("keypress", event => {
    if (event.key === "Enter") {
        event.preventDefault()
        getWeather(inputEl.value)
    }
})

// Default location
getWeather("chennai")
