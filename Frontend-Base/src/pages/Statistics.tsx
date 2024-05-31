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

import { Box, Stack, Typography } from '@mui/material';

const pieUri = 'https://localhost:7045/api/Orders/PieData';
const lineUri = 'https://localhost:7045/api/Orders/ChartData';

function StatisticsPage() {

    // states for graph data
    const [orderNumberTotal, setOrderNumberTotal] = useState<number>();
    const [orderNumberMonth, setOrderNumberMonth] = useState<number>();
    const [customerNumber, setCustomerNumber] = useState<number>(0);

    // useEffect(() => { // Retrieving the data for the graphs
    //     // PIE CHART
    //     fetch(pieUri)
    //     .then(response => response.json())
    //     .then(data => {
    //         setPieData(data);
    //         setCustomerNumber(Object.keys(data).length);
    //     })
    //     .catch(error => console.error('Unable to get items.', error));

    //     // LINE GRAPH
    //     fetch(lineUri)
    //     .then(response => response.json())
    //     .then(data => {
    //         setLineData(data);
    //         console.log(data);
    //     })
    //     .catch(error => console.error('Unable to get items.', error));
    // }, [])

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
        
    }, [[], customerNumber]) 

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

        <Stack style={{paddingLeft: '1%', paddingRight: '1%'}} direction="row" width="98%" textAlign="center" spacing={2}>
            <Box className="dataContainer" flexGrow={1}>
                <BasicLineChart updateOrderNumberTotal={setOrderNumberTotal} updateOrderNumberMonth={setOrderNumberMonth} ></BasicLineChart>
            </Box>
            <Box className="dataContainer" flexGrow={1}>
                <BasicPieChart updateCustomers={setCustomerNumber} ></BasicPieChart>
            </Box>
            <Box className="dataContainer" flexGrow={1}>
                <BasicBarChart></BasicBarChart>
            </Box>
        </Stack>
    </div>
  );
}

export default StatisticsPage;
