import {
  Exception,
  InternalServerError,
  UnauthenticatedUser,
  UpgradedPlanRequired
} from "../core/Common/api/Exception.ts";


export type Fetch = (url: string, config?: RequestInit) => Promise<Response>;


export const authorizationHeaders = (token: string) => {
  return {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}


export const fakePostFetch = (customResponse: any | null): Fetch => (_url: string, config?: RequestInit) => {
  const body = customResponse ? customResponse : JSON.parse(config!.body!.toString());
  const response: Response = new Response(JSON.stringify(body));
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(response);
    },500)
  })
}

export const fakeUploadFetch: Fetch = (_url: string, _config?: RequestInit) => {

  const response: Response = new Response(null, {
    status: 200,
    statusText: 'OK',
    headers: {
      'ETag': '"fake-etag-1234567890"',
      'x-amz-id-2': 'fake-id-2',
      'x-amz-request-id': 'fake-request-id',
      'Content-Length': '0',
    },
  });

return new Promise(resolve => {
    setTimeout(() => {
      resolve(response);
    },500)
  })
}


export const fakeGetListFetch = <T> (data: T[]): Fetch => (_url: string, _config?: RequestInit) => {

  const response: Response = new Response(JSON.stringify(data))
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(response);
    },500)
  })
}

export const fakeGetFetch = <T> (data: T): Fetch => (_url: string, _config?: RequestInit) => {

  const response: Response = new Response(JSON.stringify(data))
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(response);
    },500)
  })
}
export const requestPostConfig = <T> (body: T, token: string): RequestInit => ({
  body: JSON.stringify(body),
  headers: authorizationHeaders(token)
})

export const ok = () => true;
export const ko = () => false;

export const handleResponse = <T> (response: Response): Promise<T | Exception> => {
  switch (response.status) {
    case 200:
      return response.json();
    case 401:
      return Promise.resolve(new UnauthenticatedUser());
    case 403:
      return Promise.resolve(new UpgradedPlanRequired());
    case 500:
      return Promise.resolve(new InternalServerError());

    default: return Promise.resolve(new InternalServerError());
  }
}

export const handleUploadResponse = (response: Response): Promise<{success: boolean} | Exception> => {
  switch (response.status) {
    case 200:
      return Promise.resolve({success: true});

    case 401:
      return Promise.resolve(new UnauthenticatedUser());

    case 403:
      return Promise.resolve(new UpgradedPlanRequired());

    case 500:
    default:
      return Promise.resolve(new InternalServerError());
  }
};

export type HttpService<T> = (fetch: Fetch) => (endpoint: string, token: string) => T;