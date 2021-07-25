import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import {Article} from "./article";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getArticleIds(term: string): Observable<string[]> {
    const url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmax=20&retmode=json&term=" + term;
    return this.http.get<[]>(url)
    //const ids = of(["1", "2"])
    //return ids
  }
}
