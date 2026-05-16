# SmartSurplus - Food Donation Platform

SmartSurplus is a community-driven web application designed to bridge the gap between food surplus and food scarcity. It connects donors (restaurants, events, individuals) with receivers (NGOs, charities, people in need) to reduce food waste and help fight hunger.

## 🚀 Features

-   **User Authentication**: Secure Login and Registration system.
-   **Role-Based Access**:
    -   **Donors**: Can post details about surplus food, including type, quantity, expiration time, and pickup location.
    -   **Receivers**: Can view available donations on a map and claim them.
-   **Interactive Map**:
    -   Visualizes all available donation pickup points using **Leaflet**.
    -   Click on markers to view donation details and claim items.
-   **Geocoding**: Integrated with **Nominatim (OpenStreetMap)** to automatically convert addresses into map coordinates.
-   **Real-time Feedback**: Toast notifications for user actions (success/error messages).
-   **Responsive Design**: Fully responsive UI built with **Tailwind CSS**.

## 🛠️ Tech Stack

-   **Frontend Framework**: [React.js](https://react.dev/) (v19)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Routing**: [React Router](https://reactrouter.com/) (v7)
-   **Maps**: [React Leaflet](https://react-leaflet.js.org/) & [Leaflet](https://leafletjs.com/)
-   **HTTP Client**: [Axios](https://axios-http.com/)
-   **Notifications**: [React Toastify](https://fkhadra.github.io/react-toastify/)
-   **Icons**: [Lucide React](https://lucide.dev/)

## ⚙️ Installation & Setup

Follow these steps to set up the project locally.

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn

### Steps

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <project-folder>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Configuration:**
    Create a `.env` file in the root directory and add your backend API URL:
    ```env
    VITE_API_URL=http://localhost:5000
    ```
    *(Replace `http://localhost:5000` with your actual backend server URL)*

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Open in Browser:**
    Navigate to `http://localhost:5173` (or the URL shown in your terminal).

## 📂 Project Structure

```
src/
├── api/                # API service functions (auth, donations, geocoding)
├── assets/             # Static assets (images, icons)
├── components/         # Reusable UI components (Header, etc.)
├── context/            # Global state management (AuthContext)
├── pages/              # Application pages (Home, Login, CreateDonation, etc.)
├── App.jsx             # Main application component & Routing
└── main.jsx            # Entry point
```
