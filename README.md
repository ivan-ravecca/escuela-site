# Escuela Site

This is a website project for Escuela de Enfermería Arte & Ciencia. The site provides information about the school, including courses, teachers, events, and other relevant details.

## Project Structure

```
escuela-site/
│
├── public/              # Static files
│   ├── images/          # Image assets
│   ├── fonts/           # Font files
│   └── favicon.ico      # Website favicon
│
├── src/                 # Source code
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page components
│   ├── styles/          # CSS/SCSS files
│   ├── utils/           # Utility functions
│   ├── services/        # API services
│   ├── context/         # React context providers
│   └── App.js           # Main application component
│
├── .env                 # Environment variables (not tracked by git)
├── .env.example         # Example environment variables
├── .gitignore           # Git ignore file
└── README.md            # This file
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# API Configuration
REACT_APP_API_URL=https://api.escuela-site.com

# Authentication
REACT_APP_AUTH_DOMAIN=your-auth-domain
REACT_APP_AUTH_CLIENT_ID=your-client-id

# Other Configuration
REACT_APP_SITE_TITLE=Escuela Site
REACT_APP_CONTACT_EMAIL=contact@escuela-site.com
```

## Setup and Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/escuela-site.git
cd escuela-site
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Copy the `.env.example` file to `.env` and update the values.

```bash
cp .env.example .env
```

4. **Start the development server**

```bash
npm start
```

5. **Build for production**

```bash
npm run build
```
