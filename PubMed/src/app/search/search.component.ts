import { Component, OnInit } from '@angular/core';
import { Article } from "../article";
import { ArticleService } from "../article.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private articleService: ArticleService) { }
  articleIds: string[] = [];

  search(term: string): void {
    console.log(term);
    this.articleService.getArticleIds(term).subscribe(ids => this.articleIds = ids)
    console.log(this.articleIds);
  }
  ngOnInit(): void {
  }

}
