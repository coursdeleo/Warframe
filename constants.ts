import { BoardItem, ItemType } from './types';

export const INITIAL_ITEMS: BoardItem[] = [
  {
    id: '1',
    type: ItemType.UPDATE,
    title: 'Warframe 1999',
    content: 'Un retour dans le passé alternatif. Arthur et les Proto-frames. L\'infection Techrot se répand dans une métropole rétro-futuriste.',
    imageUrl: 'https://picsum.photos/seed/wf1999/800/400',
    tags: ['Hiver 2024', 'Proto-frame', 'Lore'],
    gridSpan: 'col-span-2'
  },
  {
    id: '2',
    type: ItemType.THEORY,
    title: 'Le Mur',
    content: 'L\'Homme dans le Mur n\'est pas une entité, mais le reflet de l\'indifférence cosmique de l\'univers envers les Tenno.',
    tags: ['Void', 'Wally'],
    gridSpan: 'col-span-1'
  },
  {
    id: '3',
    type: ItemType.IMAGE,
    title: 'Esthétique Infestée',
    content: 'Concept art pour une nouvelle zone infestée sur Deimos. Plus de chair, plus de dents.',
    imageUrl: 'https://picsum.photos/seed/deimos/400/400',
    tags: ['Art', 'Moodboard'],
    gridSpan: 'col-span-1'
  },
  {
    id: '4',
    type: ItemType.UPDATE,
    title: 'Refonte Caliban',
    content: 'Amélioration des capacités Sentient pour une meilleure synergie et survivabilité en Steel Path.',
    tags: ['Rework', 'Balance'],
    gridSpan: 'col-span-1'
  }
];
