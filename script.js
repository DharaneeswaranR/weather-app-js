const APIKEY = "98eaf8d3fb414253a82134104221301"

const inputEl = document.getElementById("location-input")
const searchBtnEl = document.querySelector(".search-btn")
const locationEl = document.getElementById("location")
const tempEl = document.getElementById("temp")
const conditionEl = document.getElementById("condition")
const humidityEl = document.getElementById("humidity")
const windEl = document.getElementById("wind")
const condIcon = document.getElementById("condition-icon")

async function getWeather(location) {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${location}&aqi=no1`)
    const data = await response.json()

    return displayWeather(data)
}

function displayWeather(data) {
    const { location } = data
    const { current } = data
    const { condition } = current

    locationEl.textContent = location.name
    tempEl.innerHTML = current.temp_c + "&#176;C"
    conditionEl.textContent = condition.text
    humidityEl.textContent = `Humidity: ${current.humidity}%`
    windEl.textContent = `Wind: ${current.wind_kph}kmp`
    condIcon.src = condition.icon
    document.body.style.backgroundImage = `url("https://source.unsplash.com/random/1920x1080/?${condition.text}")`
}

searchBtnEl.addEventListener("click", () => {
    getWeather(inputEl.value)
})

inputEl.addEventListener("keypress", event => {
    if (event.key === "Enter") {
        event.preventDefault()
        getWeather(inputEl.value)
    }
})

getWeather("chennai")
