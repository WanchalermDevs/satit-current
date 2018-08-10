
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class StudentService {

  private _host;
  constructor(private _http: Http) {
    this._host = 'http://www.satit.nu.ac.th/node/student';
  }

  getAStudentInfo(token, stdCode) {
    const param = {
      token: token,
      studentCode: stdCode
    };
    return this._post(param, 'getAStudentInfo');
  }

  getStudentInfoList(token, edu_year, level) {
    const param = {
      token: token,
      edu_year: edu_year,
      level: level
    };
    return this._post(param, 'getStudentList');
  }

  private packParameter(param) {
    let _parameter = Object.keys(param).map(function (key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(param[key]);
    }).join('&');
    return _parameter;
  }

  private _post(param, action) {
    return new Promise((resolve, reject) => {
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      // tslint:disable-next-line:max-line-length
      return this._http.post(this._host + '/' + action, this.packParameter(param), { headers: headers }).pipe(map((res: Response) => {
        let json;
        try {
          json = res.json();
        } catch (error) {

        }
        return json;
      })).subscribe((data) => {
        resolve(data);
      }, error => {
        return reject(error);
      });
    });
  }

}
