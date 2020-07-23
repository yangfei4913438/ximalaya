import axios from './axiosObject';
import { AxiosRequestConfig, Method } from 'axios';

interface IHttp {
  url: string;
  data?: object;
  params?: object;
  method?: Method;
}

// 这是给别人继承的公共类
class Http {
  async request({ url, data, params, method }: IHttp) {
    return await new Promise((resolve: (res: any) => void, reject: (err: any) => void) => {
      this._request(url, data, params, method, resolve, reject);
    });
  }

  private async _request(url: string, data = {}, params = {}, method: Method = 'get', resolve: (res: any) => void, reject: (err: any) => void) {
    const args: AxiosRequestConfig = {
      url: `/api/${url}`,
      method,
    };
    if (Object.keys(params).length > 0) {
      args.params = params;
    }
    if (method !== 'get') {
      args.data = data;
    }
    await axios(args)
      .then((res: any) => resolve(res))
      .catch((err: any) => reject(err));
  }
}

export default Http;
