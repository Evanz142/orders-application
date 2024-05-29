import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PieChart } from '@mui/x-charts/PieChart';
import { useEffect, useState } from 'react';

const palette = ['#1976D2', '#4587C9', '#7878CC', '#E5D9F2', '#C6D8E4'];
const uri = 'https://localhost:7045/api/Orders/PieData';

const pieParams = { 
    height: 200,
    margin: { right: 5 },
    colors: palette,
    
};

const BasicPieChart = () => {
  const [data, setData] = useState<[]>([]);

  useEffect(() => {
    fetch(uri)
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => console.error('Unable to get items.', error));
  }, []);
  
  return (
    <Box>
    {/* <Typography>Customers</Typography> */}
    <PieChart
        series={[{ 
            data: data,
            innerRadius: 28,
            outerRadius: 113,
            paddingAngle: 3,
            cornerRadius: 6,
            startAngle: -122,
            endAngle: 191, 
            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: '#C8D5E2' },
          }]}
        width={500}
        height={400}
        colors={palette}
    />
    </Box>
  );
}

export default BasicPieChart;