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
    //console.log(localStorage.getItem("readingList"));
    //if (localStorage.getItem("readingList")) {
      //console.log(typeof(localStorage.getItem("readingList")));
      //this.getArticles(localStorage.getItem("readingList"));
    //}
  }

  /*getArticles(list) {
    let idParam = "id=";

    for (let id of list) {
      //console.log(id);
      idParam = idParam + id + ",";
    }
    //console.log(idParam);
    this.articleService.getSummary(idParam)
        .subscribe(result => {
          //console.log(result);
          this.showArticles(result);
        })
  }*/

  getArticles() {
    this.articleService.getReadingList()
        .subscribe(result => {
          console.log(result);
        })
  }
}
