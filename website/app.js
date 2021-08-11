/* Global Variables */
let zipElement = document.getElementById("zip");
let feelingElement = document.getElementById("feelings");
let generate = document.getElementById("generate");
let date = document.getElementById("date");
let temp = document.getElementById("temp");
let content = document.getElementById("content");

const key = "c40fbbb173c0bab3e86fac89b2e75ab8"; // Personal API Key for OpenWeatherMap API
const api_url = "https://api.openweathermap.org/data/2.5/weather?zip=";

/* Function called by event listener */
async function getData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(api_url + zipElement.value + ",us&appid=" + key);
    try {
        const newData = await (response.json());
        return newData;
    } catch (error) {
        console.log(error);
    }
}
const handleGenerate = (e) => {
    console.log(zipElement);
    getData("/getData")
        .then((data) => {
            // console.log("post", data.dt, data.main.temp);
            postData('/postData', sentData = {
                temp: data.main.temp, dt: data.dt,
                userResponse: { zip: zipElement.value, feelings: feelingElement.value }
            }
            )
        })
        .then(updateUI);
}
const updateUI = async () => {
    const request = await fetch("/getData");
    try {
        const allData = await request.json();
        console.log("all Data", allData);
        date.innerHTML = allData.data;
        temp.innerHTML = allData.temperature;
        content.innerHTML = allData.userResponse.feelings + " " + allData.userResponse.zip;

    } catch (error) {
        console.log(error);
    }
}

// Event listener to add function to existing HTML DOM element
generate.addEventListener("click", handleGenerate);

/* Function to GET Web API Data*/

/* Function to POST data */
async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    try {
        const newData = await (response.json());
        console.log("post2", newData);
        return newData;
    } catch (error) {
        console.log(console.error());
    }

}


