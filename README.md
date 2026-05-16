# 🌍 SmartSurplus - Food Donation Platform

SmartSurplus is a full-stack web application designed to reduce food waste by connecting donors (restaurants, events, individuals) with receivers (NGOs, charities, and people in need).

It provides a seamless platform where surplus food can be shared efficiently, helping build a more sustainable and compassionate community.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- Secure user registration and login
- Role-based access (Donor / Receiver)

### 🍱 Food Donation System
- Donors can post surplus food details
- Includes quantity, expiry, and pickup location

### 🗺️ Interactive Map
- View nearby food donations using map integration
- Location-based discovery of food resources

### 🤝 Claim & Connect
- Receivers can claim donations
- Direct coordination between donor and receiver

### 🔔 Real-time Feedback
- Toast notifications for actions (success/error)

### 📱 Responsive UI
- Fully responsive design using Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Axios
- React Router
- Leaflet (Maps)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

## 📁 Project Structure
SmartSurplus/
│
├── frontend/ # React Frontend
├── backend/ # Node.js Backend
├── README.md

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/SmartSurplus.git
cd SmartSurplus
2️⃣ Setup Backend
cd backend
npm install
Create .env file inside backend:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run backend:
npm start

3️⃣ Setup Frontend
cd frontend
npm install
npm run dev

🌐 Environment Variables
Variable	Description
MONGO_URI	MongoDB connection string
JWT_SECRET	Secret key for authentication
VITE_API_URL	Backend API URL

🎯 Future Improvements
Donation status tracking (Pending / Completed)
User dashboard
Chat system between donor and receiver
Notifications system

🤝 Contributing

Feel free to fork this repository and contribute to improve the platform.

📜 License

This project is open-source and available under the MIT License

👨‍💻 Author

Developed by Ayush Singh

⭐ Support

If you like this project, give it a ⭐ on GitHub!