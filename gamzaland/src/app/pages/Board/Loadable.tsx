import { lazyLoad } from 'utils/loadable';

export const Board = lazyLoad(
  () => import('./index'),
  module => module.Board,
);
