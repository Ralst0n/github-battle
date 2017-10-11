var React = require('react');
var PropTypes = require('prop-types')

function SelectLanguage(props) {
  const languages = ['All', 'Javascript', 'Ruby','Java', 'CSS','Python'];

  return(
  <ul className='languages'>
  {
    languages.map( (language) => {
      return(
        <li
          style={
            language === props.selectedLanguage ? { color: '#d0021b'} : null
          }
          key={language}
          onClick={props.onSelect.bind(null, language)}>
          {language}
        </li>
      )
    })
  }
  </ul>
)
}

SelectLanguage.PropTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

class Popular extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selectedLanguage: 'All',
    };
    this.updateLanguage = this.updateLanguage.bind(this);
  }
  updateLanguage(lang) {
    this.setState({
      selectedLanguage: lang
    })
  }
  render() {

    return(
      <div>
      <SelectLanguage
        selectedLanguage={this.state.selectedLanguage}
        onSelect = {this.updateLanguage} />
      </div>
    )
  }
}

module.exports = Popular;
