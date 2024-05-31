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

import { Box, Grid, Paper, Stack, Typography, styled } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
function StatisticsPage() {

    // states for graph data
    const [orderNumberTotal, setOrderNumberTotal] = useState<number>();
    const [orderNumberMonth, setOrderNumberMonth] = useState<number>();
    const [customerNumber, setCustomerNumber] = useState<number>(0);

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
    <div className="Statistics-header">
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <MenuAppBar textValue="Statistics"></MenuAppBar>
        {/* <Button onClick={testFunction} variant="contained">Run Test Function</Button> */}
        <Stack style={{padding: '1%'}} direction="row" width="98%" textAlign="center" spacing={2}>
            <Box className="statContainer" flexGrow={1}>
                <Typography id="num1" variant="h2"></Typography>
                <Typography variant="h4">total orders</Typography>
            </Box>
            <Box className="statContainer" flexGrow={1}>
                <Typography id="num2" variant="h2"></Typography>
                <Typography variant="h4">monthly orders</Typography>
            </Box>
            <Box className="statContainer" flexGrow={1}>
                <Typography id="num3" variant="h2"></Typography>
                <Typography variant="h4">month revenue</Typography>
            </Box>
            <Box className="statContainer" flexGrow={1}>
                <Typography id="num4" variant="h2"></Typography>
                <Typography variant="h4">customers</Typography>
            </Box>
            <Box justifyContent="center" className="statContainer" flexGrow={1}>
                <div id="num5container">
                    <Typography id="num5" variant="h2"></Typography>
                    <Typography id="num6">%</Typography>
                </div>
                <Typography variant="h4">retention rate</Typography>
            </Box>
        </Stack>


        <Box style={{paddingLeft: '1%', paddingRight: '1%'}} sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                
                <Grid item xs={2} sm={12} md={3.5} lg={3.5}>
                    <Box className="dataContainer" flexGrow={1}>
                        <BasicPieChart updateCustomers={setCustomerNumber} ></BasicPieChart>
                    </Box>
                </Grid>
                <Grid item xs={5} sm={12} md={5} lg={5}>
                    <Box className="dataContainer" flexGrow={1}>
                        <BasicLineChart updateOrderNumberTotal={setOrderNumberTotal} updateOrderNumberMonth={setOrderNumberMonth} ></BasicLineChart>
                    </Box>
                </Grid>
                <Grid item xs={2} sm={12} md={3.5} lg={3.5}>
                    <Box className="dataContainer" flexGrow={1}>
                        <BasicBarChart></BasicBarChart>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    </div>
  );
}

export default StatisticsPage;
