import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from "./search/search.component";
import { BookmarkComponent } from "./bookmark/bookmark.component";

const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'bookmark', component: BookmarkComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
