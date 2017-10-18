import { Post } from '../../app/content/post.model';

const path = 'blog-series';

export const blogSeries: Post[] = [
  {
    title: 'How to setup Travis CI with Angular and GitHub Pages',
    date: new Date('10/18/2017'),
    tags: ['angular', 'github', 'travis-ci'],
    slug: 'setup-travis-ci-angular-github-pages',
    path: path
  },
/*  {
    title: 'How to copy this blog for yourself',
    subtitle: '2017 - Work In Progress',
    tags: [],
    slug: 'how-to-copy-this-blog-for-yourself',
    path: path
  },*/
  {
    title: 'Making my blog with angular and github pages like Jekyll',
    date: new Date('11/12/1996'),
    subtitle: '2017 - Work In Progress',
    tags: ['angular', 'github', 'sass', 'milligram'],
    slug: 'making-my-blog-angular-github-pages',
    path: path
  },
];
