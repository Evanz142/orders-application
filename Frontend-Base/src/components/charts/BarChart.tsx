import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect, useState } from 'react';
import { useSession } from '../../contexts/SessionContext';
import { useUserContext } from '../../contexts/UserContext';

const palette = ['#1976D2', '#79BCFE', '#7878CC', '#E5D9F2', '#C6D8E4'];
const BarParams = {
  margin: { top: 100 },
}
const BasicBarChart = () => {
  const [data, setData] = useState<[]>([]);
  const { getToken } = useSession();
  const { uri } = useUserContext();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      console.error('No token available');
      return;
    }
    fetch(uri + '/BarData', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
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
      height={400}
      {...BarParams}
    />
  );
}

export default BasicBarChart;