# react-native-snowcoach

A simple and elegant coachmark library for React Native that creates spotlight tutorials and walkthroughs.

## What's New

## Version 3.0.6 (2/26/2025)
- **Added Close Button**: 
  - Replaced the `TouchableWithoutFeedback` with a close button in the `Coachmark` component for better user experience.
- **Improved Documentation**: 
  - Updated the README to include a "What's New" section for easier tracking of changes.

## Version 2.0.7 (2/26/2025 - 04:00pm)
- **Improved Error Handling**: 
  - Enhanced the `Coachmark` component to prevent `NaN` values for positioning properties. 
  - Added validation checks to ensure that `top` and `left` values are not negative, defaulting to `0` if they are. This resolves issues related to layout measurement errors and improves the stability of the tooltip display.

- **Consistent Layout Handling**: 
  - Ensured that all layout values are validated before being used in styles, providing a more robust user experience.

- **No Changes to Usage**: 
  - The usage of the `Coachmark` component remains the same, allowing for seamless integration into existing projects.

## Installation

bash
npm install @sinovuyo97/react-native-snowcoach
or
yarn add @sinovuyo97/react-native-snowcoach

## Usage

typescript
import { Coachmark } from '@sinovuyo97/react-native-snowcoach';
const App = () => {
  const [isVisible, setIsVisible] = React.useState(true); //if only using to onboard on one component this can be utilised
  const [step, setStep] = React.useState(0); // Track which coachmark is visible

  return (
    <>
      <Coachmark
        visible={step === 0}
        onHide={() => setStep(1)} // Move to the next step
        tooltipText="Press this button to proceed."
      >
        <Button title="Step 1" onPress={() => setStep(1)} />
      </Coachmark>

      <Coachmark
        visible={step === 1}
        onHide={() => setStep(2)}
        tooltipText="Press this button to proceed to Step 3."
      >
        <Button title="Step 2" onPress={() => setStep(2)} />
      </Coachmark>

      <Coachmark
        visible={step === 2}
        onHide={() => setStep(3)} // Hide after last step
        tooltipText="Final step, you're done!"
      >
        <Button title="Step 3" onPress={() => setStep(3)} />
      </Coachmark>
    </>
  );
};

// Note: Ensure that the position object in your Coachmark component includes a 'top' property in its type definition.

## Props

| Prop                | Type                                   | Default  | Description                                    |
| ------------------- | -------------------------------------- | -------- | ---------------------------------------------- |
| `tooltipText`       | string                                 | -        | Text to display in the tooltip                 |
| `tooltipPosition`   | 'top' \| 'bottom' \| 'left' \| 'right' | 'bottom' | Position of the tooltip relative to the target |
| `visible`           | boolean                                | -        | Control visibility of the coachmark            |
| `onShow`            | () => void                             | -        | Callback when coachmark is shown               |
| `onHide`            | () => void                             | -        | Callback when coachmark is hidden              |
| `tooltipComponent`  | ReactNode                              | -        | Custom tooltip component                       |
| `spotlightPadding`  | number                                 | 8        | Padding around the spotlight                   |
| `overlayOpacity`    | number                                 | 0.8      | Opacity of the overlay                         |
| `animationDuration` | number                                 | 300      | Duration of show/hide animation                |
| `tooltipStyle`      | ViewStyle                              | -        | Custom styles for tooltip                      |

## Features

- 🎯 Spotlight effect to highlight UI elements
- 📍 Flexible tooltip positioning
- 🎨 Customizable styling
- ⚡ Smooth animations
- 📱 Works on both iOS and Android

## License

MIT
