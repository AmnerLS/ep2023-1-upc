import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, retry, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ParticipantsService {
  basePath: string = `${environment.serverBasePath}`;
  resourceEndpoint: string = '/participants';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    })
  }

  constructor(private http: HttpClient) {  }

  private resourcePath(): string {
    return `${this.basePath}${this.resourceEndpoint}`;
  }

  handleError(error: HttpErrorResponse) {
    // Default error handling
    if (error.error instanceof ErrorEvent) {
      console.log(`An error occurred ${error.error.message}`);
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.log(`Backend returned code ${error.status}, body was ${error.error}`);
    }
    return throwError(() => new Error('Something happened with request, please try again later'));
  }

  getAll(){
    return this.http.get(this.resourcePath(), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getByParam(param:any, value:any){
    return this.http.get(`${this.resourcePath()}/?${param}=${value}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

}
