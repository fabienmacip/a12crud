import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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
}
