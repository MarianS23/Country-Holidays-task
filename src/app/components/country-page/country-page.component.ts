import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Holiday } from 'src/app/shared/interfaces/interface';
import { GetDataService } from 'src/app/shared/services/get-data.service';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.scss']
})
export class CountryPageComponent {
  public yearsList: number[] = Array.from({ length: 11 }, (_, i) => 2020 + i);
  public selectedYear: number = new Date().getFullYear();
  public currentCountryCode!: string;
  public currentCountryName!: string;
  public displayedColumns: string[] = ['position', 'name', 'date', 'type'];
  public dataSource!: Holiday[];

  constructor(
    private route: ActivatedRoute,
    private getDataService: GetDataService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentCountryCode = params['countryCode'];
      this.currentCountryName = params['name'];
      if (this.currentCountryCode) {
        this.getHolidays(this.currentCountryCode);
      }
    });
  }

  getHolidays(countryCode: string): void {
    this.getDataService.getPublicHolidaysByYear(countryCode, this.selectedYear)
      .subscribe(res => this.dataSource = res);
  }

  onYearChange(): void {
    this.getHolidays(this.currentCountryCode);
  }
}
