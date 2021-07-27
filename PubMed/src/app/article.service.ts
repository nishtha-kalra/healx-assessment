import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import {Article} from "./article";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  pubMedURL: string = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/";
  serverURL: string = "http://127.0.0.1:8000/articles/";
  constructor(private http: HttpClient) { }

  getArticleIds(term: string): Observable<Object> {
    const url = this.pubMedURL + "esearch.fcgi?db=pubmed&retmax=20&retmode=json&term=" + term;
    return this.http.get(url);
  }

  getSummary(idParam: string): Observable<Object> {
    const url = this.pubMedURL + "esummary.fcgi?db=pubmed&retmode=json&" + idParam;
    return this.http.get(url);
  }

  getReadingList(): Observable<Object> {
    return this.http.get(this.serverURL);
  }
}
