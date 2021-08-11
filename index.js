document.addEventListener('DOMContentLoaded', () => {

    let longitude;
    let latitude;
    let location;
    const Kelvin = 273;
    let imgs = document.getElementById('img');

    function currentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                longitude = position.coords.longitude;
                latitude = position.coords.latitude;
                const api = "6d055e39ee237af35ca066f35474e9df";
                const base = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&` + `lon=${longitude}&appid=6d055e39ee237af35ca066f35474e9df`;

                fetch(base).then((response) => {
                    return response.json();
                }).then((data) => {
                    let temperature = Math.floor(data.main.temp - Kelvin) + " °C";
                    let temp = Math.floor(data.main.temp - Kelvin);
                    let location = data.name;

                    let minTemp = Math.floor(data.main.temp_min - Kelvin) + " °C";
                    let maxTemp = Math.floor(data.main.temp_max - Kelvin) + " °C";
                    let pressure = data.main.pressure;
                    let country = "INDIA";
                    let desc = data.weather[0].description;
                    let feels = Math.floor(data.main.feels_like - Kelvin) + " °C  " + desc;
                    let wind = data.wind.speed;

                    document.getElementById('temp').innerHTML = `${temperature}`;
                    if (temp < 24) {
                        imgs.setAttribute('src', 'winter.PNG');
                    }
                    else if (temp < 33) {
                        imgs.setAttribute('src', 'rain.PNG');
                    }
                    else {
                        imgs.setAttribute('src', 'summer.PNG');
                    }
                    document.getElementById('feels').innerHTML = `${feels}`;
                    document.getElementById('loc').innerHTML = `${location}`;
                    document.getElementById('details').innerHTML = `
                        <li>Country : ${country}</li>
                        <li>Max Temperature : ${maxTemp}</li>
                        <li>Min Temperature : ${minTemp}</li>
                        <li>Pressure : ${pressure}mb</li>
                        <li>Pressure : ${wind}km/hr</li>
                    `;
                });
            });
        }
    }

    document.getElementById('curr').addEventListener('click', currentLocation);


});
