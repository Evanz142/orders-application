import './Statistics.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useState, useEffect }  from 'react';
import MenuAppBar from '../components/MenuAppBar.js';
import BasicLineChart from '../components/charts/LineChart.js'
import BasicPieChart from '../components/charts/PieChart.js';
import BasicBarChart from '../components/charts/BarChart.js';

import { useGridApiRef } from '@mui/x-data-grid';
import { Box, Button, Grid, Paper, Stack, Typography, styled } from '@mui/material';

const uri = 'https://localhost:7045/api/Orders';

function StatisticsPage() {
    const apiRef = useGridApiRef();

    interface Order {
        id: string;
        orderType: any;
        customerName: string;
        createdDate: string;
        createdByUsername: string;
    }


    // format the order type to make it readable and not just a number
    function formatOrderType(orderType: number): string {
        switch (orderType) {
            case 0:
                return 'None';
            case 1:
                return 'Standard';
            case 2:
                return 'Sale Order';
            case 3:
                return 'Purchase Order';
            case 4:
                return 'Transfer Order';
            case 5:
                return 'Return Order';
            default:
                return '';
        }
    }

    // DATA GENERATION

    const generateID = () => {
        const chars = "AaBbCcDdEeFf1234567890";
        return [8,4,4,4,12].map(n => Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join("")).join("-");
    };

    const customers = ["Walmart", "Walmart", "Kroger", "Anheuser Busch", "Anheuser Busch", "Anheuser Busch", "Anheuser Busch", "Safeway", "Target", "Coca Cola", "Budweiser", "Coca Cola", "Coca Cola"];

    // Function to generate a random date with a weighted distribution towards recent dates
    const generateWeightedDate = () => {
        const now = Date.now();
        const sixMonthsAgo = now - 182 * 24 * 60 * 60 * 1000; // Approx. 6 months in milliseconds
        console.log("Six months ago: "+sixMonthsAgo);
        const randomWeight = 1 - Math.exp(-Math.random()); // Exponential distribution favoring recent dates
        const date = new Date(sixMonthsAgo + Math.random() * (now - sixMonthsAgo));
        return date.toJSON();
    };

    // Function to generate a random order
    const generateRandomOrder = () => {
        return {
            id: generateID(),
            orderType: Math.floor(Math.random() * 5) + 1,
            customerName: customers[Math.floor(Math.random() * customers.length)],
            createdDate: generateWeightedDate(),
            createdByUsername: "PJ"
        };
    };

    const testFunction = () => {

        for (let i = 0; i < 45; i++) {
            const order = generateRandomOrder();
            
            fetch(uri, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            })
            .catch(error => console.error('Unable to add item.', error));
            
           //console.log(order);
        }
  }

  return (
    <div className="Statistics-header">
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <MenuAppBar textValue="Statistics"></MenuAppBar>
        {/* <Button onClick={testFunction} variant="contained">Run Test Function</Button> */}
        <Stack style={{padding: '1%'}} direction="row" width="98%" textAlign="center" spacing={2}>
            <Box /*style={{backgroundColor: '#1976D2'}}*/ className="statContainer" flexGrow={1}>
                <Typography></Typography>
            </Box>
            <Box /*style={{backgroundColor: '#4587C9'}}*/ className="statContainer" flexGrow={1}>
            </Box>
            <Box /*style={{backgroundColor: '#7878CC'}}*/ className="statContainer" flexGrow={1}>
            </Box>
            <Box /*style={{backgroundColor: '#E5D9F2'}}*/ className="statContainer" flexGrow={1}>
            </Box>
            <Box /*style={{backgroundColor: '#C6D8E4'}}*/ className="statContainer" flexGrow={1}>
            </Box>
        </Stack>

        <Stack style={{paddingLeft: '1%', paddingRight: '1%'}} direction="row" width="98%" textAlign="center" spacing={2}>
            <Box className="dataContainer" flexGrow={1}>
                <BasicLineChart></BasicLineChart>
            </Box>
            <Box className="dataContainer" flexGrow={1}>
                <BasicPieChart></BasicPieChart>
            </Box>
            <Box className="dataContainer" flexGrow={1}>
                <BasicBarChart></BasicBarChart>
            </Box>
        </Stack>
        
            {/* <br></br>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                <Box className="dataContainer">xs=8</Box>
                </Grid>
                <Grid item xs={4}>
                <Box className="dataContainer">xs=4</Box>
                </Grid>
                <Grid item xs={4}>
                <Box className="dataContainer">xs=4</Box>
                </Grid>
                <Grid item xs={8}>
                <Box className="dataContainer">xs=8</Box>
                </Grid>
            </Grid>
        </Box> */}
    </div>
  );
}

export default StatisticsPage;
