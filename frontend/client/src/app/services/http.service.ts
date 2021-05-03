import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getData(dataUrl: string): Promise<any> {
    return this.http.get(dataUrl)
      .toPromise()
      .then(response => response);
  }

  postData(dataUrl: string, body: any): Promise<any> {
    return this.http.post(dataUrl, body)
      .toPromise()
      .then(response => response);
  }  

  putData(dataUrl: string, body: any): Promise<any> {
    return this.http.put(dataUrl, body)
      .toPromise()
      .then(response => response);
  }

  deleteData(dataUrl: string): Promise<any> {
    return this.http.delete(dataUrl)
      .toPromise()
      .then(response => response);
  }

  postFile(dataUrl: string, fileToUpload: File): Promise<any> {
    let formData = new FormData();
    formData.append('file', fileToUpload);
    
    return this.http
      .post(dataUrl, formData)
      .toPromise()
      .then(response => response);
}
}
