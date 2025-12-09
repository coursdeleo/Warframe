export enum ItemType {
  THEORY = 'THEORY',
  UPDATE = 'UPDATE',
  IMAGE = 'IMAGE',
  NOTE = 'NOTE'
}

export interface BoardItem {
  id: string;
  type: ItemType;
  title: string;
  content: string;
  imageUrl?: string;
  tags?: string[];
  gridSpan?: 'col-span-1' | 'col-span-2'; // For layout variety
}

export interface GeneratorParams {
  topic: string;
  type: 'lore' | 'update';
}
