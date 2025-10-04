# 🚀 Quick Setup Guide

## Installation Steps

### 1. Install Dependencies

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd client
npm install
```

### 2. Configure Environment Variables

#### Backend (.env in server folder)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/cafeteria
JWT_SECRET=your_super_secret_jwt_key_here_change_this
```

#### Frontend (.env in client folder - Optional)
```env
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

### 3. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongod
```

### 4. Run the Application

#### Terminal 1 - Backend
```bash
cd server
npm run dev
```

#### Terminal 2 - Frontend
```bash
cd client
npm run dev
```

### 5. Create Test Users

Navigate to http://localhost:5173/register and create accounts:

#### Admin User
- Name: Admin User
- Email: admin@cafeteria.com
- Password: admin123
- **Important**: After registration, manually update role in MongoDB:
  ```javascript
  db.users.updateOne(
    { email: "admin@cafeteria.com" },
    { $set: { role: "admin" } }
  )
  ```

#### Kitchen User
- Name: Kitchen Staff
- Email: kitchen@cafeteria.com
- Password: kitchen123
- **Important**: Manually update role in MongoDB:
  ```javascript
  db.users.updateOne(
    { email: "kitchen@cafeteria.com" },
    { $set: { role: "kitchen" } }
  )
  ```

#### Customer User
- Name: Customer
- Email: customer@cafeteria.com
- Password: customer123
- (Role is "customer" by default)

## 🎯 Testing the System

### 1. Add Menu Items (Admin)
1. Login as admin@cafeteria.com
2. Go to Admin Dashboard
3. Add sample menu items:
   - Cappuccino - ₹120 - Drinks
   - Sandwich - ₹150 - Snacks
   - Burger - ₹180 - Meals

### 2. Generate QR Code (Admin)
1. Click "QR Code" in navbar
2. Download the QR code
3. Test scanning with phone

### 3. Browse & Order (Customer)
1. Login as customer@cafeteria.com
2. Browse menu
3. Add items to cart
4. Go to checkout
5. Place order

### 4. Manage Orders (Kitchen)
1. Login as kitchen@cafeteria.com
2. View incoming orders
3. Update status to "Preparing"
4. Mark as "Completed"

### 5. View Analytics (Admin)
1. Login as admin
2. View order statistics
3. Check revenue metrics

## 🔍 Verification Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] MongoDB connected successfully
- [ ] Can register new users
- [ ] Can login and get JWT token
- [ ] Menu items visible on /menu
- [ ] Cart functionality working
- [ ] Orders can be placed
- [ ] Kitchen dashboard shows orders
- [ ] Admin can manage menu items
- [ ] QR code generates correctly

## ⚠️ Common Issues

### Port Already in Use
```bash
# Kill process on port 5000 (Backend)
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### MongoDB Connection Error
- Ensure MongoDB is installed and running
- Check MONGO_URI in .env file
- Try: `mongodb://127.0.0.1:27017/cafeteria`

### CORS Error
- Check server/src/index.js
- Ensure origin is set to: http://localhost:5173

### JWT Token Invalid
- Clear browser localStorage
- Login again
- Check JWT_SECRET in backend .env

## 📱 Access URLs

- **Main Menu**: http://localhost:5173/menu
- **Admin Dashboard**: http://localhost:5173/admin
- **Kitchen Dashboard**: http://localhost:5173/kitchen
- **QR Code Generator**: http://localhost:5173/qr-code
- **Backend API**: http://localhost:5000

## 🎨 Default Test Data

Once setup is complete, you can add these sample items:

### Drinks
- Cappuccino - ₹120
- Latte - ₹130
- Cold Coffee - ₹140
- Fresh Juice - ₹100

### Snacks
- Sandwich - ₹150
- Fries - ₹80
- Samosa - ₹40
- Pizza Slice - ₹120

### Meals
- Burger - ₹180
- Pasta - ₹200
- Fried Rice - ₹170
- Thali - ₹220

## 🔄 Git Branches

- **main**: Original skeleton code (checkpoint)
- **feature/qr-menu-enhanced**: Complete implementation (current)

To revert to original:
```bash
git checkout main
```

To return to enhanced version:
```bash
git checkout feature/qr-menu-enhanced
```

## 📞 Next Steps

1. Test all features thoroughly
2. Customize menu items for your cafeteria
3. Print QR codes and display them
4. Train staff on using dashboards
5. Monitor customer feedback

## 🚀 Production Deployment

For production, consider:
- Use environment-specific MongoDB (MongoDB Atlas)
- Set strong JWT_SECRET
- Enable HTTPS
- Add rate limiting
- Implement proper error logging
- Add backup strategy

---

Need help? Check the main README.md for detailed documentation!
