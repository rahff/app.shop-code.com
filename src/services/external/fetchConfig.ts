import {Config, RegionCode} from "../../config.ts";

export const fetchConfig = async  (region: RegionCode): Promise<Config> => {
    const response = await fetch(`https://config.shop-code.com/${region}.json`);
    return  await response.json() as Config;
}