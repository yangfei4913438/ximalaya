import axios from 'axios';
import { Platform } from 'react-native';

// 默认前缀，安卓Android9.0版本之前，无需https, 所以用8.1的系统来做模拟机比较合适。
// 等上生产之后就无所谓了。因为生产的系统做成https是很方便的。
axios.defaults.baseURL =
  Platform.OS === 'android' ? 'https://makesaas.cn/' : 'http://127.0.0.1:3001/mock/11/';

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    console.log('请求config: ', config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    // console.log('响应数据response: ', response);
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axios;
