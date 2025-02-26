import * as React from "react";
import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Modal,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  LayoutRectangle,
} from "react-native";

interface CoachmarkProps {
  visible: boolean;
  onHide: () => void;
  tooltipText: string;
  children: React.ReactElement;
}

export const Coachmark: React.FC<CoachmarkProps> = ({
  visible,
  onHide,
  tooltipText,
  children,
}) => {
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
      setChildLayout(null); // Reset layout when not visible
    }
  }, [visible]);

  return (
    <View style={{ flex: 1 }}>
      {/* Keep children visible */}
      <View ref={childRef} pointerEvents={visible ? "none" : "auto"}>
        {children}
      </View>

      {visible && childLayout && (
        <Modal transparent animationType="fade" visible={visible}>
          <TouchableWithoutFeedback>
            <View style={styles.overlay}>
              {/* Highlight the child component */}
              <View
                style={[
                  styles.highlight,
                  {
                    top: childLayout.y >= 0 ? childLayout.y : 0,
                    left: childLayout.x >= 0 ? childLayout.x : 0,
                    width: childLayout.width,
                    height: childLayout.height,
                  },
                ]}
              />
              {/* Tooltip positioned below the child */}
              <Animated.View
                style={[
                  styles.tooltipContainer,
                  {
                    top: childLayout.y + childLayout.height + 10,
                    left: childLayout.x,
                    opacity: fadeAnim,
                  },
                ]}
              >
                {/* Tooltip Arrow */}
                <View style={styles.tooltipArrow} />

                {/* Tooltip Box */}
                <View style={styles.tooltip}>
                  <View style={styles.tooltipContent}>
                    <Text style={styles.tooltipText}>{tooltipText}</Text>

                    {/* OK Button aligned to the right */}
                    <TouchableWithoutFeedback onPress={onHide}>
                      <View style={styles.okButton}>
                        <Text style={styles.okButtonText}>OK</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </View>
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
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  highlight: {
    position: "absolute",
    borderColor: "white",
    borderWidth: 3,
    borderRadius: 8,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "white",
  },
  closeButtonText: {
    color: "black",
  },
  tooltipContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  
  tooltip: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    elevation: 5,
    flexDirection: 'row', // Horizontal layout
    alignItems: 'center',
    width: 250, // Adjust width as needed
  },
  
  tooltipArrow: {
    position: 'absolute',
    top: -8, // Adjust for placement
    left: 20, // Align with the element
    width: 16,
    height: 16,
    backgroundColor: 'white',
    transform: [{ rotate: '45deg' }],
    elevation: 5,
  },
  
  tooltipContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  
  tooltipText: {
    flex: 1,
    color: 'black',
    fontSize: 14,
  },
  
  okButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    backgroundColor: 'rgba(211, 211, 211, 0.5)', 
  },
  
  okButtonText: {
    color: '#007AFF', // Blue text like in the image
    fontSize: 14,
    fontWeight: 'bold',
  },  
});
