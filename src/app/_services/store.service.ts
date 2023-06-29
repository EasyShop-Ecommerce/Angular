import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private http: HttpClient) {}

  dbUrl: string = '';

  getAllStores() {
    return this.http.get<Store[]>(this.dbUrl);
  }

  addStore(newStore: Store) {
    return this.http.post<Store>(this.dbUrl, newStore);
  }

  getStoreById(id: number) {
    return this.http.get<Store>(this.dbUrl + id);
  }
  updateStore(id: number, Store: Store) {
    return this.http.patch<Store>(this.dbUrl + id, Store);
  }

  deleteStoreById(id: number) {
    return this.http.delete(this.dbUrl + id);
  }
}
