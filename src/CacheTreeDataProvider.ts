import * as vscode from 'vscode';
import { CacheSnapshot, QuerySummary } from './types';

export class CacheTreeDataProvider implements vscode.TreeDataProvider<QueryItem> {
  private _onDidChangeTreeData = new vscode.EventEmitter<QueryItem | undefined>();
  readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

  private queries: QuerySummary[] = [];

  getTreeItem(element: QueryItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: QueryItem): QueryItem[] {
    if (!element) {
      if (!this.queries.length) {
        return [new QueryItem({ key: ['No queries'], status: 'idle' })];
      }

      return this.queries.map(
        (q) =>
          new QueryItem(
            q,
            q.data ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None,
            q.data
          )
      );
    }

    const value = element.value;

    if (Array.isArray(value)) {
      return value.map((val, i) => {
        const collapsible =
          typeof val === 'object' ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None;
        return new QueryItem(
          { key: [`[${i}]`], status: '' },
          collapsible,
          val
        );
      });
    }

    if (typeof value === 'object' && value !== null) {
      return Object.entries(value).map(([key, val]) => {
        const collapsible =
          typeof val === 'object'
            ? vscode.TreeItemCollapsibleState.Collapsed
            : vscode.TreeItemCollapsibleState.None;
        return new QueryItem(
          { key: [key], status: '' },
          collapsible,
          val
        );
      });
    }

    return [];
  }

  updateCache(data: CacheSnapshot) {
    this.queries = data.queries;
    this._onDidChangeTreeData.fire(undefined);
  }
}

class QueryItem extends vscode.TreeItem {
  constructor(
    public query: QuerySummary,
    public collapsibleState: vscode.TreeItemCollapsibleState = vscode.TreeItemCollapsibleState.None,
    public value?: any
  ) {
    super(QueryItem.formatLabel(query.key.join(' → '), value), collapsibleState);

    if (value !== undefined && typeof value !== 'object') {
      this.description = QueryItem.shortValue(value);
    }

    this.tooltip =
      typeof value === 'object' && value !== null
        ? JSON.stringify(value, null, 2)
        : String(value ?? '');

    this.iconPath = new vscode.ThemeIcon(
      query.status === 'success'
        ? 'check'
        : query.status === 'loading'
        ? 'sync'
        : query.status === 'error'
        ? 'error'
        : typeof value === 'object'
        ? 'folder'
        : typeof value === 'string'
        ? 'symbol-string'
        : typeof value === 'number'
        ? 'symbol-number'
        : typeof value === 'boolean'
        ? 'symbol-boolean'
        : 'circle-small'
    );

    this.contextValue = 'queryItem';
  }

  static shortValue(val: any): string {
    const str = String(val);
    if (str.length > 40) return str.slice(0, 37) + '…';
    return str;
  }

  static formatLabel(label: string, value?: any): string {
    if (Array.isArray(value)) return `${label} [${value.length}]`;
    if (typeof value === 'object' && value !== null) return `${label} {}`;
    return label;
  }
}
