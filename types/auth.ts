export type UserRole = 'candidate' | 'agency' | 'company';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  onboarded: boolean;
}

import { useState } from 'react';

export function useMultistepForm(steps: JSX.Element[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function next() {
    setCurrentStepIndex(i => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  }

  function back() {
    setCurrentStepIndex(i => {
      if (i <= 0) return i;
      return i - 1;
    });
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    next,
    back
  };
}