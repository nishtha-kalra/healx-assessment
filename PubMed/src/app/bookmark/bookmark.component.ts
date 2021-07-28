import { Component, OnInit } from '@angular/core';
import { ArticleService } from "../article.service";
import {Article} from "../article";

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {
  readingList: Article[] = [];

  constructor(private articleService: ArticleService) { }
  ngOnInit(): void {
    this.getArticles();
  }

  getArticles() {
    this.articleService.getReadingList()
        .subscribe(result => {
          this.displayList(result);
        })
  }

  displayList(articles: Object) {
    Object.entries(articles).forEach(entry => {
      const [key, value] = entry;
      let article: Article = {aid: "", author: [], link: "", journal: "", title: "", date: ""};
      Object.entries(value).forEach(a => {
        if (a[0] === "aid") {
          // @ts-ignore
          article.aid = a[1];
        } else if (a[0] === "link") {
          // @ts-ignore
          article.link = a[1];
        } else if (a[0] === "journal") {
          // @ts-ignore
          article.journal = a[1];
        } else if (a[0] === "title") {
          // @ts-ignore
          article.title = a[1];
        } else if (a[0] === "date") {
          // @ts-ignore
          article.date = a[1];
        }
      });
      this.readingList.push(article);
    });
  }
}
