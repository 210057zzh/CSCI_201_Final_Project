import './css/App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Discover from './components/Discover';
import AuthContextProvider from './components/contexts/authContext'
import BusinessPage from './components/BusinessPage'
import Dashboard from './components/Dashboard'

function App() {

  return (
    <div className="App">
      <AuthContextProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route exact path ='/Discover' component={Discover}></Route>
            <Route exact path ='/BusinessPage/:businessName' component={BusinessPage}></Route>
            <Route exacth path ='/dashboard' component ={Dashboard}></Route>
          </Switch>
        </BrowserRouter>
      </AuthContextProvider>

    </div>
  );
}

export default App;
