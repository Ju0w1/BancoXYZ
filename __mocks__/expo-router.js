const mockPush = jest.fn();
const mockReplace = jest.fn();
const mockBack = jest.fn();

const useRouter = () => ({
  push: mockPush,
  replace: mockReplace,
  back: mockBack,
});

const Stack = {
  Screen: ({ children }) => children,
};

module.exports = {
  useRouter,
  Stack,
  __mockReset: () => {
    mockPush.mockClear();
    mockReplace.mockClear();
    mockBack.mockClear();
  },
  __getMockPush: () => mockPush,
  __getMockReplace: () => mockReplace,
  __getMockBack: () => mockBack,
};