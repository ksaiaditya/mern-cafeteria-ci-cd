# 🍽️ QR-Based Digital Menu & Ordering System

A modern, contactless digital menu and ordering platform designed for cafeterias and small restaurants. This MERN stack application replaces physical menus with QR code-accessible digital menus, enabling customers to browse, order, and track their meals while providing kitchen staff and administrators with powerful management tools.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🌟 Features

### 👥 For Customers
- **📱 QR Code Access** - Scan and instantly view the complete menu
- **📋 Browse Menu** - Category-filtered, beautiful card-based menu display
- **🛒 Shopping Cart** - Add items, adjust quantities, persistent cart (survives page refresh)
- **💳 Easy Checkout** - Simple checkout process with special instructions
- **📦 Order Tracking** - Real-time order status updates (Pending → Preparing → Completed)
- **📜 Order History** - View all past orders with details

### 👨‍🍳 For Kitchen Staff
- **🔔 Real-time Dashboard** - Live view of all incoming orders
- **⏱️ Time Tracking** - See how long ago each order was placed
- **🔄 Status Management** - Update order status with one click
- **🔍 Filter Orders** - View by status (Pending, Preparing, Completed)
- **⚡ Auto-refresh** - Optional 10-second auto-refresh for real-time updates
- **📝 Special Notes** - View customer's special instructions

### 📊 For Administrators
- **📈 Analytics Dashboard** - Total revenue, order counts, completion rates
- **🍽️ Menu Management** - Full CRUD operations for menu items
- **✏️ Edit Items** - Update name, price, description, category, images
- **🔄 Toggle Availability** - Mark items as available/unavailable
- **🗑️ Delete Items** - Remove items from the menu
- **📸 Image Support** - Add images to menu items
- **📦 Order Overview** - View all orders and customer details
- **📱 QR Code Generator** - Generate, download, and print QR codes

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Lightning-fast build tool
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client
- **QRCode.react** - QR code generation
- **JWT Decode** - Token handling

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt** - Password hashing

## 📂 Project Structure

```
mern-docker-jenkins/
├── client/                      # React frontend
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js        # API configuration
│   │   ├── components/
│   │   │   └── Navbar.jsx      # Navigation bar
│   │   ├── context/
│   │   │   └── CartProvider.jsx # Cart state management
│   │   ├── pages/
│   │   │   ├── Login.jsx       # Authentication
│   │   │   ├── Register.jsx    # User registration
│   │   │   ├── CustomerMenu.jsx # Menu browsing
│   │   │   ├── Cart.jsx        # Shopping cart
│   │   │   ├── Checkout.jsx    # Order placement
│   │   │   ├── MyOrders.jsx    # Order history
│   │   │   ├── Admin.jsx       # Admin dashboard
│   │   │   ├── Kitchen.jsx     # Kitchen dashboard
│   │   │   └── QRCodeGenerator.jsx # QR code page
│   │   ├── App.jsx             # Main app component
│   │   └── main.jsx            # Entry point
│   └── package.json
│
└── server/                      # Express backend
    ├── src/
    │   ├── config/
    │   │   └── db.js           # Database connection
    │   ├── controllers/
    │   │   ├── authController.js   # Authentication logic
    │   │   ├── menuController.js   # Menu CRUD
    │   │   └── orderController.js  # Order management
    │   ├── middleware/
    │   │   └── authMiddleware.js   # JWT verification
    │   ├── models/
    │   │   ├── userModel.js    # User schema
    │   │   ├── menuModel.js    # Menu item schema
    │   │   └── orderModel.js   # Order schema
    │   ├── routes/
    │   │   ├── authRoutes.js   # Auth endpoints
    │   │   ├── menuRoutes.js   # Menu endpoints
    │   │   └── orderRoutes.js  # Order endpoints
    │   └── index.js            # Server entry point
    └── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/ksaiaditya/mern-cafeteria-ci-cd.git
cd mern-cafeteria-ci-cd
```

### 2. Setup Backend
```bash
cd server
npm install

# Create .env file
echo "PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key" > .env

# Start the server
npm run dev
```

### 3. Setup Frontend
```bash
cd ../client
npm install

# Create .env file (optional for Google OAuth)
echo "VITE_GOOGLE_CLIENT_ID=your_google_client_id" > .env

# Start the development server
npm run dev
```

### 4. Access the Application
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

## 👤 User Roles

### Customer (Default)
- Browse menu
- Add items to cart
- Place orders
- Track order status
- View order history

### Kitchen Staff
- View all orders
- Update order status
- Filter orders by status
- See time stamps

### Administrator
- All customer features
- Manage menu items (CRUD)
- View analytics
- Generate QR codes
- View all orders

## 🔐 Authentication

The system uses JWT (JSON Web Tokens) for authentication:

1. **Register/Login** - User creates account or logs in
2. **Token Generation** - Server generates JWT token
3. **Token Storage** - Token stored in localStorage
4. **Protected Routes** - Token required for protected endpoints
5. **Role-Based Access** - Different dashboards based on user role

## 📊 Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (customer/admin/kitchen),
  timestamps: true
}
```

### Menu Model
```javascript
{
  name: String,
  description: String,
  price: Number,
  category: String,
  available: Boolean,
  imageUrl: String,
  timestamps: true
}
```

### Order Model
```javascript
{
  user: ObjectId (ref: User),
  items: [{
    menuItem: ObjectId (ref: Menu),
    quantity: Number
  }],
  status: String (pending/preparing/completed),
  totalPrice: Number,
  customerName: String,
  notes: String,
  timestamps: true
}
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Menu (Public)
- `GET /api/menu` - Get all menu items
- `POST /api/menu` - Add menu item (Admin)
- `PUT /api/menu/:id` - Update menu item (Admin)
- `DELETE /api/menu/:id` - Delete menu item (Admin)

### Orders (Protected)
- `POST /api/orders` - Place new order
- `GET /api/orders/my-orders` - Get customer's orders
- `GET /api/orders` - Get all orders (Kitchen/Admin)
- `PUT /api/orders/:id` - Update order status (Kitchen/Admin)

## 🎨 UI/UX Features

- **Responsive Design** - Works on mobile, tablet, and desktop
- **Modern Gradients** - Beautiful color schemes
- **Smooth Animations** - Transition effects and hover states
- **Loading States** - User feedback during async operations
- **Empty States** - Helpful messages when no data
- **Toast Notifications** - Success/error feedback
- **Floating Cart Button** - Quick access to cart with item count

## 📱 QR Code Implementation

1. Admin generates QR code from dashboard
2. QR code links to the menu page
3. Code can be downloaded as PNG
4. Print-ready template included
5. Customers scan with phone camera
6. Instant access to digital menu

## 🔄 Order Flow

```
Customer          Kitchen           Admin
   |                 |                |
   ├── Browse Menu   |                |
   ├── Add to Cart   |                |
   ├── Checkout ─────┼────────────────┤
   |                 |                |
   |    [Order Created - Status: Pending]
   |                 |                |
   |           ┌─────┴────────┐       |
   |           │ See Order    │       |
   |           │ Click "Start │       |
   |           │  Preparing"  │       |
   |           └──────┬───────┘       |
   |                 |                |
   |    [Status: Preparing]           |
   |                 |                |
   |           ┌─────┴────────┐       |
   |           │ Prepare Food │       |
   |           │ Click "Mark  │       |
   |           │  Complete"   │       |
   |           └──────┬───────┘       |
   |                 |                |
   |    [Status: Completed]           |
   |                 |                |
   ├── See Update ───┤                |
   ├── View History  |                |
```

## 🚧 Future Enhancements

- [ ] Docker containerization
- [ ] Jenkins CI/CD pipeline
- [ ] Payment gateway integration
- [ ] Push notifications
- [ ] SMS order alerts
- [ ] Table number assignment
- [ ] Multiple restaurant support
- [ ] Review and rating system
- [ ] Promotional offers
- [ ] Inventory management

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/cafeteria
JWT_SECRET=your_secret_key_here
```

### Frontend (.env)
```
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network connectivity

### CORS Errors
- Check `server/src/index.js` CORS configuration
- Ensure frontend URL matches allowed origin

### JWT Errors
- Clear localStorage and login again
- Check JWT_SECRET in backend `.env`

### QR Code Not Generating
- Ensure `qrcode.react` is installed
- Check browser console for errors

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Karnati Sai Aditya**
- GitHub: [@ksaiaditya](https://github.com/ksaiaditya)
- Repository: [mern-cafeteria-ci-cd](https://github.com/ksaiaditya/mern-cafeteria-ci-cd)

## 🙏 Acknowledgments

- React team for the amazing library
- MongoDB for the flexible database
- Tailwind CSS for the utility classes
- The open-source community

## 📞 Support

For support, email karnatisaiadity@gmail.com or open an issue in the repository.

---

Made for modern cafeterias and restaurants
