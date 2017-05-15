class Auth {
  static loggedIn() {
    return !!sessionStorage.jwt;
  }

  static logOut() {
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('username');
  }
}

export default Auth;
