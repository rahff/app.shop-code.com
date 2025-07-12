export type Fetch = (url: string, config?: RequestInit) => Promise<Response>;


export const authorizationHeaders = (token: string) => {
  return {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}
