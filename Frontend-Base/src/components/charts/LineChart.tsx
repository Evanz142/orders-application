import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { useEffect, useState } from 'react';
import { useSession } from '../../contexts/SessionContext';
import { useUserContext } from '../../contexts/UserContext';

const palette = ['#1976D2', '#834BC4', '#94BADF', '#A389C1', '#C6D8E4', '#79BCFE'];

const years = [
  new Date(2023, 11, 1),
  new Date(2024, 0, 1),
  new Date(2024, 1, 1),
  new Date(2024, 2, 1),
  new Date(2024, 3, 1),
  new Date(2024, 4, 1),
  new Date(2024, 5, 1),
]

interface BasicLineChartProps {
  updateOrderNumberTotal: (number) => void,
  updateOrderNumberMonth: (number) => void,
}
const BasicLineChart: React.FC<BasicLineChartProps> = ({ updateOrderNumberTotal, updateOrderNumberMonth }) => {

  const { getToken } = useSession();
  const [data, setData] = useState<[]>([]);
  const { uri } = useUserContext();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      console.error('No token available');
      return;
    }
    fetch(uri + '/ChartData', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setData(data);

        let totalSum = 0;
        let lastNumbersSum = 0;
        data.forEach(obj => {
          totalSum += obj.data.reduce((acc, num) => acc + num, 0);
          lastNumbersSum += obj.data[obj.data.length - 1];
        });
        updateOrderNumberTotal(totalSum);
        updateOrderNumberMonth(lastNumbersSum);
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
      height={400}
    />
  );
}

export default BasicLineChart;