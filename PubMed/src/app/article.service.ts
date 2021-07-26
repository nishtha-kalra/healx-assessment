import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import {Article} from "./article";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  baseURL: string = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/";
  constructor(private http: HttpClient) { }

  getArticleIds(term: string): Observable<Object> {
    const url = this.baseURL + "esearch.fcgi?db=pubmed&retmax=20&retmode=json&term=" + term;
    return this.http.get(url);
  }

  getSummary(idParam: string): Observable<Object> {
    const url = this.baseURL + "esummary.fcgi?db=pubmed&retmode=json&" + idParam;
    return this.http.get(url);
  }
}
