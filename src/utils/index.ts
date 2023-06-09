export const isConstructorMode = (mode: string): mode is 'constructor' => {
  return mode === 'constructor';
};

export const sum = (a: number, b: number): number => {
  return a + b;
};

export const subtraction = (a: number, b: number): number => {
  return a - b;
};

export const multiply = (a: number, b: number): number => {
  return a * b;
};

export const division = (a: number, b: number): number => {
  return a / b;
};