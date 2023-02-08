
import { Injectable } from '@angular/core';

@Injectable({
    providedIn : 'root'
})
export class LocalDataService{

    userLanguageKey = 'user_language';

    private storage = window.localStorage;
    constructor() {

    }

    getItem(key: string) {
        return this.storage.getItem(key);
    }

    setItem(key: string, data: any) {
        this.storage.setItem(key, JSON.stringify(data));
    }

    removeItem(key: string) {
        this.storage.removeItem(key);
    }

}