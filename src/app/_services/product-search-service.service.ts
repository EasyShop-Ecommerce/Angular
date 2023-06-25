import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductSearchServiceService {
  private searchQuerySubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  public searchQuery$: Observable<string> =
    this.searchQuerySubject.asObservable();
  select: any;

  constructor() {}

  setSearchQuery(query: string): void {
    this.searchQuerySubject.next(query);
  }

  getSelectedCategoryId(): Observable<number | null> {
    return this.selectedCategoryIdSubject.asObservable();
  }

  private selectedCategoryIdSubject: BehaviorSubject<number | null> =
    new BehaviorSubject<number | null>(null);
  public selectedCategoryId$: Observable<number | null> =
    this.selectedCategoryIdSubject.asObservable();

  setSelectedCategoryId(categoryId: number | null): void {
    this.selectedCategoryIdSubject.next(categoryId);
  }
}
