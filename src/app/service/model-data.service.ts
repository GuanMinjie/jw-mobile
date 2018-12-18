import { Injectable } from '@angular/core';
import { Model } from '../class/model';
import { Observable, of } from 'rxjs';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import apiConfig from '../config/api-config'


@Injectable({
  providedIn: 'root'
})

export class ModelDataService {

  constructor( private http: HttpClient) { }

  // 获取用户某个模型的信息
  getModel(id: number): Observable<any> {
    return this.http.get(`${apiConfig.model}/${id}.json`)
  }
  
  // 获取用户的模型列表
  getModelList() {
      return this.http.get<Model[]>(apiConfig.modelList)
  } 
}
