"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coachmark = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = react_native_1.Dimensions.get('window');
const Coachmark = ({ children, onShow, onHide, tooltipText, tooltipComponent, spotlightPadding = 8, overlayOpacity = 0.8, animationDuration = 300, tooltipPosition = 'bottom', tooltipStyle, visible: controlledVisible, }) => {
    const [visible, setVisible] = (0, react_1.useState)(false);
    const [targetPosition, setTargetPosition] = (0, react_1.useState)(null);
    const opacity = (0, react_1.useRef)(new react_native_1.Animated.Value(0)).current;
    const targetRef = (0, react_1.useRef)(null);
    const isVisible = controlledVisible !== null && controlledVisible !== void 0 ? controlledVisible : visible;
    (0, react_1.useEffect)(() => {
        if (controlledVisible !== undefined) {
            if (controlledVisible) {
                show();
            }
            else {
                hide();
            }
        }
    }, [controlledVisible]);
    const measureTarget = () => {
        var _a;
        const node = (0, react_native_1.findNodeHandle)(targetRef.current);
        if (node) {
            (_a = targetRef.current) === null || _a === void 0 ? void 0 : _a.measure((x, y, width, height, pageX, pageY) => {
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
        react_native_1.Animated.timing(opacity, {
            toValue: overlayOpacity,
            duration: animationDuration,
            useNativeDriver: true,
        }).start(() => {
            onShow === null || onShow === void 0 ? void 0 : onShow();
        });
    };
    const hide = () => {
        react_native_1.Animated.timing(opacity, {
            toValue: 0,
            duration: animationDuration,
            useNativeDriver: true,
        }).start(() => {
            setVisible(false);
            onHide === null || onHide === void 0 ? void 0 : onHide();
        });
    };
    const getTooltipPosition = () => {
        if (!targetPosition)
            return {};
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
        if (!targetPosition)
            return null;
        return (<react_native_1.View style={[
                styles.spotlight,
                {
                    top: targetPosition.y,
                    left: targetPosition.x,
                    width: targetPosition.width,
                    height: targetPosition.height,
                },
            ]}/>);
    };
    return (<>
      <react_native_1.View ref={targetRef} collapsable={false}>
        {children}
      </react_native_1.View>
      <react_native_1.Modal visible={isVisible} transparent animationType="none">
        <react_native_1.TouchableWithoutFeedback onPress={hide}>
          <react_native_1.View style={styles.container}>
            <react_native_1.Animated.View style={[
            styles.overlay,
            {
                opacity,
            },
        ]}/>
            {renderSpotlight()}
            <react_native_1.View style={[styles.tooltip, getTooltipPosition(), tooltipStyle]}>
              {tooltipComponent || (<react_native_1.Text style={styles.tooltipText}>{tooltipText}</react_native_1.Text>)}
            </react_native_1.View>
          </react_native_1.View>
        </react_native_1.TouchableWithoutFeedback>
      </react_native_1.Modal>
    </>);
};
exports.Coachmark = Coachmark;
const styles = react_native_1.StyleSheet.create({
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
