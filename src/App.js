import './App.css';
import HomePage from './pages/HomePage/HomePage';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import SearchPage from './pages/SearchPage/SearchPage';
import DetailPage from './pages/DetailPage/DetailPage';
import FavoritePage from './pages/FavoritePage/FavoritePage';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-dark bg-dark justify-content-between">
          <div className="container">
            <Link to="/" className="navbar-brand">J-WeatherApp</Link>
            <div className="nav-item dropdown">
              <Link to="#" className="nav-link dropdown-toggle text-muted" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Menu
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <Link to="/" className="dropdown-item">Home</Link>
                <Link to="/search" className="dropdown-item">Search</Link>
                <Link to="/favorite" className="dropdown-item">Favorites</Link>
              </div>
            </div>
          </div>
          
        </nav>

        <Switch>
          <Route path="/detail/:id">
            <DetailPage />
          </Route>
          <Route path="/search">
            <SearchPage/>
          </Route>
          <Route path="/favorite">
            <FavoritePage/>
          </Route>
          <Route path="/">
            <HomePage/>
          </Route>
        </Switch>
        <nav className="navbar navbar-dark bg-secondary fixed-bottom mt-3">
            <div className="container">
                <div className="navbar-brand">
                    © 2021 | LC035 - Jevon Levin
                </div>
            </div>
        </nav>
      </div>
    </Router>
  );
}

export default App;

