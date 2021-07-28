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
    searched = false;

    constructor(private articleService: ArticleService) { }

    search(term: string): void {
        this.searched = false;
        this.articles = [];
        this.articleCount = 0;
        this.articleService.getArticleIds(term)
        .subscribe(result => {
            const ids = this.trimIds(result);
            this.articleIds = ids;
        });
    }

    display() {
        this.articles = [];
        this.articleCount = 0;
        let idParam = "id=";
        for (let id of this.articleIds) {
            idParam = idParam + id + ",";
        }
        this.articleService.getSummary(idParam)
            .subscribe(result => {
                this.showArticles(result);
            })
    }

    addToRead(article: Article) {
        this.articleService.addToReadingList(article)
            .subscribe(result => {
                console.log(result);
            })
    }

    ngOnInit(): void {}

    trimIds(result: Object): any {
        let ids;
        Object.entries(result).forEach(entry => {
            const [key, value] = entry;
            if (key === "esearchresult") {
                Object.entries(value).forEach(v => {
                    const [k1, v1] = v;
                    if (k1 === "idlist") {
                        ids = v1;
                    }
                });
            }
        });
        return ids;
    }

    showArticles(result: Object) {
        Object.entries(result).forEach(entry => {
            const [k1, v1] = entry;
            if (k1 === "result") {
                Object.entries(v1).forEach(v => {
                    const [k2, v2] = v;
                    if (k2 === "uids") {
                        // @ts-ignore
                        this.articleCount = v2.length;
                    } else {
                        let article: Article = {aid: "", author: [], link: "", journal: "", title: "", date: ""};
                        // @ts-ignore
                        article.aid = v2.uid;
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
                            // @ts-ignore
                            article.author.push(v3.name);
                        });
                        // @ts-ignore
                        this.articles.push(article);
                    }
                });
            } else if (k1 === "esummaryresult") {
                this.searched = true;
            }
        });
    }

}
