import React, { ReactNode, useContext, useEffect, useState } from "react"
import { useSession } from "./SessionContext";
import { Alert, Snackbar, Theme, createTheme } from "@mui/material";

interface Order {
    id: string;
    orderType: any;
    customerName: string;
    createdDate: string;
    createdByUsername: string;
}

interface OrderDraft {
  orderType: any;
  customerName: string;
  createdByUsername: string;
}

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
        createdDateString: formatDateString(order.createdDate),
        orderType: formatOrderType(order.orderType)
        };
    });
};


interface UserContextType {
  // define interface for UserContext
  tableData: Order[],
  filterType: number,
  darkMode: boolean,
  darkTheme: Theme,
  lightTheme: Theme,
  orderDrafts: OrderDraft[],
  uri: string,
  setDarkMode: (boolean) => void,
  setFilterType: (number) => void,
  setFilterTypes: (any) => void,
  setFilterSearchString: (string) => void,
  setFilterDates: (any) => void,
  getData: () => void,
  queueSnackbar: (string) => void,
  addDraft: (OrderDraft) => void,
  deleteDraft: (OrderDraft) => void,
}

const UserContext = React.createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: React.PropsWithChildren<{}>) => {
    // Set up user context here
    const { getToken } = useSession();
    const [tableData, setTableData] = useState<Order[]>([]);
    const [orderDrafts, setOrderDrafts] = useState<OrderDraft[]>([]);
    const [filterType, setFilterType] = useState<number>(0);
    const [filterTypes, setFilterTypes] = useState<any[]>([]);

    const [filterSearchString, setFilterSearchString] = useState<string>("");
    const [filterDates, setFilterDates] = useState<string[]>([]);
    const [darkMode, setDarkMode] = useState<boolean>();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");

    const uri = 'https://redtech-coding-challenge-evan2.azurewebsites.net/api/Orders';

    const darkTheme = createTheme({
      palette: {
        mode: 'dark',
      },
    });
    
    const lightTheme = createTheme({
      palette: {
        mode: 'light',
      },
    });

    // update the data whenever the order type filter or search filter string changes
    
    useEffect(() => {
      getData();
    }, [filterTypes, filterSearchString, filterDates]);

    const getData = () => {
        const token = getToken();
        if (!token) {
          console.error('No token available');
          return;
        }
        
        console.log("getting data now in UserContext!!");

        const filterTypeString = filterTypes.map(ft => ft.value).join(',');
        if (!filterTypeString && !filterSearchString && !filterDates) { // fetch for when there is no specified filter
          fetch(uri, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          })
          .then(response => response.json())
          .then(data => {
            // update the date strings
            const updatedData = replaceDateInOrders(data);
            // Set the retrieved data in state
            setTableData(updatedData);
          })
          .catch(error => console.error('Unable to get items.', error));  
        }
        else { // fetch for when there is a filter
          fetch(`${uri}/Search?searchString=${filterSearchString}&orderTypes=${filterTypeString}&startDate=${filterDates[0]}&endDate=${filterDates[1]}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          })
          .then(response => response.json())
          .then(data => {
            // update the date strings
            const updatedData = replaceDateInOrders(data);
            // Set the retrieved data in state
            setTableData(updatedData);
          })
          .catch(error => console.error('Unable to get items.', error));  
        }
    }

    const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setSnackbarOpen(false);
    };

    const queueSnackbar = (message: string) => {
      setSnackbarMessage(message);
      setSnackbarOpen(true);
    }

    const addDraft = (draft: OrderDraft) => {
      setOrderDrafts(prevDrafts => [...prevDrafts, draft]);
      queueSnackbar("Draft added successfully");
    }
  
    const deleteDraft = (draft: OrderDraft) => {
      setOrderDrafts(prevDrafts => prevDrafts.filter(d => d !== draft));
      //queueSnackbar("Draft deleted successfully");
    }

    return (
        <UserContext.Provider value={{ 
          tableData, 
          filterType, 
          darkMode, 
          darkTheme, 
          lightTheme,
          orderDrafts,
          uri,
          setDarkMode,
          getData, 
          setFilterType, 
          setFilterTypes, 
          setFilterSearchString,
          setFilterDates, 
          queueSnackbar, 
          addDraft,
          deleteDraft,
          }}>

          {children}
          <Snackbar open={snackbarOpen} autoHideDuration={3200} onClose={handleSnackbarClose}>
            <Alert
              onClose={handleSnackbarClose}
              severity="success"
              variant="filled"
              sx={{ width: '100%' }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </UserContext.Provider>
      );

}


// Custom hook to access the UserContext
export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
}

export default UserContext;