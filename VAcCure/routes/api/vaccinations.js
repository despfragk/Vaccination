const { response } = require("express");
const express = require("express");
const router = express.Router();
const jwt_decode = require("jwt-decode");
const driver = require('bigchaindb-driver');

const Vaccination = require("../../models/Vaccination");
const appoinment = require("../../validation/appointment");



router.post("/appointments", (req, res) => {
    

    const {errors, isValid} = appoinment(req.body);


    if(!isValid){
        return res.status(400).json(errors);
    }


    Vaccination.findOne({amka: req.body.amka }).then(vaccination => {
        

        const decoded1 = jwt_decode(req.headers.authorization); 
        if(vaccination)
        {
            return res.status(400).json({amka: "AMKA already exist"});
        }
        else
        {
            let stage = "Pending"
            if(req.body.doseOneCompleted){
                stage="Semi-Completed"
            }
            if(req.body.doseTwoCompleted){
                stage="Completed"
            }

            const newVaccination = new Vaccination({
                username: String(decoded1.username),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                gender: req.body.gender,
                amka: req.body.amka,
                phone: req.body.phone,
                address: req.body.address,
                dateOfBirth: req.body.dateOfBirth,
                dateDose1: req.body.dateDose1,
                dateDose2: req.body.dateDose2,
                doseOneCompleted: req.body.doseOneCompleted,
                doseTwoCompleted: req.body.doseTwoCompleted,
                vaccineBrand: req.body.vaccineBrand,
                stage: stage,
                comments: req.body.comments,
                symptoms: req.body.symptoms,
               
            })
    console.log(decoded1.username)
            // Decode token and get user info and exp
            // if(req.body.token) {
            //     
            // }
           // console.log(req.body);
            //console.log(req.headers);
            if(newVaccination.doseTwoCompleted){
               
                const API_PATH = 'http://localhost:9984/api/v1/';
                const decoded = jwt_decode(req.headers.authorization);       
                console.log(decoded);
                //const { user } = decoded;

                const publicKey = decoded.key.publicKey
                const privateKey = decoded.key.privateKey
                const hospitalName = String(decoded.hospitalName)

                const tx = driver.Transaction.makeCreateTransaction( newVaccination,{ success: "success" },
                     [ driver.Transaction.makeOutput(
                             driver.Transaction.makeEd25519Condition(publicKey))
                     ],
                     publicKey
                 )
                

                const txSigned = driver.Transaction.signTransaction(tx, privateKey);
                const conn = new driver.Connection(API_PATH);

                conn.postTransactionCommit(txSigned).then(retrievedTx => console.log('Transaction', retrievedTx.id, 'successfully posted.'))
            
            }

            try{
                newVaccination.save().then(vaccination => res.json(vaccination));
            }catch(error){
                return res.json(error);
            }

        }

    });


});

router.put("/dashboard", (req, res) => {
   
    Vaccination.updateOne({ _id: req.body._id }, req.body, message => {
        if (!message) {

            Vaccination.findOne({ _id: req.body._id }).then(vaccination => {
                if(vaccination.doseTwoCompleted){
                
                    const API_PATH = 'http://localhost:9984/api/v1/';
                    const decoded = jwt_decode(req.headers.authorization);       
                    console.log(decoded);
                    //const { user } = decoded;

                    const publicKey = decoded.key.publicKey
                    const privateKey = decoded.key.privateKey
                    const hospitalName = String(decoded.hospitalName)

                    const tx = driver.Transaction.makeCreateTransaction( vaccination,{ success: "success" },
                        [ driver.Transaction.makeOutput(
                                driver.Transaction.makeEd25519Condition(publicKey))
                        ],
                        publicKey
                    )
                    

                    const txSigned = driver.Transaction.signTransaction(tx, privateKey);
                    const conn = new driver.Connection(API_PATH);

                    conn.postTransactionCommit(txSigned).then(retrievedTx => console.log('Transaction', retrievedTx.id, 'successfully posted.'))
                
                }
            })

           return res.json({message: 'updated.'});
           
        }else{
            return res.json({error: message});
        }
    });

});



router.get("/dashboard", (req, res) => {
   
    username = req.query.username
    
    if(req.query.amka)
    {
        
        const amka = req.query.amka
       
        try{
            Vaccination.findOne({ amka, username }).then(vaccination => {
                if (!vaccination) {
                    return res.status(404).json({ vaccinationnotfound: "error" });
                }

                res.json({ records: vaccination })
                
            });
        }
        catch(exeption){
            //console.log(exeption)
        }
    }
    else if(req.query.firstName && req.query.lastName)
    {
        const firstName = req.query.firstName
        const lastName = req.query.lastName

        Vaccination.find({firstName, lastName, username} ).then(vaccinationRecords => {
            
            if (!vaccinationRecords) {
                return res.status(404).json({ vaccinationnotfound: "error" });
            }
            
            res.json({ records : vaccinationRecords });

        });
    }
    else if(req.query.searchDate)
    {
        const dateDose1 = req.query.searchDate;
        const dateDose2 = req.query.searchDate;

        Vaccination.find({$or:[{dateDose1 : dateDose1, username: username},{dateDose2 : dateDose2, username: username}]}).then(vaccinationRecords => {

            if (!vaccinationRecords) {
                return res.status(404).json({ vaccinationnotfound: "error" });
            }
            
            res.json({ records : vaccinationRecords });

        });

    }
    else
    {
        return res.json({error : "empty request"});
    }

});

router.get("/stats", (req, res) =>{

    const dateDose2 = new Date().toISOString().split('T')[0];
    //const dateDose2 = "2021-09-08";

    Vaccination.find().then( async vaccinationRecords => {
    
        if (!vaccinationRecords) {
            return res.status(404).json({ vaccinationnotfound: "error" });
        }

        let data = [0,0,0,0,0,0]
        for(var i=0; i<vaccinationRecords.length; i++){
            for(var j=0; j<6; j++){
                if(vaccinationRecords[i].dateDose2.getMonth()===j+1){
                    data[j]++;
                }
            }
        }

        let dataPerHospital = [0,0,0,0,0,0,0,0,0,0,0,0], sum = 0

        for(let i=0; i<data.length; i++){
           sum+=data[i]
           dataPerHospital[i]=sum
        }

        let dataPerAge = [0,0,0,0,0,0,0,0];
        for(let i=0; i<vaccinationRecords.length; i++)
        {   
            let date = (new Date().getTime() - new Date(vaccinationRecords[i].dateOfBirth).getTime())/(1000*60*60*24*365)
            if(Math.floor(date) >= 0 && Math.floor(date)<= 19)
            {
                dataPerAge[0]++;
            }
            if(Math.floor(date) >= 20 && Math.floor(date)<= 29)
            {
                dataPerAge[1]++;
            }
            if(Math.floor(date) >= 30 && Math.floor(date)<= 39)
            {
                dataPerAge[2]++;
            }
            if(Math.floor(date) >= 40 && Math.floor(date)<= 49)
            {
                dataPerAge[3]++;
            }
            if(Math.floor(date) >= 50 && Math.floor(date)<= 59)
            {
                dataPerAge[4]++;
            }
            if(Math.floor(date) >= 60 && Math.floor(date)<= 69)
            {
                dataPerAge[5]++;
            }
            if(Math.floor(date) >= 70 && Math.floor(date)<= 79)
            {
                dataPerAge[6]++;
            }
            if(Math.floor(date) >= 80)
            {
                dataPerAge[7]++;
            }
        }



        let Moderna = 0
        let Pfizer = 0
        let AstraZeneca = 0
       
        for(let i=0; i<vaccinationRecords.length; i++)
        { 
            if(vaccinationRecords[i].vaccineBrand==="Moderna"){
                Moderna++;
            }
            if(vaccinationRecords[i].vaccineBrand==="Pfizer"){
                Pfizer++;
            }
            if(vaccinationRecords[i].vaccineBrand==="AstraZeneca"){
                AstraZeneca++;
            }
        }


       
        brandData=[Moderna, Pfizer, AstraZeneca]
        console.log(brandData)
        // const API_PATH = 'http://localhost:9984/api/v1/';
        // const conn = new driver.Connection(API_PATH)
        

        // conn.searchAssets("Moderna")
        // .then(res => { Moderna = res;})
        // conn.searchAssets("Pfizer")
        // .then(assets => Pfizer = assets)
        // conn.searchAssets("AstraZeneca")
        // .then(assets => AstraZeneca = assets)
        // console.log(Moderna)
        
        res.json({
            dataPerHospital: dataPerHospital,
            dataPerAge: dataPerAge,
            brandData: brandData
        });

    });

})



module.exports = router;