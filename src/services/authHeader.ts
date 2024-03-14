export default function authHeader() {
  const tokenDetails = sessionStorage.getItem('token');
  let accessToken = null;
  if (tokenDetails) accessToken = JSON.parse(tokenDetails);

  if (accessToken?.token) {
    return { Authorization: 'Bearer ' + accessToken.token };
  } else {
    return { Authorization: '' };
  }
}
