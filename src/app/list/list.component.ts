import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../content/post.model';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { config } from '../../config';
import { postIndex } from '../../posts/post-index';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit, OnDestroy {
  public indexFiltered: Post[];
  public selectedTag: string;
  private sub: any;

  constructor (private title: Title,
               private route: ActivatedRoute,
               private router: Router) {
  }

  ngOnInit () {
    this.title.setTitle(config.blogName);
    this.indexFiltered = postIndex;
    this.sub = this.route.params.subscribe(params => {
      this.selectedTag = params['tag'];
      this.filter();
    });
  }

  ngOnDestroy () {
    this.sub.unsubscribe();
  }

  filter (): void {
    if (this.selectedTag) {
      this.indexFiltered = postIndex.filter((p) => p.tags.includes(this.selectedTag));
    }
  }

  toggleTag(tag: string) {
    if (this.selectedTag === tag) {
      this.router.navigate(['/list']).catch();
    } else {
      this.router.navigate(['/list', tag]).catch();
    }
  }
}
