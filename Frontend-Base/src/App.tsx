import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useState, useEffect }  from 'react';
import MenuAppBar from './components/MenuAppBar.js';
import OrderOptionsBar from './components/OrderOptionsBar.js';
import DataTable from './components/DataTable.js';
import { useGridApiRef } from '@mui/x-data-grid';

const uri = 'https://localhost:7045/api/Orders';
const typeUri = 'https://localhost:7045/api/Orders/ByType';

function App() {
  const [data, setData] = useState<Order[]>([]);
  const apiRef = useGridApiRef();

  interface Order {
    id: string;
    orderType: any;
    customerName: string;
    createdDate: string;
    createdByUsername: string;
  }

  useEffect(() => {
    getData();
  }, []);

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

  // format the date string so that it's readable
  const formatDateString = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  };

  // go through entire orders object and call formatDateString on each one
  const replaceDateInOrders = (orders: Order[]): Order[] => {
    return orders.map(order => {
      return {
        ...order,
        createdDate: formatDateString(order.createdDate),
        orderType: formatOrderType(order.orderType)
      };
    });
  };

  const getData = (type?: number) => {
    console.log("getting data now!!");
    if (!type) { // fetch for when there is no specified order type filter
      fetch(uri)
      .then(response => response.json())
      .then(data => {
        // update the date strings
        const updatedData = replaceDateInOrders(data);
        // Set the retrieved data in state
        setData(updatedData);
      })
      .catch(error => console.error('Unable to get items.', error));  
    }
    else { // fetch for when there is a specified order type filter
      fetch(`${typeUri}/${type}`)
      .then(response => response.json())
      .then(data => {
        // update the date strings
        const updatedData = replaceDateInOrders(data);
        // Set the retrieved data in state
        setData(updatedData);
      })
      .catch(error => console.error('Unable to get items.', error));  
    }
  }

  return (
    <div className="App">
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <MenuAppBar></MenuAppBar>
      <br></br>
      <OrderOptionsBar apiRef={apiRef} updateData={getData}></OrderOptionsBar>
      <br></br>
      <DataTable updateData={getData} apiRef={apiRef} data={data}></DataTable>

      {/* Get data button for testing */}
      <br></br>
      {/* <Button onClick={getData} variant="contained">Get Data</Button> */}
    </div>
  );
}

export default App;
