var React = require('react');
var NavLink = require('react-router-dom').NavLink;
//NavLink lets you dynamically change the style of active anchor
//just to render anchor you can use just Link rather than NavLink
function Nav () {
  return(
    <ul className='nav'>
      <li>
        <NavLink exact activeClassName='active' to='/'>
        Home
        </NavLink>
      </li>

      <li>
        <NavLink activeClassName='active' to='/battle'>
        Battle
        </NavLink>
      </li>

      <li>
        <NavLink activeClassName='active' to='/popular'>
        Popular
        </NavLink>
      </li>
    </ul>
  )
}

module.exports = Nav;
