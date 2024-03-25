import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { newAppointment } from "../../actions/appointmentActions";
import classnames from "classnames";

class NewAppointment extends Component {
  constructor() {
     super();
    this.state = {
      firstName: "",
      lastName : "",
      phone : "",
      gender: "",
      amka : "",
      dateOfBirth : "",
      address : "",
      dateDose1: "",
      dateDose2: "",
      doseOneCompleted: Boolean,
      doseTwoCompleted: Boolean,
      vaccineBrand: null,
      symptoms: "",
      comments: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/newAppointment");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
   
    if(this.state.vaccineBrand==null){
      console.log(this.state.vaccineBrand)
      document.getElementById("spanLabel").style.display = "inline"
    }
    if(document.getElementById("male").checked == true){
      this.state.gender="male"
    }
    if(document.getElementById("female").checked == true){
      this.state.gender="female"
    }

    const newVaccination = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phone: this.state.phone,
      amka: this.state.amka, 
      gender: this.state.gender,
      dateOfBirth: this.state.dateOfBirth,
      dateDose1:this.state.dateDose1,
      dateDose2:this.state.dateDose2,
      address: this.state.address,
      doseOneCompleted: this.state.doseOneCompleted,
      doseTwoCompleted: this.state.doseTwoCompleted,
      vaccineBrand: this.state.vaccineBrand,
      symptoms: this.state.symptoms,
      comments: this.state.comments
    };

    this.props.newAppointment(newVaccination, this.props.history);
   // this.props.sendToken()
  };


  doseOne = e =>{
    if(document.getElementById("doseOneCompleted").checked == true){
      this.state.doseOneCompleted = true;
      console.log(this.state.doseOneCompleted)
      console.log(this.state.doseTwoCompleted)
    }
    if(document.getElementById("doseOneCompleted").checked == false){
      this.state.doseOneCompleted = false;
      this.state.doseTwoCompleted = false;
      document.getElementById("doseTwoCompleted").checked = false
      console.log(this.state.doseOneCompleted)
      console.log(this.state.doseTwoCompleted)
      
    }
   
  }

  doseTwo =e =>{

    if(document.getElementById("doseTwoCompleted").checked == true){
      this.state.doseTwoCompleted = true;
      this.state.doseOneCompleted = true;
      document.getElementById("doseOneCompleted").checked = true
      console.log(this.state.doseOneCompleted)
      console.log(this.state.doseTwoCompleted)
    }
    if(document.getElementById("doseTwoCompleted").checked == false){
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

  setPfizer = ()=>{
    this.state.vaccineBrand = "Pfizer"
  }
  setAstraZeneca(){
    this.state.vaccineBrand = "AstraZeneka"
  }

  render= ()=> {
    this.show()
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Insert New Appointment below: </b>
              </h4>
              <br></br>
              <p className="black-text text-darken-1"style={{ paddingLeft: "5.8rem" }}>
                <b>Citizen's card: </b>
              </p>
            </div>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="col s8 offset-s2" style={{ backgroundColor: "#D9F2F8", width: "500px"}}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.firstName}
                  error={errors.firstName}
                  id="firstName"
                  type="text"
                  className={classnames("", {
                    invalid: errors.firstName
                  })}
                />
                <label htmlFor="firstName"><b className="black-text text-darken-1">First Name</b></label>
                <span className="red-text">{errors.firstName}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.lastName}
                  error={errors.lastName}
                  id="lastName"
                  type="text"
                  className={classnames("", {
                    invalid: errors.lastName
                  })}
                />
                <label htmlFor="lastName"><b className="black-text text-darken-1">Last Name</b></label>
                <span className="red-text">{errors.lastName}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.phone}
                  error={errors.phone}
                  id="phone"
                  type="text"
                  className={classnames("", {
                    invalid: errors.phone
                  })}
                />
                <label htmlFor="phone"><b className="black-text text-darken-1">Phone </b></label>
                <span className="red-text">{errors.phone}</span>
              </div>
              <div>
                  <div>
                    <label class="myCheckbox" style={{ paddingLeft: "0.5rem" }}>
                      <input 
                        type="radio" 
                        id="male" 
                        name="gender"
                        className={classnames("", {
                          invalid: errors.gender
                        })}
                      />
                      <span><b className="black-text text-darken-1">Male</b></span>
                    </label>
                  </div>
                  <br></br>
                  <div>
                    <label class="myCheckbox" style={{ paddingLeft: "0.5rem" }}>
                      <input 
                        type="radio"
                        id="female"
                        name="gender"
                        className={classnames("", {
                          invalid: errors.gender
                        })}
                      />
                      <span><b className="black-text text-darken-1">Female</b></span>
                    </label>
                  </div>
                  <span className="red-text" style={{ padding: "0.6rem" }}>{errors.gender}</span>
                </div>
               
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.amka}
                  error={errors.amka}
                  id="amka"
                  type="text"
                  className={classnames("", {
                    invalid: errors.amka
                  })}
                />
                <label htmlFor="amka"><b className="black-text text-darken-1">AMKA:</b></label>
                <span className="red-text">{errors.amka}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.dateOfBirth}
                  error={errors.dateOfBirth}
                  id="dateOfBirth"
                  type="date"
                  className={classnames("", {
                    invalid: errors.dateOfBirth
                  })}
                />
                <label htmlFor="dateOfBirth"><b className="black-text text-darken-1">Date of Birth</b></label>
                <span className="red-text">{errors.dateOfBirth}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.address}
                  error={errors.address}
                  id="address"
                  type="text"
                  className={classnames("", {
                    invalid: errors.address
                  })}
                />
                <label htmlFor="address"><b className="black-text text-darken-1">Full Address</b></label>
                <span className="red-text">{errors.address}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.dateDose1}
                  error={errors.dateDose1}
                  id="dateDose1"
                  type="date"
                  className={classnames("", {
                    invalid: errors.dateDose1
                  })}
                />
                <label htmlFor="dateDose1"><b className="black-text text-darken-1">Date of Dose-1</b></label>
                <span className="red-text">{errors.dateDose1}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.dateDose2}
                  error={errors.dateDose2}
                  id="dateDose2"
                  type="date"
                  className={classnames("", {
                    invalid: errors.dateDose2
                  })}
                />
                <label htmlFor="dateDose2"><b className="black-text text-darken-1"><b className="black-text text-darken-1">Date of Dose-2</b></b></label>
                <span className="red-text">{errors.dateDose2}</span>
              </div>
              
              <div className="input-field col s12">

                <select className = "input-field col s12" id="comboboxBrand">
                  <option onClick={()=>{ this.state.vaccineBrand = ""            }}>Vaccine Brand </option>
                  <option onClick={()=>{ this.state.vaccineBrand = "Moderna"     }}>Moderna       </option>
                  <option onClick={()=>{ this.state.vaccineBrand = "Pfizer"      }}>Pfizer        </option>
                  <option onClick={()=>{ this.state.vaccineBrand = "AstraZeneca" }}>AstraZeneca   </option>
                </select>
                <br></br>
                <span className="red-text" id="spanLabel" style = {{display: "none"}}>Vaccine Brand field is require</span>
                <br></br>
                <div>
                  <label class="myCheckbox">
                    <input type="checkbox" name="doseOneCompleted" id="doseOneCompleted" onClick={this.doseOne}/>
                    <span><b className="black-text text-darken-1">First dose</b></span>
                  </label>
                </div>
                <br></br>
                <div>
                  <label class="myCheckbox">
                    <input type="checkbox" name="doseTwoCompleted" id="doseTwoCompleted"  onClick= {this.doseTwo}/>
                    <span><b className="black-text text-darken-1">Second dose</b></span>
                  </label>
                </div>
              </div>
              <span><b><b className="black-text text-darken-1">Symptoms: </b></b></span> 
               <textarea  name="symptoms" id="symptoms" value={this.state.symptoms} onChange={this.onChange}
                          style={{backgroundColor: "white", width: "370px", maxWidth: "370px", minWidth: "370px", height: "130px", maxHeight: "300px", minHeight: "130px", marginLeft: "6rem"}}>
               </textarea>
               <span><b><b className="black-text text-darken-1">Comments: </b></b></span> 
               <textarea  name="coments" id="comments" value={this.state.comments} onChange={this.onChange}
                          style={{backgroundColor: "white", width: "370px", maxWidth: "370px", minWidth: "370px", height: "130px", maxHeight: "300px", minHeight: "130px", marginLeft: "6rem"}}>
                 
               </textarea>
        
                <br></br>
                <br></br>
                <br></br>
                
              
              
              <div className="col s12" style={{ paddingLeft: "330px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "2rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable marine accent-3"
                >
                  SUBMIT
                </button>
                <br></br>
                <br></br>
              </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

NewAppointment.propTypes = {
  newApoointmet: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { newAppointment }
)(withRouter(NewAppointment));
