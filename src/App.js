/**
 * 
 * A simple weather finding web app, made with React.
 * 
 * It gathers data from https://openweathermap.org/ which is updated every 6 hours
 * 
 * @author Sujay Chand
 * @version 1.0 
 * 
 */

// Import libraries
import React from "react";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

// My custom API_Key for openweathermap
const API_KEY = "7a711b6bd141087c927901dd0ea033ac";

/*
 * Main App Class
 */

class App extends React.Component {

  // Creates empty state
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    windSpeed: undefined,
    error: undefined
  }

  /* 
   * Gets weather values
   */
  getWeather = async (e) => {
    e.preventDefault();

    // Input information variables
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    const api_call = await fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + city + ',' + country + '&appid=' + API_KEY + '&units=metric');
    const data = await api_call.json();

    // Checks if city and country have been input
    if (city && country) {

      // Error 404 caught
      if (data.cod == 404) {
        this.setState({
          temperature: undefined,
          city: undefined,
          country: undefined,
          humidity: undefined,
          description: undefined,
          windSpeed: undefined,
          error: "Input location cannot be found. Please check spelling."
        });
      } else {
        console.log(data);
        
        // Get corresponding information
        this.setState({
          temperature: data.list[0].main.temp + '°C',
          city: data.city.name,
          country: data.city.country,
          humidity: data.list[0].main.humidity,
          description: data.list[0].weather[0].description,
          windSpeed: data.list[0].wind.speed + ' km/h',
          error: ""
        });
      }
    } else {

      // When information is blank
      this.setState({
        temperature: "Probably Hot",
        city: "Hmmmmmmmmmmmm",
        country: "Is this in Africa?",
        humidity: "Wait this isn't the same thing as temperature??",
        description: "I don't know, maybe enter a value",
        windSpeed: "WHOOSH",
        error: ""
      });
    }
  }

  /* 
   * Render canvas and prensents weather information
   */
  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main-fluid">
            <div className="container-fluid">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather} />
                  <Weather
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    windSpeed={this.state.windSpeed}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default App;