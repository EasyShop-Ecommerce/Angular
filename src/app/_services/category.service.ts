import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../_Models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  dbUrl: string = 'https://localhost:44364/api/Category/';

  getAllCategories() {
    return this.http.get<Category[]>(this.dbUrl);
  }

  addCategory(newCategory: Category) {
    return this.http.post<Category>(this.dbUrl, newCategory);
  }

  getcatById(id: number) {
    return this.http.get<Category>(this.dbUrl + id);
  }
  updateCategory(id: number, cat: Category) {
    return this.http.patch<Category>(this.dbUrl + id, cat);
  }

  deleteCategoryById(id: number) {
    return this.http.delete(this.dbUrl + id);
  }
}
