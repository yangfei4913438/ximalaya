import AsyncStorage from '@react-native-community/async-storage';
import Storage, { LoadParams } from 'react-native-storage';
import categoryRequest from '@/models/categoryRequest';

const storage = new Storage({
  size: 1000, // 最大存储1000个，超过的循环，最前面的被替代、
  storageBackend: AsyncStorage, // 存储引擎为 AsyncStorage，应用退出，数据也不丢失。 相当于浏览器上的 window.localStorage
  defaultExpires: 1000 * 3600 * 24 * 7, // 7天有效期 null 表示永不过期。
  enableCache: true, // 开启缓存
  sync: {
    // 数据过期了，从这里重新获取
    // 获取分类列表
    categoryList: async () => {
      const { data } = await categoryRequest.getCategorylList();
      return data;
    },
    // 用户选择的数据, 无需请求数据
    myCategorys: async () => {
      return null;
    },
  },
});

// 获取数据
const load = (params: LoadParams) => {
  return storage.load(params);
};

export { load };

export default storage;
