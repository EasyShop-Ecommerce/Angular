import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../_Models/Review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }
  
  dbUrl: string = '';

  getAllReviews() {
    return this.http.get<Review[]>(this.dbUrl);
  }

  addReview(newReview: Review) {
    return this.http.post<Review>(this.dbUrl, newReview);
  }

  getReviewById(id: number) {
    return this.http.get<Review>(this.dbUrl + id);
  }
  updateReview(id: number, Review: Review) {
    return this.http.patch<Review>(this.dbUrl + id, Review);
  }

  deleteReviewById(id: number) {
    return this.http.delete(this.dbUrl + id);
  }
}
