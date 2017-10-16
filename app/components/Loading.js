const React = require('react');
const PropTypes = require('prop-types');

const styles = {
content: {
  textAlign : 'center',
  fontSize : '35'
  }
}
class Loading extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      text: props.text
    }
  }
  componentDidMount() {
    console.log('do me baby!!')
    const stopper = this.props.text + '...';
    this.interval = window.setInterval(() => {
      if (this.state.text === stopper) {
        this.setState({ text: this.props.text })
      }
      this.setState( (prevState) => {
        return {
          text: prevState.text + '.'
        }
      });
    }, this.props.speed)

  }
  componentWillUnmount() {
    console.log('CLEAR ME!!!')
    window.clearInterval(this.interval);
  }
  render(){
    return(
      <p style={styles.content}>
      this.state.text
      </p>
    )
  }
}
Loading.defaultProps = {
  text: 'Loading',
  speed: 300
}
Loading.PropTypes = {
  text: PropTypes.string.isRequired,

}

module.exports = Loading;
