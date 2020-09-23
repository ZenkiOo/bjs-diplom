"use strict";

const userForm = new UserForm();

// *** Authorization ***
userForm.loginFormCallback = (data) => {
  ApiConnector.login(data, (response) =>
    response.success
      ? location.reload()
      : userForm.setLoginErrorMessage(response.error)
  );
};

// *** Registration ***
userForm.registerFormCallback = (data) => {
  ApiConnector.register(data, (response) =>
    response.success
      ? location.reload()
      : userForm.setRegisterErrorMessage(response.error)
  );
};
