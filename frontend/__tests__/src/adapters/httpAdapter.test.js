import mockAxios from "axios";
import httpAdapter from "@/adapters/httpAdapter";

jest.mock("axios");

describe("httpAdapter", () => {
  it("should make a GET request with correct URL and params", async () => {
    const url = "/test-url";
    const params = { param1: "value1" };
    const mockResponse = { data: { success: true } };

    mockAxios.create().get.mockResolvedValue(mockResponse);

    const response = await httpAdapter.get(url, params);

    expect(mockAxios.create).toHaveBeenCalled();
    expect(mockAxios.create().get).toHaveBeenCalledWith(url, { params });
    expect(response).toEqual(mockResponse);
  });

  it("should make a POST request with correct URL and data", async () => {
    const url = "/test-url";
    const postData = { key: "value" };
    const mockResponse = { data: { success: true } };

    mockAxios.create().post.mockResolvedValue(mockResponse);

    const response = await httpAdapter.post(url, postData);

    expect(mockAxios.create).toHaveBeenCalled();
    expect(mockAxios.create().post).toHaveBeenCalledWith(url, postData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    expect(response).toEqual(mockResponse);
  });
});
