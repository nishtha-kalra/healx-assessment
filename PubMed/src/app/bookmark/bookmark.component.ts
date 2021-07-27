import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    console.log(localStorage.getItem("readingList"));
    if (localStorage.getItem("readingList")) {
      console.log(typeof(localStorage.getItem("readingList")));
      //this.getArticles(localStorage.getItem("readingList"));
    }
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

}
