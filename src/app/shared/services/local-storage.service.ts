import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Stock } from '../models/home/app.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private readonly localStorage = inject(DOCUMENT)?.defaultView?.localStorage;
  private storageSubjects = new Map<string, BehaviorSubject<any>>();

  storage$<T>(key: string): Observable<T> {
    if (!this.storageSubjects.has(key)) {
      const initialValue = this.get<T>(key) ?? null;
      this.storageSubjects.set(key, new BehaviorSubject<T>(initialValue as T));
    }
    return this.storageSubjects.get(key)!.asObservable();
  }

  get<T>(key: string): T | null {
    const item = this.localStorage?.getItem(key);
    return item ? JSON.parse(item) : [];
  }

  set<T>(key: string, value: T): void {
    this.localStorage?.setItem(key, JSON.stringify(value));
  }

  update<T>(key: string, mergeValue: Stock[]): Stock[] {
    this.set(key, mergeValue);
    this.storageSubjects.get(key)?.next(mergeValue);
    return mergeValue;
  }

  remove<T>(key: string, itemToRemove: string): void {
    const value = this.get<Stock[]>(key) ?? [];
    const newValue = value.filter(item => item['symbol'] !== itemToRemove);
    this.set(key, newValue);
    this.storageSubjects.get(key)?.next(newValue);
  }
}
