import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.scss';

// Before login component imported here
import Login from './components/Login/Login';
import Register from './components/Login/Register';

// After login component imported here
import MainFrame from './components/Mainframe/MainFrame';
import Dashboard from './components/Dashboard/Dashboard';
import createBrowserHistory from 'history/createBrowserHistory'

export const history = createBrowserHistory({forceRefresh:true});


const App = (props) => {
	const user =  JSON.parse(sessionStorage.getItem('user'))
	return (
		<Router {...props}  history={history}>
			<Switch>
				{
					user ?
					<MainFrame 
					  {...props}
					>
						<Switch>
							<Route path="/dashboard" exact render={(props)=><Dashboard {...props}/>} />
						</Switch>
					</MainFrame> :
					<>

						<Route path="/" exact render={(props)=><Login {...props}/>} />
						<Route path="/register" exact render={(props)=><Register {...props}/>} />

					</>
				}
			</Switch>
		</Router>
	);
}

export default App;
