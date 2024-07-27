const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherbox = document.querySelector('.weather-box');
const weatherdetails = document.querySelector('.weather-details');
const errorfound = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');
search.addEventListener('click', () => {
    const API_key = `ad750901f5329f1d33fd5ee3278f2f92`;
    const city = document.querySelector('.search-box input').value;
    if (city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_key}`).then(response => response.json()).then(json => {

        if (json.cod == '404') {
            cityHide.textContent = city;
            container.style.height = '400px';
            weatherbox.classList.remove('active');
            weatherdetails.classList.remove('active');
            errorfound.classList.add('active');
            return;

        }
        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        if (cityHide.textContent == city) {
            return;
        }
        else {
            cityHide.textContent = city;

            container.style.height = '555px';
            container.classList.add('active');
            weatherbox.classList.add('active');
            weatherdetails.classList.add('active');
            errorfound.classList.remove('active');

            setTimeout(() => {
                container.classList.remove('active');

            }, 2500)
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = '/weather app/images/clear.png';
                    break;

                case 'Rain':
                    image.src = '/weather app/images/rain.png';
                    break;

                case 'Snow':
                    image.src = '/weather app/images/snow.png';
                    break;

                case 'Clouds':
                    image.src = '/weather app/images/cloud.png';
                    break;

                case 'Mist':
                    image.src = '/weather app/images/mist.png';
                    break;

                case 'Haze':
                    image.src = '/weather app/images/mist.png';
                    break;


                default:
                    image.src = '/weather app/images/cloud.png';

            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>&#176;C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            const infoweather = document.querySelector('.info-weather');
            const infohumidity = document.querySelector('.info-humidity');
            const infowind = document.querySelector('.info-wind');

            const cloneinfoweather = infoweather.cloneNode(true);
            const cloneinfohumidity = infohumidity.cloneNode(true);
            const cloneinfowind = infowind.cloneNode(true);

            cloneinfoweather.id = 'clone-info-weather';
            cloneinfoweather.classList.add('active-clone');

            cloneinfohumidity.id = 'clone-info-humidity';
            cloneinfohumidity.classList.add('active-clone');

            cloneinfowind.id = 'clone-info-wind';
            cloneinfowind.classList.add('active-clone');

            setTimeout(() => {
                infoweather.insertAdjacentElement("afterend", cloneinfoweather);
                infohumidity.insertAdjacentElement("afterend", cloneinfohumidity);
                infowind.insertAdjacentElement("afterend", cloneinfowind);
            }, 2200);

            const elemcloneinfoweather = document.querySelectorAll('.info-weather.active-clone');
            const totalclone = elemcloneinfoweather.length;
            const elemcloneinfoweatherFirst = elemcloneinfoweather[0];

            const elemcloneinfohumidity = document.querySelectorAll('.info-humidity.active-clone');
            const elemcloneinfohumidityFirst = elemcloneinfohumidity[0];

            const elemcloneinfowind = document.querySelectorAll('.info-wind.active-clone');
            const elemcloneinfowindFirst = elemcloneinfowind[0];

            if (totalclone > 0) {
                elemcloneinfoweatherFirst.classList.remove('active-clone');
                elemcloneinfohumidityFirst.classList.remove('active-clone');
                elemcloneinfowindFirst.classList.remove('active-clone');

                setTimeout(() => {
                    elemcloneinfoweatherFirst.remove();
                    elemcloneinfohumidityFirst.remove();
                    elemcloneinfowindFirst.remove();
                }, 2200);
            }

        }

    });

});