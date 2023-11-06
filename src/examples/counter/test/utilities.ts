import { render as renderComponent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// renders components and creates a user
export const render = (
  ui: React.ReactElement,
  options?: Parameters<typeof renderComponent>[1],
) => {
  return {
    ...renderComponent(ui, options),
    user: userEvent.setup(),
  };
};

export {};

/**
 * For a complete example, see: test/utilities.ts
 */
