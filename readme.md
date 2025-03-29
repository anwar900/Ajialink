


Ajyal Link is a mobile-first application designed to bridge generations through mutual learning and community engagement. The platform facilitates knowledge sharing, conversations, workshops, and help between younger and older generations.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Internationalization](#internationalization)
- [Accessibility](#accessibility)
- [Troubleshooting](#troubleshooting)
- [Support](#support)


## Features

- **User Authentication**: WhatsApp-based verification system
- **Interactive Dashboard**: "Give" and "Receive" service options
- **Events Calendar**: View and join upcoming events
- **Messaging System**: Connect with community members
- **Community Section**: Posts, photos, and discussions
- **User Profiles**: With badges and recognition
- **Multi-language Support**: English, French, and Arabic
- **Accessibility Features**: Font size adjustment, text spacing, high contrast mode, and more
- **Responsive Design**: Mobile-first approach for all screen sizes


## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [npm](https://www.npmjs.com/) (v8.0.0 or higher) 



## Installation

1. Clone the repository:


```shellscript
git clone https://github.com/Sheris-Milly/bridgegen-app
cd bridgegen-app
```

2. Install dependencies:


```shellscript
npm install
or
yarn install
```



## Development

To start the development server:

```shellscript
npm run dev
 or
yarn dev
```

This will start the application in development mode. Open [http://localhost:3000](http://localhost:3000) in your browser to view it.





In a production environment, you would need to set these variables on your hosting platform.

## Project Structure

```plaintext
ajyal-link/
├── app/                    # Next.js App Router
│   ├── dashboard/          # Dashboard pages
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   ├── manifest.ts         # PWA manifest
│   └── page.tsx            # Home page
├── components/             # Reusable components
│   ├── ui/                 # UI components (shadcn/ui)
│   ├── bottom-nav.tsx      # Bottom navigation
│   ├── language-context.tsx # Language provider
│   └── ...                 # Other components
├── lib/                    # Utility functions and libraries
│   ├── i18n/               # Internationalization
│   │   ├── translations/   # Language files
│   │   └── index.ts        # i18n configuration
│   └── utils.ts            # Utility functions
├── hooks/                  # Custom React hooks
├── public/                 # Static assets
│   ├── images/             # Images including logo
│   ├── flags/              # Country flags for language selection
│   └── icons/              # App icons
├── .env.local              # Environment variables (create this)
├── next.config.mjs         # Next.js configuration
├── package.json            # Dependencies and scripts
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```



## Building for Production

To build the application for production:

```shellscript
npm run build
# or
yarn build
```

To test the production build locally:

```shellscript
npm run start
# or
yarn start
```

This will start the production server at [http://localhost:3000](http://localhost:3000).



## License

This project is licensed under the MIT License - see the LICENSE file for details.


---

