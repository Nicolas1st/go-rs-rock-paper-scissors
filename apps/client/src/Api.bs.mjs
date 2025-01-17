// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Env from "./Env.bs.mjs";
import * as Game from "./entities/Game.bs.mjs";
import * as Rest from "rescript-rest/src/Rest.bs.mjs";
import * as Nickname from "./entities/Nickname.bs.mjs";
import * as Core__Int from "@rescript/core/src/Core__Int.bs.mjs";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as S$RescriptSchema from "rescript-schema/src/S.bs.mjs";

var nickname = S$RescriptSchema.transform(S$RescriptSchema.string, (function (s) {
        return {
                p: (function (string) {
                    var nickname = Nickname.fromString(string);
                    if (nickname !== undefined) {
                      return Caml_option.valFromOption(nickname);
                    } else {
                      return s.fail("Invalid nickname. (" + string + ")", undefined);
                    }
                  }),
                s: Nickname.toString
              };
      }));

var code = S$RescriptSchema.transform(S$RescriptSchema.$$int, (function (s) {
        return {
                p: (function ($$int) {
                    var gameCode = Game.Code.fromString($$int.toString());
                    if (gameCode !== undefined) {
                      return Caml_option.valFromOption(gameCode);
                    } else {
                      return s.fail("Invalid game code. (" + $$int + ")", undefined);
                    }
                  }),
                s: (function (value) {
                    var $$int = Core__Int.fromString(Game.Code.toString(value), undefined);
                    if ($$int !== undefined) {
                      return $$int;
                    } else {
                      return s.fail("Invalid game code.", undefined);
                    }
                  })
              };
      }));

var move = S$RescriptSchema.union([
      S$RescriptSchema.to(S$RescriptSchema.literal("rock"), (function (param) {
              return "Rock";
            })),
      S$RescriptSchema.to(S$RescriptSchema.literal("paper"), (function (param) {
              return "Paper";
            })),
      S$RescriptSchema.to(S$RescriptSchema.literal("scissors"), (function (param) {
              return "Scissors";
            }))
    ]);

var outcome = S$RescriptSchema.union([
      S$RescriptSchema.to(S$RescriptSchema.literal("win"), (function (param) {
              return "Win";
            })),
      S$RescriptSchema.to(S$RescriptSchema.literal("draw"), (function (param) {
              return "Draw";
            })),
      S$RescriptSchema.to(S$RescriptSchema.literal("loss"), (function (param) {
              return "Loss";
            }))
    ]);

var client = Rest.client(Env.apiUrl, undefined, undefined);

function make() {
  var route = function () {
    return {
            method: "POST",
            path: "/game",
            variables: (function (s) {
                return {
                        nickname: s.field("userName", nickname)
                      };
              }),
            responses: [(function (s) {
                  s.status(200);
                  return {
                          gameCode: s.field("gameCode", code)
                        };
                })]
          };
  };
  return function (variables) {
    return client.call(route, variables);
  };
}

var CreateGame = {
  make: make
};

function make$1() {
  var route = function () {
    return {
            method: "POST",
            path: "/game/connection",
            variables: (function (s) {
                return {
                        nickname: s.field("userName", nickname),
                        gameCode: s.field("gameCode", code)
                      };
              }),
            responses: [(function (s) {
                  s.status(204);
                })]
          };
  };
  return function (variables) {
    return client.call(route, variables);
  };
}

var JoinGame = {
  make: make$1
};

function make$2() {
  var route = function () {
    return {
            method: "POST",
            path: "/game/status",
            variables: (function (s) {
                return {
                        nickname: s.field("userName", nickname),
                        gameCode: s.field("gameCode", code)
                      };
              }),
            responses: [(function (s) {
                  s.status(200);
                  return s.data(S$RescriptSchema.union([
                                  S$RescriptSchema.object(function (s) {
                                        s.tag("status", "waiting");
                                        return "WaitingForOpponentJoin";
                                      }),
                                  S$RescriptSchema.object(function (s) {
                                        s.tag("status", "inProcess");
                                        return "InProgress";
                                      }),
                                  S$RescriptSchema.object(function (s) {
                                        s.tag("status", "finished");
                                        return s.f("gameResult", S$RescriptSchema.object(function (s) {
                                                        return {
                                                                TAG: "Finished",
                                                                _0: {
                                                                  outcome: s.f("outcome", outcome),
                                                                  yourMove: s.f("yourMove", move),
                                                                  opponentsMove: s.f("opponentsMove", move)
                                                                }
                                                              };
                                                      }));
                                      })
                                ]));
                })]
          };
  };
  return function (variables) {
    return client.call(route, variables);
  };
}

var RequestGameStatus = {
  make: make$2
};

function make$3() {
  var route = function () {
    return {
            method: "POST",
            path: "/game/move",
            variables: (function (s) {
                return {
                        nickname: s.field("userName", nickname),
                        gameCode: s.field("gameCode", code),
                        yourMove: s.field("move", move)
                      };
              }),
            responses: [(function (s) {
                  s.status(204);
                })]
          };
  };
  return function (variables) {
    return client.call(route, variables);
  };
}

var SendMove = {
  make: make$3
};

export {
  CreateGame ,
  JoinGame ,
  RequestGameStatus ,
  SendMove ,
}
/* nickname Not a pure module */
