import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Modal,
  Animated,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  findNodeHandle,
} from 'react-native';
import type { CoachmarkProps, TargetPosition } from '../types';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const Coachmark: React.FC<CoachmarkProps> = ({
  children,
  onShow,
  onHide,
  tooltipText,
  tooltipComponent,
  spotlightPadding = 8,
  overlayOpacity = 0.8,
  animationDuration = 300,
  tooltipPosition = 'bottom',
  tooltipStyle,
  visible: controlledVisible,
}) => {
  const [visible, setVisible] = useState(false);
  const [targetPosition, setTargetPosition] = useState<TargetPosition | null>(null);
  const opacity = useRef(new Animated.Value(0)).current;
  const targetRef = useRef<View>(null);

  const isVisible = controlledVisible ?? visible;

  useEffect(() => {
    if (controlledVisible !== undefined) {
      if (controlledVisible) {
        show();
      } else {
        hide();
      }
    }
  }, [controlledVisible]);

  const measureTarget = () => {
    const node = findNodeHandle(targetRef.current);
    if (node) {
      targetRef.current?.measure((x, y, width, height, pageX, pageY) => {
        setTargetPosition({
          x: pageX - spotlightPadding,
          y: pageY - spotlightPadding,
          width: width + (spotlightPadding * 2),
          height: height + (spotlightPadding * 2),
        });
      });
    }
  };

  const show = () => {
    measureTarget();
    setVisible(true);
    Animated.timing(opacity, {
      toValue: overlayOpacity,
      duration: animationDuration,
      useNativeDriver: true,
    }).start(() => {
      onShow?.();
    });
  };

  const hide = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: animationDuration,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
      onHide?.();
    });
  };

  const getTooltipPosition = () => {
    if (!targetPosition) return {};

    const tooltipHeight = 60;
    const tooltipWidth = 200;
    const margin = 10;

    switch (tooltipPosition) {
      case 'top':
        return {
          position: 'absolute',
          left: targetPosition.x + (targetPosition.width - tooltipWidth) / 2,
          top: targetPosition.y - tooltipHeight - margin,
        };
      case 'bottom':
        return {
          position: 'absolute',
          left: targetPosition.x + (targetPosition.width - tooltipWidth) / 2,
          top: targetPosition.y + targetPosition.height + margin,
        };
      case 'left':
        return {
          position: 'absolute',
          right: SCREEN_WIDTH - targetPosition.x + margin,
          top: targetPosition.y + (targetPosition.height - tooltipHeight) / 2,
        };
      case 'right':
        return {
          position: 'absolute',
          left: targetPosition.x + targetPosition.width + margin,
          top: targetPosition.y + (targetPosition.height - tooltipHeight) / 2,
        };
    }
  };

  const renderSpotlight = () => {
    if (!targetPosition) return null;

    return (
      <View
        style={[
          styles.spotlight,
          {
            top: targetPosition.y,
            left: targetPosition.x,
            width: targetPosition.width,
            height: targetPosition.height,
          },
        ]}
      />
    );
  };

  return (
    <>
      <View ref={targetRef} collapsable={false}>
        {children}
      </View>
      <Modal visible={isVisible} transparent animationType="none">
        <TouchableWithoutFeedback onPress={hide}>
          <View style={styles.container}>
            <Animated.View
              style={[
                styles.overlay,
                {
                  opacity,
                },
              ]}
            />
            {renderSpotlight()}
            <View style={[styles.tooltip, getTooltipPosition() as any, tooltipStyle]}>
              {tooltipComponent || (
                <Text style={styles.tooltipText}>{tooltipText}</Text>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
  },
  spotlight: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1000,
    borderColor: 'rgba(0, 0, 0, 0.8)',
    margin: -1000,
  },
  tooltip: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    width: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tooltipText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});