# Google Keep Clone Frontend

This is a React-based frontend for the Google Keep Clone application. It's designed to work with the Google Keep Clone API backend but is maintained as a completely separate project for flexibility.

## Features

- **User Authentication**: Register, login, and manage user accounts
- **Notes Management**: Create, read, update, and delete notes
- **Tags**: Organize notes with customizable tags
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode**: Toggle between light and dark themes


## Setup and Installation

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Google Keep Clone API backend running

### Installation Steps

1. Install dependencies
   ```
   npm install
   ```

2. Create a `.env` file in the root directory with the following content:
   ```
   REACT_APP_API_URL=http://localhost:3000
   ```
   Replace the URL with your backend API URL if different.

3. Start the development server
   ```
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser



## API Integration

This frontend is designed to work with the Google Keep Clone API. The API endpoints used include:

- **Authentication**: `/users` (register), `/sessions` (login/logout)
- **Notes**: `/notes` (CRUD operations)
- **Tags**: `/tags` (CRUD operations)

## Deployment

To build the application for production:

```
npm run build
```

This creates a `build` directory with optimized production files that can be deployed to any static hosting service.

