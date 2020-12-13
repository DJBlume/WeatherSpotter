# WeatherSpotter

This project was created with React using the weather api from https://www.weatherapi.com/

## Running app locally

To run this application locally, clone this repository to a local folder.

Open the App.js folder and edit line 8. I have hidden my API key as a way to demonstrate my abilities. 

Update 'const api_key = process.env.REACT_APP_API_KEY' to 'const api_key = 8e24985cac8e4eea925204724200912'.

Open your command window and point it to the folder you cloned this repository to.

Next run command "npm start"

This will launch the app on port 3000. If you already have something running on that port go to the package.json file and update the "start" line under "scripts" to the following: "set port={YOUR DESIRED PORT} && react-scripts start" and change "{YOUR DESIRED PORT}" to the new port you wish to use. ie "start": "set port=8000 && react-scripts start"


### Libraries
Outside of react I used Moment.js and Axios. 

Documentation and information on Moment.js can be found here: https://momentjs.com/

Documentation and information on Axios can be found here: https://github.com/axios/axios

I used Moment.js to change the format of the date on my third forecast day and Axios was used to make my API calls.
