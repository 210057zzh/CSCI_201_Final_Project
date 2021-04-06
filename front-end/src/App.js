import './css/App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import Discover from './components/Discover';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/Discover' component={Discover}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
