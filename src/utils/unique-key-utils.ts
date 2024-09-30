import { Columns } from '../types/table';

export function generateRowKey<T>(item: T, columns: Columns<T>[]): string {
  return columns.map((col) => `${item[col.dataIndex]}-${col.key}`).join('-');
}
