import {LocalStorageApi} from "../../core/Common/spi/LocalStorageApi.ts";


export class LocalStorageBrowserApi implements LocalStorageApi {

  public get_item<T>(key: string): T | null {
    try {
      const value = localStorage.getItem(key);
      if (!value) return null;
      return JSON.parse(value);
    }catch (_: unknown) {
      console.log(_)
      localStorage.removeItem(key);
      return null;
    }
  }

  public set_item<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public add_item<T>(key: string, value: T): void {
    const items: T[] = JSON.parse(localStorage.getItem(key) || "[]");
    this.set_item(key, [...items, value]);
  }

  public clear(): void {
    localStorage.clear();
  }
}

export const local_storage = new LocalStorageBrowserApi();