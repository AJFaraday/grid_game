# Web sockets

## How to

Start server.rb
Open a web socket to port 8080
Include a grid_game attribute to store useful data

```javascript
s = new WebSocket('ws://0.0.0.0:8080?config=lefttwix');
s.grid_game = {};
```

## Initial attributes

When opening the websocket include this:

* config - relates to a configuration in config/game_configs.yml
  * Players will only join a game which matches the config

## Actions Down

### join

Meaning:
The player has joined a game, and is assigned a player.
This is run when a player first connects

Attributes:
* action - always "join"
* player - the assigned player
* status - is it time to start the game yet? (waiting or start)

Example:
```json
{
  "action": "join",
  "player": "green",
  "status": "waiting"
}
```

### left

Meaning:
A player has left the game.
Sent in response to a player leaving.

Attributes:
* action - always "left"
* player - the player who bailed

Example:
```json
{
  "action": "left",
  "player": "green"
}
```

### stop

Meaning:
No more other players remain, stop the game.

Attributes:
* action - always "stop"

Example:
```json
{"action": "stop"}
```

### direction

Meaning: 
A player has changed direction

Attributes:
* action - always "direction"
* player - Which player has changed direction
* direction - Which way (north, south, east, west)

Example:
```json
{
  "action": "direction",
  "player": "green",
  "direction": "north"
}
```

_Note:_ this is also an action up, sent up exactly the way it came down.


