import '../App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useState, useEffect }  from 'react';
import MenuAppBar from '../components/MenuAppBar.js';
import OrderOptionsBar from '../components/OrderOptionsBar.js';
import DataTable from '../components/DataTable.js';
import { useGridApiRef } from '@mui/x-data-grid';
import { useUserContext } from '../contexts/UserContext.js';

function OrdersPage() {
  const apiRef = useGridApiRef();
  const { getData } = useUserContext();

  useEffect(() => {
    //console.log("Bruh heeheeheehaws");
    getData();
  }, []);

  return (
    <div className="App">
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <MenuAppBar textValue="Order Manager"></MenuAppBar>
      <br></br>
      <OrderOptionsBar apiRef={apiRef}></OrderOptionsBar>
      <br></br>
      <DataTable 
        apiRef={apiRef}
      ></DataTable>
    </div>
  );
}

export default OrdersPage;
