
//API details in object

const api={
    key:"b658821324e2db0f3403fab6b15d2e4d",
    url:"https://api.openweathermap.org/data/2.5/weather"
};

// Access all UI component and stored in object

const uiElements={
    greet:document.getElementById('greet'),
    time:document.getElementById('time'),
    day:document.getElementById('day'),
    date:document.getElementById('date'),
    search:document.getElementById('search'),
    city:document.getElementById('city'),
    condition:document.getElementById('condition'),
    temperature:document.getElementById('temperature'),
    visibility:document.getElementById('visibility'),
    humidity:document.getElementById('humidity'),
    pressure:document.getElementById('pressure'),
    windSpeed:document.getElementById('wind-speed')
};

//Event Function

const searchCity=(event)=>{
    if(event.keyCode===13){
        callApiData(event.target.value);
    }
}

//Call  the api through user input

const callApiData=(city)=>{
    fetch(`${api.url}?q=${city}&units=metric&appid=${api.key}`)
    .then(weather=>{
        if(weather.ok){
            return weather.json();
        }else{
            uiElements.city.innerText="City not found!";
            uiElements.temperature.innerText = 0.0;
            uiElements.condition.innerText = null;
            uiElements.humidity.innerText = 0.0;
            uiElements.pressure.innerText = 0.0;
            uiElements.windSpeed.innerText = 0.0;
            uiElements.visibility.innerText = 0.0;
        }
    }).then(displayData);
}

// Display the data in UI

const displayData=(weather)=>{
    uiElements.city.innerText = `${weather.name} ${weather.sys.country ? ', ' + weather.sys.country : ''}`;
    uiElements.temperature.innerText = weather.main.temp;
    uiElements.condition.innerText = weather.weather[0].main;
    uiElements.humidity.innerText = weather.main.humidity;
    uiElements.pressure.innerText = weather.main.pressure;
    uiElements.windSpeed.innerText = weather.wind.speed;
    uiElements.visibility.innerText = weather.visibility / 1000;
}

//Calculate date and time

const getDate=function() {
	const date = new Date();
    currentTime = date.getHours();

	let wish = '';

	if(currentTime >= 0 && currentTime <= 12) {
		wish = 'Good Morning!';
	} else if(currentTime >= 12 && currentTime <= 16) {
		wish = 'Good Afternoon!';
	} else {
		wish = 'Good Evening!';
	}
    uiElements.greet.innerText = wish;
	uiElements.date.innerText = date.toDateString();
};

//immedite invoked function
(function(){
    //for greet and date
    getDate();
    //default value set
    callApiData('New Delhi');
    //Event listener
    uiElements.search.addEventListener('keypress', (event)=>searchCity(event));
})();