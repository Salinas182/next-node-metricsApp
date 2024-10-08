const mockAxios = jest.genMockFromModule("axios");

const mockAxiosInstance = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

mockAxios.create = jest.fn(() => mockAxiosInstance);

export default mockAxios;
