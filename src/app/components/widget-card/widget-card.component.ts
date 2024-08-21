import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Country, Holiday } from 'src/app/shared/interfaces/interface';
import { GetDataService } from 'src/app/shared/services/get-data.service';

@Component({
  selector: 'app-widget-card',
  templateUrl: './widget-card.component.html',
  styleUrls: ['./widget-card.component.scss']
})
export class WidgetCardComponent implements OnInit {
  public currentCountry!: Country;
  public currentHoliday!: Holiday;

  constructor(
    private getDataService: GetDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCountryList();
  }

  getCountryList(): void {
    this.getDataService.getAvailableCountries().subscribe(res => {
      this.currentCountry = this.getRandomCountry(res);
      this.getNextHolidays();
    });
  }

  getNextHolidays(): void {
    this.getDataService.getNextPublicHolidays(this.currentCountry.countryCode)
      .pipe(map(res => res[0]))
      .subscribe(res => {
        this.currentHoliday = res;
      });
  }

  getRandomCountry(countryList: Country[]): Country {
    const randomIndex = Math.floor(Math.random() * countryList.length);
    return countryList[randomIndex];
  }

  selectedCountry(country: Country): void {
    this.router.navigate(['/country'], { queryParams: country });
  }
}
