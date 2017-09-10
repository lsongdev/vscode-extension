const {
  window,
  commands,
  StatusBarAlignment
} = require('vscode');

exports.activate = (context) => {
  const { activeTextEditor, showInformationMessage, createStatusBarItem } = window;
  const statusBarItem = createStatusBarItem(StatusBarAlignment.Left);
  setInterval(() => {
    statusBarItem.text = (new Date()).toISOString();
    statusBarItem.show();
  }, 1000);
  const disposable = commands.registerCommand('extension.sayHello', () => {
    if(activeTextEditor){
      const { document, selection } = activeTextEditor;
      const text = document.getText(selection);
      showInformationMessage(text);
      statusBarItem.text = text;
    }
  });
  context.subscriptions.push(disposable);
};
