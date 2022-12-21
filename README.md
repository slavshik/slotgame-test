<img src="https://www.evolution.com/profiles/evolutiongaming/themes/evolutiongaming/logooneline.svg" alt="drawing" width="200"/>

# Game Developer Test 

# Prerequisites

- Install [Node.js](https://nodejs.org/) version >16.9.1

# Getting Started

- Install dependencies

```
npm install
```

- Run the project

```
npm run start
```

The client is accessible here: Navigate to `http://localhost:1234`. 

The server is listening on port 3000, you can use a rest client to test it: `http://localhost:3000/spin`

Both projects will hot reload on any code change.

# Task
The task is to write a small application, which you will then share with us for code review, a practice that is heavily utilized in NetEnt - Evolution.
The general principles by which the application will be evaluated are readability, reusability, and maintainability. Having unit test is a nice to have bonus. 
Your task is to build a small slot game based on the existing basic setup found in `public` and `src`. 

> Please check the NetEnt website for some great examples. [NetEnt Games](https:\\games.netent.com)

## Specifications
The application has the follow requirements
* TypeScript
* Server should be a Node.js App
* React, Angular or similar is not allowed. 
* Express is allowed
* webGL rendering libraries are allowed, e.g. PixiJS, Phaser, babylon.js, etc.

### Client
* Game slot UI with 3 reels and one symbol peer reel
* Game slot UI should have a spin button
* Perform an outcome request to the server
* Display the result returned by the server using the provided graphical resources
* Display the Win type
* Support the Bonus feature

### Server
* Receives a POST request from client and returns the game outcome
* The outcome should be three random integers between 0-5, the win type and if bonus round was won
* Support Bonus feature, should have a win rate of 10%

### Win type
* Three types of win types: No Win, Small Win and Big Win
* Two equal integers constitute a Small Win
* Three equal integers constitute a Big Win
* Any other outcome constitutes a No Win

### Bonus feature
* The Bonus rewards the player with a free request
* The server should return whether the feature is triggered or not along with the regular response, chance of winning a bonus round is 10%
* The client should present the regular result returned, then if the feature is triggered, perform a new request without any user input
* A bonus round can be won in any game round, e.g. you can win a bonus round while playing a bonus round


## Submission process

Please including a concise `ReadMe.md` file with the following:
* Known limitations of your solution
* Key design decisions made, especially if you considered multiple options
* How to launch the solution.

We do not require the documentation to be verbose or lengthy - short descriptions are acceptable, and details
can be discussed on the interview.

If anything in the task description is unclear, or you encounter any problems, please do not hesitate to ask.
## License

At CodeScreen, we strongly value the integrity and privacy of our assessments. As a result, this repository is under exclusive copyright, which means you **do not** have permission to share your solution to this test publicly (i.e., inside a public GitHub/GitLab repo, on Reddit, etc.). <br>

## Submitting your solution

Please push your changes to the `main branch` of this repository. You can push one or more commits. <br>

Once you are finished with the task, please click the `Submit Solution` link on <a href="https://app.codescreen.com/candidate/fb17b924-19e3-48e8-8081-120d9be5262a" target="_blank">this screen</a>.