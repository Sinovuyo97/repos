# react-native-snowcoach

A simple and elegant coachmark library for React Native that creates spotlight tutorials and walkthroughs.

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
