var React = require('react');
var PropTypes = require('prop-types')
var Link = require('react-router-dom').Link
var PlayerPreview = require('./PlayerPreview')

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
            username={playerOneName}>
            <button
              className='reset'
              onClick={this.handleReset.bind(null, 'playerOne')}>
              reset</button>
          </PlayerPreview>
        }
        {
          playerTwoImage !== null &&
          <PlayerPreview
            avatar={playerTwoImage}
            username={playerTwoName}>
            <button
              className='reset'
              onClick={this.handleReset.bind(null, 'playerTwo')}>
              reset</button>
          </PlayerPreview>
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
