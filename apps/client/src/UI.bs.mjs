// Generated by ReScript, PLEASE EDIT WITH CARE

import * as ResultX from "./utils/ResultX.bs.mjs";
import * as Inquirer from "inquirer";

function make(strings) {
  return strings.join("\n");
}

var MultilineText = {
  make: make
};

function message(string) {
  console.clear();
  console.log(string);
}

var _promptName = "promptName";

function prompt(message, parser) {
  return Inquirer.default.prompt([{
                  type: "input",
                  name: _promptName,
                  message: message,
                  validate: (function (input) {
                      var message = parser(input);
                      if (message.TAG === "Ok") {
                        return true;
                      } else {
                        return message._0;
                      }
                    })
                }]).then(function (answer) {
              return ResultX.getExnWithMessage(parser(answer[_promptName]), "Must be already validated by the validate function.");
            });
}

function make$1(name, value) {
  return {
          name: name,
          value: value
        };
}

var Choice = {
  make: make$1
};

function prompt$1(message, choices) {
  return Inquirer.default.prompt([{
                  type: "list",
                  name: _promptName,
                  message: message,
                  choices: choices
                }]).then(function (answer) {
              return answer[_promptName];
            });
}

var Input = {
  prompt: prompt
};

var List = {
  Choice: Choice,
  prompt: prompt$1
};

export {
  MultilineText ,
  message ,
  Input ,
  List ,
}
/* inquirer Not a pure module */
