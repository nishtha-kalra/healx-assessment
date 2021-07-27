import { Component, OnInit } from '@angular/core';
import { ArticleService } from "../article.service";

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {
  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles() {
    this.articleService.getReadingList()
        .subscribe(result => {
          console.log(result);
        })
  }
}
