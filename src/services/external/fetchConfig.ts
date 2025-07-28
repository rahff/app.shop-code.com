import {Config, devConfig, RegionCode} from "../../config.ts";
import {fakeGetFetch, Fetch} from "../common.ts";
import {environment} from "../../environment.ts";


const configUrl = (region: RegionCode) => `https://config.shop-code.com/${region}.json`

export const fetchConfigCreator =
  (fetch: Fetch) =>
  async  (region: RegionCode): Promise<Config> => {
    const response = await fetch(configUrl(region));
    return  await response.json() as Config;
}

export const fetchConfig =
    environment === "production" ?
    fetchConfigCreator(fetch) :
        fetchConfigCreator(fakeGetFetch({...devConfig}));
