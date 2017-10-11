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

    )
  }
}
PlayerInput.PropTypes = {
  id: PropType.string.isRequired;
  label: PropType.string.isRequired;
  onSubmit: PropType.func.isRequired;
}
