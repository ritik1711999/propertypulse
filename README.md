# PropertyPulse

A modern, full-stack property rental marketplace application built with Next.js, MongoDB, and real-time messaging capabilities. PropertyPulse empowers property managers and renters to connect seamlessly through an intuitive platform featuring advanced search, geolocation services, and comprehensive property management tools.

## 🌟 Key Features

### Property Management

- **Create & Edit Listings** - Property managers can easily create, update, and manage property listings with detailed information
- **Advanced Search & Filtering** - Users can search properties by location, property type, and other criteria
- **Image Gallery** - Multi-image property galleries with Photoswipe lightbox viewer for immersive browsing
- **Responsive Property Cards** - Beautiful, mobile-optimized property cards displaying key details at a glance

### Location Services

- **Interactive Maps** - Integrated Leaflet maps with geolocation services showing exact property locations
- **Geocoding** - Intelligent address-to-coordinate conversion for accurate property positioning
- **Location-Based Search** - Find properties by city, state, and address proximity

### User Features

- **Authentication** - Secure NextAuth.js authentication with multi-provider support
- **Saved Bookmarks** - Save favorite properties for quick access later
- **Messaging System** - Direct property manager communication with unread message tracking and read status management
- **User Profiles** - Comprehensive user profiles showcasing property listings and bookmarked properties
- **Message Notifications** - Real-time unread message counts and notifications

### Media & Sharing

- **Cloud Image Storage** - Cloudinary integration for scalable image hosting and optimization
- **Social Sharing** - Built-in social media sharing buttons for property listings
- **Responsive Image Handling** - Optimized image delivery across all devices

## 🛠️ Tech Stack

**Frontend:**

- Next.js 14.2.5 - React framework with App Router
- React 18 - UI component library
- Tailwind CSS 3.4.1 - Utility-first styling
- React Leaflet 4.2.1 - Interactive maps
- React Icons 5.2.1 - Icon library
- React PhotoSwipe Gallery 3.0.2 - Image gallery
- React Share 5.1.0 - Social sharing
- React Toastify 10.0.5 - Toast notifications
- React Spinners 0.14.1 - Loading indicators

**Backend:**

- Next.js API Routes - Serverless functions
- MongoDB 6.8.0 - NoSQL database
- Mongoose 8.5.1 - ODM for MongoDB
- NextAuth.js 4.24.7 - Authentication & authorization
- Cloudinary 2.4.0 - Image management

**Tools & Services:**

- PostCSS & Tailwind - CSS preprocessing and styling
- Leaflet 1.9.4 - Mapping library

## Getting Started

### Prerequisites

- Node.js 16+
- MongoDB database connection
- Cloudinary account (for image uploads)
- Environment variables configured

### Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables in `.env.local`:

```
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 📁 Project Structure

```
app/
├── actions/          - Server actions for database operations
├── api/              - API routes for backend services
├── properties/       - Property listing pages and search
├── messages/         - Messaging interface
├── profile/          - User profile management
└── page.jsx          - Home page

components/          - Reusable React components
├── PropertyCard      - Property display component
├── PropertySearchForm - Advanced search interface
├── Map              - Interactive map display
├── MessageCard      - Message display
└── [other components]

models/              - MongoDB schemas
├── Property.js      - Property schema
├── User.js          - User schema
└── message.js       - Message schema

utils/               - Utility functions and helpers
config/              - Configuration files for DB and services
```

## 🔐 Authentication

PropertyPulse uses NextAuth.js for secure authentication, supporting multiple authentication providers. Users can sign in to access property management features and direct messaging capabilities.

## 📊 Database Schema

- **Properties** - Comprehensive property data including location, amenities, pricing, and owner information
- **Users** - User profiles with bookmarked properties and authentication data
- **Messages** - Messaging system tracking messages between users and property managers

## 🚀 Deployment

Deploy on [Vercel](https://vercel.com) for optimal Next.js performance:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy with automatic CI/CD

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.
