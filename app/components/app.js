var React = require('react');
var Popular = require('./Popular');
var ReactRouter = require('react-router-dom')
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Nav = require('./nav');
var Home = require('./Home');
var Battle = require('./Battle');
var Switch = ReactRouter.Switch;

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
            <Nav />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/battle' component={Battle} />
              <Route path='/popular' component={Popular} />
              <Route render={ () => {
                return <p> Not Found</p>
              }} />
            </Switch>
        </div>
      </Router>

    )
  }
}

module.exports = App;
