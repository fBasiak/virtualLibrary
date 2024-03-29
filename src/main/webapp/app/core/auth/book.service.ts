import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Observable, ReplaySubject, of } from 'rxjs';

import { ApplicationConfigService } from '../config/application-config.service';
import {Book} from "./boook.model";
import {IUser} from "../../admin/user-management/user-management.model";
import {Pagination} from "../request/request.model";
import {createRequestOption} from "../request/request-util";
import {IBook} from "../../books/book.model";

@Injectable({ providedIn: 'root' })
export class BookService {

  private resourceUrl = this.applicationConfigService.getEndpointFor('api/books');


  constructor(
    private http: HttpClient,
    private applicationConfigService: ApplicationConfigService,
  ) {}

  save(book: Book): Observable<{}> {
    return this.http.post(this.applicationConfigService.getEndpointFor(this.resourceUrl), book);
  }

  create(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.resourceUrl, user);
  }

  update(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(this.resourceUrl, user);
  }

  find(login: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.resourceUrl}/${login}`);
  }

  query(req?: Pagination): Observable<HttpResponse<IBook[]>> {
    const options = createRequestOption(req);
    return this.http.get<IBook[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: bigint): Observable<{}> {
    return this.http.delete(`${this.resourceUrl}/${id}`);
  }

  bringBook(id: number): void{
    this.http.get(`${this.resourceUrl}/bring/${id}`);
  }






}
