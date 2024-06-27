// Generated by ReScript, PLEASE EDIT WITH CARE


function make(reducer, initialState) {
  return {
          reducer: reducer,
          initialState: initialState
        };
}

function transition(machine, state, $$event) {
  return machine.reducer(state, $$event);
}

function getInitialState(machine) {
  return machine.initialState;
}

function interpret(machine) {
  return {
          fsm: machine,
          state: machine.initialState,
          isStarted: false,
          subscribtionSet: new Set()
        };
}

function send(service, $$event) {
  if (!service.isStarted) {
    return ;
  }
  var newState = transition(service.fsm, service.state, $$event);
  if (newState !== service.state) {
    service.state = newState;
    service.subscribtionSet.forEach(function (fn) {
          fn(newState);
        });
    return ;
  }
  
}

function subscribe(service, fn) {
  service.subscribtionSet.add(fn);
  return function () {
    service.subscribtionSet.delete(fn);
  };
}

function getCurrentState(service) {
  return service.state;
}

function start(service) {
  service.isStarted = true;
}

function stop(service) {
  service.subscribtionSet.clear();
  service.isStarted = false;
}

export {
  make ,
  transition ,
  getInitialState ,
  interpret ,
  send ,
  subscribe ,
  getCurrentState ,
  start ,
  stop ,
}
/* No side effect */