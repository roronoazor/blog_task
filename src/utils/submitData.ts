import { axiosInstance } from './config';

export enum HttpMethod {
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export const submitData = async (data:any) => {
  const { payload_data, url, http_method = HttpMethod.POST } = data;
  let response_data;

  const config = {};

  if (http_method == HttpMethod.POST) {
    response_data = await axiosInstance.post(url, payload_data, config);
  } else if (http_method == HttpMethod.PUT) {
    response_data = await axiosInstance.put(url, payload_data, config);
  } else if (http_method == HttpMethod.PATCH) {
    response_data = await axiosInstance.patch(url, payload_data, config);
  } else {
    response_data = await axiosInstance.delete(url, payload_data);
  }

  return response_data;
};