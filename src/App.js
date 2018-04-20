import React from "react";

import Titles from "./Components/Titles";
import Form from "./Components/Form";
import Weather from "./Components/Weather";




class App extends React.Component{
  
  
  //state is an object which contains key value pairs
  //this keeps track of data interaction in our program whenever the getWeather function is called 
  state = {
    
    temperature: undefined,
    
    city: undefined,
    
    country: undefined,
    
    humidity: undefined,
    
    description: undefined,
    
    error: undefined
    
  }
  
  //create function that grabs the data from the api url 
  
  getWeather = async(e) => {
      //prevent a full page refresh
      //this signifies SPA
      e.preventDefault();

      //grab the input value in the Form.js
      //and replace the hard coded string name in the fetch function
      const city = e.target.elements.city.value;
      const country = e.target.elements.country.value;

      //assign the api token to const API_KEY provided by openweathermap
      const API_KEY = "9ad1ffad874b3d90cee3c8d106a737ab";

      //declare a variable to hold api url
      var url =" http://api.openweathermap.org/data/2.5/weather?q="+city+","+country+"&appid="+API_KEY;


      //making api call using await 
      //inject api url into the fetch function call
      const api_call = await fetch(url);

      
       
      //convert the data fetched from the api to JSON format
      //assign it to a const data
      const data = await api_call.json();
    
      //check if any value has been input
    if(city && country) {
      //set the state values
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    }
    else//inform the user to input values
    {
      //set the state values
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the value"
    });

  }

    }
  render() {

    return(

      <div>
        <div className="wrapper ">

          <div className="main">

            <div className="container container-fluid">

               <div className="row ">

               <div className="col-xs-6  title-container">

                <Titles/>
                
                 <div className="col-xs-6 form-container">
                 <Form getWeather={this.getWeather}/>
                        <Weather temperature={this.state.temperature}
                                  city={this.state.city}
                                  country={this.state.country}
                                  humidity={this.state.humidity}
                                  description={this.state.description}
                                  error={this.state.error}
                    
                        />

                       


                    </div>


                   
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

