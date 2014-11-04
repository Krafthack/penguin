var login = {};

login.controller = () => {
  return {
  }
};

login.view = (ctrl) => {
  return [ m('h1','Penguin')]
};


m.route(document.getElementById('app'), '/', {
  '/': login,
});
