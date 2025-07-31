import {LocalStorageApi} from "../../core/Common/spi/LocalStorageApi.ts";

export class SessionStorageBrowserApi implements LocalStorageApi {

    public get_item<T>(key: string): T | null {
        try {
            const value = sessionStorage.getItem(key);
            if (!value) return null;
            return JSON.parse(value);
        }catch (_: unknown) {
            console.log(_);
            sessionStorage.removeItem(key);
            return null;
        }
    }

    public set_item<T>(key: string, value: T): void {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    public add_item<T>(key: string, value: T): void {
        const items: T[] = JSON.parse(sessionStorage.getItem(key) || "[]");
        this.set_item(key, [...items, value]);
    }

    public add_items<T>(key: string, values: T[]) {
        const items: T[] = JSON.parse(localStorage.getItem(key) || "[]");
        this.set_item(key, items.concat(values));
    }

    public clear(): void {
        sessionStorage.clear();
    }
}

export const sessionStorageBrowserApi = new SessionStorageBrowserApi();