import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../_Models/Review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }
  
  dbUrl: string = 'https://localhost:44364/api/Review/';
  isEditable?: boolean;

  getAllReviews() {
    return this.http.get<Review[]>(this.dbUrl);
  }

  addReview(newReview: Review) {
    return this.http.post<Review>(this.dbUrl, newReview);
  }

  getReviewById(id: number) {
    return this.http.get<Review>(this.dbUrl + id);
  }
  updateReview(productId:number,customerId: number, review:Review) {
    return this.http.put<Review>(`${this.dbUrl}product/${productId}/customer/${customerId}`,review);
  }

  deleteReviewById(productId:number,customerId: number) {
    return this.http.delete(`${this.dbUrl}product/${productId}/customer/${customerId}`);
  }
}
