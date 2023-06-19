import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Section } from '../_Models/Section';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(private http: HttpClient) { }

  dbUrl: string = '';

  getAllSections() {
    return this.http.get<Section[]>(this.dbUrl);
  }

  addSection(newSection: Section) {
    return this.http.post<Section>(this.dbUrl, newSection);
  }

  getsectionById(id: number) {
    return this.http.get<Section>(this.dbUrl + id);
  }
  updateSection(id: number, Section: Section) {
    return this.http.patch<Section>(this.dbUrl + id, Section);
  }

  deleteSectionById(id: number) {
    return this.http.delete(this.dbUrl + id);
  }
}
