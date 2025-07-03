import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Stock } from '../models/home/home.model';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private readonly localStorage = inject(DOCUMENT)?.defaultView?.localStorage;

  get<T>(key: string): T | null {
    const item = this.localStorage?.getItem(key);
    return item ? JSON.parse(item) : [];
  }

  set<T>(key: string, value: T): void {
    this.localStorage?.setItem(key, JSON.stringify(value));
  }

//delete below later
  updateOld<T extends Stock>(key: string, mergeValue: T): T[] {
    const value = this.get<T[]>(key);

    if (!value) {
       this.set(key, [mergeValue]);
       return [mergeValue];
    }
    
    const hasMergeValue = value.some(item => item.symbol === mergeValue.symbol);

    const newData = hasMergeValue
    ? value.filter(v => v.symbol !== mergeValue.symbol)
    : [...value, mergeValue];

    this.set(key, newData);
    return newData;
  }

  update<T >(key: string, mergeValue: T[]): T[] {
    const value = this.get<T[]>(key);

    this.set(key, mergeValue);
    return mergeValue;
  }
}
