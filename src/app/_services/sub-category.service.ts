import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subcategory } from '../_Models/Subcategory';

@Injectable({
  providedIn: 'root',
})
export class SubSubcategoryService {
  constructor(private http: HttpClient) {}

  dbUrl: string = 'https://localhost:44364/api/Subcategory/';
  //dbUrl: string = 'https://localhost:7239/api/Subcategory/';

  getAllSubcategories() {
    return this.http.get<Subcategory[]>(this.dbUrl);
  }

  addSubcategory(newSubcategory: Subcategory) {
    return this.http.post<Subcategory>(this.dbUrl, newSubcategory);
  }

  getsubcatById(id: number) {
    return this.http.get<Subcategory>(this.dbUrl + id);
  }
  updateSubcategory(id: number, subcat: Subcategory) {
    return this.http.patch<Subcategory>(this.dbUrl + id, subcat);
  }

  deleteSubcategoryById(id: number) {
    return this.http.delete(this.dbUrl + id);
  }
}
