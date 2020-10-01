"use strict";

const logoutButton = new LogoutButton();
const moneyManager = new MoneyManager();
const ratesBoard = new RatesBoard();
const favoritesWidget = new FavoritesWidget();

// *** LogOut ***
logoutButton.action = () => {
  ApiConnector.logout((response) =>
    response.success
      ? location.reload()
      : moneyManager.setMessage(response.success, response.error)
  );
};

// *** User Data ***
ApiConnector.current((response) =>
  response.success
    ? ProfileWidget.showProfile(response.data)
    : moneyManager.setMessage(response.success, response.error)
);

// *** Exchange Rates ***
function getCourse() {
  ApiConnector.getStocks((response) => {
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    } else {
      moneyManager.setMessage(response.success, response.error);
    }
  });
}
getCourse();
setInterval(() => getCourse(), 60000);

// *** Add money ***
moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, "Счет пополнен!");
    } else {
      moneyManager.setMessage(response.success, response.error);
    }
  });
};

// *** Converting money ***
moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(
        response.success,
        "Сумма конвертирована!"
      );
    } else {
      moneyManager.setMessage(response.success, response.error);
    }
  });
};

// *** Money transfer ***
moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, "Перевод выполнен!");
    } else {
      moneyManager.setMessage(response.success, response.error);
    }
  });
};

// *** Favorites list ***
ApiConnector.getFavorites((response) => {
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  } else {
    favoritesWidget.setMessage(response.error);
  }
});

// *** Add to Favorites ***
favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(response.success, "Пользователь добавлен!");
    } else {
      favoritesWidget.setMessage(response.success, response.error);
    }
  });
};

// *** Delete user ***
favoritesWidget.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(response.success, "Пользователь удален!");
    } else {
      favoritesWidget.setMessage(response.success, response.error);
    }
  });
};
