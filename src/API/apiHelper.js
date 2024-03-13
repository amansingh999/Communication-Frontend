import { BASE_URL } from './appsettings';

export const post = async (URL, param) => {
  try {
    const resp = await fetch(`${BASE_URL + URL}`, {
      method: 'POST',
      body: JSON.stringify(param),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return resp;
  } catch (error) {
    return error;
  }
};
