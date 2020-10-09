# Geography quiz
(JavaScript, Node.js, Express.js, Socket.io, Firebase, Bootstrap 4)

This is the geography [quiz web app](http://zanimljiva-geografija-003.projekti.itbootcamp.rs/). The goal of the game is to guess a term based on a randomly generated letter for each of the seven categories.
The points are given to the player only if the used terms are in the database.

![screenshotGeo](https://user-images.githubusercontent.com/61547500/88486202-61af6380-cf7c-11ea-9eef-cc61d0da1905.png)

## Functionalities:
- Adding new terms to the database
- Player vs. pc
- Player vs. player
- High score list
- Hall of fame list(shows which users added the most terms)

High score and hall of fame are curently disabled because of Firebase quotas and limits.

Make sure Node.js is installed.

## Install dependencies:
```
npm install
npm install express@4.15.2
npm install socket.io
```
## Run Express from server folder:
```
npm run dev
```

## App Info

This app is part of the [IT Bootcamp](https://itbootcamp.rs/) project "Ojačavanje".

[IT Bootcamp](https://itbootcamp.rs/) generously provided hosting for this project.
