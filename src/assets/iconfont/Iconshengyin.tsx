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

const Iconshengyin: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M460.8 51.2h102.4v921.6H460.8zM921.6 358.4h102.4v307.2h-102.4zM0 358.4h102.4v307.2H0zM716.8 204.8h102.4v614.4h-102.4zM204.8 204.8h102.4v614.4H204.8z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

Iconshengyin.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(Iconshengyin) : Iconshengyin;
