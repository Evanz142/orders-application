import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { useEffect, useState } from 'react';
import { PlayLesson } from '@mui/icons-material';

const palette = ['#1976D2', '#834BC4', '#94BADF', '#A389C1', '#C6D8E4'];

const years = [
  new Date(2023, 10, 1),
  new Date(2023, 11, 1),
  new Date(2024, 0, 1),
  new Date(2024, 1, 1),
  new Date(2024, 2, 1),
  new Date(2024, 3, 1),
  new Date(2024, 4, 1),
  new Date(2024, 5, 1),
]
const uri = 'https://localhost:7045/api/Orders/ChartData';

const BasicLineChart = () => {

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
    <LineChart
      colors={palette}
      xAxis={[{
        id: 'Months',
        data: years,
        scaleType: 'time',
        valueFormatter: (date) => date.toLocaleString('default', { month: 'long' }),
      },
      ]}
      
      series={data.length > 0 ? data : []}
      width={700}
      height={400}
    />
  );
}

export default BasicLineChart;