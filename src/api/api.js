import axios from "axios";

export async function fetchData(endPoint, method = 'GET', body = null, headers = {}) {
  try {
    const response = await axios({
      url: endPoint,
      method,
      data: body,
      headers: {
        'Content-Type': 'application/json',
        ...headers, 
      },
    });
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
}
