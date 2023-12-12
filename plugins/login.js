// plugins/login.js

export default ({ app }, inject) => {
    inject('login', {
      getLogin() {
        const login = JSON.parse(localStorage.getItem('login')) || [];
        return login;
      },
  
      addToLogin(item) {
        const login = this.getLogin();
        login.push(item);
        localStorage.setItem('login', JSON.stringify(login));
      },
  
      clearLogin() {
        localStorage.removeItem('login');
      },
    });
  };
  