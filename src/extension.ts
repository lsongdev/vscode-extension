import * as vscode from "vscode";
import fetch from 'node-fetch';
import { OpenAI, Configuration } from '@song940/openai';

// @ts-ignore
globalThis.fetch = fetch;

let openai: any;

const { window, commands, StatusBarAlignment } = vscode;
const { createStatusBarItem, showInformationMessage } = window;

const commandHandler = async (prefix: string) => {
  const selection = vscode.window.activeTextEditor?.selection;
  const selectedText = window.activeTextEditor?.document.getText(selection);
  const config = vscode.workspace.getConfiguration('chatgpt');
  const prompt = config.get(prefix);
  const searchPrompt = `${prompt}\n\`\`\`\n${selectedText}\n\`\`\``;
  // showInformationMessage(searchPrompt);
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: searchPrompt,
    temperature: 0,
    max_tokens: 2048
  });
  console.log(completion.choices[0].text);
};

const commandHello = commands.registerCommand('extension.sayHello', () => {
  commandHandler('promptPrefix.hello');
});

const commandExplain = vscode.commands.registerCommand('chatgpt.explain', () => {
  commandHandler('promptPrefix.explain');
});

const commandRefactor = vscode.commands.registerCommand('chatgpt.refactor', () => {
  commandHandler('promptPrefix.refactor');
});
const commandOptimize = vscode.commands.registerCommand('chatgpt.optimize', () => {
  commandHandler('promptPrefix.optimize');
});
const commandProblems = vscode.commands.registerCommand('chatgpt.findProblems', () => {
  commandHandler('promptPrefix.findProblems');
});

// @docs https://code.visualstudio.com/api/references/activation-events
export const activate = (context: vscode.ExtensionContext) => {

  const config = vscode.workspace.getConfiguration('chatgpt');
  console.log('config:', config);

  const configuration = new Configuration({
    apiKey: config.get('apiKey'),
  });

  openai = new OpenAI(configuration);

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

export const deactivate = () => {
  console.debug('deactive');
};
