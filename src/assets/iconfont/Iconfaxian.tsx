/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

const Iconfaxian: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 0.597333c282.453333 0 511.402667 228.977778 511.402667 511.402667 0 282.453333-228.977778 511.402667-511.402667 511.402667C229.546667 1023.402667 0.597333 794.424889 0.597333 512 0.597333 229.546667 229.575111 0.597333 512 0.597333z m220.672 265.159111h-6.4L419.441778 342.471111a102.286222 102.286222 0 0 0-74.410667 74.410667L268.316444 724.992a25.571556 25.571556 0 0 0 25.571556 31.971556h6.4l308.110222-76.714667a102.286222 102.286222 0 0 0 74.410667-74.410667l76.714667-308.110222a25.571556 25.571556 0 0 0-25.6-31.971556h-1.251556zM512 473.656889a38.343111 38.343111 0 1 1 0 76.686222 38.343111 38.343111 0 0 1 0-76.686222z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

Iconfaxian.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(Iconfaxian) : Iconfaxian;
