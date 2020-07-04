import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainApp from './MainApp';

export default function App() {
  return (
    <SafeAreaProvider>
      <MainApp />
    </SafeAreaProvider>
  );
}