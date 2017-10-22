import { Component, OnInit } from '@angular/core';
import { Post } from './post.model';
import { Meta, Title } from '@angular/platform-browser';
import { postIndex } from '../../posts/post-index';
import { ActivatedRoute } from '@angular/router';
import { config } from '../../config';

@Component({
  selector: 'app-content',
  templateUrl: 'content.component.html'
})
export class ContentComponent implements OnInit {
  public post: Post;
  public disqusEnabled = config.disqusName;

  constructor (private activatedRoute: ActivatedRoute,
               private title: Title,
               private meta: Meta) {
  }

  ngOnInit () {
    this.activatedRoute.params.subscribe((val) => {
      this.post = postIndex.find((p) => p.slug === val.name);
      if (this.post) {
        this.title.setTitle(this.post.title);
        const meta = this.post.meta ? this.post.meta : this.post.title;

        // there is room for improvements here
        this.meta.addTags([
          {name: 'Description', content: meta},
          {property: 'og:title', content: this.post.title},
          {property: 'og:url', content: window.location.href},
          {property: 'og:description', content: meta},
          {property: 'og:image', content: this.post.thumb},
          {property: 'og:type', content: config.ogType},
          {property: 'og:locale', content: config.ogLocale},
        ]);
      }
    });
  }
}
