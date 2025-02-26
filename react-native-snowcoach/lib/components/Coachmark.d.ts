import * as React from 'react';
interface CoachmarkProps {
    visible: boolean;
    onHide: () => void;
    tooltipText: string;
    children: React.ReactElement;
}
export declare const Coachmark: React.FC<CoachmarkProps>;
export {};
