import './css/App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Discover from './components/Discover';
import AuthContextProvider from './components/contexts/authContext'


function App() {

  return (
    <div className="App">
      <AuthContextProvider>
        <BrowserRouter>
          <Switch>
            {/* <Route exact path='/'
              render={(props) => <Home {...props} LoginStatus={LoginStatus} toggleLoginStatusOn={toggleLoginStatusOn} toggleLoginStatusOff={toggleLoginStatusOff} />}
            ></Route> */}
            <Route exact path='/' component={Home}></Route>
            {/* <Route exact path='/Discover'
              render={(props) => <Discover {...props} LoginStatus={LoginStatus} toggleLoginStatusOn={toggleLoginStatusOn} toggleLoginStatusOff={toggleLoginStatusOff} />}
            ></Route> */}
            <Route exact path ='/Discover' component={Discover}></Route>
          </Switch>
        </BrowserRouter>
      </AuthContextProvider>

    </div>
  );
}

export default App;
