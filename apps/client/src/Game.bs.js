'use strict';


function validate(self) {
  return self.trim() !== "";
}

var Code = {
  validate: validate
};

exports.Code = Code;
/* No side effect */
