GistCache = {

  init: function() {
    GridGame.gist_cache = {
      "808c86eb544d9efaf94a30efc91bdfaf": "if ((api.turn() % 2) == 0) {\n  api.towardsY();\n} else {\n  api.towardsX();\n}",
      "d9eb9a70ad0dc0fb1885be0fce032adc": "// Named for Alan Faraday, elder brother of game creator.\nif (api.turn() < 30) {\n  api.awayY();\n} else if (api.turn() < 60) {\n  api.awayX();\n} else {\n  if (api.turn() % 54 < 27) {\n    api.towardsY();\n  } else {\n    api.towardsX(); \n  }\n}",
      "b9a0fe99060d9be1fc617bb7262f57be": "if((api.turn() % 10) == 0) {\n  directions = ['towardsY', 'towardsX', 'awayY', 'awayX'];\n  dir = Math.floor(Math.random() * 4);\n  api[directions[dir]]();\n}",
      "6634a7f381bb679ee7c2d90d93588d66": "if (typeof this.n === 'undefined') { \n  this.n = 0;\n} else {\n  this.n = (this.n + 1) % 4\n}\nif((api.turn() % 3) == 0) {\n  directions = ['towardsY', 'towardsX', 'awayY', 'awayX'];\n  api[directions[this.n]]();\n}",
      "b16df33acb0f0c7830d2ca2d656f80be": "directions = ['towardsY', 'towardsX', 'awayY', 'awayX'];\ndir = Math.floor(Math.random() * 4);\napi[directions[dir]]();\n"
    }
  }
  
};
