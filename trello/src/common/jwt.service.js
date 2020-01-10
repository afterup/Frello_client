const ID_TOKEN_KEY = 'Authorization';

export const getToken = () => localStorage.getItem(ID_TOKEN_KEY);

export const saveToken = token =>
	localStorage.setItem(ID_TOKEN_KEY, `Bearer ${token}`);

export const destroyToken = () => localStorage.removeItem(ID_TOKEN_KEY);

export default { getToken, saveToken, destroyToken };
