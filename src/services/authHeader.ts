export default function authHeader() {
  const userStr = localStorage.getItem('user');
  let user = null;
  if (userStr) user = JSON.parse(userStr);

  if (user?.accessToken?.token) {
    return { Authorization: 'Bearer ' + user.accessToken.token };
  } else {
    return { Authorization: '' };
  }
}
