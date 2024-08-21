import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/env';
import { Observable } from 'rxjs';
import { Country,Holiday } from '../interfaces/interface'


@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  private api = environment.BASE_API_URL;
  constructor(
    private http: HttpClient
  ) { }

  getAvailableCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.api}/${environment.AvailableCountries}`);
  }
  
  getNextPublicHolidays(countryCode: string): Observable<Holiday[]> {
    return this.http.get<Holiday[]>(`${this.api}/${environment.NextPublicHolidays}/${countryCode}`);
  }

  getPublicHolidaysByYear(countryCode: string, year: number): Observable<Holiday[]> {
    return this.http.get<Holiday[]>(`${this.api}/${environment.PublicHolidays}/${year}/${countryCode}`);
  }
}
