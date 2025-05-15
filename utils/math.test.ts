import { add, isEven } from './math';

describe('add', () => {
  it('adds two positive numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('adds positive and negative numbers', () => {
    expect(add(-5, 10)).toBe(5);
  });

  it('adds two negative numbers', () => {
    expect(add(-4, -6)).toBe(-10);
  });

  it('adds zero correctly', () => {
    expect(add(0, 7)).toBe(7);
  });
});

describe('isEven', () => {
  it('returns true for even number', () => {
    expect(isEven(4)).toBe(true);
  });

  it('returns false for odd number', () => {
    expect(isEven(5)).toBe(false);
  });

  it('returns true for 0 (edge case)', () => {
    expect(isEven(0)).toBe(true);
  });
});
