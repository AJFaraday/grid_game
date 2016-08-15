# Grid Game

That's right, there's no particular concept to it yet.

## How to play

* Download the git repository from https://github.com/ajfaraday/grid_game
* Open index.html in a browser  

## What is the game?

* The game is played on a square grid.
* Each player starts with one city, cities have 10 health.
* Each players army marches in one direction at any one time.
* On periodical turns, every city sends one soldier in their players directionn.
* Every turn, each soldier takes one step in its players direction.
* When a soldier hits an obstacle, they stop.
* When allied soldiers meet, they team up.
* When 10 soldiers team up, they form a city.
* Every turn, each soldier does one damage to each of its non-alied units or cities.
* One damage is enough to kill one soldier, or one tenth of a city.
* The game ends when only one player remains on the map.

## Files

* index.html - starting point
* lib/grid_game.js - starting point (javascript)
* lib/external - external libraries used
* lib/data - bits of js data/config
* lib/classes - constructors
* lib/turn_phases - additions to /lib/classes/tile.js for specifc phases of turns
* style/grid_game.css - The styling information.