
import './App.css';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NexusEventList from './pages/NexusEventList';
import MembersListPage from './pages/MembersListPage';
import EventDetailPage from './pages/EventDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import NavBar from './NavBar';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
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
          <p> &copy; Copyright TVA &infin; &infin;</p>
        </footer>
      </div>
    </Router>
    
  );
}

export default App;
