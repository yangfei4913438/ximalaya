import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

// 函数式组件的类型是 React.FC
const Touchable: React.FC<TouchableOpacityProps> = (props) => (
  <TouchableOpacity
    activeOpacity={0.8} // 透明度为0.8, 放在前面作为默认值，传值进来也可以覆盖的。
    {...props} // 其他传递进来的值
  />
);

export default Touchable;
