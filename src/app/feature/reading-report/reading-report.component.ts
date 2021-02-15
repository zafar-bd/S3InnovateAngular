import * as Highcharts from 'highcharts';
import { Component, OnInit, Injectable, ViewEncapsulation } from '@angular/core';
import HC_stock from 'highcharts/modules/stock';
HC_stock(Highcharts);
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Moment } from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'app-reading-report',
  templateUrl: './reading-report.component.html',
  styleUrls: ['./reading-report.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReadingReportComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;
  buildings: any;
  objects: any;
  dataFields: any;
  apiServer = "http://localhost:58608/api/";
  readings: any = [];
  public data: any

  dateRange: { startDate: Moment, endDate: Moment };
  public buildingId: any = "";
  public dataFieldId: any = "";
  public objectId: any = "";

  constructor(
    private http: HttpClient) { }

  ngOnInit() {

    this.getBuildings();
    this.getDataFields();
    this.getDataObjects();
  }

  getReadings(url: string) {
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe((res: any) => {
        res.forEach((r: any) => {
          var arr = [new Date(r.timestamp).getTime(), r.value];
          this.readings.push(arr);
        });
        resolve(this.readings);
      }, err => {
        alert(err.error.detail)
      });
    });
  };

  getBuildings() {
    this.http.get(this.apiServer + "buildings").subscribe((res: any) => {
      this.buildings = res;
    });
  };

  getDataFields() {
    this.http.get(this.apiServer + "dataFields").subscribe((res: any) => {
      this.dataFields = res;
    });
  };

  getDataObjects() {
    this.http.get(this.apiServer + "objects").subscribe((res: any) => {
      this.objects = res;
    });
  };

  search() {
    var url = this.apiServer
      + 'readings?buildingId=' + this.buildingId
      + '&objectId=' + this.objectId
      + '&dataFieldId=' + this.dataFieldId
      + '&fromDate=' + moment(this.dateRange.startDate).format('YYYY-MM-DD')
      + '&toDate=' + moment(this.dateRange.endDate).format('YYYY-MM-DD');
    //url = "http://localhost:58608/api/readings?BuildingId=1&ObjectId=1&DataFieldId=1&FromDate=2019-06-01&ToDate=2019-06-01";
    if (this.dateRange.startDate && this.dateRange.endDate) {
      this.getReadings(url).then((res: any) => {
        this.chartOptions = {
          series: [
            {
              name: 'Reading',
              type: 'line',
              data: res,
              tooltip: {
                valueDecimals: 1,
                valueSuffix: ''
              }
            }
          ],
          credits: {
            enabled: false
          },
        };
      });
    }
    else {
      alert("Select date range please!")
    }
  }

}
