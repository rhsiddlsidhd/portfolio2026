// This file is used to set up the test environment for Vitest.
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// 각 테스트 후 자동 cleanup
afterEach(() => {
  cleanup();
});
