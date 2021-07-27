import { Component, OnInit } from '@angular/core';
import { Article } from "../article";
import { ArticleService } from "../article.service";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    articleIds: any = []
    articleCount: number = 0;
    articles: Article[] = [];
    readingList: number[] = [];
    constructor(private articleService: ArticleService) { }

    search(term: string): void {
        this.articles = [];
        this.articleCount = 0;
        //console.log(term);
        this.articleService.getArticleIds(term)
        .subscribe(result => {
            //console.log(result);
            const ids = this.trimIds(result);
            //console.log(ids);
            this.articleIds = ids;
            //console.log(this.articleIds);
        });
    }

    display() {
        //console.log(this.articleIds);
        this.articles = [];
        this.articleCount = 0;
        let idParam = "id=";
        for (let id of this.articleIds) {
            //console.log(id);
            idParam = idParam + id + ",";
        }
        //console.log(idParam);
        this.articleService.getSummary(idParam)
            .subscribe(result => {
                //console.log(result);
                this.showArticles(result);
            })
    }

    addToRead(id: number) {
        console.log("add to reading list");
        this.readingList.push(id);
        localStorage.setItem("readingList", JSON.stringify(this.readingList));
    }

    ngOnInit(): void {}

    trimIds(result: Object): any {
        let ids;
        //console.log("inside trim ids");
        Object.entries(result).forEach(entry => {
            const [key, value] = entry;
            if (key === "esearchresult") {
                Object.entries(value).forEach(v => {
                    const [k1, v1] = v;
                    if (k1 === "idlist") {
                        //console.log(v1);
                        ids = v1;
                    }
                });
            }
        });
        return ids;
    }

    showArticles(result: Object) {
        console.log("inside show articles");
        Object.entries(result).forEach(entry => {
            const [k1, v1] = entry;
            if (k1 === "result") {
                Object.entries(v1).forEach(v => {
                    const [k2, v2] = v;
                    if (k2 === "uids") {
                        // @ts-ignore
                        this.articleCount = v2.length;
                    } else {
                        console.log(v2);
                        let article: Article = {id: 0, author: [], link: "", journal: "", title: "", date: ""};
                        // @ts-ignore
                        article.id = v2.uid;
                        // @ts-ignore
                        article.date = v2.pubdate;
                        // @ts-ignore
                        article.title = v2.title;
                        // @ts-ignore
                        article.journal = v2.fulljournalname;
                        // @ts-ignore
                        article.link = "https://pubmed.ncbi.nlm.nih.gov/" + k2;
                        // @ts-ignore
                        console.log(v2.authors);
                        // @ts-ignore
                        console.log(typeof(v2.authors));
                        // @ts-ignore
                        Object.entries(v2.authors).forEach(a => {
                            const [k3, v3] = a;
                            console.log(v3);
                            // @ts-ignore
                            console.log(v3.name);
                            // @ts-ignore
                            article.author.push(v3.name);
                        });
                        // @ts-ignore
                        //console.log(article);
                        this.articles.push(article);
                    }
                });
            }
        });
        console.log(this.articles);
    }

}
