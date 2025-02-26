"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCoach = void 0;
const react_1 = require("react");
const react_native_1 = require("react-native");
const useCoach = () => {
    const measureNode = (0, react_1.useCallback)((ref) => {
        return new Promise((resolve) => {
            if (!ref) {
                resolve(null);
                return;
            }
            const node = (0, react_native_1.findNodeHandle)(ref);
            if (!node) {
                resolve(null);
                return;
            }
            ref.measure((x, y, width, height, pageX, pageY) => {
                resolve({
                    x: pageX,
                    y: pageY,
                    width,
                    height,
                });
            });
        });
    }, []);
    return {
        measureNode,
    };
};
exports.useCoach = useCoach;
