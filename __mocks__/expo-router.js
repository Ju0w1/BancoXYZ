const mockPush = jest.fn();
const mockReplace = jest.fn();
const mockBack = jest.fn();
const mockLink = jest.fn(({ href, children }) => children);

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
  Link: mockLink,
  __mockReset: () => {
    mockPush.mockClear();
    mockReplace.mockClear();
    mockBack.mockClear();
    mockLink.mockClear();
  },
  __getMockPush: () => mockPush,
  __getMockReplace: () => mockReplace,
  __getMockBack: () => mockBack,
  __getMockLink: () => mockLink,
};