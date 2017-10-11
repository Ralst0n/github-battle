var React = require('react');
var PropTypes = require('prop-types')
var api = require('../utils/api');
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

function RepoGrid(props) {
  return(
    <ul className='popular-list'>
    {
      props.repos.map( (repo, i) =>{
        return( <RepoItem
                  key= {repo.name}
                  name={repo.name}
                  repo={repo}
                  index={i + 1}
                  /> )
      })
    }
    </ul>
  )
}

RepoGrid.PropTypes = {
  repos: PropTypes.array.isRequired
}
function RepoItem(props) {
  return(
    <li className='popular-item'>
      <div className='popular-rank'>#{props.index}</div>
      <ul className='space-list-items'>
        <li>
          <img className='avatar'
          src={props.repo.owner.avatar_url}
          alt={`Avatar for ${props.repo.owner.login}`} />
        </li>
        <li>
          <a href={props.repo.html_url}>{props.name}</a>
        </li>
        <li>@{props.repo.owner.login}</li>
        <li>{props.repo.stargazers_count} stars</li>
      </ul>
    </li>
  )
}
class Popular extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null,
    };
    this.updateLanguage = this.updateLanguage.bind(this);
  }
  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage)
  }
  updateLanguage(lang) {
    this.setState({
      selectedLanguage: lang,
      repos: []
    })

    api.fetchPopularRepos(lang)
      .then( (repos) => {
        this.setState({
          repos: repos
        })
      })
  }
  render() {

    return(
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect = {this.updateLanguage} />
        {!this.state.repos
          ? <p>LOADING</p> :
        <RepoGrid
          repos = {this.state.repos} />
        }
      </div>
    )
  }
}

module.exports = Popular;
