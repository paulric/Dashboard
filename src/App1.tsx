import { Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { ConfirmProvider } from 'material-ui-confirm';
import { NotificationContainer } from 'react-notifications';
import ThemeProvider from './theme/ThemeProvider';
import SignIn from './content/SignIn';
import Main from './Main';

function App() {
  return (
    <ThemeProvider>
      <ConfirmProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Navigate to="/admin" />} />
            <Route path="/admin" element={<SignIn admin />} />
            <Route path="/agent" element={<SignIn agent />} />
            <Route path="/admin/app/*" element={<Main type="admin" />} />
            <Route path="/agent/app/*" element={<Main type="agent" />} />
          </Routes>
        </LocalizationProvider>
        <NotificationContainer />
      </ConfirmProvider>
    </ThemeProvider>
  );
}

export default App;