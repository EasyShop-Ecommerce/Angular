import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Shipper } from '../_Models/Shipper';

@Injectable({
  providedIn: 'root',
})
export class ShipperService {
  constructor(private http: HttpClient) {}

  dbUrl: string = 'https://localhost:44364/Shipper/';
  //dbUrl: string = 'https://localhost:7239/Shipper/';

  getAllShippers() {
    return this.http.get<Shipper[]>(this.dbUrl);
  }

  addShipper(newShipper: Shipper) {
    return this.http.post<Shipper>(this.dbUrl, newShipper);
  }

  getShipperById(id: number) {
    return this.http.get<Shipper>(this.dbUrl + id);
  }
  updateShipper(id: number, Shipper: Shipper) {
    return this.http.patch<Shipper>(this.dbUrl + id, Shipper);
  }

  deleteShipperById(id: number) {
    return this.http.delete(this.dbUrl + id);
  }
}
