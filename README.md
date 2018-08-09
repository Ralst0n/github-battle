# github-battle

github-battle is my implementation of a tutorial react app for comparing 2 Github repos against eachother.

This single page application uses react-router to navigate between the Home Battle and Popular components

# The Battle component

takes two input fields and returns the github repo associated with the user name. Each one makes an ajax request to the github api for the given repo.
Once both are rendered the user has the option to press the battle button and have the two repos compete. THe repos are compared on followers, following and number of repos.

# Popular

Popular queries for the most popular, by star count repos, from the Github api and shows a list item for each one that provides the ranking
as well as a link to the repo.
