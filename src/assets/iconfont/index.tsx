/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconV from './IconV';
import Iconclock from './Iconclock';
import Iconhuabankaobei from './Iconhuabankaobei';
import Iconshengyin from './Iconshengyin';
import Iconmore from './Iconmore';
import Iconlights from './Iconlights';
import Iconfaxian from './Iconfaxian';
import IconfavoritesFill from './IconfavoritesFill';
import Iconexchangerate from './Iconexchangerate';
import IconcollectionFill from './IconcollectionFill';
import IconaccountFill from './IconaccountFill';
import IconhomeFill from './IconhomeFill';

export type IconNames = 'iconV' | 'iconclock' | 'iconhuabankaobei-' | 'iconshengyin' | 'iconmore' | 'iconlights' | 'iconfaxian' | 'iconfavorites-fill' | 'iconexchangerate' | 'iconcollection-fill' | 'iconaccount-fill' | 'iconhome-fill';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

const IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'iconV':
      return <IconV key="1" {...rest} />;
    case 'iconclock':
      return <Iconclock key="2" {...rest} />;
    case 'iconhuabankaobei-':
      return <Iconhuabankaobei key="3" {...rest} />;
    case 'iconshengyin':
      return <Iconshengyin key="4" {...rest} />;
    case 'iconmore':
      return <Iconmore key="5" {...rest} />;
    case 'iconlights':
      return <Iconlights key="6" {...rest} />;
    case 'iconfaxian':
      return <Iconfaxian key="7" {...rest} />;
    case 'iconfavorites-fill':
      return <IconfavoritesFill key="8" {...rest} />;
    case 'iconexchangerate':
      return <Iconexchangerate key="9" {...rest} />;
    case 'iconcollection-fill':
      return <IconcollectionFill key="10" {...rest} />;
    case 'iconaccount-fill':
      return <IconaccountFill key="11" {...rest} />;
    case 'iconhome-fill':
      return <IconhomeFill key="12" {...rest} />;
  }

  return null;
};

export default React.memo ? React.memo(IconFont) : IconFont;
