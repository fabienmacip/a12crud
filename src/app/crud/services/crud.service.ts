import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpResponse } from '../models/http-response';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private httpClient: HttpClient
  ) { }

  loadProducts() {
    const url = environment.API_EndPoint + 'view.php';
    return this.httpClient.get(url).pipe(map((data: any) => data));
  }

  createProduct(data: any): Observable<HttpResponse>{
    const url = environment.API_EndPoint + 'create.php';
    return this.httpClient.post(url, data).pipe(map((data: any) => data));
  }

}
