import {LocalStorageApi} from '../spi/LocalStorageApi';

export class InMemoryLocalStorage implements LocalStorageApi {
  public data: any = {};

  public get_item<T>(key: string): T | null {
    try {
      return JSON.parse(this.data[key]);
    }catch (_: any) {
      return null;
    }

  }
  public add_item<T>(key: string, value: T) {
    const item_list: T[] =  this.data[key] || [];
    this.set_item(key, [...item_list, value]);
  }

  public set_item<T>(key: string, value: T): void {
    this.data[key] = JSON.stringify(value);
  }
  public clear() {
    this.data = {};
  }

  public add_items<T>(key: string, values: T[]) {
    const items: T[] = JSON.parse(this.data[key] || "[]");
    this.set_item(key, items.concat(values));
  }
}
