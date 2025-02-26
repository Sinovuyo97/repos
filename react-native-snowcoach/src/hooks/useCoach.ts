import { useRef, useCallback } from 'react';
import { findNodeHandle, Dimensions } from 'react-native';

interface UseCoachReturn {
  measureNode: (ref: any) => Promise<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>;
}

export const useCoach = (): UseCoachReturn => {
  const measureNode = useCallback((ref: any): Promise<any> => {
    return new Promise((resolve) => {
      if (!ref) {
        resolve(null);
        return;
      }

      const node = findNodeHandle(ref);
      if (!node) {
        resolve(null);
        return;
      }

      ref.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
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