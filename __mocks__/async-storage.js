const mockStorage = {};

const AsyncStorage = {
  setItem: jest.fn((key, value) => {
    return new Promise((resolve) => {
      mockStorage[key] = value;
      resolve(null);
    });
  }),
  getItem: jest.fn((key) => {
    return new Promise((resolve) => {
      resolve(mockStorage[key] || null);
    });
  }),
  removeItem: jest.fn((key) => {
    return new Promise((resolve) => {
      delete mockStorage[key];
      resolve(null);
    });
  }),
  clear: jest.fn(() => {
    return new Promise((resolve) => {
      Object.keys(mockStorage).forEach(key => delete mockStorage[key]);
      resolve(null);
    });
  }),
  getAllKeys: jest.fn(() => {
    return new Promise((resolve) => {
      resolve(Object.keys(mockStorage));
    });
  }),
};

export default AsyncStorage;

export const __resetAllMocks = () => {
  Object.keys(AsyncStorage).forEach(key => {
    if (typeof AsyncStorage[key] === 'function') {
      AsyncStorage[key].mockClear();
    }
  });
  Object.keys(mockStorage).forEach(key => delete mockStorage[key]);
};

export const __getMockStorage = () => mockStorage;