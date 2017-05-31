class Auth {
  static loggedIn() {
    return !!localStorage.jwt;
  }

  static logOut() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    localStorage.removeItem('userid');
  }
}

export default Auth;
