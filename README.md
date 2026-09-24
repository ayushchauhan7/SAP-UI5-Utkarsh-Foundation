SAP-UI5-Utkarsh-Foundation
A foundational SAP UI5 web application demonstrating core UI5 concepts, including routing, data binding, and the Model-View-Controller (MVC) architecture. This project uses modern UI5 tooling and serves as a robust starting point for building scalable enterprise applications.
🚀 Key Features
Master-Detail Navigation: Seamless routing between the primary product list (View1) and specific item details (ProductDetails).
JSON Model Data Binding: Local data management utilizing a mock backend structure (Products.json) for rapid prototyping.
MVC Architecture: Clean separation of concerns using XML views and JavaScript controllers.
Internationalization (i18n): Configured for multi-language support and easily scalable text management.
Modern UI5 Tooling: Fully integrated with ui5.yaml and package.json for streamlined dependency management and local development serving.
Testing Suite: Scaffolding included for both Unit tests (QUnit) and Integration tests (OPA5).
🛠️ Tech Stack
Framework: SAP UI5 / OpenUI5
Frontend: JavaScript, XML, HTML5, CSS
Data Format: JSON
Tooling: Node.js, UI5 CLI, ESLint
📂 Project Structure
t
SAP-UI5-Utkarsh-Foundation/
├── webapp/
│   ├── controller/
│   │   ├── App.controller.js            # Root application controller
│   │   ├── View1.controller.js          # Master list controller
│   │   └── ProductDetails.controller.js # Detail view controller
│   ├── view/
│   │   ├── App.view.xml                 # Root view container
│   │   ├── View1.view.xml               # Master list view
│   │   └── ProductDetails.view.xml      # Detail view
│   ├── model/
│   │   ├── models.js                    # Device/App model initialization
│   │   └── Products.json                # Mock product data
│   ├── i18n/
│   │   ├── i18n.properties              # Default translation texts
│   │   └── i18n_en.properties           # English translations
│   ├── css/
│   │   └── style.css                    # Custom application styling
│   ├── test/                            # Unit and OPA5 integration tests
│   ├── Component.js                     # Application component setup
│   ├── index.html                       # Entry point
│   └── manifest.json                    # Application descriptor (routing, models, data sources)
├── package.json                         # Node dependencies and scripts
├── ui5.yaml                             # UI5 tooling configuration
└── ui5-local.yaml                       # Local UI5 development configuration

## 💻 Installation & Setup

### Prerequisites

*   [Node.js](https://nodejs.org/) (version 18 or higher recommended)

*   Git

### Running Locally

1.  **Clone the repository:**

    ```bash

    git clone <span type="placeholder" placeholder-type="file"></span>

    cd SAP-UI5-Utkarsh-Foundation

    ```

2.  **Install dependencies:**

    ```bash

    npm install

    ```

3.  **Start the development server:**

    ```bash

    npm start

    ```

    *The application will automatically open in your default browser at `http://localhost:8080/index.html`.*

## 🧪 Testing

To run the configured testing suites (QUnit and OPA5):

```bash

# Run unit tests

npm run test:unit

# Run integration tests

npm run test:integration
👤 Author
Ayush Chauhan
