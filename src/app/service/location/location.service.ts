
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class LocationService {

  private _host;
  constructor(private _http: Http) {
    this._host = 'http://www.satit.nu.ac.th/node/location';
  }

  private packParameter(param) {
    let _parameter = Object.keys(param).map(function (key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(param[key]);
    }).join('&');
    return _parameter;
  }

  createBuilding(token, info) {
    let param = {
      token: token,
      name: info
    }
    return this._post(param, 'createNewBuilding');
  }

  createPlace(token, info) {
    let param = {
      token: token,
      name: info
    }
    return this._post(param, 'createNewPlace');
  }

  createRoom(token, info) {
    const param = {
      token: token,
      buildingId: info['id'],
      buildingLevel: info['level'],
      roomName: info['name']
    };
    return this._post(param, 'createNewRoom');
  }

  createSubPlace(token, info) {
    const param = {
      token: token,
      placeId: info['id'],
      subplaceName: info['name']
    };
    return this._post(param, 'createNewSubPlace');
  }

  getAllBuilding(token) {
    const param = {
      token: token
    };
    return this._post(param, 'getAllBuilding');
  }

  getLocationInfo(token, id){
    const param = {
      token: token,
      id: id
    };
    return this._post(param, 'getLocationInfo');
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
