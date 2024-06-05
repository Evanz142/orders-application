import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../contexts/SessionContext';
import { useUserContext } from '../contexts/UserContext.tsx';
import AccountCircle from '@mui/icons-material/AccountCircle';
import DarkModeSwitch from './DarkModeSwitch.tsx';


interface SideDrawerProps {
    toggleDrawer: (val: boolean) => React.MouseEventHandler<HTMLDivElement>;
}

const itemsMap: { [key: string]: { icon: React.ReactElement, href: string } } = {
    'View Orders': { icon: <ManageSearchIcon />,  href: 'home'},
    'Statistics': { icon: <ShowChartIcon />, href: 'stats'},
    'Logout': { icon: <AccountCircle />, href: ''},
};

const SideDrawer: React.FC<SideDrawerProps> = ({ toggleDrawer }) => {
    const navigate = useNavigate();
    const { getToken, logout } = useSession();
    const { uri } = useUserContext();

    const handleNavigation = (href: string) => {
        navigate(`/${href}`);
        console.log("Redirecting to " + href);
    };

    // ------------ DATA GENERATION -------------

    const generateID = () => {
        const chars = "AaBbCcDdEeFf1234567890";
        return [8,4,4,4,12].map(n => Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join("")).join("-");
    };

    const customers = ["Walmart", "Walmart", "Kroger", "Anheuser Busch", "Anheuser Busch", "Anheuser Busch", "Anheuser Busch", "Safeway", "Target", "Coca Cola", "Budweiser", "Coca Cola", "Coca Cola"];

    // Function to generate a random date with a weighted distribution towards recent dates
    const generateWeightedDate = () => {
        const now = Date.now();
        const sixMonthsAgo = now - 182 * 24 * 60 * 60 * 1000; // Approx. 6 months in milliseconds
        //console.log("Six months ago: "+sixMonthsAgo);
        const randomWeight = 1 - Math.exp(-Math.random()); // Exponential distribution favoring recent dates
        const date = new Date(sixMonthsAgo + Math.random() * (now - sixMonthsAgo));
        return date.toJSON();
    };

    // Function to generate a random order
    const generateRandomOrder = () => {
        return {
            id: generateID(),
            orderType: Math.floor(Math.random() * 5) + 1,
            customerName: customers[Math.floor(Math.random() * customers.length)],
            createdDate: generateWeightedDate(),
            createdByUsername: "Evan"
        };
    };

    const testFunction = () => {
        const token = getToken();
        if (!token) {
          console.error('No token available');
          return;
        }
        
        for (let i = 0; i < 500; i++) {
            const order = generateRandomOrder();
            
            fetch(uri, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            })
            .catch(error => console.error('Unable to add item.', error));
            
           //console.log(order);
        }
    }
    // ------------ END DATA GENERATION -------------

    return (
        <Box sx={{ width: 250, display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'space-between' }} role="presentation">
        <Box>
          <List>
            {['View Orders', 'Statistics'].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => handleNavigation(itemsMap[text].href)}>
                  <ListItemIcon>
                    {itemsMap[text].icon}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button onClick={testFunction} variant="contained">Generate Test Data</Button>
          </Box>
        </Box>
        
        <Box>
            <Divider />
            <List>
            <ListItem key={'Logout'} disablePadding>
              <ListItemButton onClick={() => logout()}>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary={'Logout'} />
              </ListItemButton>
            </ListItem>
            </List>
        </Box>
      </Box>
      
  );
}

export default SideDrawer;