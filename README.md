# SAP UI5 Utkarsh Foundation

A lightweight SAPUI5 foundation project for learning, prototyping, and building SAP Fiori applications. It is based on the SAP Fiori Application Generator and provides a clean starting point for UI5 development.

## Technology

- SAPUI5 1.152.0
- UI5 CLI 4
- SAP Fiori tools
- JavaScript
- ESLint
- `sap_horizon` theme

## Prerequisites

- Node.js LTS
- npm

## Getting started

```bash
git clone https://github.com/ayushchauhan7/SAP-UI5-Utkarsh-Foundation.git
cd SAP-UI5-Utkarsh-Foundation
npm install
npm start

The app opens in the SAP Fiori launchpad preview.
Available commands
Command	Description
npm start	Run the application with the Fiori launchpad preview.
npm run start-local	Run using the local UI5 configuration.
npm run start-noflp	Run the application directly without the launchpad preview.
npm run build	Create a production build in dist/.
npm run lint	Run ESLint checks.
npm run unit-test	Open the unit-test suite.
npm run int-test	Open the integration-test suite.
npm run deploy-config	Add deployment configuration.
npm run deploy	Verify deployment configuration.

Project structure

.
├── webapp/
│   ├── Component.js       # Application component
│   ├── index.html         # Application entry point
│   ├── manifest.json      # Application descriptor
│   ├── controller/        # UI controllers
│   ├── view/              # XML views
│   ├── model/             # Models and formatters
│   ├── i18n/              # Translatable text resources
│   ├── css/               # Custom styles
│   └── test/              # Unit and integration tests
├── ui5.yaml               # Standard UI5 tooling configuration
├── ui5-local.yaml         # Local SAPUI5 development configuration
├── package.json           # Scripts and development dependencies
└── eslint.config.mjs      # Linting configuration

Development notes
The project currently uses the generated module name project1 and application title App Title. Update these values in webapp/manifest.json, package.json, and the UI5 configuration files as the application takes shape.

The local configuration loads SAPUI5 resources from the SAPUI5 CDN and uses the Horizon theme.

Contributing
1. Create a branch for your change.
2. Make and test your changes locally.
3. Run npm run lint.
4. Open a pull request with a clear description.

Made by Ayush Chauhan
