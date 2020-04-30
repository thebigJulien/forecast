document.addEventListener("DOMContentLoaded", () => {

    let form = document.querySelector('#form');
    let button = document.querySelector('button');
    let show = document.querySelector('#weather');
    let input = document.querySelector('input');

    let authToken = '8ffb0dbfc1023f4971876cbfb2473273';

    const colorTemperatures = [
        {limitTemp: 40, color: 'red'},
        {limitTemp: 35, color: 'orange'},
        {limitTemp: 30, color: 'yellow'},
        {limitTemp: 20, color: 'deepskyblue'},
        {limitTemp: 10, color: 'purple'},
        {limitTemp: 0, color: 'grey'},
        {limitTemp: -100, color: 'white'}
      ];

    const weatherRequest = (event) => {
        event.preventDefault();
        let city = input.value;
        let urlServiceAddress = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${authToken}`;

        fetch(urlServiceAddress)
            .then(response => response.json())
            .then(data => {
                let div = document.createElement('div');
                let title = document.createElement('h3');
                let temp = document.createElement('p');
                let description = document.createElement('p');
                let tempInCelsius = Math.round(data.main.temp - 273);
                let image = document.createElement('IMG');
                let color = colorTemperatures.find(entry => tempInCelsius > entry.limitTemp).color;
                title.innerText = data.name;
                temp.innerHTML = tempInCelsius + '°C';
                description.innerText = data.weather[0].description;
                div.style.background = color;
                image.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
                show.appendChild(div);
                div.appendChild(title);
                div.appendChild(temp);
                div.appendChild(description);
                div.appendChild(image);

            })
            .catch(err => alert ('you\'re city is not a city!'));
    }

    form.addEventListener('submit', weatherRequest);
});