var React = require('react');
var PropTypes = require('prop-types')
var Link = require('react-router-dom').Link
function PlayerPreview(props) {
  return(
    <div>
      <div className='column'>
        <img
          className='avatar'
          src={props.avatar}
          alt={`Avatar for ${props.username}`}/>
        <h2 className='username'>@{props.username}</h2>
        </div>
        <button
          className='reset'
          onClick={props.onReset.bind(null, props.id)}>
          reset</button>
    </div>
  )
}

PlayerPreview.PropTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
}
class PlayerInput extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(e) {
    this.setState({ username: e.target.value })
  }
  handleSubmit(e) {
    e.preventDefault();

    this.props.onSubmit(this.props.id, this.state.username)
  }

  render() {
    return(
      <form className="column"
      onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>
          {this.props.label}
        </label>
        <input
          id='username'
          placeholder='github username'
          type='text'
          autoComplete='off'
          value={this.state.username}
          onChange={this.handleChange} />
        <input
          type='submit'
          value='Submit'
          disabled={!this.state.username}
           />
      </form>
    )
  }
}
PlayerInput.PropTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

class Battle extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }
  handleSubmit(id, username) {

    this.setState({
      [id + 'Name']: username,
      [id + 'Image']: `https://github.com/${username}.png?size=200`
    })
  }
  handleReset(id) {
    this.setState({
      [id+'Name']: '',
      [id + 'Image']: null
    })
  }
  render(){
    const match = this.props.match
    const playerOneName = this.state.playerOneName;
    const playerTwoName = this.state.playerTwoName;
    const playerOneImage = this.state.playerOneImage;
    const playerTwoImage = this.state.playerTwoImage;
    return(
      <div>
        <div className='row'>
        {
          !playerOneName &&
          <PlayerInput
            id='playerOne'
            label='Player One'
            onSubmit={this.handleSubmit}/>
        }
        {
          playerOneImage !== null &&
          <PlayerPreview
            avatar={playerOneImage}
            id='playerOne'
            username={playerOneName}
            onReset={this.handleReset} />
        }
        {
          playerTwoImage !== null &&
          <PlayerPreview
            avatar={playerTwoImage}
            id='playerTwo'
            username={playerTwoName}
            onReset={this.handleReset} />
        }
        {
          !playerTwoName &&
          <PlayerInput
            id='playerTwo'
            label='Player Two'
            onSubmit={this.handleSubmit}/>
        }

        </div>
        {
          playerTwoImage && playerOneImage &&
          <Link
            className='button'
            to={{
              pathname: `${match.url}/results`,
              search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
            }}>
            Battle
          </Link>
        }
      </div>
    )
  }
}

module.exports = Battle;
