
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchbycatService {

  constructor() { }

  private selectedCategoryIdSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  public selectedCategoryId$: Observable<number | null> = this.selectedCategoryIdSubject.asObservable();

  setSelectedCategoryId(categoryId: number | null): void {
    this.selectedCategoryIdSubject.next(categoryId);
  }
}

