
import './App.css';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NexusEventList from './pages/NexusEventList';
import MembersListPage from './pages/MembersListPage';
import EventDetailPage from './pages/EventDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import NavBar from './NavBar';
import { makeStyles, useTheme, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#ff6508',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#2196f3',
      dark: '#006596',
      contrastText: '#000',
    },
  },
});


function App() {
  return (
    <Router>
      <div className="App">
        <ThemeProvider theme={theme} >
          <header>
            <NavBar />
          </header>
          <main>
            <Switch>
              <Route path="/" component={HomePage} exact/>
              <Route path="/about" component={AboutPage} />
              <Route path="/nexus-events" component={NexusEventList} />
              <Route path="/members" component={MembersListPage} />
              <Route path="/timeline" component={NexusEventList} />
              <Route path="/event/:code" component={EventDetailPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </main>
          <footer>
            <p> &copy; Copyright TVA &infin; &infin; || Note: This is a fan portfoltio project and is not affiliated with Marvel Studios.</p>
          </footer>
        </ThemeProvider>
      </div>
    </Router>
    
  );
}

export default App;
