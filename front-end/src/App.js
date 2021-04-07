import './css/App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import { useState } from 'react';

function App() {

  const [LoginStatus, setLoginStatus] = useState(false);
  function toggleLoginStatusOn() {
    setLoginStatus(true);
  }
  function toggleLoginStatusOff() {
    setLoginStatus(false);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/'
            render={(props) => <Home {...props} LoginStatus={LoginStatus} toggleLoginStatusOn={toggleLoginStatusOn} toggleLoginStatusOff={toggleLoginStatusOff} />}
          ></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
