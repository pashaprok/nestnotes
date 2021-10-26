export const ImageExtensions = new RegExp('\\.(jpg|jpeg|png|gif)$');

// export const digitRegExp = new RegExp('(?=.*[0-9])', 'g');
// export const lowerRegExp = new RegExp('(?=.*[a-z])', 'g');
// export const upperRegExp = new RegExp('(?=.*[A-Z])', 'g');

export const strongPasswordRegExp = new RegExp(
  '(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])',
  'g',
);
