import * as React from 'react'
import { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Modal,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  LayoutRectangle,
} from 'react-native';

interface CoachmarkProps {
  visible: boolean;
  onHide: () => void;
  tooltipText: string;
  children: React.ReactElement;
}

export const Coachmark: React.FC<CoachmarkProps> = ({ visible, onHide, tooltipText, children }:CoachmarkProps) => {
  const [childLayout, setChildLayout] = useState<LayoutRectangle | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const childRef = useRef<View>(null);

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        if (childRef.current) {
          childRef.current.measureInWindow((x, y, width, height) => {
            setChildLayout({ x, y, width, height });
          });
        }
      }, 100);
    } else {
      fadeAnim.setValue(0);
    }
  }, [visible]);

  return (
    <View>
      <View ref={childRef}>{children}</View>

      {visible && childLayout && (
        <Modal transparent animationType="fade" visible={visible}>
          <TouchableWithoutFeedback onPress={onHide}>
            <View style={styles.overlay}>
              {/* Highlight the child component */}
              <View
                style={[
                  styles.highlight,
                  {
                    top: childLayout.y,
                    left: childLayout.x,
                    width: childLayout.width,
                    height: childLayout.height,
                  },
                ]}
              />
              {/* Tooltip positioned below the child */}
              <Animated.View
                style={[
                  styles.tooltip,
                  { top: childLayout.y + childLayout.height + 10, left: childLayout.x, opacity: fadeAnim },
                ]}
              >
                <Text style={styles.tooltipText}>{tooltipText}</Text>
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  highlight: {
    position: 'absolute',
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 8,
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    elevation: 5,
  },
  tooltipText: {
    color: 'black',
  },
});
