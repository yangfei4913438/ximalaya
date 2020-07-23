import { Dimensions } from 'react-native';

// 获取手机屏幕的宽高
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

// 根据百分比获取宽度
function wp(percentage: number) {
  // 计算宽度
  const value = (percentage * viewportWidth) / 100;
  // 返回结果做四舍五入
  return Math.round(value);
}

// 根据百分比获取高度
function hp(percentage: number) {
  // 计算高度
  const value = (percentage * viewportHeight) / 100;
  // 返回结果做四舍五入
  return Math.round(value);
}

// 导出变量
export { viewportWidth, viewportHeight, wp, hp };
