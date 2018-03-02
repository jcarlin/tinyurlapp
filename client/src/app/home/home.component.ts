import { Component, OnInit, Input, Output, Injectable } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { MatFormField } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material';

import { DataService } from '../services/data.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public urls$: Observable<any[]>;

  constructor(
    public auth: AuthService,
    private http: HttpClient,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.urls$ = this.dataService.getTinyUrls();
  }

  // clearUrls() {
  //   this.dataService.clearUrls();
  // }

  shortenUrl(url) {
    console.log(url);

    this.dataService.shortenUrl(url).subscribe(
      result => {
        console.log('result: ', result);
        this.urls$ = this.dataService.getTinyUrls();
      },
      err => {
        console.log(err);
      }
    );
  }

  tinyUrlClicked($event) {
    const tinyUrl = $event.currentTarget.href;

    this.dataService.updateClicks(tinyUrl).subscribe(
      result => {
        console.log('result: ', result);
        this.urls$ = this.dataService.getTinyUrls();
      },
      err => {
        console.log(err);
      }
    );
  }
}
