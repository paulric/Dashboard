import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import 'nprogress/nprogress.css';
import App from 'src/App';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import  UserPriorityProvider  from 'src/contexts/UserPriorityProvider';
import { AuthProvider } from 'src/contexts/AuthContext';
import * as serviceWorker from 'src/serviceWorker';

ReactDOM.render(
  <HelmetProvider>

    <UserPriorityProvider>
      <SidebarProvider>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </SidebarProvider>
    </UserPriorityProvider>
  </HelmetProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
