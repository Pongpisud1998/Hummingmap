import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class WebserviceService {

  base_url = 'http://localhost:8888/api/test-theme/';
  api_node:any;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    })
  }

  image:any;

  constructor(
    private http: HttpClient,
  ) {
    this.api_node = 'https://ows.mapedia.co.th:9090/api/v1';
  }

  async get_province() {
    return new Promise((res, rej) => {
      this.http.get(this.api_node + '/province/list')
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }

  async get_amphoe(pv_th:any) {
    return new Promise((res, rej) => {
      this.http.get(this.api_node + '/province/amphoe/' + pv_th)
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }

  async get_tambol(pv_th:any, ap_th:any) {
    return new Promise((res, rej) => {
      this.http.get(this.api_node + '/province/tambon/' + pv_th + '/' + ap_th)
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }

  async login(data:any) {
    return new Promise((res, rej) => {
      this.http.post(this.base_url + 'sent_data.php?table=login',JSON.stringify(data))
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }

  async province() {
    return new Promise((res, rej) => {
      this.http.get(this.base_url + 'get_data.php?table=province')
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }

  async amphoe(pv_th:any) {
    return new Promise((res, rej) => {
      this.http.get(this.base_url + 'get_data.php?table=amphoe&pv_th='+pv_th)
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }

  async tambon(pv_th:any,ap_th:any) {
    return new Promise((res, rej) => {
      this.http.get(this.base_url + 'get_data.php?table=tambon&pv_th='+pv_th+"&ap_th="+ap_th)
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }

  async airData() {
    return new Promise((res, rej) => {
      this.http.get("http://air4thai.pcd.go.th/services/getNewAQI_JSON.php")
        .subscribe((data: any) => {
          res(data)
        }, (err: any) => {
          rej(err)
        });
    });
  }
}
