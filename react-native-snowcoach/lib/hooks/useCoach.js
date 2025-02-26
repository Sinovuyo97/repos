"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCoach = void 0;
var react_1 = require("react");
var react_native_1 = require("react-native");
var useCoach = function () {
    var measureNode = (0, react_1.useCallback)(function (ref) {
        return new Promise(function (resolve) {
            if (!ref) {
                resolve(null);
                return;
            }
            var node = (0, react_native_1.findNodeHandle)(ref);
            if (!node) {
                resolve(null);
                return;
            }
            ref.measure(function (x, y, width, height, pageX, pageY) {
                resolve({
                    x: pageX,
                    y: pageY,
                    width: width,
                    height: height,
                });
            });
        });
    }, []);
    return {
        measureNode: measureNode,
    };
};
exports.useCoach = useCoach;
//# sourceMappingURL=useCoach.js.map