@echo off
echo Installing core dependencies...
npm install express mongoose ejs ejs-mate method-override joi dotenv express-session connect-flash multer multer-storage-cloudinary cloudinary passport passport-local bcryptjs node-fetch

echo Installing mapping and utility dependencies...
npm install leaflet

echo Installing dev dependencies...
npm install --save-dev nodemon

echo ✅ All packages installed!
pause