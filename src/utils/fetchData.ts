import { axiosInstance, BASE_URL } from './config';

export async function fetchData<T>(url: string): Promise<T> {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/${url}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (err) {
    throw new Error('Failed to fetch data');
  }
}