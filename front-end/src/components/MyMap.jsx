import React, {Component} from "react";

import "leaflet/dist/leaflet.css";
import "./map01.css";
import Delayed from './Delayed';
import MapContainer from './MapContainer';

import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';
import Zoom from '@mui/material/Zoom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { DataGrid } from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';


import { FixedSizeList } from 'react-window';


// google-map
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { Icon } from '@iconify/react'
// import locationIcon from '@iconify/icons-mdi/map-marker'
// import './googlemap.css'


import ryu1 from "./../picture/Design1.jpg";

ChartJS.register(ArcElement, Tooltip, Legend);
// import MapGL  from 'react-map-gl';
// import Geocoder from 'react-map-gl-geocoder';
const columns = [
    { 
        field: 'id', 
        headerName: 'ID', 
        width: 50 
    },
    {
        field: 'columns_name',
        headerName: 'Name',
        width: 160,
    },
    {
        field: 'columns_address',
        headerName: 'Address',
        width: 150,
    },
    {
        field: 'columns_city',
        headerName: 'City',
        width: 80,
    },
    {
        field: 'columns_state',
        headerName: 'State',
        width: 80,
    },
    {
        field: 'columns_latitude',
        headerName: 'Latitude',
        width: 80,
    },
    {
        field: 'columns_longitude',
        headerName: 'Longitude',
        width: 70,
    },
    {
        field: 'columns_stars',
        headerName: 'Stars',
        width: 70,
    },
    {
        field: 'columns_reviewCount',
        headerName: 'ReviewCount',
        type: 'number',
        width: 80,
    },
    {
        field: 'columns_categories',
        headerName: 'Categories',
        width: 730,
    },
      
];

const columns2 = [
    { 
        field: 'id', 
        headerName: 'ID', 
        width: 50 
    },
    {
        field: 'columns_stars',
        headerName: 'Stars',
        width: 65,
    },
    {
        field: 'columns_time',
        headerName: 'Time',
        width: 180,
    },
    {
        field: 'columns_text',
        headerName: 'Text',
        width: 5000,
    },      
];

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));


class MyMap extends Component{
    
    constructor() {
        super();
        this.state = {
            checked: '1',
            checked2: false,
            page : 'mainpage',

            zipCode : '',
            validZipcode: 1,
            
            selectStores: '',
            hasSelectStores: 1,
            checkedS1 : [],
            hasSelectKeywords: 1,


            rows : [],

            // store data of query2
            totalNumber1 : 0,
            selectedNumber1: 0, 
            data03 : {
                labels: [
                  'Stores with Selected Keywords',
                  'Rest Stores',
                ],
                datasets: [{
                  label: 'My First Dataset',
                  data: [10,10],
                  backgroundColor: [
                    // 'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                  ],
                  hoverOffset: 4
                }]
            },

            //select pie chart
            selectionModel : [],
            mapLatitude: 42.355896,
            mapLongitude: -71.057203,
            mapStoreName: '',
            updateMapS: 0,
            // database_id : '',

            //second pie chart
            numFood1: 0,
            numMedical1: 0,
            numFinancial1: 0,
            numLiving: 0,
            numShopping: 0,
            numOthers: 0,

            data04 : {
                labels: [
                  'Food',
                  'Medical',
                  'Financial Services',
                  'Living',
                  'Shopping',
                  'Others',
                ],
                datasets: [{
                  label: 'My Second Dataset',
                  data: [10,10,10,10,10,10],
                  backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(75, 192, 192)',
                    'rgb(255, 205, 86)',
                    'rgb(201, 203, 207)',
                    'rgb(54, 162, 235)',
                    'rgb(202, 109, 203)',
                  ],
                  hoverOffset: 4
                }]
            },
            //update ave of second pie chart
            switchOnOff1 : 0,
            //update ave of first pie chart
            switchOnOff2 : 0,

            //backdrop
            backdrop1: false,

            //dialog1
            openDialog1: false,
            rows2 : [],

            //third chart
            data05 : {
                labels: [
                    'f1',
                    'f2',
                    'f3',
                    'f4',
                    'f5',
                    'f6',
                    'f7',
                  ],
                datasets: [{
                  label: 'My First Dataset',
                  data: [65, 59, 80, 81, 56, 55, 40],
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                  ],
                  borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                  ],
                  borderWidth: 1
                }]
              },

        }
        
        //this change is for precint/district
        this.handleChange = this.handleChange.bind(this);

        // this is for page-interaction

        this.handleClickT = this.handleClickT.bind(this);

        this.handleChangeZipcode = this.handleChangeZipcode.bind(this);
        this.handleClearZipcode = this.handleClearZipcode.bind(this);
        this.handleSubmitZipcode = this.handleSubmitZipcode.bind(this);
        this.handleChangeSelectStores = this.handleChangeSelectStores.bind(this);
        this.handleSubmitSelectStores = this.handleSubmitSelectStores.bind(this);
        this.handleGoHome = this.handleGoHome.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleGoBackPage1 = this.handleGoBackPage1.bind(this);
        this.handleClearKeywords = this.handleClearKeywords.bind(this);
        this.submitKeywords = this.submitKeywords.bind(this);
        this.frpostquery01 = this.frpostquery01.bind(this);
        this.handleGoBackPage2 = this.handleGoBackPage2.bind(this);
        this.sleep1 = this.sleep1.bind(this);
        this.setPieChart1toZero = this.setPieChart1toZero.bind(this);
        this.setSelectionModel = this.setSelectionModel.bind(this);
        this.startNewPlan = this.startNewPlan.bind(this);
        this.changeSwitch1 = this.changeSwitch1.bind(this);
        this.changeSwitch2 = this.changeSwitch2.bind(this);
        this.handleOpenDialog1 = this.handleOpenDialog1.bind(this);
        this.handleCloseDialog1 = this.handleCloseDialog1.bind(this);
    }
    

    

    handleChange(checked) {
        this.setState({ checked });
        console.log(this.state.checked)
    }

    handleClickT(){ 
        // Changing state 
        this.setState({checked : '1'}) 
        this.setState({page : 'page1'}) 
    } 

    handleChangeZipcode(event){
        this.state.zipCode = event.target.value;
        this.setState({});
        if(!isNaN(+event.target.value)){
            console.log("number!!!!!!!!!!!!!!:", event.target.value.length)
            if(event.target.value >= 1000 && event.target.value.length == 5){
                this.setState({validZipcode : 3});
            }else if(event.target.value.length > 5){
                this.setState({validZipcode : 2});
            }else{
                this.setState({validZipcode : 1});
            }
        }else{
            // console.log("not number!!!!!!!!!!!!!!")
            this.setState({validZipcode : 2});
        }
    }

    handleClearZipcode(){
        this.setState({zipCode: ''});
        this.setState({validZipcode : 1});
    }

    handleSubmitZipcode(){
        this.setState({page : 'page1'});
        this.setState({selectStores : ''});
        this.setState({hasSelectStores : 1});
    }

    handleChangeSelectStores(event){
        this.setState({selectStores : event.target.value});
        if(event.target.value != ''){
            this.setState({hasSelectStores : 2});
        }
    }

    handleSubmitSelectStores(){
        this.setState({page : 'page2'});
        if(this.state.checkedS1.length == 0){
            this.setState({hasSelectKeywords : 1});
        }else{
            this.setState({hasSelectKeywords : 2});
        }
        this.setPieChart1toZero();
    }

    handleGoHome(){
        this.setState({page : 'mainpage'});
    }

    handleToggle(value){
        const currentIndex = this.state.checkedS1.indexOf(value);
        const newChecked = [...this.state.checkedS1];
    
        if (currentIndex == -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
        this.state.checkedS1 = newChecked;
        this.setState({});
        if(this.state.checkedS1.length == 0){
            this.setState({hasSelectKeywords : 1});
        }else{
            this.setState({hasSelectKeywords : 2});
        }
        // console.log("checkedS1", this.state.checkedS1);
    }

    handleGoBackPage1(){
        this.setState({page : 'page1'});
        this.setState({checkedS1 : []});
    }

    handleClearKeywords(){
        this.state.checkedS1 = []
        this.setState({});
        if(this.state.checkedS1.length == 0){
            this.setState({hasSelectKeywords : 1});
        }else{
            this.setState({hasSelectKeywords : 2});
        }
    }

    submitKeywords(){
        this.state.rows = [];
        this.setState({page : 'page3'});
        this.setState({backdrop1: true});
        this.setState({switchOnOff1 : 0});
        this.setState({switchOnOff2 : 0});
        this.setState({rows2: []});
        this.frpostquery01(this.state.zipCode, this.state.checkedS1)
        .then(() => {
            this.frpostquery02(this.state.zipCode, this.state.checkedS1)
            .then(() => {
                this.setState({backdrop1: false});
            })
        })
        this.frpostquery03(this.state.zipCode, this.state.checkedS1)
            .then(() => {})
        
    }
    
    frpostquery01(zipzode, checkedS) {
        return axios
          .post("http://localhost:4000/api/test/" + "postQuery01" , {zipzode, checkedS})
          .then(response => {
            console.log("response:", response.data);
            console.log("response_test1:", response.data.length);
            this.state.selectedNumber1 = response.data.length;
            // console.log("response_test2:", response.data[0][1]);
            // console.log("response_test3:", response.data[1][1]);

            for (var i = 0; i < response.data.length; i++) {
                var x = {}
                x.id = i;
                x.columns_name = response.data[i][1]
                x.columns_address = response.data[i][2]
                x.columns_city = response.data[i][3]
                x.columns_state = response.data[i][4]
                x.columns_latitude = response.data[i][5]
                x.columns_longitude = response.data[i][6]
                x.columns_stars = response.data[i][7]
                x.columns_reviewCount = response.data[i][8]
                x.columns_categories = response.data[i][9]
                x.database_id = response.data[i][0]
                this.state.rows = this.state.rows.concat(x);
            }
            this.setState({});
            return response.data;
          });
    }

    frpostquery02(zipzode, checkedS){
        return axios
          .post("http://localhost:4000/api/test/" + "postQuery02" , {zipzode, checkedS})
          .then(response => {

            

            console.log("response2:", response.data);
            this.state.totalNumber1 = response.data;

            const datasetsCopy = this.state.data03.datasets.slice(0);
            const dataCopy = datasetsCopy[0].data.slice(0);
            dataCopy[0] = this.state.selectedNumber1;
            dataCopy[1] = this.state.totalNumber1 - this.state.selectedNumber1;
            datasetsCopy[0].data = dataCopy;

            this.setState({
                data03: Object.assign({}, this.state.data03, {
                    datasets: datasetsCopy
                })
            });
            
            this.setState({});
          });
    }

    frpostquery03(zipzode, checkedS){
        return axios
          .post("http://localhost:4000/api/test/" + "postQuery03" , {zipzode, checkedS})
          .then(response => {            
            console.log("response3:", response.data);
            
            const datasetsCopy = this.state.data04.datasets.slice(0);
            const dataCopy = datasetsCopy[0].data.slice(0);
            dataCopy[0] = response.data[0];
            dataCopy[1] = response.data[1];
            dataCopy[2] = response.data[2];
            dataCopy[3] = response.data[3];
            dataCopy[4] = response.data[4];
            dataCopy[5] = response.data[5];
            datasetsCopy[0].data = dataCopy;

            this.setState({
                data04: Object.assign({}, this.state.data04, {
                    datasets: datasetsCopy
                })
            });
            this.setState({});
          });
    }

    frpostquery04(zipzode, checkedS){
        return axios
          .post("http://localhost:4000/api/test/" + "postQuery04" , {zipzode, checkedS})
          .then(response => {            
            console.log("response3:", response.data);
            var totalNumStores = response.data[0] + response.data[1] + response.data[2] + response.data[3] + response.data[4] + response.data[5];
            
            const datasetsCopy = this.state.data04.datasets.slice(0);
            const dataCopy = datasetsCopy[0].data.slice(0);
            dataCopy[0] = response.data[0]/totalNumStores;
            dataCopy[1] = response.data[1]/totalNumStores;
            dataCopy[2] = response.data[2]/totalNumStores;
            dataCopy[3] = response.data[3]/totalNumStores;
            dataCopy[4] = response.data[4]/totalNumStores;
            dataCopy[5] = response.data[5]/totalNumStores;
            datasetsCopy[0].data = dataCopy;

            this.setState({
                data04: Object.assign({}, this.state.data04, {
                    datasets: datasetsCopy
                })
            });
            this.setState({});
          });
    }


    frpostquery05(zipzode, checkedS){
        return axios
          .post("http://localhost:4000/api/test/" + "postQuery05" , {zipzode, checkedS})
          .then(response => {

            console.log("response5:", response.data);
            console.log("response5_0:", response.data[0]);
            console.log("response5_1:", response.data[1]);


            const datasetsCopy = this.state.data03.datasets.slice(0);
            const dataCopy = datasetsCopy[0].data.slice(0);
            dataCopy[0] = response.data[0]/response.data[1];
            dataCopy[1] = (response.data[1] - response.data[0])/response.data[1];
            datasetsCopy[0].data = dataCopy;

            this.setState({
                data03: Object.assign({}, this.state.data03, {
                    datasets: datasetsCopy
                })
            });
          });
    }


    frpostquery06(businessId){
        this.state.rows2 = [];
        this.setState({});
        return axios
          .post("http://localhost:4000/api/test/" + "postQuery06" , {businessId})
          .then(response => {

            console.log("response5:", response.data);

            for (var i = 0; i < response.data.length; i++) {
                var x = {}
                x.id = i;
                x.columns_stars = response.data[i][0]
                x.columns_time = response.data[i][1]
                x.columns_text = response.data[i][2]
                this.state.rows2 = this.state.rows2.concat(x);
            }
            this.setState({});
          });
    }

    sleep1 = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    setPieChart1toZero(){
        const datasetsCopy = this.state.data03.datasets.slice(0);
        const dataCopy = datasetsCopy[0].data.slice(0);
        dataCopy[0] = 0;
        dataCopy[1] = 0;
        datasetsCopy[0].data = dataCopy;

        this.setState({
            data03: Object.assign({}, this.state.data03, {
                datasets: datasetsCopy
            })
        });
    }

    handleGoBackPage2(){
        this.setPieChart1toZero();
        this.setState({page : 'page2'});
        this.setSelectionModel([]);
    }

    setSelectionModel(e){
        this.setState({selectionModel : e});
        if(e[0] != undefined){
            console.log("EEEEE:", e[0]);
            console.log("EEEEE2:",this.state.rows[e[0]].columns_name);
            this.state.mapLatitude = this.state.rows[e[0]].columns_latitude;
            this.state.mapLongitude = this.state.rows[e[0]].columns_longitude;
            this.state.mapStoreName = this.state.rows[e[0]].columns_name;
            this.setState({updateMapS: 1});
            this.sleep1(1).then(r => {
                console.log("----------------------------------------------------")
                this.setState({updateMapS: 0});
            })

            this.frpostquery06(this.state.rows[e[0]].database_id)
            .then(() => {})
            
            
        }
        
    }

    startNewPlan(){
        this.handleClearZipcode();
        this.handleGoHome();
        this.setState({checkedS1: []});
        this.setPieChart1toZero();
        this.setSelectionModel([]);
    }

    changeSwitch1(){
        if(this.state.switchOnOff1 == 0){
            this.setState({switchOnOff1:1});
            this.setState({backdrop1: true});
            this.frpostquery04(this.state.zipCode, this.state.checkedS1)
            .then(() => {
                this.setState({backdrop1: false});
            })
        }else{
            this.setState({switchOnOff1:0});
            this.setState({backdrop1: true});
            this.frpostquery03(this.state.zipCode, this.state.checkedS1)
            .then(() => {
                this.setState({backdrop1: false});
            })
        }
    }

    changeSwitch2(){
        if(this.state.switchOnOff2 == 0){
            this.setState({switchOnOff2:1});
            this.setState({backdrop1: true});
            this.frpostquery05(this.state.zipCode, this.state.checkedS1)
            .then(() => {
                this.setState({backdrop1: false});
            })
        }else{
            this.setState({switchOnOff2:0});
            this.setState({backdrop1: true});
            this.frpostquery02(this.state.zipCode, this.state.checkedS1)
            .then(() => {
                this.setState({backdrop1: false});
            })
        }
    }

    handleOpenDialog1(){
        this.setState({openDialog1: true});
    };

    handleCloseDialog1(){
        this.setState({openDialog1: false});
    };




    render(){
        return(
            <div>
                <div style={{borderRadius:"0px" , backgroundColor: "#F2F2F2",opacity: "0.9" , zIndex:99 ,  position: 'fixed', alignItems:'left',height: "100vh",width:'207vh', top:'0.0%', left:'0.0%', backgroundImage:`url(${ryu1})`  }}></div>
            
            {/* ----------------------------------main page---------------------------------------- */}
                {this.state.page==='mainpage' &&
                <div style={{borderRadius:"8px" , backgroundColor: "#F2F2F2",opacity: "0.85" , zIndex:100 ,  position: 'fixed', alignItems:'left',height: "470px",width:'450px', top:'20%', left:'38%' }}>
                    
                    <h2 style={{color: "#FF7F27" }}>&nbsp;Foodies</h2>
                    
                    <Zoom in={true}><h6 style={{padding:"15px", position: 'absolute', alignItems:'left', top:'80px', left:'90px'}}>Please enter the ZIP Code:</h6></Zoom>
                    <Zoom in={true}><div style={{padding:"15px", position: 'absolute', alignItems:'left', top:'115px', left:'90px'}}>
                        <TextField id="outlined-basic" label="ZIP Code" variant="outlined" value={this.state.zipCode} onChange={this.handleChangeZipcode} />
                    </div></Zoom>
                    {this.state.validZipcode == 2 && <Delayed waitBeforeShow={100}><div style={{position: 'absolute', top:'190px', width:'450px'}}><Alert severity="error">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Invalid Zip Code — check it out!</Alert></div></Delayed>}
                    {this.state.validZipcode == 3 && <Delayed waitBeforeShow={100}><div style={{position: 'absolute', top:'190px', width:'450px'}}><Alert severity="success">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This is a valid Zip Code</Alert></div></Delayed>}
                    <Zoom in={true}>
                    <div style={{padding:"15px", position: 'absolute', alignItems:'left', top:'230px', left:'90px'}}>
                        
                        <Stack spacing={2} direction="row">
                            {this.state.validZipcode != 3 && <Button variant="contained" disabled>Next</Button>}
                            {this.state.validZipcode == 3 && <Button variant="contained" onClick={this.handleSubmitZipcode}>Next</Button>}
                            <Button variant="outlined" onClick={this.handleClearZipcode}>Clear</Button>
                        </Stack>
                        
                    </div></Zoom>
                    
                </div>}
            
            {/* ----------------------------------page1---------------------------------------- */}
                {this.state.page==='page1' &&
                <div style={{borderRadius:"8px" , backgroundColor: "#F2F2F2",opacity: "0.85" , zIndex:100 ,  position: 'fixed', alignItems:'left',height: "470px",width:'450px', top:'20%', left:'38%' }}>
                    
                    <h2 style={{color: "#FF7F27" }}>&nbsp;Foodies</h2>

                    <Zoom in={true}><h6 style={{padding:"15px", position: 'absolute', alignItems:'left', top:'80px', left:'60px'}}>What kind of stores are you interested in?:</h6></Zoom>
                    <Zoom in={true}><div style={{position: 'absolute', alignItems:'left', top:'130px', left:'76px', width:'310px'}}>
                        <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.selectStores}
                            label="Select"
                            onChange={this.handleChangeSelectStores}
                        >
                        <MenuItem value={1}>Food</MenuItem>
                        <MenuItem value={2}>Medical</MenuItem>
                        <MenuItem value={3}>Financial Services</MenuItem> 
                        <MenuItem value={4}>Living</MenuItem> 
                        <MenuItem value={5}>Shopping</MenuItem>
                        <MenuItem value={6}>Others</MenuItem>
                        </Select>
                        </FormControl>
                    </div></Zoom>

                    <Zoom in={true}><div style={{padding:"15px", position: 'absolute', alignItems:'left', top:'240px', left:'60px'}}>
                        <Stack spacing={2} direction="row">
                            {this.state.hasSelectStores != 2 && <Button variant="contained" disabled>Next</Button>}
                            {this.state.hasSelectStores == 2 && <Button variant="contained" onClick={this.handleSubmitSelectStores}>Next</Button>}
                            <Button variant="outlined" onClick={this.handleGoHome}>Back</Button>
                        </Stack>
                    </div></Zoom>
                    
                    
                </div>}
            {/* ----------------------------------page2---------------------------------------- */}
                {this.state.page==='page2' &&
                <div style={{borderRadius:"8px" , backgroundColor: "#F2F2F2",opacity: "0.85" , zIndex:100 ,  position: 'fixed', alignItems:'left',height: "470px",width:'450px', top:'20%', left:'38%' }}>
                    <h2 style={{color: "#FF7F27" }}>&nbsp;Foodies</h2>
                    
                    {this.state.selectStores == 1 && <Zoom in={true}><h6 style={{padding:"15px", position: 'absolute', alignItems:'left', top:'45px', left:'16px'}}>Please choose the keywords(Food):</h6></Zoom>}
                    {this.state.selectStores == 2 && <Zoom in={true}><h6 style={{padding:"15px", position: 'absolute', alignItems:'left', top:'45px', left:'16px'}}>Please choose the keywords(Medical):</h6></Zoom>}
                    {this.state.selectStores == 3 && <Zoom in={true}><h6 style={{padding:"15px", position: 'absolute', alignItems:'left', top:'45px', left:'16px'}}>Please choose the keywords(Financial Services):</h6></Zoom>}
                    {this.state.selectStores == 4 && <Zoom in={true}><h6 style={{padding:"15px", position: 'absolute', alignItems:'left', top:'45px', left:'16px'}}>Please choose the keywords(Living):</h6></Zoom>}
                    {this.state.selectStores == 5 && <Zoom in={true}><h6 style={{padding:"15px", position: 'absolute', alignItems:'left', top:'45px', left:'16px'}}>Please choose the keywords(Shopping):</h6></Zoom>}
                    {this.state.selectStores == 6 && <Zoom in={true}><h6 style={{padding:"15px", position: 'absolute', alignItems:'left', top:'45px', left:'16px'}}>Please choose the keywords(Others):</h6></Zoom>}
                    
                    <Zoom in={true}>
                    <div className="center-col" style={{position: 'absolute', alignItems:'left', top:'85px', left:'30px', width:'395px', height: '260px', backgroundColor: "#14110F", borderRadius:"8px"}}>
                    {this.state.selectStores == 1 && 
                    <List
                        sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}
                        subheader={<ListSubheader>keyword:</ListSubheader>}
                        style={{opacity: "0.8"}}
                    >
                    <ListItem>
                        <ListItemText id="switch-list-label-wifi" primary="Restaurant" />
                        <Switch
                            edge="end"
                            onChange={() => this.handleToggle('Restaurant')}
                            checked={this.state.checkedS1.indexOf('Restaurant') !== -1}
                            inputProps={{
                                'aria-labelledby': 'switch-list-label-wifi',
                            }}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText id="switch-list-label-bluetooth" primary="Bars" />
                        <Switch
                            edge="end"
                            onChange={() => this.handleToggle('Bars')}
                            checked={this.state.checkedS1.indexOf('Bars') !== -1}
                            inputProps={{
                                'aria-labelledby': 'switch-list-label-bluetooth',
                            }}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText id="switch-list-label-bluetooth" primary="Coffee & Tea" />
                        <Switch
                            edge="end"
                            onChange={() => this.handleToggle('Coffee & Tea')}
                            checked={this.state.checkedS1.indexOf('Coffee & Tea') !== -1}
                            inputProps={{
                                'aria-labelledby': 'switch-list-label-bluetooth',
                            }}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText id="switch-list-label-bluetooth" primary="Diners" />
                        <Switch
                            edge="end"
                            onChange={() => this.handleToggle('Diners')}
                            checked={this.state.checkedS1.indexOf('Diners') !== -1}
                            inputProps={{
                                'aria-labelledby': 'switch-list-label-bluetooth',
                            }}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText id="switch-list-label-bluetooth" primary="Breakfast & Brunch" />
                        <Switch
                            edge="end"
                            onChange={() => this.handleToggle('Breakfast & Brunch')}
                            checked={this.state.checkedS1.indexOf('Breakfast & Brunch') !== -1}
                            inputProps={{
                                'aria-labelledby': 'switch-list-label-bluetooth',
                            }}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText id="switch-list-label-bluetooth" primary="Pizza" />
                        <Switch
                            edge="end"
                            onChange={() => this.handleToggle('Pizza')}
                            checked={this.state.checkedS1.indexOf('Pizza') !== -1}
                            inputProps={{
                                'aria-labelledby': 'switch-list-label-bluetooth',
                            }}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText id="switch-list-label-bluetooth" primary="Italian" />
                        <Switch
                            edge="end"
                            onChange={() => this.handleToggle('Italian')}
                            checked={this.state.checkedS1.indexOf('Italian') !== -1}
                            inputProps={{
                                'aria-labelledby': 'switch-list-label-bluetooth',
                            }}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText id="switch-list-label-bluetooth" primary="Chinese" />
                        <Switch
                            edge="end"
                            onChange={() => this.handleToggle('Chinese')}
                            checked={this.state.checkedS1.indexOf('Chinese') !== -1}
                            inputProps={{
                                'aria-labelledby': 'switch-list-label-bluetooth',
                            }}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText id="switch-list-label-bluetooth" primary="Burgers" />
                        <Switch
                            edge="end"
                            onChange={() => this.handleToggle('Burgers')}
                            checked={this.state.checkedS1.indexOf('Burgers') !== -1}
                            inputProps={{
                                'aria-labelledby': 'switch-list-label-bluetooth',
                            }}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText id="switch-list-label-bluetooth" primary="Fast Food" />
                        <Switch
                            edge="end"
                            onChange={() => this.handleToggle('Fast Food')}
                            checked={this.state.checkedS1.indexOf('Fast Food') !== -1}
                            inputProps={{
                                'aria-labelledby': 'switch-list-label-bluetooth',
                            }}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText id="switch-list-label-bluetooth" primary="Ice Cream & Frozen Yogurt" />
                        <Switch
                            edge="end"
                            onChange={() => this.handleToggle('Ice Cream & Frozen Yogurt')}
                            checked={this.state.checkedS1.indexOf('Ice Cream & Frozen Yogurt') !== -1}
                            inputProps={{
                                'aria-labelledby': 'switch-list-label-bluetooth',
                            }}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText id="switch-list-label-bluetooth" primary="Sandwiches" />
                        <Switch
                            edge="end"
                            onChange={() => this.handleToggle('Sandwiches')}
                            checked={this.state.checkedS1.indexOf('Sandwiches') !== -1}
                            inputProps={{
                                'aria-labelledby': 'switch-list-label-bluetooth',
                            }}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText id="switch-list-label-bluetooth" primary="Bakeries" />
                        <Switch
                            edge="end"
                            onChange={() => this.handleToggle('Bakeries')}
                            checked={this.state.checkedS1.indexOf('Bakeries') !== -1}
                            inputProps={{
                                'aria-labelledby': 'switch-list-label-bluetooth',
                            }}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText id="switch-list-label-bluetooth" primary="Ethiopian" />
                        <Switch
                            edge="end"
                            onChange={() => this.handleToggle('Ethiopian')}
                            checked={this.state.checkedS1.indexOf('Ethiopian') !== -1}
                            inputProps={{
                                'aria-labelledby': 'switch-list-label-bluetooth',
                            }}
                        />
                    </ListItem>
                    </List>}


                    {this.state.selectStores == 2 && 
                    <List
                    sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}
                    subheader={<ListSubheader>keyword:</ListSubheader>}
                    style={{opacity: "0.8"}}
                    >
                    <ListItem>
                    <ListItemText id="switch-list-label-wifi" primary="Doctors" />
                    <Switch
                        edge="end"
                        onChange={() => this.handleToggle('Doctors')}
                        checked={this.state.checkedS1.indexOf('Doctors') !== -1}
                        inputProps={{
                            'aria-labelledby': 'switch-list-label-wifi',
                        }}
                    />
                    </ListItem>
                    <ListItem>
                    <ListItemText id="switch-list-label-wifi" primary="Skin Care" />
                    <Switch
                        edge="end"
                        onChange={() => this.handleToggle('Skin Care')}
                        checked={this.state.checkedS1.indexOf('Skin Care') !== -1}
                        inputProps={{
                            'aria-labelledby': 'switch-list-label-wifi',
                        }}
                    />
                    </ListItem>
                    <ListItem>
                    <ListItemText id="switch-list-label-wifi" primary="Health & Medica" />
                    <Switch
                        edge="end"
                        onChange={() => this.handleToggle('Health & Medica')}
                        checked={this.state.checkedS1.indexOf('Health & Medica') !== -1}
                        inputProps={{
                            'aria-labelledby': 'switch-list-label-wifi',
                        }}
                    />
                    </ListItem>
                    <ListItem>
                    <ListItemText id="switch-list-label-wifi" primary="Medical Centers" />
                    <Switch
                        edge="end"
                        onChange={() => this.handleToggle('Medical Centers')}
                        checked={this.state.checkedS1.indexOf('Medical Centers') !== -1}
                        inputProps={{
                            'aria-labelledby': 'switch-list-label-wifi',
                        }}
                    />
                    </ListItem>
                    </List>}


                    {this.state.selectStores == 3 &&
                    <List
                    sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}
                    subheader={<ListSubheader>keyword:</ListSubheader>}
                    style={{opacity: "0.8"}}
                    >
                    <ListItem>
                    <ListItemText id="switch-list-label-wifi" primary="Banks & Credit Unions" />
                    <Switch
                        edge="end"
                        onChange={() => this.handleToggle('Banks & Credit Unions')}
                        checked={this.state.checkedS1.indexOf('Banks & Credit Unions') !== -1}
                        inputProps={{
                            'aria-labelledby': 'switch-list-label-wifi',
                        }}
                    />
                    </ListItem>
                    <ListItem>
                    <ListItemText id="switch-list-label-wifi" primary="Insurance" />
                    <Switch
                        edge="end"
                        onChange={() => this.handleToggle('Insurance')}
                        checked={this.state.checkedS1.indexOf('Insurance') !== -1}
                        inputProps={{
                            'aria-labelledby': 'switch-list-label-wifi',
                        }}
                    />
                    </ListItem>
                    <ListItem>
                    <ListItemText id="switch-list-label-wifi" primary="Tax Services" />
                    <Switch
                        edge="end"
                        onChange={() => this.handleToggle('Tax Services')}
                        checked={this.state.checkedS1.indexOf('Tax Services') !== -1}
                        inputProps={{
                            'aria-labelledby': 'switch-list-label-wifi',
                        }}
                    />
                    </ListItem>
                    <ListItem>
                    <ListItemText id="switch-list-label-wifi" primary="Payroll Services" />
                    <Switch
                        edge="end"
                        onChange={() => this.handleToggle('Payroll Services')}
                        checked={this.state.checkedS1.indexOf('Payroll Services') !== -1}
                        inputProps={{
                            'aria-labelledby': 'switch-list-label-wifi',
                        }}
                    />
                    </ListItem>
                    <ListItem>
                    <ListItemText id="switch-list-label-wifi" primary="Currency Exchange" />
                    <Switch
                        edge="end"
                        onChange={() => this.handleToggle('Currency Exchange')}
                        checked={this.state.checkedS1.indexOf('Currency Exchange') !== -1}
                        inputProps={{
                            'aria-labelledby': 'switch-list-label-wifi',
                        }}
                    />
                    </ListItem>    
                    <ListItem>
                    <ListItemText id="switch-list-label-wifi" primary="Business Consulting" />
                    <Switch
                        edge="end"
                        onChange={() => this.handleToggle('Business Consulting')}
                        checked={this.state.checkedS1.indexOf('Business Consulting') !== -1}
                        inputProps={{
                            'aria-labelledby': 'switch-list-label-wifi',
                        }}
                    />
                    </ListItem>
                    </List>} 


                    {this.state.selectStores == 4 &&
                    <List
                    sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}
                    subheader={<ListSubheader>keyword:</ListSubheader>}
                    style={{opacity: "0.8"}}
                    >
                    <ListItem>
                    <ListItemText id="switch-list-label-wifi" primary="Home Services" />
                    <Switch
                        edge="end"
                        onChange={() => this.handleToggle('Home Services')}
                        checked={this.state.checkedS1.indexOf('Home Services') !== -1}
                        inputProps={{
                            'aria-labelledby': 'switch-list-label-wifi',
                        }}
                    />
                    </ListItem>                    
                    <ListItem>
                    <ListItemText id="switch-list-label-wifi" primary="Real Estate" />
                    <Switch
                        edge="end"
                        onChange={() => this.handleToggle('Real Estate')}
                        checked={this.state.checkedS1.indexOf('Real Estate') !== -1}
                        inputProps={{
                            'aria-labelledby': 'switch-list-label-wifi',
                        }}
                    />
                    </ListItem>
                    <ListItem>
                    <ListItemText id="switch-list-label-wifi" primary="Apartments" />
                    <Switch
                        edge="end"
                        onChange={() => this.handleToggle('Apartments')}
                        checked={this.state.checkedS1.indexOf('Apartments') !== -1}
                        inputProps={{
                            'aria-labelledby': 'switch-list-label-wifi',
                        }}
                    />
                    </ListItem>
                    <ListItem>
                    <ListItemText id="switch-list-label-wifi" primary="Community Centers" />
                    <Switch
                        edge="end"
                        onChange={() => this.handleToggle('Community Centers')}
                        checked={this.state.checkedS1.indexOf('Community Centers') !== -1}
                        inputProps={{
                            'aria-labelledby': 'switch-list-label-wifi',
                        }}
                    />
                    </ListItem>
                    <ListItem>
                    <ListItemText id="switch-list-label-wifi" primary="Hotels" />
                    <Switch
                        edge="end"
                        onChange={() => this.handleToggle('Hotels')}
                        checked={this.state.checkedS1.indexOf('Hotels') !== -1}
                        inputProps={{
                            'aria-labelledby': 'switch-list-label-wifi',
                        }}
                    />
                    </ListItem>
                    <ListItem>
                    <ListItemText id="switch-list-label-wifi" primary="Movers" />
                    <Switch
                        edge="end"
                        onChange={() => this.handleToggle('Movers')}
                        checked={this.state.checkedS1.indexOf('Movers') !== -1}
                        inputProps={{
                            'aria-labelledby': 'switch-list-label-wifi',
                        }}
                    />
                    </ListItem>
                    
                    </List>}


                    {this.state.selectStores == 5 &&
                    <List
                    sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}
                    subheader={<ListSubheader>keyword:</ListSubheader>}
                    style={{opacity: "0.8"}}
                    >
                    <ListItem>
                    <ListItemText id="switch-list-label-wifi" primary="Toy Stores" />
                    <Switch
                        edge="end"
                        onChange={() => this.handleToggle('Toy Stores')}
                        checked={this.state.checkedS1.indexOf('Toy Stores') !== -1}
                        inputProps={{
                            'aria-labelledby': 'switch-list-label-wifi',
                        }}
                    />
                    </ListItem>      
                    <ListItem>
                    <ListItemText id="switch-list-label-wifi" primary="Electronics" />
                    <Switch
                        edge="end"
                        onChange={() => this.handleToggle('Electronics')}
                        checked={this.state.checkedS1.indexOf('Electronics') !== -1}
                        inputProps={{
                            'aria-labelledby': 'switch-list-label-wifi',
                        }}
                    />
                    </ListItem>   
                    <ListItem>
                    <ListItemText id="switch-list-label-wifi" primary="Fashion" />
                    <Switch
                        edge="end"
                        onChange={() => this.handleToggle('Fashion')}
                        checked={this.state.checkedS1.indexOf('Fashion') !== -1}
                        inputProps={{
                            'aria-labelledby': 'switch-list-label-wifi',
                        }}
                    />
                    </ListItem>      
                    <ListItem>
                    <ListItemText id="switch-list-label-wifi" primary="Shoe Stores" />
                    <Switch
                        edge="end"
                        onChange={() => this.handleToggle('Shoe Stores')}
                        checked={this.state.checkedS1.indexOf('Shoe Stores') !== -1}
                        inputProps={{
                            'aria-labelledby': 'switch-list-label-wifi',
                        }}
                    />
                    </ListItem>    
                    <ListItem>
                    <ListItemText id="switch-list-label-wifi" primary="Women's Clothing" />
                    <Switch
                        edge="end"
                        onChange={() => this.handleToggle("Women''s Clothing")}
                        checked={this.state.checkedS1.indexOf("Women''s Clothing") !== -1}
                        inputProps={{
                            'aria-labelledby': 'switch-list-label-wifi',
                        }}
                    />
                    </ListItem>    
                    <ListItem>
                    <ListItemText id="switch-list-label-wifi" primary="Tobacco Shops" />
                    <Switch
                        edge="end"
                        onChange={() => this.handleToggle('Tobacco Shops')}
                        checked={this.state.checkedS1.indexOf('Tobacco Shops') !== -1}
                        inputProps={{
                            'aria-labelledby': 'switch-list-label-wifi',
                        }}
                    />
                    </ListItem> 
                    <ListItem>
                    <ListItemText id="switch-list-label-wifi" primary="Wine & Spirits" />
                    <Switch
                        edge="end"
                        onChange={() => this.handleToggle('Wine & Spirits')}
                        checked={this.state.checkedS1.indexOf('Wine & Spirits') !== -1}
                        inputProps={{
                            'aria-labelledby': 'switch-list-label-wifi',
                        }}
                    />
                    </ListItem> 
                    </List>}


                    {this.state.selectStores == 6 &&
                    <List
                    sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}
                    subheader={<ListSubheader>keyword:</ListSubheader>}
                    style={{opacity: "0.8"}}
                    >
                    <ListItem>
                    <ListItemText id="switch-list-label-wifi" primary="Gas Stations" />
                    <Switch
                        edge="end"
                        onChange={() => this.handleToggle('Gas Stations')}
                        checked={this.state.checkedS1.indexOf('Gas Stations') !== -1}
                        inputProps={{
                            'aria-labelledby': 'switch-list-label-wifi',
                        }}
                    />
                    </ListItem>    
                    <ListItem>
                    <ListItemText id="switch-list-label-wifi" primary="Laundry Services" />
                    <Switch
                        edge="end"
                        onChange={() => this.handleToggle('Laundry Services')}
                        checked={this.state.checkedS1.indexOf('Laundry Services') !== -1}
                        inputProps={{
                            'aria-labelledby': 'switch-list-label-wifi',
                        }}
                    />
                    </ListItem>  
                    <ListItem>
                    <ListItemText id="switch-list-label-wifi" primary="Car Dealers" />
                    <Switch
                        edge="end"
                        onChange={() => this.handleToggle('Car Dealers')}
                        checked={this.state.checkedS1.indexOf('Car Dealers') !== -1}
                        inputProps={{
                            'aria-labelledby': 'switch-list-label-wifi',
                        }}
                    />
                    </ListItem>  
                    <ListItem>
                    <ListItemText id="switch-list-label-wifi" primary="Auto Repair" />
                    <Switch
                        edge="end"
                        onChange={() => this.handleToggle('Auto Repair')}
                        checked={this.state.checkedS1.indexOf('Auto Repair') !== -1}
                        inputProps={{
                            'aria-labelledby': 'switch-list-label-wifi',
                        }}
                    />
                    </ListItem>  
                    <ListItem>
                    <ListItemText id="switch-list-label-wifi" primary="Pet Services" />
                    <Switch
                        edge="end"
                        onChange={() => this.handleToggle('Pet Services')}
                        checked={this.state.checkedS1.indexOf('Pet Services') !== -1}
                        inputProps={{
                            'aria-labelledby': 'switch-list-label-wifi',
                        }}
                    />
                    </ListItem>  
                    
                    
                    </List>}




                    </div></Zoom>
                    {/* end of list of checks */}

                    <Zoom in={true}><div style={{padding:"15px", position: 'absolute', alignItems:'left', top:'390px', left:'14px'}}>
                        <Stack spacing={2} direction="row">
                            {this.state.hasSelectKeywords == 1 && <Button variant="contained" disabled>Submit</Button>}
                            {this.state.hasSelectKeywords == 2 && <Button variant="contained" onClick={this.submitKeywords}>Submit</Button>}
                            <Button variant="outlined" onClick={this.handleClearKeywords}>Clear</Button>
                            <Button variant="outlined" onClick={this.handleGoBackPage1}>Back</Button>
                        </Stack>
                    </div></Zoom>

                </div>}
            {/* ----------------------------------page3---------------------------------------- */}
                {this.state.page==='page3' &&
                    <div style={{borderRadius:"8px" , backgroundColor: "#F2F2F2",opacity: "0.85" , zIndex:100 ,  position: 'fixed', alignItems:'left',height: "880px",width:'1860px', top:'8%', left:'4%' }}>
                        <h2 style={{color: "#FF7F27" }}>&nbsp;Foodies</h2>


                        <div style={{ height: '820px', width: '34%' }}>
                            <DataGrid
                                rows={this.state.rows}
                                columns={columns}
                                pageSize={13}
                                rowsPerPageOptions={[13]}
                                // checkboxSelection
                                // disableSelectionOnClick
                                // checkboxSelection
                                onSelectionModelChange={(newSelectionModel) => {
                                    this.setSelectionModel(newSelectionModel);
                                }}
                                selectionModel={this.state.selectionModel}
                            />
                        </div>

                        <div style={{position: 'absolute', alignItems:'left', top:'60px', left:'680px', width:'260px', height: '260px' , borderRadius:"8px", opacity: "1"}}>
                            <Doughnut data={this.state.data03} />
                            <div id="block_container">
                                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                                <FormControlLabel
                                    control={<IOSSwitch sx={{ m: 0 }} checked={this.state.switchOnOff2} onChange={() => this.changeSwitch2()}/>}
                                    label={this.state.switchOnOff2 === 0 ? "Curr" : "Ave"}
                                />
                            </div>
                        </div>
                        <div style={{position: 'absolute', alignItems:'left', top:'40px', left:'990px', width:'283px', height: '300px' , borderRadius:"8px", opacity: "1"}}>
                            <Doughnut data={this.state.data04} />
                            <div id="block_container">
                                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                                <FormControlLabel
                                    control={<IOSSwitch sx={{ m: 0 }} checked={this.state.switchOnOff1} onChange={() => this.changeSwitch1()}/>}
                                    label={this.state.switchOnOff1 === 0 ? "Curr" : "Ave"}
                                />
                            </div>
                        </div>
                        {/* <div style={{position: 'absolute', alignItems:'left', top:'380px', left:'680px', width:'260px', height: '260px' , borderRadius:"8px", opacity: "1"}}>
                            <Bar data={this.state.data05} />
                        </div> */}


                        {this.state.updateMapS === 0 && <div style={{padding:"15px", position: 'absolute', alignItems:'left', top:'30px', left:'1300px', width:'510px', height: '720px'}}>
                            <MapContainer latitude={this.state.mapLatitude} longitude={this.state.mapLongitude} address={this.state.mapStoreName}/>
                        </div>}

                        


                        <Zoom in={true}><div style={{padding:"15px", position: 'absolute', alignItems:'left', top:'810px', left:'1620px'}}>
                        <Stack spacing={2} direction="row">
                            <Button variant="outlined" onClick={this.handleGoBackPage2}>Back</Button>
                            <Button variant="outlined" onClick={this.startNewPlan}>New Plan</Button>
                        </Stack>
                        </div></Zoom>

                        <div>
                            <Backdrop
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={this.state.backdrop1}
                            >
                                <CircularProgress color="inherit" />
                            </Backdrop>
                        </div>



                        <div style={{position: 'absolute', alignItems:'left', top:'810px', left:'735px', width:'260px', height: '260px' , borderRadius:"8px", opacity: "1"}}>
                            {this.state.rows2.length === 0 && <Button variant="outlined" onClick={this.handleOpenDialog1} disabled>
                                Show Reviews
                            </Button>}
                            {this.state.rows2.length !== 0 && <Button variant="outlined" onClick={this.handleOpenDialog1}>
                                Show Reviews
                            </Button>}
                            <Dialog
                                open={this.state.openDialog1}
                                onClose={this.handleCloseDialog1}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                            <DialogTitle id="alert-dialog-title">
                                {"Reviews of the Selected Store:"}
                            </DialogTitle>
                            <DialogContent >
                                <div style={{ height: '440px', width: '520px' }}>
                                    <DataGrid
                                    rows={this.state.rows2}
                                    columns={columns2}
                                    pageSize={6}
                                    rowsPerPageOptions={[6]}
                                />
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleCloseDialog1} autoFocus>
                                    Close
                                </Button>
                            </DialogActions>
                            </Dialog>
                        </div>

                </div>}                 
                

               
            
            </div>
        );
    }
}
export default MyMap;
