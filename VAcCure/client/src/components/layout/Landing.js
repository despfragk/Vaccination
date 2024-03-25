import React, { Component } from "react";
import { Link } from "react-router-dom";
import {getStats} from "../../actions/statsActions"
import {Chart} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {Bar} from 'react-chartjs-2';
import "./Landing.css"
import "../statistics/Stats.css";

class Landing extends Component {

  async getStatsData(){


    let resData = null
    await getStats().then(res =>resData=res)
    const label1 = ["January", "February", "March", "April", "May", "June"]
    this.createChart("myChart", resData.dataPerHospital, label1, "line");
   
  }


  createChart(elementId, resData, label, type){

    var myChart = document.getElementById(elementId, resData).getContext('2d');
    var newChart = new Chart(myChart, {
      type: type,
      data: {
        labels: label,
        datasets: [
          {
            label: 'Vaccinations',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: []
          }
        ]
      },
      options: {
        title:{
          display:true,
          text:'Average Vaccinations per month',
          fontSize:20
        },
        legend:{
          display:true,
          position:'right'
        }
      }
    });

    newChart.data.datasets[0].data  = resData
    newChart.update()

  }

  show(){

    if(document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loaded);
    } else {
        loaded();
    }
    
    function loaded() {
      if(!localStorage.jwtToken){
        document.getElementById("right").style.display = "none"
        document.getElementById("right1").style.display = "none"
        document.getElementById("right2").style.display = "none"
        document.getElementById("login").style.display = "flex"
        document.getElementById("reg").style.display = "flex"
        document.getElementById("test3").style.display = "flex"
        document.getElementById("test1").style.display = "none"
        document.getElementById("test2").style.display = "none"
      }
    };
  }

  render() {
    this.getStatsData()
    this.show()
    return (
      <div   style={{width:"100%", display: "flex"}} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center" id="ontop">

          <p className="vaccure">
              VacCure
            </p>
           
            <p className="vaccuref">
              Virus Accurate Cure 
            </p>
             
            <br />
            <img id="img1" src= "Frame.png" width = "130" height="64" ></img>
           </div>

           <h2 id="htextwelcome" style={{color:"white"}}>
              <b >Welcome to the simplified solution against Covid:</b>
            </h2>


          <a>
              <h1  id="htext"> Real Time Updates </h1>
              <p id="ptext">Access real time data of current appointments and see the changes in the schedules of other hospital
            </p>

            <img id="img2" src= "Frame(1).png" ></img>

            <h1  id="htext1"> Citizen Cards  </h1>
              <p id="ptext1"> Keep track of the vaccine that every citizen has received and share the data with other hospitals, in case they need to medical treatment the future.
            </p>

            <img id="img3" src= "Frame(2).png" ></img>
          </a>

          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <br/><br/><br/><br/><br/><br/><br/><br/>
         
         
         
          <h3 style={{marginRight: "10em",marginTop:"5rem", marginLeft: "auto", width: "100%", height: "100%"}}>
            <h4 className="center"> <b>Vaccination Statistics </b></h4>
          </h3>
          <canvas id="myChart"/>
         



       


        
        </div>
        
       
      </div>
    );
  }
}

export default Landing;
