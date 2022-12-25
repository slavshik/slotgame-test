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

# Key design decisions made
Both the client and the server has their own configs:
- `client-config.json` and `server-config.json` respectively.
- Both configs contain predefined `tapes` - the array of possible values.
- For debugging purposes human-readable response from the server shown in the console.
# Known limitations of your solution
- Bonus request goes to different route `spin/bonus` but does the same as a regular spin.
- Wild symbol treated as a regular symbol.
- Stop positions after deceleration adjusted with gsap animation.