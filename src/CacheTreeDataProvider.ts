import * as vscode from 'vscode';
import { CacheSnapshot, QuerySummary } from './types';

export class CacheTreeDataProvider implements vscode.TreeDataProvider<QueryItem> {
  private _onDidChangeTreeData = new vscode.EventEmitter<QueryItem | undefined>();
  readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

  private queries: QuerySummary[] = [];

  getTreeItem(element: QueryItem): vscode.TreeItem {
    return element;
  }

  getChildren(): QueryItem[] {
    if (!this.queries.length) {
      return [new QueryItem({ key: ['No queries'], status: 'idle' })];
    }
    return this.queries.map(q => new QueryItem(q));
  }

  updateCache(data: CacheSnapshot) {
    this.queries = data.queries;
    this._onDidChangeTreeData.fire(undefined);
  }
}

class QueryItem extends vscode.TreeItem {
  constructor(public query: QuerySummary) {
    super(query.key.join(' → '), vscode.TreeItemCollapsibleState.None);
    this.description = query.status;
    this.iconPath = new vscode.ThemeIcon(
      query.status === 'success'
        ? 'check'
        : query.status === 'loading'
        ? 'sync'
        : query.status === 'error'
        ? 'error'
        : 'circle-outline'
    );
  }
}