# react-native-snowcoach

A simple and elegant coachmark library for React Native.

## Installation

## Usage

typescript
import { Coachmark } from 'react-native-snowcoach';
const App = () => {
return (
<Coachmark
tooltipText="This is an important button!"
tooltipPosition="bottom"
>
<Button title="Press Me" onPress={() => {}} />
</Coachmark>
);
};