const ID_TOKEN_KEY = 'Authorization';

const getToken = () => localStorage.getItem(ID_TOKEN_KEY);

const saveToken = token =>
	localStorage.setItem(ID_TOKEN_KEY, `Bearer ${token}`);

const destroyToken = () => localStorage.removeItem(ID_TOKEN_KEY);

export default { getToken, saveToken, destroyToken };
