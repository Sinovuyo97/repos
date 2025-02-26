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
        }
    }, [visible]);
    return (React.createElement(react_native_1.View, null,
        React.createElement(react_native_1.View, { ref: childRef }, children),
        visible && childLayout && (React.createElement(react_native_1.Modal, { transparent: true, animationType: "fade", visible: visible },
            React.createElement(react_native_1.TouchableWithoutFeedback, { onPress: onHide },
                React.createElement(react_native_1.View, { style: styles.overlay },
                    React.createElement(react_native_1.View, { style: [
                            styles.highlight,
                            {
                                top: childLayout.y,
                                left: childLayout.x,
                                width: childLayout.width,
                                height: childLayout.height,
                            },
                        ] }),
                    React.createElement(react_native_1.Animated.View, { style: [
                            styles.tooltip,
                            { top: childLayout.y + childLayout.height + 10, left: childLayout.x, opacity: fadeAnim },
                        ] },
                        React.createElement(react_native_1.Text, { style: styles.tooltipText }, tooltipText))))))));
};
exports.Coachmark = Coachmark;
var styles = react_native_1.StyleSheet.create({
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
//# sourceMappingURL=Coachmark.js.map