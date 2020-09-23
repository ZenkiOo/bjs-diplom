"use strict";

const logoutButton = new LogoutButton();

// *** LogOut ***
logoutButton.action = () => {
  ApiConnector.logout((response) =>
    response.success
      ? location.reload()
      : moneyManager.setMessage(response.success, response.error)
  );
};
