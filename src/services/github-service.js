import axios from "axios";
import DateCounter from "./date-counter";
var _ = require("lodash");

let githubPrefix = "https://api.github.com/";
let reposUrl = username => `${githubPrefix}users/${username}/repos`;
let commitsUrl = (owner, reponame, author) =>
  `${githubPrefix}repos/${owner}/${reponame}/commits?author=${author}`;

function getData(response) {
  return response.data;
}
function logError(error) {
  console.log(error);
}

function getRepos(username) {
  return axios
    .get(reposUrl(username))
    .then(response => response.data)
    .catch(error => console.log(error));
}

function getCommitsFromRepo(repo, username) {
  let owner = repo.owner.login;
  let name = repo.name;

  return axios
    .get(commitsUrl(owner, name, username))
    .then(getData)
    .catch(logError);
}

function getDateFromCommit(commit) {
  return commit.commit.committer.date;
}

function load(username) {
  let dateCounter = new DateCounter();
  return getRepos(username)
    .then(repos => {
      let commitsFromAllRepo = repos.map(repo =>
        getCommitsFromRepo(repo, username)
      );
      return _.flattern(commitsFromAllRepo);
    })
    .then(commits => {
      dateCounter.saveStringArray(commits.map(getDateFromCommit));
      return dateCounter;
    });
}

load("yiochen").then(dateCounter => dateCounter.sequence.entries());

export default {
  getRepos
};
