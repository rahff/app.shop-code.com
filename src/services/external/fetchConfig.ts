import {Config, RegionCode} from "../../config.ts";
import {Fetch} from "../common.ts";


const configUrl = (region: RegionCode) => `https://config.shop-code.com/${region}.json`

export const fetchConfigCreator =
  (fetch: Fetch) =>
  async  (region: RegionCode): Promise<Config> => {
    const response = await fetch(configUrl(region));
    return  await response.json() as Config;
}

export const fetchConfig = fetchConfigCreator(fetch);
