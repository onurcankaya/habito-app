function saveToken(token: string) {
  localStorage.setItem("token", token);
}

function getToken(): string | null {
  return localStorage.getItem("token");
}

function removeToken() {
  localStorage.removeItem("token");
}

export { saveToken, getToken, removeToken };
