const vscode = require('vscode');

const { window, commands, StatusBarAlignment } = vscode;
const { createStatusBarItem, showInformationMessage } = window;

const commandHandler = (command) => {
  showInformationMessage(command);
};

const handleSelectedText = command => {
  const { selection } = vscode.window.activeTextEditor;
  const selectedText = window.activeTextEditor?.document.getText(selection);
  console.debug(command, selectedText);
};

const commandHello = commands.registerCommand('extension.sayHello', () => {
  commandHandler('promptPrefix.hello');
});

const commandExplain = vscode.commands.registerCommand('chatgpt.explain', () => {
  handleSelectedText('promptPrefix.explain');
});

const commandRefactor = vscode.commands.registerCommand('chatgpt.refactor', () => {
  handleSelectedText('promptPrefix.refactor');
});
const commandOptimize = vscode.commands.registerCommand('chatgpt.optimize', () => {
  handleSelectedText('promptPrefix.optimize');
});
const commandProblems = vscode.commands.registerCommand('chatgpt.findProblems', () => {
  handleSelectedText('promptPrefix.findProblems');
});

// @docs https://code.visualstudio.com/api/references/activation-events
const activate = context => {

  const config = vscode.workspace.getConfiguration('chatgpt');
  console.log('config:', config);

  showInformationMessage("Hello from VSCode Extension");

  const statusBarItem = createStatusBarItem(StatusBarAlignment.Left);

  setInterval(() => {
    statusBarItem.text = (new Date()).toISOString();
    statusBarItem.show();
  }, 1000);

  context.subscriptions.push(commandHello);
  context.subscriptions.push(commandExplain);
  context.subscriptions.push(commandRefactor);
  context.subscriptions.push(commandOptimize);
  context.subscriptions.push(commandProblems);
};

const deactivate = () => {
  console.debug('deactive');
};

module.exports = {
  activate,
  deactivate,
};