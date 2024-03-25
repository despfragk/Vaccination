import React from 'react';
import {Line} from 'react-chartjs-2';
import {Bar} from 'react-chartjs-2';
import {Chart} from 'chart.js';
import {getStats} from "../../actions/statsActions"
import "./Stats.css";
import {Pie, Doughnut} from 'react-chartjs-2';

                  

export default class App extends React.Component {


  async getStatsData(){


    let resData = null
    await getStats().then(res =>resData=res)
    console.log( resData)

    const label1 = ["January", "February", "March", "April", "May", "June"]
    const label2 = ["0-19","20-29", "30-39", "40-49", "50-59", "60-69" , "70-79", "80+"]
    const label3 = ["Moderna", "Pfizer", "AstraZeneca"]

    this.createChart("myChart", resData.dataPerHospital, label1, "line");
    this.createChart("myChart1", resData.dataPerAge, label2, "bar");
    this.createChart1("myChart2", resData.brandData, label3, "pie");

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


  createChart1(elementId, resData, label, type){

    var myChart = document.getElementById(elementId, resData).getContext('2d');
    var newChart = new Chart(myChart, {
      type: type,
      data: {
        labels: label,
        datasets: [
          {
            label: 'Vaccinations',
            backgroundColor: [
              '#B21F00',
              '#C9DE00',
              '#2FDE00',
              '#00A6B4',
              '#6800B4'
            ],
            hoverBackgroundColor: [
            '#501800',
            '#4B5000',
            '#175000',
            '#003350',
            '#35014F'
            ],
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
      if(localStorage.jwtToken){
        document.getElementById("right").style.display = "flex"
        document.getElementById("right1").style.display = "flex"
        document.getElementById("right2").style.display = "flex"
        document.getElementById("right").style.display = "flex"
        document.getElementById("login").style.display = "none"
        document.getElementById("reg").style.display = "none"
        document.getElementById("test3").style.display = "none"
        document.getElementById("test2").style.display = "none"
        document.getElementById("test1").style.display = "flex"
      }
    };
  }
            
       
  render() {
    this.getStatsData()
    this.show()
    return (

      
      <div style={{marginRight: "auto",marginTop:"5rem", marginLeft: "auto", width: "50%", height: "50%", backgroundColor: "#D9F2F8"}}>
        <h3 class="center" style={{marginRight: "5em",marginTop:"5rem", marginLeft: "auto", width: "100%", height: "100%"}}>
                <b>Vaccination Statistics </b>
              </h3>
              <hr  style={{
                 width: "100%",
                 borderColor: "black",

                 backgroundColor: "black",
                 marginRight: "17rem",
                 marginTop: "3rem"
                  }}>           
                </hr>
              
              <h5 style={{marginRight: "6em",marginTop:"5rem", marginLeft: "auto", width: "50%", height: "50%"}}>
                <b>Vaccinations stats</b>
              </h5>
          {/* <select id="HospitalName" style={{display: "flex", width: "10rem", height: "2rem", marginTop: "2rem"}}>
            <option id = "Hospital1"           onClick = {this.Hospital1} >Papanikolaou</option>
            <option id = "Hospital2" onClick = {this.Hospital2}>Axepa</option>
            <option id = "Hospital3"     onClick = {this.Hospital3}>Xanthi</option>
            <option id = "Hospital4"     onClick = {this.Hospital4}>Ipokratio</option>
          </select>      */}
                   
        <canvas id="myChart"/>
          <hr  
            style={{
              width: "100%",
              borderColor: "black",
              backgroundColor: "black",
              marginRight: "17rem",
              marginTop: "3rem"
            }}> 
          </hr>



        <h5 style={{marginRight: "5em", marginTop:"5rem", marginLeft: "auto", width: "50%", height: "50%"}}>
          <b>Vaccinations Per Age</b>
        </h5>

        <canvas id="myChart1"/>

          <hr  
            style={{
              width: "100%",
              borderColor: "black",
              backgroundColor: "black",
              marginRight: "17rem",
              marginTop: "3rem"
            }}> 
          </hr>


        <h5 style={{marginRight: "5em", marginTop:"5rem", marginLeft: "auto", width: "50%", height: "50%"}}>
          <b>Vaccinations Per Brand</b>
        </h5>

        {/* <select id="CountryName" style={{display: "flex", width: "10rem", height: "2rem", marginTop: "2rem"}}>
          <option id = "Country1"     onClick = {this.Country1} >Greece</option>
          <option id = "Country2"      onClick = {this.Country2}>Austria</option>
          <option id = "Country3"     onClick = {this.Country3}>Germany</option>
          <option id = "Country4"     onClick = {this.Country4}>France</option>
        </select> */}

        <canvas id="myChart2"/>
        
      </div>
    );
  }
}
