# SmartSurplus - Food Donation Platform

SmartSurplus is a full-stack web application designed to reduce food waste by connecting donors, such as restaurants, event organizers, and individuals, with receivers, such as NGOs, charities, and people in need.

It provides a simple platform where surplus food can be shared efficiently, helping build a more sustainable and compassionate community.

---

## Features

### Authentication and Authorization

- Secure user registration and login
- Role-based access for donors and receivers

### Food Donation System

- Donors can post surplus food details
- Donation details include quantity, expiry time, and pickup location

### Interactive Map

- Users can view nearby food donations using map integration
- Location-based discovery helps receivers find available food resources

### Claim and Connect

- Receivers can claim available donations
- Donors and receivers can coordinate directly

### Real-Time Feedback

- Toast notifications show success and error messages for user actions

### Responsive UI

- Fully responsive design built with Tailwind CSS

---

## Tech Stack

### Frontend

- React.js with Vite
- Tailwind CSS
- Axios
- React Router
- Leaflet for maps

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication

---

## Project Structure

```text
SmartSurplus/
├── frontend/   # React frontend
├── backend/    # Node.js backend
└── README.md
```

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/SmartSurplus.git
cd SmartSurplus
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend server:

```bash
npm start
```

### 3. Set Up the Frontend

Open a new terminal, then run:

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

| Variable | Description |
| --- | --- |
| `PORT` | Backend server port |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for authentication |
| `VITE_API_URL` | Backend API URL |

---

## Future Improvements

- Donation status tracking, such as pending and completed
- User dashboard
- Chat system between donors and receivers
- Notification system

---

## Contributing

Feel free to fork this repository and contribute to improving the platform.

---

## License

This project is open source and available under the MIT License.

---

## Author

Developed by Ayush Singh.

---

## Support

If you like this project, please give it a star on GitHub.
