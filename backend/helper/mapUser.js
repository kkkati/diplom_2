module.exports = function (user) {
  return {
    id: user._id,
    login: user.login,
    roleId: user.role,
    basket: user.basket,
  };
};
