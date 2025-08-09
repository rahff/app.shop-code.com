export interface LocalStorageApi {
  get_item<T>(key: string): T | null;
  set_item<T>(key: string, value: T): void;
  add_item<T>(key: string, value: T): void;
  add_items<T>(key: string, value: T[]): void;
  remove_item(key: string, value_id: string): void;
  clear(): void;
}
