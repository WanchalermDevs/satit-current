
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class AuthService {

  private _host;

  constructor(private _http: Http) {
    this._host = 'http://www.satit.nu.ac.th/node';
  }

  private packParameter(param) {
    var _parameter = Object.keys(param).map(function (key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(param[key]);
    }).join('&');
    return _parameter;
  }

  getTPSAuthority(user_id, token) {
    const param = {
      user_id: user_id
    };
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return this._http.post(this._host + '/user/tpsAuthority', this.packParameter(param), { headers: headers }).subscribe((res) => {
        console.log(res);
        return res;
      });
    });

  }

  getMISAuthority(token) {
    const param = {
      token: token
    };
    return new Promise((resolve, reject) => {
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return this._http.post(this._host + '/user/misAuthority', this.packParameter(param), { headers: headers }).pipe(map((res: Response) => {
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

  getToken(user) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return this._http.post(this._host + '/user/setToken', this.packParameter(user), { headers: headers }).pipe(map((res: Response) => {
        // console.log(res);
        var json = res.json();
        json.headers = res.headers;
        return json;
      })).subscribe((data) => {
        resolve(data);
      }, error => {
        return reject(error);
      });
    });
  }

  getAllSatitAuthorities(token){
    const param = {
      token: token
    };
    return new Promise((resolve, reject) => {
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return this._http.post(this._host + '/user/getAllSatitAuthorities', this.packParameter(param), { headers: headers }).pipe(map((res: Response) => {
        let json;
        try {
          json = res.json();
          // json.headers = res.headers;
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

  getUserInfo(token) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-type', 'application/x-www-form-urlencoded');
      return this._http.post(this._host + '/user/userInfo', this.packParameter({ token: token }), { headers: headers }).pipe(map((res: Response) => {
        try {
          var json = res.json();
          json.headers = res.headers;
        } catch (err) {
        }
        return json;
      })).subscribe((data) => {
        resolve(data);
      }, error => {
        return reject(error);
      })
    });
  }

  authentication(user, pass) {
    const param = {
      username: user,
      password: pass
    };
    return new Promise((resolve, reject) => {
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      // tslint:disable-next-line:max-line-length
      return this._http.post('http://www.satit.nu.ac.th/codeLdap/ldap.php', this.packParameter(param), { headers: headers }).pipe(map((res: Response) => {
        // console.log(res);
        try {
          var json = res.json();
          this._http.post(this._host + '/user/log_login', this.packParameter(json), { headers: headers }).subscribe(() => {
          });
          json.headers = res.headers;
        } catch (err) {

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
