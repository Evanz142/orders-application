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
import { Box, CssBaseline, ThemeProvider } from '@mui/material';


function DemoPage() {
  const apiRef = useGridApiRef();
  const { getData, darkMode, darkTheme, lightTheme } = useUserContext();

  useEffect(() => {
    //console.log("Bruh heeheeheehaws");
    getData();
  }, []);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className="App">
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <MenuAppBar textValue="Demo Images"></MenuAppBar>
        <br></br>
        <Box
            component="img"
            sx={{
                maxWidth: '90%',
              }}
            alt="postman stats image"
            src="https://img001.prntscr.com/file/img001/dCm7QOwjQLC1_EewEuzFOw.png"
        >
        </Box>

        <Box
            component="img"
            sx={{
                maxWidth: '90%',
              }}
            alt="Cancellation token pre"
            src="https://img001.prntscr.com/file/img001/QnxoTvAlQaWV3XA7y3FTCA.png"
        >
        </Box>

        <Box
            component="img"
            sx={{
                maxWidth: '90%',
              }}
            alt="cancellation token post"
            src="https://img001.prntscr.com/file/img001/wVYDWwGCQZ6AcTno4Jqo1g.png"
        >
        </Box>
        <br></br>
        <Box
            component="img"
            sx={{
                maxWidth: '10%',
                opacity: '4%',
              }}
            alt="cancellation token post"
            src="https://i.redd.it/pkvh7auqvdq81.png"
        >
        </Box>

      </div>
    </ThemeProvider>
  );
}

export default DemoPage;
