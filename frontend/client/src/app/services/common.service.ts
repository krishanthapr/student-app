import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  coreServiceUrl: string = ''

  constructor() {
    this.coreServiceUrl = environment.CORE_SERVICE_URL;
  }

  public getCoreServiceUrl(): string {
    return this.coreServiceUrl;
  }
}
