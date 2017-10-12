var axios = require('axios');

var id = 'YOUR_ID';
var secret = 'YOUR_SECRET_SHHH';
var params = `?client_id=${id}&client_secret=${secret}`;

function getProfile (username) {
  return axios.get(`https://api.github.com/users/${username}${params}`)
  //axios .get will return a promise --might be an object with a .then property?
  .then( (user) =>{
    //then function does a function only when the gets the information back
    return user.data;
    //in the return we formated the datato justt send back data
  })
}

function getRepos(username) {
  return axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
}

function getStarCount(repos) {
  return repos.data.reduce( (count, repo) =>{
    return count + repo.stargazers_count;
  }, 0);
}

function calculateScore(profile, repos) {
  const followers = profile.followers;
  const totalStars = getStarCount(repos);
  const bonusPoints = profile.login.split('').filter( (letter) => letter === '0'|| letter === 'R').length * 4500
  return ((followers * 3) + totalStars + bonusPoints);
}

function handleError(error) {
  console.warn(error);
  return null;
}

function getUserData(player) {
  //takes an array of promises
  return axios.all([
    getProfile(player),
    getRepos(player)
  ]).then((data) =>{
    const profile = data[0];
    const repos = data[1]

    return {
      profile: profile,
      score: calculateScore(profile, repos)
    }
  })
}

function sortPlayers (players) {
  return players.sort( (a,b) => {
    return b.score - a.score;
  })
}
module.exports = {
  battle: (players) => {
    //axios.all takes an array of promises. create that array
    //using map
    return axios.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError)
  },
  fetchPopularRepos: (language) => {
    var encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);

  return axios.get(encodedURI)
    .then( response => {
      return response.data.items;
  });
  }
}
