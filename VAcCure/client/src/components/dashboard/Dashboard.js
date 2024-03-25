import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser ,loginUser } from "../../actions/authActions";
import { Link } from 'react-router-dom';
import "./style.css"
import { getAppointmentByamka, editVaccination } from "../../actions/appointmentActions"
import { editUserInfo } from "../../actions/authActions"
import jwt_decode from "jwt-decode";
//import { loginUser } from "../../actions/authActions";
// import Appointments from "./appointments/appointments"
// import SearchAppointments from "./appointments/searchAppointments"
const isEmpty = require("is-empty");


class Dashboard extends Component {

  constructor() {
    super();
    this.state = {

      resData: null,
      requestDatafirstName: "",
      requestDatalastName:  "",
      requestDataamka: "",
      searchDate: Date,
      requestIndex: Number,

      //editAppointment
      editfirstName: "",
      editlastName:  "",
      editamka: "",
      editphone: "",
      editaddress:  "",
      editvaccineBrand: "",
      editsymptoms: "",
      editcomments: "",
      doseOneCompleted: Boolean,
      doseTwoCompleted: Boolean,
      gender: "",
      

      //edituser
      editHospitalName: "",
      editAddress:  "",
      editCity: "",
      editCountry: "",
      editPhone:  "",
      editEmail: "",
      editUsername:  "",
      editPassword: "",

      //respondedData
      searchDataByFilter: null,
      todaysData: null,

      errors: {}
   };
 }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };


   editAppointment = async e =>{ 
    document.getElementById("editpopup").style.display = "flex"
    let a = await this.getAppintmentsByDate();

    
    if(this.state.requestIndex<0){
      let temp = this.state.requestIndex
      this.state.requestIndex=-this.state.requestIndex - 1
      if(!this.state.searchDataByFilter.length){
      
        document.getElementById("editfirstName").value = this.state.searchDataByFilter.firstName;
        document.getElementById("editlastName").value = this.state.searchDataByFilter.lastName;
        document.getElementById("editamka").value = this.state.searchDataByFilter.amka;
        document.getElementById("editphone").value = this.state.searchDataByFilter.phone;
        document.getElementById("editaddress").value = this.state.searchDataByFilter.address;
        document.getElementById("editvaccineBrand").value = this.state.searchDataByFilter.vaccineBrand;
        document.getElementById("editsymptoms").value = this.state.searchDataByFilter.symptoms;
        document.getElementById("editcomments").value = this.state.searchDataByFilter.comments;
        this.state.editlastName = this.state.searchDataByFilter.lastName;
        this.state.editfirstName = this.state.searchDataByFilter.firstName;
        this.state.editamka = this.state.searchDataByFilter.amka;
        this.state.editphone = this.state.searchDataByFilter.phone;
        this.state.editaddress = this.state.searchDataByFilter.address;
        this.state.editvaccineBrand = this.state.searchDataByFilter.vaccineBrand;
        this.state.editsymptoms = this.state.searchDataByFilter.symptoms;
        this.state.editcomments = this.state.searchDataByFilter.comments;

        if(this.state.searchDataByFilter.gender=="male"){
          document.getElementById("editmale").checked = true
        }
        if(this.state.searchDataByFilter.gender=="female"){
          document.getElementById("editfemale").checked = true
        }

        if(this.state.searchDataByFilter.doseOneCompleted){
          document.getElementById("editdoseone").checked = true
          document.getElementById("editdosetwo").checked = false
        }
        if(this.state.searchDataByFilter.doseTwoCompleted){
          document.getElementById("editdosetwo").checked = true
          document.getElementById("editdoseone").checked = true
        }
        
    
        document.getElementById("editdoseOne").value= this.state.searchDataByFilter.dateDose1.split('T')[0]
        document.getElementById("editdoseTwo").value= this.state.searchDataByFilter.dateDose2.split('T')[0]
        document.getElementById("editdate").value= this.state.searchDataByFilter.dateOfBirth.split('T')[0]
        
        this.state.requestIndex = temp
        return
      }

      // if(a[this.state.requestIndex].vaccineBrand=="Moderna"){
      //   document.getElementById("editvaccineBrand").value="Moderna"
      // }
      // else if(a[this.state.requestIndex].vaccineBrand=="Pfizer"){
      //   document.getElementById("editvaccineBrand").value="Pfizer"
      // }
      // else{
      //   document.getElementById("editvaccineBrand").value="AstraZeneca"
      // }

      document.getElementById("editfirstName").value = this.state.searchDataByFilter[this.state.requestIndex].firstName;
      document.getElementById("editlastName").value = this.state.searchDataByFilter[this.state.requestIndex].lastName;
      document.getElementById("editamka").value = this.state.searchDataByFilter[this.state.requestIndex].amka;
      document.getElementById("editphone").value = this.state.searchDataByFilter[this.state.requestIndex].phone;
      document.getElementById("editaddress").value = this.state.searchDataByFilter[this.state.requestIndex].address;
      document.getElementById("editvaccineBrand").value = this.state.searchDataByFilter[this.state.requestIndex].vaccineBrand;
      document.getElementById("editsymptoms").value = this.state.searchDataByFilter[this.state.requestIndex].symptoms;
      document.getElementById("editcomments").value = this.state.searchDataByFilter[this.state.requestIndex].comments;
      this.state.editlastName = this.state.searchDataByFilter[this.state.requestIndex].lastName;
      this.state.editfirstName = this.state.searchDataByFilter[this.state.requestIndex].firstName;
      this.state.editamka = this.state.searchDataByFilter[this.state.requestIndex].amka;
      this.state.editphone = this.state.searchDataByFilter[this.state.requestIndex].phone;
      this.state.editaddress = this.state.searchDataByFilter[this.state.requestIndex].address;
      this.state.editvaccineBrand = this.state.searchDataByFilter[this.state.requestIndex].vaccineBrand;
      this.state.editsymptoms = this.state.searchDataByFilter[this.state.requestIndex].symptoms;
      this.state.editcomments = this.state.searchDataByFilter[this.state.requestIndex].comments;

      if(this.state.searchDataByFilter[this.state.requestIndex].gender=="male"){
        document.getElementById("editmale").checked = true
      }
      if(this.state.searchDataByFilter[this.state.requestIndex].gender=="female"){
        document.getElementById("editfemale").checked = true
      }

      if(this.state.searchDataByFilter[this.state.requestIndex].doseOneCompleted){
        document.getElementById("editdoseone").checked = true
        document.getElementById("editdosetwo").checked = false
      }
      if(this.state.searchDataByFilter[this.state.requestIndex].doseTwoCompleted){
        document.getElementById("editdosetwo").checked = true
        document.getElementById("editdoseone").checked = true
      }
      
  
      document.getElementById("editdoseOne").value= this.state.searchDataByFilter[this.state.requestIndex].dateDose1.split('T')[0]
      document.getElementById("editdoseTwo").value= this.state.searchDataByFilter[this.state.requestIndex].dateDose2.split('T')[0]
      document.getElementById("editdate").value= this.state.searchDataByFilter[this.state.requestIndex].dateOfBirth.split('T')[0]
      
      this.state.requestIndex = temp
      return
    }
    
    
    document.getElementById("editfirstName").value = a[this.state.requestIndex].firstName;
    document.getElementById("editlastName").value = a[this.state.requestIndex].lastName;
    document.getElementById("editamka").value = a[this.state.requestIndex].amka;
    document.getElementById("editphone").value = a[this.state.requestIndex].phone;
    document.getElementById("editaddress").value = a[this.state.requestIndex].address;
    document.getElementById("editvaccineBrand").value = a[this.state.requestIndex].vaccineBrand;
    document.getElementById("editsymptoms").value = a[this.state.requestIndex].symptoms;
    document.getElementById("editcomments").value = a[this.state.requestIndex].comments;
    this.state.editlastName = a[this.state.requestIndex].lastName;
    this.state.editfirstName = a[this.state.requestIndex].firstName;
    this.state.editamka = a[this.state.requestIndex].amka;
    this.state.editphone = a[this.state.requestIndex].phone;
    this.state.editaddress = a[this.state.requestIndex].address;
    this.state.editvaccineBrand = a[this.state.requestIndex].vaccineBrand;
    this.state.editsymptoms = a[this.state.requestIndex].symptoms;
    this.state.editcomments = a[this.state.requestIndex].comments;

    if(a[this.state.requestIndex].gender=="male"){
      document.getElementById("editmale").checked = true
    }
    if(a[this.state.requestIndex].gender=="female"){
      document.getElementById("editfemale").checked = true
    }

    if(a[this.state.requestIndex].doseOneCompleted){
      document.getElementById("editdoseone").checked = true
      document.getElementById("editdosetwo").checked = false
    }
    if(a[this.state.requestIndex].doseTwoCompleted){
      document.getElementById("editdosetwo").checked = true
      document.getElementById("editdoseone").checked = true
    }
    
    document.getElementById("editdoseOne").value= a[this.state.requestIndex].dateDose1.split('T')[0]
    document.getElementById("editdoseTwo").value= a[this.state.requestIndex].dateDose2.split('T')[0]
    document.getElementById("editdate").value= a[this.state.requestIndex].dateOfBirth.split('T')[0]
      
    return

  };
  cancelAppointment(){ document.getElementById("editpopup").style.display = "none" };

  edituser = e =>{
    const token = localStorage.jwtToken;
    const decoded = jwt_decode(token);
    document.getElementById("edituser").style.display = "flex"
    document.getElementById("editHospitalName").value = decoded.hospitalName;
    document.getElementById("editAddress").value = decoded.address;
    document.getElementById("editCity").value = decoded.city;
    document.getElementById("editCountry").value = decoded.country;
    document.getElementById("editPhone").value = decoded.phone;
    document.getElementById("editEmail").value = decoded.email;
    //document.getElementById("editUsername").value = decoded.username;
    
    this.state.editHospitalName = decoded.hospitalName;
    this.state.editAddress = decoded.address;
    this.state.editCity = decoded.city;
    this.state.editCountry = decoded.country;
    this.state.editPhone = decoded.phone;
    this.state.editEmail = decoded.email;
    //this.state.editUsername = decoded.username;
    //this.props.logoutUser();
    //this.props.loginUser({username: "axepathess", password: "axepathess"});

  };

  canceluser(){ document.getElementById("edituser").style.display = "none" };
  submituser = e =>{
    e.preventDefault();

    const token = localStorage.jwtToken;
    const decoded = jwt_decode(token);
    var reqData = {
      _id:  decoded.id,
      hospitalName: this.state.editHospitalName,
      address:  this.state.editAddress,
      city: this.state.editCity,
      country: this.state.editCountry,
      phone:  this.state.editPhone,
      email: this.state.editEmail
    };
    console.log(decoded)
    editUserInfo(reqData)
    document.getElementById("edituser").style.display = "none"
  }
  
  submitAppointment = async e   => {
    
    e.preventDefault();
    if(this.state.requestIndex >= 0)
    {
     
      let resData = null;

      let a = await this.getAppintmentsByDate()

      if(document.getElementById("editmale").checked == true){
        this.state.gender="male"
      }
      if(document.getElementById("editfemale").checked == true){
        this.state.gender="female"
      }

      let stage = "Pending"
      if(document.getElementById("editdoseone").checked ==true){
          stage="Semi-Completed"
      }
      if(document.getElementById("editdosetwo").checked ==true){
          stage="Completed"
      }



      var reqData = {

        _id:  "",
        firstName: this.state.editfirstName,
        lastName:  this.state.editlastName,
        phone:     this.state.editphone,
        date: this.state.editdate,
        amka: this.state.amka,
        address: this.state.editaddress,
        vaccineBrand: this.state.editvaccineBrand,
        gender: this.state.editgender,
        doseOne: this.state.editdoseOne,
        doseTwo: this.state.editdoseTwo,
        symptoms: this.state.editsymptoms,
        comments: this.state.editcomments,
        doseOneCompleted: this.state.doseOneCompleted,
        doseTwoCompleted: this.state.doseTwoCompleted,
        stage: stage,
        gender: this.state.gender,
        dateOfBirth: document.getElementById('editdate').value,
        dateDose1: document.getElementById('editdoseOne').value,
        dateDose2: document.getElementById('editdoseTwo').value

      };
      console.log(reqData.doseTwoCompleted)
      reqData._id =a[this.state.requestIndex]._id
      editVaccination(reqData)
      document.getElementById("editpopup").style.display = "none"
      this.getAppintmentsByDate()
    }
    else
    {
      console.log("here")
      if(document.getElementById("editmale").checked == true){
        this.state.gender="male"
      }
      if(document.getElementById("editfemale").checked == true){
        this.state.gender="female"
      }

      let stage = "Pending"
      if(document.getElementById("editdoseone").checked ==true){
          stage="Semi-Completed"
      }
      if(document.getElementById("editdosetwo").checked ==true){
          stage="Completed"
      }



      var reqData = {

        _id:  "",
        firstName: this.state.editfirstName,
        lastName:  this.state.editlastName,
        phone:     this.state.editphone,
        date: this.state.editdate,
        amka: this.state.amka,
        address: this.state.editaddress,
        vaccineBrand: this.state.editvaccineBrand,
        gender: this.state.editgender,
        doseOne: this.state.editdoseOne,
        doseTwo: this.state.editdoseTwo,
        symptoms: this.state.editsymptoms,
        comments: this.state.editcomments,
        doseOneCompleted: this.state.doseOneCompleted,
        doseTwoCompleted: this.state.doseTwoCompleted,
        stage: stage,
        gender: this.state.gender,
        dateOfBirth: document.getElementById('editdate').value,
        dateDose1: document.getElementById('editdoseOne').value,
        dateDose2: document.getElementById('editdoseTwo').value

      };
      
      if(this.state.searchDataByFilter.length){
        reqData._id =this.state.searchDataByFilter[-this.state.requestIndex-1]._id
        editVaccination(reqData)
        document.getElementById("editpopup").style.display = "none"
      }
      else{
        reqData._id =this.state.searchDataByFilter._id
        editVaccination(reqData)
        document.getElementById("editpopup").style.display = "none"
      }
    }
  }

  searchByFullName = e => {
    document.querySelector(".searchByFullName").style.display = "flex"
    document.querySelector(".searchByAMKA").style.display = "none"
    document.querySelector(".searchByDate").style.display = "none"
    document.getElementById("searchButton").style.display = "flex"
    this.state.requestDataamka = ""
    this.state.searchDate = null
  }

  searchByAMKA = e => { 
    document.querySelector(".searchByAMKA").style.display = "flex"
    document.querySelector(".searchByFullName").style.display = "none"
    document.querySelector(".searchByDate").style.display = "none"
    document.getElementById("searchButton").style.display = "flex"
    this.state.requestDatafirstName = ""
    this.state.requestDatalastName =  ""
    this.state.searchDate = null
  }

  searchByDate = e => {
    document.querySelector(".searchByDate").style.display = "flex"
    document.querySelector(".searchByFullName").style.display = "none"
    document.querySelector(".searchByAMKA").style.display = "none"
    document.getElementById("searchButton").style.display = "flex"
    this.state.requestDatafirstName = ""
    this.state.requestDatalastName =  ""
    this.state.requestDataamka = ""
  }

  search = e => {
    document.querySelector(".searchByFullName").style.display = "none"
    document.querySelector(".searchByAMKA").style.display = "none"
    document.querySelector(".searchByDate").style.display = "none"
    document.getElementById("searchButton").style.display = "none"
    document.getElementById("searchTable").style.display = "none"
    document.getElementById("searchMessage").style.display = "none"
    document.getElementById("requestDatafirstName").value = null
    document.getElementById("requestDatalastName").value = null
    document.getElementById("requestDataamka").style.display = null
    this.state.requestDatafirstName = ""
    this.state.requestDatalastName =  ""
    this.state.requestDataamka = ""
    this.state.searchDate = null
  }


  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };



  addRow(index, tableId){
    //for(var i=0; i<addRows; i++) {
      var newRow = document.getElementById(tableId).insertRow();
  
      var newCell = newRow.insertCell();
      newCell.innerHTML=" <tr ><td>index</td></tr>";
      let offset = () => { if(index<0) {return -index} return index+1}
      newCell.innerHTML= offset()

  
      newCell = newRow.insertCell();
      newCell.innerHTML='<tr><td id = {"fullName'+index.toString()+'"}/></tr>';
      newCell.id="fullName"+index.toString()

      newCell = newRow.insertCell();
      newCell.innerHTML='<tr><td id = {"amkaNumber'+index.toString()+'"}/></tr>';
      newCell.id="amkaNumber"+index.toString()

      newCell = newRow.insertCell();
      newCell.innerHTML='<tr><td id = {"dateOfBirth'+index.toString()+'"}/></tr>';
      newCell.id="dateOfBirth"+index.toString()

      newCell = newRow.insertCell();
      newCell.innerHTML="<tr> <td/> </tr>";
      newCell.id="stage"+index.toString()
      
      newCell = newRow.insertCell();
      newCell.innerHTML='<tr><td><a class="edit" id ="editbutton" data-toggle="tooltip" ><i class="material-icons">&#xE254;</i></a></td></tr>';
      newCell.id="editbutton"+index.toString()
      newCell.onclick = ()=>{this.editAppointment(); this.state.requestIndex=index; console.log(this.state.requestIndex+"hello")}
  }

  searchAppointment = async e  => {

    e.preventDefault();
    const token = localStorage.jwtToken;
    const decoded = jwt_decode(token);
    let resData = null;
    var reqData = [
                    {firstName: this.state.requestDatafirstName , lastName:  this.state.requestDatalastName ,username: decoded.username },
                    {amka:      this.state.requestDataamka , username: decoded.username },
                    {searchDate:this.state.searchDate , username: decoded.username}
                  ];

    if (!isEmpty(reqData[0].firstName) &&  !isEmpty(reqData[0].lastName))
    { 
      await getAppointmentByamka(reqData[0]).then(res =>resData=res);
      
      if(!resData.length == 0)
      {
        document.getElementById("searchTable").style.display = "inline-table"
        document.getElementById("searchMessage").style.display = "flex"
        document.getElementById("searchMessage").innerHTML="Search Results"
        document.getElementById("searchMessage").style.color= "Black"
      }
      else
      {
        document.getElementById("searchTable").style.display = "none"
        document.getElementById("searchMessage").innerHTML="No Results"
        document.getElementById("searchMessage").style.color= "red"
        document.getElementById("searchMessage").style.display = "flex"
        return
      }

      for(var j=-1;; j--,z++)
      {
        var z =  document.getElementById("searchTable").rows.length
        if (resData.length + 1 > document.getElementById("searchTable").rows.length) 
        {
          this.addRow(-z, "searchTable") 
         
        }
        if(j<-resData.length){break;}
        
        document.getElementById("fullName"+j.toString()).innerHTML = resData[-j-1].firstName + " " + resData[-j-1].lastName
        document.getElementById("amkaNumber"+j.toString()).innerHTML = resData[-j-1].amka
        let date = (new Date().getTime() - new Date(resData[-j-1].dateOfBirth).getTime())/(1000*60*60*24*365)
        date = Math.floor(date)
        document.getElementById("dateOfBirth"+j.toString()).innerHTML = date
        document.getElementById("stage"+j.toString()).innerHTML = resData[-j-1].stage
      }
      
    }
    else if(!isEmpty(reqData[1].amka))
    {
      await getAppointmentByamka(reqData[1]).then(res =>resData=res);
      
      console.log(resData)
      if(resData)
      {
        document.getElementById("searchTable").style.display = "inline-table"
        document.getElementById("searchMessage").style.display = "flex"
        document.getElementById("searchMessage").innerHTML="Search Result"
        document.getElementById("searchMessage").style.color= "Black"
      }
      else
      {
        document.getElementById("searchTable").style.display = "none"
        document.getElementById("searchMessage").innerHTML="No Results"
        document.getElementById("searchMessage").style.color= "red"
        document.getElementById("searchMessage").style.display = "flex"
        return
      }

      let j = -1
      if(document.getElementById("searchTable").rows.length <=1){
        this.addRow(j, "searchTable")
      }
      console.log("aaaaaaaaaaaafullName"+j.toString())

      document.getElementById("fullName"+j.toString()).innerHTML = resData.firstName + " " + resData.lastName
      document.getElementById("amkaNumber"+j.toString()).innerHTML = resData.amka
      let date = (new Date().getTime() - new Date(resData.dateOfBirth).getTime())/(1000*60*60*24*365)
      date = Math.floor(date)
      document.getElementById("dateOfBirth"+j.toString()).innerHTML = date
      document.getElementById("stage"+j.toString()).innerHTML = resData.stage
    }
    else if(!isEmpty(reqData[2].searchDate))
    {
      await getAppointmentByamka(reqData[2]).then(res =>resData=res);
      
      if(!resData.length == 0)
      {
        document.getElementById("searchTable").style.display = "inline-table"
        document.getElementById("searchMessage").style.display = "flex"
        document.getElementById("searchMessage").innerHTML="Search Results"
        document.getElementById("searchMessage").style.color= "Black"
      }
      else
      {
        document.getElementById("searchTable").style.display = "none"
        document.getElementById("searchMessage").innerHTML="No Results"
        document.getElementById("searchMessage").style.color= "red"
        document.getElementById("searchMessage").style.display = "flex"
        return
      }

      for(var j=-1;; j--,z++)
      {
        var z =  document.getElementById("searchTable").rows.length
        if (resData.length + 1 > document.getElementById("searchTable").rows.length) 
        {
          this.addRow(-z, "searchTable") 
         
        }
        if(j<-resData.length){break;}
        console.log(resData[0].firstName + " " + resData[0].lastName)
        console.log(resData[-j-1].firstName + " " + resData[-j-1].lastName)

        document.getElementById("fullName"+j.toString()).innerHTML = resData[-j-1].firstName + " " + resData[-j-1].lastName
        document.getElementById("amkaNumber"+j.toString()).innerHTML = resData[-j-1].amka
        let date = (new Date().getTime() - new Date(resData[-j-1].dateOfBirth).getTime())/(1000*60*60*24*365)
        date = Math.floor(date)
        document.getElementById("dateOfBirth"+j.toString()).innerHTML = date
        document.getElementById("stage"+j.toString()).innerHTML = resData[-j-1].stage
      }

    }
    else{
      document.getElementById("searchMessage").innerHTML="No Results"
      document.getElementById("searchMessage").style.display = "flex"
      document.getElementById("searchMessage").style.color= "red"
      document.getElementById("searchTable").style.display = "none"
    }
    this.state.searchDataByFilter = resData
    //return this.state.data
  };

  async getAppintmentsByDate () {

    const token = localStorage.jwtToken;
    const decoded = jwt_decode(token);
    const today = new Date().toISOString().split('T')[0]
    let resData = null;
    var reqData = {searchDate: today, username: decoded.username}
  
    await getAppointmentByamka(reqData).then(res =>resData=res);
    
    for(var j=0; j<resData.length; j++)
    {
      if (resData.length +1 === document.getElementById("appointmentsTable").rows.length) {break;}
      
      this.addRow(j, "appointmentsTable") 
      document.getElementById("fullName"+j.toString()).innerHTML = resData[j].firstName + " " + resData[j].lastName
      document.getElementById("amkaNumber"+j.toString()).innerHTML = resData[j].amka
      let date = (new Date().getTime() - new Date(resData[j].dateOfBirth).getTime())/(1000*60*60*24*365)
      date = Math.floor(date)
      document.getElementById("dateOfBirth"+j.toString()).innerHTML = date
      document.getElementById("stage"+j.toString()).innerHTML = resData[j].stage
      
    }
    
    return resData;

  }

  doseOne = e =>{

    if(document.getElementById("editdoseone").checked == true){
      this.state.doseOneCompleted = true;
    }
    if(document.getElementById("editdoseone").checked == false){
      this.state.doseOneCompleted = false;
      this.state.doseTwoCompleted = false;
      document.getElementById("editdosetwo").checked = false
      
    }
   
  }

  doseTwo =e =>{

    if(document.getElementById("editdosetwo").checked == true){
      this.state.doseTwoCompleted = true;
      this.state.doseOneCompleted = true;
      
      console.log(this.state.doseOneCompleted)
      console.log(this.state.doseTwoCompleted)
      document.getElementById("editdoseone").checked = true
    }
    if(document.getElementById("editdosetwo").checked == false){
      this.state.doseTwoCompleted = false;
      console.log(this.state.doseOneCompleted)
      console.log(this.state.doseTwoCompleted)
    }
    
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
    this.show()
    const { user } = this.props.auth;

    this.getAppintmentsByDate()

    return (
      
      <div className="container valign-wrapper" style={{width:"100%", display: "flex"}}>
        <div className="row">
          <div class="left" style={{background:"#54B8C5",right:"0",left:"0",width: "100%", height:"190px"}}>
            
            <div class="right">              
              <i class="bi bi-gear"
                  style={{
                  width: "200px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  margin: "auto",
                  display:"inline",
                  right:"0",
                  left:"0",
                  cursor: "pointer"
                  }}
                onClick={this.edituser} 
                id ="edituserButton"
              >
                <svg  xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
                  <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                  <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                </svg>
              </i>
            </div>

            <img class="right" width="300" height="190" src="hospi.png" alt="cleanpng"></img>
            
            <div class="left">             
              <br/><br/>
              <b><h6>Hospital Name: {user.hospitalName.split()}</h6></b>  
              <b><h6>The hospital is placed at: {user.address.split()}, {user.city.split()} , {user.country.split()}</h6></b>
              <b><h6>Phone: {user.phone.split()}</h6></b>
              <b><h6>Email: {user.email.split()}</h6></b> 
              <br/>
            </div>          
          </div>
          
    
          <div class="container">
            <div class="table-responsive">
              <div class="table-wrapper">
                <div class="table-title">
                  <div class="row">
                    <p>
                      <div class="left" style={{width:"100%"}}>
                          <br></br>
                          <br></br>
                          <br></br>
                      </div>

                    </p>
        
                    
                    
                    <select id="mycombobox" style={{display: "flex"}}>
                      <option id = "Search"           onClick = {this.search} >Search</option>
                      <option id = "SearchByFullName" onClick = {this.searchByFullName}>Search By Full Name</option>
                      <option id = "SearchByAMKA"     onClick = {this.searchByAMKA}>Search By AMKA</option>
                      <option id = "SearchByDate"     onClick = {this.searchByDate}>Search By Date</option>
                    </select>

                    <form noValidate onSubmit={this.searchAppointment}>

                      <div class="searchByFullName">
                        <input
                          onChange={this.onChange}
                          value={this.state.requestDatafirstName}
                          id="requestDatafirstName"
                          type="text"
                          placeholder="First Name"
                          
                        />
                        <input
                            onChange={this.onChange}
                            value={this.state.requestDatalastName}
                            id="requestDatalastName"
                            type="text"
                            placeholder="Last Name"
                        />
                      </div>

                        <input
                          class="searchByAMKA"
                          onChange={this.onChange}
                          value={this.state.requestDataamka}
                          id="requestDataamka"
                          type="text"
                          placeholder="AMKA"
                          
                        />

                        <input class="searchByDate"
                          onChange={this.onChange}
                          value={this.state.searchDate}
                          id="searchDate"
                          type="date"
                        />
                      <button style={{
                              width: "40px",
                              borderRadius: "3px",
                              letterSpacing: "1.5px",
                              marginTop: "1rem"
                            }}
                            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                            id = "searchButton" 
                            type="submit" 
                            style={{ display: "none" }}> Search </button>

                    </form>
                  </div>
                </div>

                <h5 id ="searchMessage" style={{display: "none", color: "black"}}>Search Results</h5>
                <div class="left">
                  <table id = "searchTable" class="table table-striped table-hover table-bordered" style={{background:"#ddf5be",width:"0",height:"8em", display: "none"}}>
                    
                    <thead class="qwerty">
                      <tr>
                        <th width="2%"> No:</th>
                        <th width="5%">Full Name</th>
                        <th width="5%">AMKA</th>
                        <th width="2%">Age</th>
                        <th width="3%">Stage</th>
                        <th width="2%">Action</th>
                      </tr>
                    </thead>

                  </table>
                  <br /><br />
                </div> 

                <h5>Today's Appointments: </h5>

                <div class="left">
                  <table id = "appointmentsTable" class="table table-striped table-hover table-bordered" style={{background:"#D9F2F8",width:"0",height:"8em",}}>
                              
                    <thead class="qwerty">
                      <tr>
                        <th width="2%"> No:</th>
                        <th width="5%">Full Name</th>
                        <th width="5%">AMKA</th>
                        <th width="2%">Age</th>
                        <th width="3%">Stage</th>
                        <th width="2%">Action</th>
                      </tr>
                    </thead>

                  </table>
                </div> 
    
              </div>

            </div>
          </div>

        </div>  

        <div class="popup2" id="edituser">
          <div class="popup-content" id="editpopup2">

            <div class="modal-header">
              <br/>
              <h4 class="modal-title">Hospital Information</h4>
            </div>

            <div class="modal-body" style={{justifyContent:"center"}}>
              <br/><br/><br/>
              <label><h6>Hospital Name:</h6></label>
              <input
               type="text" class="form-control"
               onChange={this.onChange}
               value={this.state.editHospitalName}
               id="editHospitalName"
               name="editHospitalName">
               </input>
              
              <label> <h6>Address:</h6>  </label>
              <input 
                type="text" class="form-control"
                onChange={this.onChange}
                value={this.state.editAddress}
                id="editAddress"
                name="editAddress">
              </input>
              
              
              <label><h6>City:</h6></label>
              <input 
                type="text" class="form-control"
                onChange={this.onChange}
                value={this.state.editCity}
                id="editCity"
                name="editCity">
              </input>
              
            
              <label><h6>Country:</h6></label>
              <input 
                type="text" class="form-control"
                onChange={this.onChange}
                value={this.state.editCountry}
                id="editCountry"
                name="editCountry">
                </input>
              
              <label><h6>Phone:</h6></label>
              <input 
                type="text" class="form-control"
                onChange={this.onChange}
                value={this.state.editPhone}
                id="editPhone"
                name="editPhone">
              </input>
              
              <label><h6>Email:</h6></label>
              <input 
                type="text" class="form-control"
                onChange={this.onChange}
                value={this.state.editEmail}
                id="editEmail"
                name="editEmail"
              ></input>
              
              {/* <label><h6>Username:</h6></label>
              <input 
                type="text" class="form-control"
                onChange={this.onChange}
                value={this.state.editUsername}
                id="editUsername"
                name="editUsername"
                ></input>
              
              <label><h6>Password:</h6></label>
              <input 
                type="password" class="form-control"
                onChange={this.onChange}
                id="editPassword"
                name="editPassword"
              ></input> */}
              
            </div>
            <div class="modal-footer" >
              <br/><br/><br/>
              <div class="right">
              <button type="button" class="btn btn-default" data-dismiss="modal" onClick={this.submituser}>Submit</button>
              </div>
              <div class="left">
              <button type="button" class="btn btn-default" style={{background:"red"}}  data-dismiss="modal" onClick={this.canceluser}>Cancel</button>
              </div>
            </div>                 

          </div>
        </div>

        <div class="popup" id="editpopup">
          <div class="popup-content" id="editpopup1">

            <div class="modal-header">
              <h4 class="center">Edit Appointment</h4>
            </div>

            <div>
              <br/>
              <div class="container"style={{width:"100%", display:"flex"}}>
              <div style={{width:"50%"}}>
              
              <label class="left" ><h7 >First Name:</h7></label>
              <input style={{width:"90%"}}
                type="text" class="form-control"
                onChange={this.onChange}
                value={this.state.editfirstName}
                id="editfirstName"
                name="editfirstName"
              />

             </div>
             <div style={{width:"50%"}}>
              <label class="left"><h7>Last Name:</h7></label>
              <input style={{width:"90%"}}
                type="text" class="form-control"
                onChange={this.onChange}
                value={this.state.editlastName}
                id="editlastName"
                name="editlastName"
              />
              </div>
              </div>
              
              <div class="container"style={{width:"100%", display:"flex"}}>
              <div style={{width:"50%"}}>
              
              <label class="left" ><h7 >AMKA</h7></label>
              <input type="text" class="form-control" style={{width:"90%", heigh:"200px"}}   
                  type="text" class="form-control"
                  onChange={this.onChange}
                  value={this.state.editamka}
                  id="editamka"
                  name="editamka"
              />

             </div>
             <div style={{width:"50%"}}>
              <label class="left"><h7>Birthday:</h7></label>
              <input style={{width:"90%"}}
               type="date" class="form-control"
               id="editdate"
              />
              </div>
             </div>

             <div class="container"style={{width:"100%", display:"flex"}}>
              <div style={{width:"50%"}}>
              
              <label class="left" ><h7 >Phone Number:</h7></label>
              <input style={{width:"90%"}}
                type="text" class="form-control"
                onChange={this.onChange}
                value={this.state.editphone}
                name="editphone"
                id="editphone"
              />
             </div>

             <div style={{width:"50%"}}>
              <label class="left"><h7>House Address:</h7></label>
              <input style={{width:"90%"}}
                type="text" class="form-control"
                onChange={this.onChange}
                value={this.state.editaddress}
                name="editaddress"
                id="editaddress"
              />
              </div>
              </div>
                            
              <select  id = "editvaccineBrand" className = "input-field col s12">
                <option value = "">Vaccine Brand </option>
                <option value = "Moderna" onClick={()=>{ this.state.editvaccineBrand = "Moderna"     }}>Moderna       </option>
                <option value = "Pfizer" onClick={()=>{ this.state.editvaccineBrand = "Pfizer"      }}>Pfizer        </option>
                <option value = "AstraZeneca" onClick={()=>{ this.state.editvaccineBrand = "AstraZeneca" }}>AstraZeneca   </option>
              </select>
              
              <label><h7>Gender:</h7></label>  
              <br/>
              <label class="right" style={{ paddingRight: "4.2rem" }} >
                <input  type="radio" id="editmale" name="gender"/>
                <span> <h8 >Male</h8></span>
              </label>

              <label class="left" >
                <input type="radio" id="editfemale" name="gender"/>
                <span><h8  >Female</h8></span>
              </label>
              
              <br/><br/>
              
              <label><h7>Dose of the Vaccine:</h7></label>
              <br/><br/>
              <label class="right"style={{ paddingRight: "1.5rem" }}>
                <input type="checkbox" id="editdosetwo" onClick= {this.doseTwo}/>
                <span> <h7 class="right"  >Second Dose</h7></span>
              </label>

              <label class="left"  >
                <input type="checkbox" id="editdoseone" onClick= {this.doseOne}/>
                <span><h7 class="left" >First Dose</h7></span>
              </label>
              <br/><br/>
              <div class="container"style={{width:"100%", display:"flex"}}>
              <div style={{width:"50%"}}>
              
              <label class="left" ><h7 >Date of Dose 1:</h7></label>
              <input style={{width:"90%"}}
                type="date" class="form-control"
                name="editdoseOne"
                id="editdoseOne"
              />

             </div>
             <div style={{width:"50%"}}>
              <label class="left"><h7>Date of Dose 2:</h7></label>
              <input style={{width:"90%"}}
               type="date" class="form-control"
               name="editdoseTwo"
               id="editdoseTwo"
              />
              </div>
              </div>
              
              
              
              <br/>
           
              <label><h7>Symptoms: </h7></label>
              <br/> 
               <textarea  name="edit_symptoms" id="editsymptoms" 
                          onChange={this.onChange}
                          value={this.state.editsymptoms}
                          name="editsymptoms"
                          id="editsymptoms"
                          style={{backgroundColor: "white", width: "370px", maxWidth: "370px", minWidth: "370px", height: "90px", maxHeight: "100px", minHeight: "80px", marginLeft: "0"}}>
               </textarea>

               <br/> 

                <label><h7>Comments: </h7></label>
                <br/> 
               <textarea  name="edit_coments" id="editcomments" 
                          onChange={this.onChange}
                          value={this.state.editcomments}
                          name="editcomments"
                          id="editcomments"
                          style={{backgroundColor: "white", width: "370px", maxWidth: "370px", minWidth: "370px", height: "90px", maxHeight: "100px", minHeight: "80px", marginLeft: "0"}}>
               </textarea>

                
            </div>
            <div class="modal-footer" >
            <br/>
              <div class="right">
              <button type="button" class="btn btn-default" data-dismiss="modal" onClick={this.submitAppointment}>Submit</button>
              </div>
              <div class="left">
              <button type="button" class="btn btn-default" style={{background:"red"}}  data-dismiss="modal" onClick={this.cancelAppointment}>Cancel</button>
              </div>
              <br/>
            
            </div>                

          </div>
        </div> 
      </div>

    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
