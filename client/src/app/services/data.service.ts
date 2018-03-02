import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {
  private hydratedManifest;

  constructor(private http: HttpClient) {}

  shortenUrl(url) {
    return this.http.patch(`http://localhost:8000/api/tinyurl/`, {url: `${url}`});
  }

  updateClicks(tinyUrl) {
    return this.http.patch(`http://localhost:8000/api/click/`, {tinyUrl: tinyUrl});
  }

  getTinyUrls(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8000/api/tinyurl`);
  }
}
