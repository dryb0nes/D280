import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './worldMap.component.html',
  styleUrls: ['./worldMap.component.css']
})


export class worldMapComponent {

  countryData: any = {};

  constructor(public apiService: ApiService) { }
  

  getCountryData($event: any) {
    this.apiService.setCountryData($event).subscribe((data: any) => {
      this.countryData = data;
    });
  }



}