
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class CongregationService {
  private _host;
  constructor(private _http: Http) {
    this._host = 'http://www.satit.nu.ac.th/node/congregation';
  }

  private packParameter(param) {
    let _parameter = Object.keys(param).map(function (key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(param[key]);
    }).join('&');
    return _parameter;
  }

  createListOfMemberExcel(token, data, subject){
    const param = {
      token: token,
      data: data,
      subject: subject
    };
    return new Promise((resolve, reject) => {
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      // tslint:disable-next-line:max-line-length
      return this._http.post('http://localhost:3000/', this.packParameter(param), { headers: headers }).pipe(map((res: Response) => {
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

  updateStudentList(token, id, student) {
    const param = {
      token: token,
      id: id,
      student: JSON.stringify(student)
    };
    return new Promise((resolve, reject) => {
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      // tslint:disable-next-line:max-line-length
      return this._http.post(this._host + '/updateStudentList', this.packParameter(param), { headers: headers }).pipe(map((res: Response) => {
        let json;
        try {
          json = res.json();
          json.headers = res.headers;
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

  createNewCongregation(token, info) {
    const param = {
      token: token,
      info: JSON.stringify(info)
    };
    return new Promise((resolve, reject) => {
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      // tslint:disable-next-line:max-line-length
      return this._http.post(this._host + '/newCongragation', this.packParameter(param), { headers: headers }).pipe(map((res: Response) => {
        let json;
        try {
          json = res.json();
          json.headers = res.headers;
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

  myCongregationAll(token) {
    const param = {
      token: token
    };
    return this._post(param, 'getMyCongregationAll');
  }

  congregationInfo(token, id) {
    const param = {
      token: token,
      id: id
    };
    return this._post(param, 'getACongregation');
  }

  getCongregationAll(token) {
    const param = {
      token: token
    };
    return this._post(param, 'getCongregationAll');
  }

  editCongregation(token, info, id) {
    const param = {
      token: token,
      info: JSON.stringify(info),
      id: id
    };
    return this._post(param, 'editCongragation');
  }

  removeCongregation(token, id) {
    const param = {
      token: token,
      id: id
    };
    return this._post(param, 'removeCongregation');
  }

  checkStudentRegisted(token, studentCode) {
    const param = {
      token: token,
      stdCode: studentCode
    };
    return this._post(param, 'checkStudentRegisted');
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
