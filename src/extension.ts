import * as vscode from 'vscode';
import { startWebSocketServer } from './websocket-server';
import { CacheTreeDataProvider } from './CacheTreeDataProvider';

export function activate(context: vscode.ExtensionContext) {
  const provider = new CacheTreeDataProvider();
  vscode.window.registerTreeDataProvider('reactQueryCacheView', provider);

  startWebSocketServer((data) => provider.updateCache(data));
}

export function deactivate() {}