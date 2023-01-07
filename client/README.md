# @cojamru/konjak-client

### Project dev startup

- Run `npm install` to install project dependencies
- Run `npm run create-env` script to create `.env` file, change the value of the variables to what you need
- Run `npm start` to start dev server

### Scripts

`npm start` - start dev server

`npm run build` - build project

`npm run lint` - lint project

`npm run typecheck` - check project types

`npm run prettier` - prettierify project

`npm run create-env` - copy `.env.example` file contents to `.env` file

`npm run get-schema` - get Open API schema

### VSCode eslint issue

Add these lines to your `.vscode/settings.json` file (at the root of the repositor):

```json
{
  "editor.formatOnSave": true,
  "editor.insertSpaces": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.workingDirectories": ["./client"]
}
```
