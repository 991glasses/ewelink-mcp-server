import { describe, test, expect, vi, beforeEach } from 'vitest';

let config;
let request;

let tokenHolder;
let configMock;
let requestMock;

beforeEach(async () => {
    // Reset all mocks before each test
    vi.resetModules();
    vi.restoreAllMocks();

    // Create mocks for dependencies
    configMock = {
        getRegion: vi.fn(),
        getApiDomain: vi.fn(),
        getAccessToken: vi.fn(),
        saveAccessToken: vi.fn(),
        getRefreshToken: vi.fn(),
        saveRefreshToken: vi.fn(),
        getAppConfig: vi.fn()
    };

    requestMock = {
        doPostRequestWithRawBody: vi.fn(),
        doPostRequest: vi.fn(),
        postRequestSign: vi.fn(),
    };

    // Replace module functions with mocks
    config = await import('../src/config.mjs');
    request = await import('../src/request.mjs');
    vi.spyOn(config, 'getRegion').mockImplementation(configMock.getRegion);
    vi.spyOn(config, 'getApiDomain').mockImplementation(configMock.getApiDomain);
    vi.spyOn(config, 'getAccessToken').mockImplementation(configMock.getAccessToken);
    vi.spyOn(config, 'saveAccessToken').mockImplementation(configMock.saveAccessToken);
    vi.spyOn(config, 'getRefreshToken').mockImplementation(configMock.getRefreshToken);
    vi.spyOn(config, 'saveRefreshToken').mockImplementation(configMock.saveRefreshToken);
    vi.spyOn(config, 'getAppConfig').mockImplementation(configMock.getAppConfig);

    vi.spyOn(request, 'doPostRequestWithRawBody').mockImplementation(requestMock.doPostRequestWithRawBody);
    vi.spyOn(request, 'doPostRequest').mockImplementation(requestMock.doPostRequest);
    vi.spyOn(request, 'postRequestSign').mockImplementation(requestMock.postRequestSign);
});

describe('init function', () => {
    test('should initialize with valid region and access token', async () => {
        const mockRegion = 'eu';
        const mockAccessTokenInfo = {
            accessToken: 'test-token',
            expiredTime: Date.now() + 1000000
        };

        configMock.getRegion.mockReturnValue(mockRegion);
        configMock.getApiDomain.mockReturnValue('api.test.com');
        configMock.getAccessToken.mockReturnValue(mockAccessTokenInfo);

        tokenHolder = await import('../src/token_holder.mjs');
        await tokenHolder.init();

        expect(configMock.getRegion).toHaveBeenCalled();
        expect(configMock.getApiDomain).toHaveBeenCalledWith(mockRegion);
        expect(configMock.getAccessToken).toHaveBeenCalled();
        expect(await tokenHolder.getAccessToken()).toBe(mockAccessTokenInfo.accessToken);
    });

    test('should throw error when region is not set', async () => {
        configMock.getRegion.mockReturnValue(null);

        tokenHolder = await import('../src/token_holder.mjs');
        await expect(tokenHolder.init())
            .rejects
            .toThrow('region is not set');
    });

    test('should throw error when access token is invalid', async () => {
        configMock.getRegion.mockReturnValue('eu');
        configMock.getAccessToken.mockReturnValue(null);

        tokenHolder = await import('../src/token_holder.mjs');
        await expect(tokenHolder.init())
            .rejects
            .toThrow('access token is not set or invalid');
    });
});

describe('getAccessToken function', () => {
    test('should return cached token when not expired', async () => {
        const mockRegion = 'eu';
        const mockAccessTokenInfo = {
            accessToken: 'test-token',
            expiredTime: Date.now() + 1000000
        };

        configMock.getRegion.mockReturnValue(mockRegion);
        configMock.getApiDomain.mockReturnValue('api.test.com');
        configMock.getAccessToken.mockReturnValue(mockAccessTokenInfo);

        tokenHolder = await import('../src/token_holder.mjs');
        await tokenHolder.init();

        const result = await tokenHolder.getAccessToken();

        expect(result).toBe(mockAccessTokenInfo.accessToken);
    });

    test('should refresh token when expired', async () => {
        const mockRegion = 'eu';
        const mockAccessTokenInfo = {
            accessToken: 'old-token',
            expiredTime: Date.now() - 1000 // 1 second ago
        };

        configMock.getRegion.mockReturnValue(mockRegion);
        configMock.getApiDomain.mockReturnValue('api.test.com');
        configMock.getAccessToken.mockReturnValue(mockAccessTokenInfo);

        tokenHolder = await import('../src/token_holder.mjs');
        await tokenHolder.init();

        const mockRefreshResponse = {
            at: 'new-access-token',
            rt: 'new-refresh-token'
        };

        requestMock.doPostRequest.mockResolvedValue({
            body: JSON.stringify({ error: 0, data: mockRefreshResponse })
        });

        configMock.getAppConfig.mockReturnValue({ appId: 'test-app-id' });
        configMock.getRefreshToken.mockReturnValue({ refreshToken: 'test-refresh-token' });
        const result = await tokenHolder.getAccessToken();

        expect(result).toBe(mockRefreshResponse.at);
        expect(requestMock.doPostRequest).toHaveBeenCalled();
        expect(configMock.saveAccessToken).toHaveBeenCalledWith(mockRefreshResponse.at, expect.any(Number));
        expect(configMock.saveRefreshToken).toHaveBeenCalledWith(mockRefreshResponse.rt, expect.any(Number));
    });
});

describe('getOauthToken function', () => {
    test('should successfully get oauth token', async () => {
        const mockCode = 'test-code';
        const mockRedirectUrl = 'https://test.com/callback';
        const mockGrantType = 'authorization_code';
        const mockSign = 'test-sign';
        const mockAppId = 'test-app-id';
        const mockAppSecret = 'test-secret';
        configMock.getAppConfig.mockReturnValue({ appId: mockAppId, appSecret: mockAppSecret });
        requestMock.postRequestSign.mockReturnValue(mockSign);
        requestMock.doPostRequestWithRawBody.mockResolvedValue({
            body: JSON.stringify({
                error: 0,
                data: {
                    at: 'oauth-token',
                    rt: 'refresh-token'
                }
            })
        });

        tokenHolder = await import('../src/token_holder.mjs');
        tokenHolder.setDomain('api.test.com');
        tokenHolder.setAppId(mockAppId, mockAppSecret);

        const result = await tokenHolder.getOauthToken(mockCode, mockRedirectUrl, mockGrantType);

        expect(result).toEqual({
            at: 'oauth-token',
            rt: 'refresh-token'
        });
        expect(requestMock.postRequestSign).toHaveBeenCalledWith(mockAppSecret, expect.any(String));
        expect(requestMock.doPostRequestWithRawBody).toHaveBeenCalled();
    });

    test('should handle oauth error response', async () => {
        const mockCode = 'test-code';
        const mockRedirectUrl = 'https://test.com/callback';
        const mockGrantType = 'authorization_code';
        const mockSign = 'test-sign';
        const mockAppId = 'test-app-id';
        const mockAppSecret = 'test-secret';
        configMock.getAppConfig.mockReturnValue({ appId: mockAppId, appSecret: mockAppSecret });
        requestMock.postRequestSign.mockReturnValue(mockSign);
        requestMock.doPostRequestWithRawBody.mockResolvedValue({
            body: JSON.stringify({
                error: 1,
                msg: 'OAuth failed'
            })
        });

        tokenHolder = await import('../src/token_holder.mjs');
        tokenHolder.setDomain('api.test.com');
        tokenHolder.setAppId(mockAppId, mockAppSecret);

        await expect(tokenHolder.getOauthToken(mockCode, mockRedirectUrl, mockGrantType))
            .rejects
            .toThrow();
    });
});