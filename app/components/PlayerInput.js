var React = require('react');

class PlayerInput extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e) {
    this.setState({ username: e.target.value })
  }

  render() {
    return(
      <form className="column">
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
          type='button'
          onSubmit={this.props.onSubmit} />
      </form>
    )
  }
}
PlayerInput.PropTypes = {
  id: PropType.string.isRequired;
  label: PropType.string.isRequired;
  onSubmit: PropType.func.isRequired;
}

module.exports = PlayerInput;
