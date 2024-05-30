import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect, useState } from 'react';

const palette = ['#1976D2', '#79BCFE', '#7878CC', '#E5D9F2', '#C6D8E4'];
const uri = 'https://localhost:7045/api/Orders/BarData';
const BarParams = {
  margin: { top: 100 },
}
const BasicBarChart = () => {
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
    <BarChart
      //yAxis={[{label: "Number of Orders"}]}
      colors={palette}
      xAxis={[{ scaleType: 'band', data: ['Order Types'] }]}
      series={data}
      width={400}
      height={400}
      {...BarParams}
    />
  );
}

export default BasicBarChart;