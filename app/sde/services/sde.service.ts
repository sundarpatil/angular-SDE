import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { environment } from '../../src/environments/environment';
import { ISDEModel } from '../models/SDEModel';

import {
  IGenericTestModel,
  ISDETreeViewModel
} from '../models/SDETreeViewModel';

@Injectable({
  providedIn: 'root'
})
export class SDEService {
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  };

  constructor(public http: HttpClient) {}

  public getCaseType(): Observable<string[]> {
    const url = `${environment.apiUrl}/casetypes/list`;
    return this.http.get<string[]>(url);
  }

  public getBodySite(): Observable<string[]> {
    const url = `${environment.apiUrl}/bodysite/list`;
    return this.http.get<string[]>(url);
  }

  public getSubSite(): Observable<string[]> {
    const url = `${environment.apiUrl}/subsite/list`;
    return this.http.get<string[]>(url);
  }

  public getDiagnosis(): Observable<string[]> {
    const url = `${environment.apiUrl}/diagnosis/list`;
    return this.http.get<string[]>(url);
  }

  public getSpecialProcedure(): Observable<string[]> {
    const url = `${environment.apiUrl}/specialprocedure/list`;
    return this.http.get<string[]>(url);
  }

  public getGenericTest(): Observable<IGenericTestModel[]> {
    const url = `${environment.apiUrl}/generictest/list`;
    return this.http.get<IGenericTestModel[]>(url);
  }

  public getCPTCode(): Observable<string[]> {
    const url = `${environment.apiUrl}/cptcode/list`;
    return this.http.get<string[]>(url);
  }

  public getICDCode(): Observable<string[]> {
    const url = `${environment.apiUrl}/icdcode/list`;
    return this.http.get<string[]>(url);
  }

  public getStructedDataEntry(caseType: string): Promise<ISDEModel[]> {
    const url = `${environment.apiUrl}/structureddataentry/list/${caseType}`;
    return new Promise<ISDEModel[]>(resolve => {
      this.http.get<ISDEModel[]>(url).subscribe(res => {
        resolve(res);
      });
    });
  }

  public getStructedDataEntryTreeView(
    caseType: string
  ): Promise<ISDETreeViewModel> {
    const url = `${
      environment.apiUrl
    }/structureddataentrytreeview/list/${caseType}`;
    return new Promise<ISDETreeViewModel>(resolve => {
      this.http.get<ISDETreeViewModel>(url).subscribe(res => {
        resolve(res);
      });
    });
  }

  public delete(id: Guid): Promise<boolean> {
    const url = `${environment.apiUrl}/structureddataentry/delete/${id}`;
    return new Promise<boolean>(resolve => {
      this.http.delete(url, { observe: 'response' }).subscribe(res => {
        if (res.status === 204) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  public saveSDE(sde: ISDETreeViewModel): Promise<boolean> {
    const url = `${environment.apiUrl}/structureddataentrytreeview/add`;
    return new Promise<boolean>(resolve => {
      this.http.post(url, sde, { observe: 'response' }).subscribe(res => {
        res.status === 201 ? resolve(true) : resolve(false);
      });
    });
  }
}
