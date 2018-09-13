
import { map } from 'rxjs/operators';
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

  createListOfMemberExcel(token, data, subject) {
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

  checkStudentRegisted(token, stdCode) {
    const param = {
      token: token,
      stdCode: stdCode
    };
    return this._post(param, 'checkStudentRegisted');
  }

  getCongregationAll(token, year, semester) {
    const param = {
      token: token,
      year: year,
      semester: semester
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

  setSubjectStandard(token, subject_id, standard) {
    const param = {
      token: token,
      subject_id: subject_id,
      standard: JSON.stringify(standard)
    };
    return this._post(param, 'insertSubjectStandard');
  }

  insertFile(token, subject_id, target, file) {
    const param = {
      token: token,
      subject_id: subject_id,
      target: target,
      file: JSON.stringify(file)
    };
    return this._post(param, 'insertFile');
  }

  getClubPhoto(token, subject_id) {
    const param = {
      token: token,
      subject_id: subject_id
    };
    return this._post(param, 'getClubPhoto');
  }

  getSubjectStandard(token, subject_id) {
    const param = {
      token: token,
      subject_id: subject_id
    };
    return this._post(param, 'getSubjectStandard');
  }



  getClubInfoById(token, id) {
    const param = {
      token: token,
      id: id
    };
    return this._post(param, 'getCongregationById');
  }

  getAttendence(token, student_code, subject_id) {
    const param = {
      token: token,
      student_code: student_code,
      subject_id: subject_id
    };
    return this._post(param, 'getAttendence');
  }

  getAttendenceByTime(token, subject_id, time) {
    const param = {
      token: token,
      subject_id: subject_id,
      time: time
    };
    return this._post(param, 'getAttendenceByTime');
  }

  initStudentListExcel(token, subject_id, student, info) {
    const param = {
      token: token,
      subject_id: subject_id,
      info: JSON.stringify(info),
      student: JSON.stringify(student)
    };
    return this._post(param, 'initStudentListExcel');
  }

  saveAttendance(token, year, subject_id, time, att, action) {
    if (action) {
      const param = {
        token: token,
        subject_id: subject_id,
        time: time,
        year: year,
        att: JSON.stringify(att)
      };
      return this._post(param, 'updateAttendance');
    } else {
      const param = {
        token: token,
        subject_id: subject_id,
        time: time,
        year: year,
        att: JSON.stringify(att)
      };
      return this._post(param, 'insertAttendance');
    }

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
