// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Env from "./Env.bs.mjs";
import * as Game from "./entities/Game.bs.mjs";
import * as Undici from "undici";
import * as Nickname from "./entities/Nickname.bs.mjs";
import * as Stdlib_Int from "@dzakh/rescript-stdlib/src/Stdlib_Int.bs.mjs";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as Stdlib_Option from "@dzakh/rescript-stdlib/src/Stdlib_Option.bs.mjs";
import * as Stdlib_Promise from "@dzakh/rescript-stdlib/src/Stdlib_Promise.bs.mjs";
import * as S$ReScriptStruct from "rescript-struct/src/S.bs.mjs";

function make(path, method, inputStruct, dataStruct) {
  return function (input) {
    var options_body = Stdlib_Option.getExnWithMessage(JSON.stringify(S$ReScriptStruct.Result.getExn(S$ReScriptStruct.serializeWith(input, inputStruct))), "Failed to serialize input to JSON for the \"" + method + "\" request to \"" + path + "\".");
    var options = {
      method: method,
      body: options_body
    };
    return Stdlib_Promise.then(Undici.request("" + Env.apiUrl + "" + path + "", options), (function (response) {
                    var contentLength = Stdlib_Option.getWithDefault(Stdlib_Option.flatMap(response.headers["content-length"], Stdlib_Int.fromString), 0);
                    if (contentLength === 0) {
                      return Promise.resolve(undefined);
                    } else {
                      return response.body.json();
                    }
                  })).then(function (unknown) {
                return S$ReScriptStruct.Result.getExn(S$ReScriptStruct.parseWith(unknown, dataStruct));
              });
  };
}

var nickname = S$ReScriptStruct.transform(S$ReScriptStruct.string(undefined), (function (string) {
        var nickname = Nickname.fromString(string);
        if (nickname !== undefined) {
          return Caml_option.valFromOption(nickname);
        } else {
          return S$ReScriptStruct.$$Error.raise("Invalid nickname. (" + string + ")");
        }
      }), Nickname.toString, undefined);

var code = S$ReScriptStruct.transform(S$ReScriptStruct.$$int(undefined), (function ($$int) {
        var gameCode = Game.Code.fromString($$int.toString());
        if (gameCode !== undefined) {
          return Caml_option.valFromOption(gameCode);
        } else {
          return S$ReScriptStruct.$$Error.raise("Invalid game code. (" + $$int + ")");
        }
      }), (function (value) {
        var $$int = Stdlib_Int.fromString(Game.Code.toString(value));
        if ($$int !== undefined) {
          return $$int;
        } else {
          return S$ReScriptStruct.$$Error.raise("Invalid game code.");
        }
      }), undefined);

var move = S$ReScriptStruct.union([
      S$ReScriptStruct.literalVariant({
            TAG: /* String */0,
            _0: "rock"
          }, /* Rock */0),
      S$ReScriptStruct.literalVariant({
            TAG: /* String */0,
            _0: "paper"
          }, /* Paper */2),
      S$ReScriptStruct.literalVariant({
            TAG: /* String */0,
            _0: "scissors"
          }, /* Scissors */1)
    ]);

var outcome = S$ReScriptStruct.union([
      S$ReScriptStruct.literalVariant({
            TAG: /* String */0,
            _0: "win"
          }, /* Win */1),
      S$ReScriptStruct.literalVariant({
            TAG: /* String */0,
            _0: "draw"
          }, /* Draw */0),
      S$ReScriptStruct.literalVariant({
            TAG: /* String */0,
            _0: "loss"
          }, /* Loss */2)
    ]);

function make$1(param) {
  return make("/game", "POST", S$ReScriptStruct.object(function (o) {
                  return {
                          nickname: S$ReScriptStruct.field(o, "userName", nickname)
                        };
                }), S$ReScriptStruct.object(function (o) {
                  return {
                          gameCode: S$ReScriptStruct.field(o, "gameCode", code)
                        };
                }));
}

var CreateGame = {
  make: make$1
};

function make$2(param) {
  return make("/game/connection", "POST", S$ReScriptStruct.object(function (o) {
                  return {
                          nickname: S$ReScriptStruct.field(o, "userName", nickname),
                          gameCode: S$ReScriptStruct.field(o, "gameCode", code)
                        };
                }), S$ReScriptStruct.literal(/* EmptyOption */1));
}

var JoinGame = {
  make: make$2
};

function make$3(param) {
  return make("/game/status", "POST", S$ReScriptStruct.object(function (o) {
                  return {
                          nickname: S$ReScriptStruct.field(o, "userName", nickname),
                          gameCode: S$ReScriptStruct.field(o, "gameCode", code)
                        };
                }), S$ReScriptStruct.union([
                  S$ReScriptStruct.object(function (o) {
                        S$ReScriptStruct.discriminant(o, "status", S$ReScriptStruct.literal({
                                  TAG: /* String */0,
                                  _0: "waiting"
                                }));
                        return /* WaitingForOpponentJoin */0;
                      }),
                  S$ReScriptStruct.object(function (o) {
                        S$ReScriptStruct.discriminant(o, "status", S$ReScriptStruct.literal({
                                  TAG: /* String */0,
                                  _0: "inProcess"
                                }));
                        return /* InProgress */1;
                      }),
                  S$ReScriptStruct.object(function (o) {
                        S$ReScriptStruct.discriminant(o, "status", S$ReScriptStruct.literal({
                                  TAG: /* String */0,
                                  _0: "finished"
                                }));
                        return S$ReScriptStruct.field(o, "gameResult", S$ReScriptStruct.object(function (o) {
                                        return /* Finished */{
                                                _0: {
                                                  outcome: S$ReScriptStruct.field(o, "outcome", outcome),
                                                  yourMove: S$ReScriptStruct.field(o, "yourMove", move),
                                                  opponentsMove: S$ReScriptStruct.field(o, "opponentsMove", move)
                                                }
                                              };
                                      }));
                      })
                ]));
}

var RequestGameStatus = {
  make: make$3
};

function make$4(param) {
  return make("/game/move", "POST", S$ReScriptStruct.object(function (o) {
                  return {
                          nickname: S$ReScriptStruct.field(o, "userName", nickname),
                          gameCode: S$ReScriptStruct.field(o, "gameCode", code),
                          yourMove: S$ReScriptStruct.field(o, "move", move)
                        };
                }), S$ReScriptStruct.literal(/* EmptyOption */1));
}

var SendMove = {
  make: make$4
};

export {
  CreateGame ,
  JoinGame ,
  RequestGameStatus ,
  SendMove ,
}
/* nickname Not a pure module */
