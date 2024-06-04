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
import { useUserContext } from '../contexts/UserContext.js';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { Box, Grid, Paper, Stack, Typography, styled } from '@mui/material';

function StatisticsPage() {

    // states for graph data
    const [orderNumberTotal, setOrderNumberTotal] = useState<number>();
    const [orderNumberMonth, setOrderNumberMonth] = useState<number>();
    const [customerNumber, setCustomerNumber] = useState<number>(0);
    const { darkMode, darkTheme, lightTheme } = useUserContext();

    const statsPageBoxColor = darkMode ? '#454545' : 'white';
    const statsPageTextColor = darkMode ? 'white' : '#1976D2';

    useEffect(() => { // Animating the statistic numbers on page load
        console.log("Animation")

        const revenueMonth = 8120432;
        const customerRetention = 98;

        const num1Element = document.getElementById('num1');
        const num2Element = document.getElementById('num2');
        const num3Element = document.getElementById('num3');
        const num4Element = document.getElementById('num4');
        const num5Element = document.getElementById('num5');

        num1Element.style.setProperty('--num1', '0');
        num2Element.style.setProperty('--num2', '0');
        num3Element.style.setProperty('--num3', '0');
        num4Element.style.setProperty('--num4', '0');
        num5Element.style.setProperty('--num5', '0');

        setTimeout(() => {
            try 
            {
                num1Element.style.setProperty('--num1', orderNumberTotal?.toString());
                num2Element.style.setProperty('--num2', orderNumberMonth?.toString());
                num3Element.style.setProperty('--num3', revenueMonth?.toString());
                num4Element.style.setProperty('--num4', customerNumber?.toString());
                num5Element.style.setProperty('--num5', customerRetention?.toString());
            }
            catch (TypeError) {
                // Error with initial loading. Can't toString() on undefined.
                console.log("Error on initial loading.")
            }
        }, 50);
        
    }, [[]]) 

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
    <CssBaseline />
    <div className="Statistics-header" style={{backgroundColor: darkMode ? '#353535' : '#EEF2F6'}}>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <MenuAppBar textValue="Statistics"></MenuAppBar>
        {/* <Button onClick={testFunction} variant="contained">Run Test Function</Button> */}
        <Box style={{ padding: '1%' , paddingBottom: 0}}>
            <Grid container spacing={{ xs: 2, md: 2, lg: 2, xl: 2 }} columns={{ xs: 4, sm: 12, md: 12, lg: 15, xl: 15 }}>
                <Grid item xs={12} sm={4} md={4} lg={3} xl={3} className="gridItem">
                <Box className="statContainer" style={{backgroundColor: statsPageBoxColor, color: statsPageTextColor}}>
                    <Typography id="num1" variant="h2"></Typography>
                    <Typography variant="h4">total orders</Typography>
                </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={3} xl={3} className="gridItem">
                <Box className="statContainer" style={{backgroundColor: statsPageBoxColor, color: statsPageTextColor}}>
                    <Typography id="num2" variant="h2"></Typography>
                    <Typography variant="h4">monthly orders</Typography>
                </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={3} xl={3} className="gridItem">
                <Box className="statContainer" style={{backgroundColor: statsPageBoxColor, color: statsPageTextColor}}>
                    <Typography id="num3" variant="h2"></Typography>
                    <Typography variant="h4">month revenue</Typography>
                </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3} xl={3} className="gridItem">
                <Box className="statContainer" style={{backgroundColor: statsPageBoxColor, color: statsPageTextColor}}>
                    <Typography id="num4" variant="h2"></Typography>
                    <Typography variant="h4">customers</Typography>
                </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3} xl={3} className="gridItem">
                <Box className="statContainer" style={{backgroundColor: statsPageBoxColor, color: statsPageTextColor}}>
                    <div id="num5container">
                    <Typography id="num5" variant="h2"></Typography>
                    <Typography id="num6">%</Typography>
                    </div>
                    <Typography variant="h4">retention rate</Typography>
                </Box>
                </Grid>
            </Grid>
        </Box>
        <br></br>

        <Box style={{paddingLeft: '1%', paddingRight: '1%'}} sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 2, lg: 2, xl: 2 }} columns={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 12 }}>
                
                <Grid item xs={12} sm={12} md={12} lg={6} xl={3.5}>
                    <Box className="dataContainer" style={{backgroundColor: statsPageBoxColor}} flexGrow={1}>
                        <BasicPieChart updateCustomers={setCustomerNumber} ></BasicPieChart>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6} xl={5}>
                    <Box className="dataContainer" style={{backgroundColor: statsPageBoxColor}} flexGrow={1}>
                        <BasicLineChart updateOrderNumberTotal={setOrderNumberTotal} updateOrderNumberMonth={setOrderNumberMonth} ></BasicLineChart>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={3.5}>
                    <Box className="dataContainer" style={{backgroundColor: statsPageBoxColor}} flexGrow={1}>
                        <BasicBarChart></BasicBarChart>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    </div>
    </ThemeProvider>
  );
}

export default StatisticsPage;
