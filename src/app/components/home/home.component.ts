import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { Country } from 'src/app/shared/interfaces/interface';
import { GetDataService } from 'src/app/shared/services/get-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public countries!: Country[];
  public form!: FormGroup;
  public filteredCountry!: Observable<Country[]>;

  constructor(
    private fb: FormBuilder,
    private getDataService: GetDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getCountryList();
    this.filteredCountry = this.form.get('searchValue')!.valueChanges.pipe(
      startWith(''),
      map(enteredValue => this._filter(enteredValue || '')));
  }

  private _filter(enteredValue: string): Country[] {
    const filterValue = enteredValue.toLowerCase();
    return this.countries.filter((country: Country) => country.name.toLowerCase().includes(filterValue));
  }

  initForm(): void {
    this.form = this.fb.group({
      searchValue: new FormControl('')
    });
  }

  clearSearch(): void {
    this.form.get('searchValue')?.setValue('');
  }

  getCountryList(): void {
    this.getDataService.getAvailableCountries().subscribe(res => {
      this.countries = res;
    });
  }

  countrySelected(country: Country): void {
    this.router.navigate(['/country'], { queryParams: country });
  }
}
