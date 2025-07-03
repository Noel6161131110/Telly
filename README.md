# Telly - Interactive Whiteboard and Note-taking App

Telly is an interactive whiteboard and note-taking app designed to enhance learning, boost productivity, and foster collaboration. This app leverages AI to solve math expressions and provide detailed explanations, making it an ideal tool for students, teachers, and professionals. Auth0 is used to manage secure user authentication.

## See Telly in Action

<p align="center">
  <img src="https://raw.githubusercontent.com/Noel6161131110/Telly/main/Assets/telly-demo-1.gif" alt="Telly Demo" width="80%" />
</p>

<br />

<p align="center">
  <img src="https://raw.githubusercontent.com/Noel6161131110/Telly/main/Assets/telly-demo-3.png" alt="Telly Screenshot" width="80%" />
</p>

<br />

## Features

**-** **Interactive Whiteboard**: Draw, annotate, and visually organize ideas in real time.

**-** **Note-taking**: Save notes, collaborate, and revisit information quickly.

**-** **AI-Powered Math Solver**: Calculate and explain math expressions to enhance understanding.

**-** **Secure Authentication**: Auth0 integration for secure user login and management.

**-** **Real-time Collaboration**: Collaborate with others on shared boards and notes.

## Getting Started

Follow these instructions to set up and run the application on your local machine.

### Prerequisites

**-** Node.js (version 14 or higher recommended)

**-** NPM or Yarn

**-**  An Auth0 account (for authentication setup)

**-** Tldraw

## Installation

Follow these steps to set up and run the Telly application on your local machine.

### 1. Clone the Repository

To get started, you'll need a copy of the Telly project files on your local machine. You can do this by cloning the repository from GitHub.

1. **Open your terminal** (Command Prompt, Git Bash, or any terminal of your choice).
2. **Run the following commands**:

   ```bash
   git clone https://github.com/your-username/telly-app.git
   cd telly-app
   ```

   - The `git clone` command downloads the repository to your local machine.
   - The `cd telly-app` command navigates into the project directory.

> **Note**: Replace `your-username` with your GitHub username or the repository owner's username if you're using someone else’s repository.

At this point, you now have a local copy of the project files, and you’re inside the project directory, ready to install dependencies.



### 2. Install Dependencies

With the repository cloned, the next step is to install the required dependencies. This can be done using NPM or Yarn.

For **NPM**:

```bash
   npm install
```

For **Yarn**:

```bash
   yarn install
```

This command will install all necessary packages listed in the `package.json` file.

### 3. Set Up Environment Variables

The application requires environment variables for configuration, which you should add in a `.env` file.

1. **Create a `.env` file** in the root of your project directory.
2. **Add your Auth0 credentials** to the `.env` file as follows:

   ```env
   REACT_APP_AUTH_DOMAIN="your-auth0-domain"
   REACT_APP_AUTH_CLIENT_ID="your-auth0-client-id"
   ```

   - Replace `"your-auth0-domain"` with your Auth0 domain (e.g., `dev-4nnotbpus.au.auth0.com`).
   - Replace `"your-auth0-client-id"` with your Auth0 client ID.

> **Note**: You can find these values in the Auth0 dashboard under **Applications > Applications** for your specific app.

### 4. Start the Development Server

Now you’re ready to start the development server.

For **NPM**:

```bash
   npm start
```

For **Yarn**:

```bash
   yarn start
```

This command starts the application in development mode, and you should see it open automatically in your browser at [http://localhost:3000](http://localhost:3000). If it doesn’t open automatically, you can navigate to this URL manually.

### 5. Testing the Environment Variables

To verify that your environment variables are loaded correctly, you can add a temporary `console.log` statement in your code:

```javascript
   console.log("Auth Domain:", process.env.REACT_APP_AUTH_DOMAIN);
   console.log("Auth Client ID:", process.env.REACT_APP_AUTH_CLIENT_ID);
```

Run the app, open the browser's developer console, and you should see the values you set in `.env` printed in the console.

### 6. Optional: Build the Application for Production

If you want to create an optimized build of the app for production, you can use the following command:

For **NPM**:

```bash
   npm run build
```

For **Yarn**:

```bash
   yarn build
```

This command generates an optimized build in the `build` folder, ready for deployment.

### 7. Troubleshooting

- **Environment Variables Not Loading**: Ensure the `.env` file is in the root directory and restart the server if you make changes.
- **Authentication Issues**: Double-check your Auth0 domain and client ID to ensure they match the values from your Auth0 dashboard.

Following these steps, you should now have the Telly application up and running on your local machine!
