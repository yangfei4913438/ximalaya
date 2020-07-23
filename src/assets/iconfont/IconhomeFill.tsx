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

const IconhomeFill: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M556.586667 159.36l288.490666 183.914667A64 64 0 0 1 874.666667 397.248v392.746667a64 64 0 0 1-64 64l-224-0.021334V597.333333H448v256.64l-213.333333 0.042667a64 64 0 0 1-64-64V391.68a64 64 0 0 1 30.272-54.4l287.530666-178.346667a64 64 0 0 1 68.138667 0.426667z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconhomeFill.defaultProps = {
  size: 18,
};

export default React.memo ? React.memo(IconhomeFill) : IconhomeFill;
