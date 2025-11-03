<p align="center">
 <img width="128" height="128" alt="icon128" src="https://github.com/user-attachments/assets/26a494a4-0d19-40de-8bf2-82c1cdf25144" />
</p>
<h1 align="center">
  React Query Cache Inspector for VS Code
</h1>
<p align="center">
  Monitor and visualize your React Query cache directly inside VS Code — no browser DevTools needed.
</p>
<p align="center">
  <a href="https://github.com/yourusername/react-query-cache-inspector/releases">
    <img src="https://img.shields.io/github/v/release/yourusername/react-query-cache-inspector?label=version&color=blue" alt="Version">
  </a>
  <a href="https://github.com/yourusername/react-query-cache-inspector/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/yourusername/react-query-cache-inspector/build.yml?label=build&logo=github" alt="Build Status">
  </a>
  <a href="https://github.com/yourusername/react-query-cache-inspector/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/yourusername/react-query-cache-inspector?color=green" alt="License">
  </a>
</p>
<p align="center">
  <a href="https://github.com/yourusername/react-query-cache-inspector/issues">
    <img src="https://img.shields.io/github/issues/yourusername/react-query-cache-inspector?color=orange" alt="Issues">
  </a>
  <a href="https://github.com/yourusername/react-query-cache-inspector/pulls">
    <img src="https://img.shields.io/github/issues-pr/yourusername/react-query-cache-inspector?color=blueviolet" alt="Pull Requests">
  </a>
  <a href="https://github.com/yourusername/react-query-cache-inspector/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/yourusername/react-query-cache-inspector?color=brightgreen" alt="Contributors">
  </a>
</p>
<p align="center">
  <a href="https://github.com/yourusername/react-query-cache-inspector/stargazers">
    <img src="https://img.shields.io/github/stars/yourusername/react-query-cache-inspector?style=social" alt="Stars">
  </a>
  <a href="https://github.com/yourusername/react-query-cache-inspector/network/members">
    <img src="https://img.shields.io/github/forks/yourusername/react-query-cache-inspector?style=social" alt="Forks">
  </a>
  <a href="https://github.com/yourusername/react-query-cache-inspector/commits/main">
    <img src="https://img.shields.io/github/last-commit/yourusername/react-query-cache-inspector?color=yellow" alt="Last Commit">
  </a>
</p>
React Query Cache Inspector is a VS Code extension that brings real-time cache monitoring from your browser into your editor.
It's designed to streamline your development workflow — giving you instant visibility into your React Query state without switching contexts.

## Features

- 🔍 **Real-time Cache Monitoring** - See your React Query cache update live as your application runs
- 🌲 **Tree View Visualization** - Explore cache data in a hierarchical, expandable tree structure
- 🎯 **Status Indicators** - Quickly identify query states with visual icons:
  - ✅ Success
  - 🔄 Loading
  - ❌ Error
  - ⚪ Idle
- 📊 **Nested Data Inspection** - Drill down into complex objects and arrays
- 🔌 **Easy Setup** - Simple browser extension + VS Code extension combo

## Installation

### 1. Install the VS Code Extension

```bash
# Clone the repository
git clone https://github.com/yourusername/react-query-cache-inspector.git
cd react-query-cache-inspector

# Install dependencies
npm install

# Compile the extension
npm run compile

# Package the extension
vsce package

# Install the .vsix file in VS Code
code --install-extension react-query-cache-inspector-0.0.1.vsix
```

Or install directly from the VS Code Marketplace (coming soon).

### 2. Install the Browser Extension

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in the top right)
3. Click "Load unpacked"
4. Select the `browser-extension` folder from this project

**Note:** Currently supports Chrome/Chromium-based browsers. Firefox support coming soon.

## Usage

1. **Start your React Query application** in the browser (e.g., `http://localhost:3000`)

2. **Open VS Code** and look for the React Query icon in the Activity Bar (left sidebar)

3. **Click on "Cache Inspector"** to open the cache view

4. **Refresh your browser page** - the extension will automatically connect and start streaming cache data

5. **Explore your cache**:
   - Click on query keys to expand/collapse data
   - Hover over items to see full JSON in tooltips
   - Watch queries update in real-time as your app fetches data

## How It Works

```
┌─────────────────┐
│  React App      │
│  (Browser)      │
└────────┬────────┘
         │ Inject Script
         ↓
┌─────────────────┐
│ Chrome Extension│
│ (Extracts Cache)│
└────────┬────────┘
         │ WebSocket (port 4040)
         ↓
┌─────────────────┐
│ VS Code         │
│ Extension       │
└────────┬────────┘
         │ Tree View
         ↓
┌─────────────────┐
│ Cache Inspector │
│ Sidebar         │
└─────────────────┘
```

The extension works in three parts:

1. **Browser Script**: Locates the React Query `QueryClient` instance and extracts cache snapshots
2. **WebSocket Bridge**: Streams data from browser to VS Code over `ws://localhost:4040`
3. **VS Code UI**: Displays cache in an interactive tree view

## Requirements

- VS Code version 1.105.0 or higher
- Chrome/Chromium-based browser
- Node.js 18+ (for development)
- A React application using `@tanstack/react-query` (v4 or v5)

## Configuration

The extension currently uses hardcoded settings. Future versions will support:

- Custom WebSocket port
- Refresh interval configuration
- Filter queries by status
- Search functionality

## Development

### Setup

```bash
# Install dependencies
npm install

# Watch mode for development
npm run watch

# Run tests
npm test

# Lint code
npm run lint

# Type check
npm run check-types
```

### Debug the Extension

1. Press `F5` in VS Code to open a new Extension Development Host window
2. Open a React Query project
3. Load the browser extension in Chrome
4. View cache data in the React Query sidebar

### Project Structure

```
.
├── browser-extension/      # Chrome extension files
│   ├── manifest.json       # Extension manifest
│   ├── background.js       # WebSocket client
│   ├── contentScript.js    # Injection handler
│   └── inject.js          # Cache extraction script
├── src/                   # VS Code extension source
│   ├── extension.ts       # Main entry point
│   ├── websocket-server.ts # WebSocket server
│   ├── CacheTreeDataProvider.ts # Tree view logic
│   └── types.ts          # TypeScript definitions
└── out/                  # Compiled output
```

## Troubleshooting

### Extension not showing cache data?

1. Check the browser extension is enabled in `chrome://extensions/`
2. Ensure your React app is running and using React Query
3. Verify the WebSocket connection: Open browser DevTools → Console → Look for `[RQ Inspector] Connected to VS Code`
4. Check VS Code's Output panel (View → Output → React Query Inspector)

### WebSocket connection failed?

- Make sure port 4040 is not in use by another application
- Check your firewall settings allow local connections on port 4040

### Cache not updating?

- Refresh the browser page to re-establish the connection
- Verify your React Query setup exports the `QueryClient` instance to `window`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by [React Query DevTools](https://tanstack.com/query/latest/docs/react/devtools)
- Built with [VS Code Extension API](https://code.visualstudio.com/api)
- Uses [ws](https://github.com/websockets/ws) for WebSocket communication

## Support

- 🐛 Report bugs: [GitHub Issues](https://github.com/yourusername/react-query-cache-inspector/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/react-query-cache-inspector/discussions)
- 📧 Email: menukfernando7@gmail.com

---

**Made with ❤️ for the React Query community**
