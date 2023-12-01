import { createTheme,ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Navbar />
        <AppRoutes />
        <ToastContainer
            position="bottom-right"
            autoClose={3000}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
          />
      </ThemeProvider>
    </div>
  );
}

// "@media only screen and (max-width: 1024px)":{
//   width : '450px',
// },
// "@media only screen and (max-width: 770px)":{
//   flexDirection: 'column',
// },
// "@media only screen and (max-width: 480px)":{
//   width : '250px',
// },

const theme = createTheme({
  palette: {
    primary: {
      main: '#0EA5E9',
    },
    secondary: {
      main: "#334155",
    },
    thirdcolor: {
      main: "#6488BC",
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
});

export default App;
