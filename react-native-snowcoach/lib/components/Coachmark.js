"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coachmark = void 0;
var React = require("react");
var react_1 = require("react");
var react_native_1 = require("react-native");
var Coachmark = function (_a) {
    var visible = _a.visible, onHide = _a.onHide, tooltipText = _a.tooltipText, children = _a.children;
    var _b = (0, react_1.useState)(null), childLayout = _b[0], setChildLayout = _b[1];
    var fadeAnim = (0, react_1.useRef)(new react_native_1.Animated.Value(0)).current;
    var childRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        if (visible) {
            react_native_1.Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
            setTimeout(function () {
                if (childRef.current) {
                    childRef.current.measureInWindow(function (x, y, width, height) {
                        setChildLayout({ x: x, y: y, width: width, height: height });
                    });
                }
            }, 100);
        }
        else {
            fadeAnim.setValue(0);
            setChildLayout(null); // Reset layout when not visible
        }
    }, [visible]);
    return (React.createElement(react_native_1.View, { style: { flex: 1 } },
        React.createElement(react_native_1.View, { ref: childRef, pointerEvents: visible ? "none" : "auto" }, children),
        visible && childLayout && (React.createElement(react_native_1.Modal, { transparent: true, animationType: "fade", visible: visible },
            React.createElement(react_native_1.TouchableWithoutFeedback, null,
                React.createElement(react_native_1.View, { style: styles.overlay },
                    React.createElement(react_native_1.View, { style: [
                            styles.highlight,
                            {
                                top: childLayout.y >= 0 ? childLayout.y : 0,
                                left: childLayout.x >= 0 ? childLayout.x : 0,
                                width: childLayout.width,
                                height: childLayout.height,
                            },
                        ] }),
                    React.createElement(react_native_1.Animated.View, { style: [
                            styles.tooltipContainer,
                            {
                                top: childLayout.y + childLayout.height + 10,
                                left: childLayout.x,
                                opacity: fadeAnim,
                            },
                        ] },
                        React.createElement(react_native_1.View, { style: styles.tooltipArrow }),
                        React.createElement(react_native_1.View, { style: styles.tooltip },
                            React.createElement(react_native_1.View, { style: styles.tooltipContent },
                                React.createElement(react_native_1.Text, { style: styles.tooltipText }, tooltipText),
                                React.createElement(react_native_1.TouchableWithoutFeedback, { onPress: onHide },
                                    React.createElement(react_native_1.View, { style: styles.okButton },
                                        React.createElement(react_native_1.Text, { style: styles.okButtonText }, "OK"))))))))))));
};
exports.Coachmark = Coachmark;
var styles = react_native_1.StyleSheet.create({
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
//# sourceMappingURL=Coachmark.js.map