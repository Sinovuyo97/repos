import { ReactNode } from 'react';
import { ViewStyle, StyleProp } from 'react-native';

export interface TargetPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CoachmarkProps {
  children: ReactNode;
  onShow?: () => void;
  onHide?: () => void;
  tooltipText?: string;
  tooltipComponent?: ReactNode;
  spotlightPadding?: number;
  overlayOpacity?: number;
  animationDuration?: number;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  tooltipStyle?: StyleProp<ViewStyle>;
  visible?: boolean;
}