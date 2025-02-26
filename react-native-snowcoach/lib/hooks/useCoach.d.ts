interface UseCoachReturn {
    measureNode: (ref: any) => Promise<{
        x: number;
        y: number;
        width: number;
        height: number;
    }>;
}
export declare const useCoach: () => UseCoachReturn;
export {};
