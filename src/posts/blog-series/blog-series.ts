import { Post } from '../../app/content/post.model';

const path = 'blog-series';

export const blogSeries: Post[] = [
  {
    title: 'Writing a angular 4 blog without backend, kinda like Jekyll',
    date: 'somewhere in 2017',
    tags: ['angular'],
    slug: 'writing-angular-blog-without-backend',
    path: path
  },
  {
    title: 'Writing some css, angular blog',
    date: 'somewhere in 2017',
    tags: ['angular', 'sass', 'milligram'],
    slug: 'making-some-css-angular-blog',
    path: path
  },
];
