
//API Details
const api={
    key:"b658821324e2db0f3403fab6b15d2e4d",
    url:"https://api.openweathermap.org/data/2.5/weather"
};

// Access all ui component 
const uiElements={
    greet:document.getElementById('greet'),
    time:document.getElementById('time'),
    day:document.getElementById('day'),
    date:document.getElementById('date'),
    search:document.getElementById('search'),
    city:document.getElementById('city'),
    condition:document.getElementById('condition'),
    temperature:document.getElementById('temperature')
};

//Event Function

const searchCity=(event)=>{
    if(event.keyCode===13){
        callApiData(event.target.value);
    }
}

//API call function
const callApiData=(city)=>{
    fetch(`${api.url}?q=${city}&units=metric&appid=${api.key}`)
    .then(weather=>{
        if(weather.ok){
            return weather.json();
        }else{
            uiElements.city.innerText="City not found!";
        }
    }).then(displayData);
}


//Event listenar
uiElements.search.addEventListener('keypress', (event)=>searchCity(event));

// display function

const displayData=(weather)=>{
    uiElements.city.innerText = `${weather.name} ${weather.sys.country ? ', ' + weather.sys.country : ''}`;
    uiElements.temperature.innerText = weather.main.temp;
    uiElements.condition.innerText = weather.weather[0].main;	
}

//time and date
(function() {
	const sysDate = new Date();
    currentTime = sysDate.getHours();

	let wish = '';

	if(currentTime >= 0 && currentTime <= 12) {
		wish = 'Good Morning!';
	} else if(currentTime >= 12 && currentTime <= 16) {
		wish = 'Good Afternoon!';
	} else {
		wish = 'Good Evening!';
	}
    uiElements.greet.innerText = wish;
	uiElements.date.innerText = sysDate.toDateString();
	callApiData('New Delhi');
})();