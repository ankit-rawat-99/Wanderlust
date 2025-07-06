# 🏠 WanderLust - Airbnb Clone

A full-stack web application that replicates the core functionality of Airbnb, built with Node.js, Express, MongoDB, and EJS templating engine.

![WanderLust](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-000000?style=for-the-badge&logo=ejs&logoColor=white)

## ✨ Features

### 🔐 Authentication & Authorization
- **User Registration & Login**: Secure user authentication using Passport.js
- **Session Management**: Persistent user sessions with MongoDB session store
- **Authorization**: Protected routes for listing management (create, edit, delete)

### 🏡 Listing Management
- **CRUD Operations**: Create, Read, Update, and Delete property listings
- **Image Upload**: Cloudinary integration for image storage and optimization
- **Geolocation**: Automatic coordinate fetching using OpenStreetMap Nominatim API
- **Search & Filter**: Browse listings with location-based search

### 💬 Review System
- **User Reviews**: Authenticated users can leave reviews and ratings
- **Rating Display**: Star-based rating system with visual feedback
- **Review Management**: Users can only review listings they haven't reviewed before

### 🗺️ Interactive Maps
- **Location Visualization**: Interactive maps showing listing locations
- **Geospatial Data**: MongoDB geospatial queries for location-based features

### 🎨 Modern UI/UX
- **Responsive Design**: Mobile-friendly interface
- **Flash Messages**: User feedback for actions and errors
- **Clean Interface**: Modern, intuitive user experience

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **Passport.js** - Authentication middleware
- **Joi** - Data validation library

### Frontend
- **EJS** - Embedded JavaScript templating
- **Bootstrap** - CSS framework for responsive design
- **Custom CSS** - Styling and animations

### Services & APIs
- **Cloudinary** - Cloud image storage and optimization
- **OpenStreetMap Nominatim** - Geocoding service
- **MongoDB Atlas** - Cloud database hosting

### Development Tools
- **Multer** - File upload handling
- **Connect-Flash** - Flash message middleware
- **Method-Override** - HTTP method override

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)
- **MongoDB** (local installation or MongoDB Atlas account)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/wanderlust-airbnb-clone.git
   cd wanderlust-airbnb-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:
   ```env
   ATLASDB_URL=your_mongodb_atlas_connection_string
   SECRET=your_session_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Database Setup**
   - For local MongoDB: Ensure MongoDB service is running
   - For MongoDB Atlas: Use your connection string in the `.env` file

5. **Start the application**
   ```bash
   node app.js
   ```

6. **Access the application**
   Open your browser and navigate to `http://localhost:8080`


## 🎯 Key Features Explained

### Authentication Flow
- Users can register with email and username
- Secure password hashing using Passport-Local-Mongoose
- Session-based authentication with MongoDB session store
- Protected routes for authenticated users only

### Listing Management
- **Create**: Users can add new listings with images and location
- **Read**: Browse all listings with pagination and search
- **Update**: Edit listing details with automatic geocoding
- **Delete**: Remove listings with associated review cleanup

### Image Handling
- **Upload**: Multer middleware for file uploads
- **Storage**: Cloudinary cloud storage for scalability
- **Optimization**: Automatic image resizing and optimization
- **Fallback**: Default images for listings without photos

### Geocoding Integration
- **Automatic**: Location coordinates fetched from OpenStreetMap
- **Error Handling**: Graceful fallback for geocoding failures
- **Validation**: Proper error handling for invalid locations


## 🚀 Deployment

### Local Development
```bash
npm install
node app.js
```

### Production Deployment
1. Set up environment variables for production
2. Configure MongoDB Atlas connection
3. Set up Cloudinary credentials
4. Deploy to your preferred hosting platform (Heroku, Vercel, etc.)

