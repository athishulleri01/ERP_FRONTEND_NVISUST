# ERP User & Role Management System

A full-stack **ERP User & Role Management Application** built with **Django REST Framework (Backend)** and **React + Vite (Frontend)**.  
It implements **Role-Based Access Control (RBAC)** where **Admins, Managers, and Employees** have different access levels.  


---
Live Links:  
🔗 Frontend (Live): https://erp-frontend-nvisust.vercel.app/

🔗 Backend API (AWS EC2 with SSL & domain): https://www.athishulleri.online/api/

🔗 Backend git repo: https://github.com/athishulleri01/ERP_BACKEND_NVISUST.git



## 🚀 Features

### 🔑 Authentication & Authorization (Backend - Django)
- JWT-based authentication (Login, Logout, Token Refresh).  
- Role-based access control (RBAC).  
- Roles:  
  - **Admin** → Create, update, delete users.  
  - **Manager** → View employees (cannot edit admins).  
  - **Employee** → View own profile only.  
- API Endpoints:  
  - `POST /api/auth/register/` → Register a new user.  
  - `POST /api/auth/login/` → Authenticate and get JWT.  
  - `POST /api/auth/logout/` → Logout user.  
  - `GET /api/auth/users/` → List users (Admin/Manager only).  
  - `GET /api/auth/profile/` → View own profile.  

### 🖥️ Dashboard (Frontend - React + Vite)
- **Login page** with JWT authentication.  
- **Role-based UI**:  
  - Admin: User list, Add/Edit/Delete users.  
  - Manager: View employees only.  
  - Employee: Profile view only.  
- **Protected Routes** with role-based redirection.  
- Responsive and clean UI with **Tailwind CSS**.  
- **Cloudinary integration** for static assets.  

---

## 🛠️ Tech Stack

### Backend (ERP_BACKEND_NVISUST)
- **Django REST Framework** – API development  
- **PostgreSQL** – Database  
- **JWT Authentication** – Secure login system  
- **AWS EC2 (Ubuntu)** – Hosting backend  
- **NGINX + Gunicorn** – Production server setup  
- **Certbot (Let's Encrypt)** – SSL certification  

### Frontend (ERP_FRONTEND_NVISUST)
- **React + Vite** – Frontend framework  
- **Tailwind CSS** – Styling  
- **Vercel** – Frontend hosting  
- **Axios** – API calls  
- **React Context API** – State management  

---

## 📂 Project Structure

```bash
ERP_FRONTEND_NVISUST/
│── node_modules/              # Dependencies
│── public/                    # Static assets
│── src/                       # Main source code
│   ├── assets/                # Images, icons, etc.
│   ├── components/            # UI Components
│   │   ├── Dashboard.jsx      # Role-based dashboard
│   │   ├── Layout.jsx         # Layout wrapper
│   │   ├── Login.jsx          # Login page
│   │   ├── Profile.jsx        # Employee profile
│   │   ├── ProtectRoute.jsx   # Protected routes by role
│   │   ├── Register.jsx       # Registration page
│   │   ├── Unauthorized.jsx   # Unauthorized access page
│   │   ├── UserList.jsx       # Admin: List of users
│   │   ├── UserModal.jsx      # Admin: Add/Edit User modal
│   ├── contexts/
│   │   └── AuthContext.jsx    # Auth & role management
│   ├── service/
│   │   └── api.jsx            # API service (Axios)
│   ├── utils/
│   │   ├── cloudinary.jsx     # Cloudinary upload utility
│   │   └── validation.jsx     # Form validations
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│── eslint.config.js
│── index.html
│── package.json
│── package-lock.json
│── vite.config.js
```
---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/athishulleri01/ERP_FRONTEND_NVISUST.git
cd ERP_FRONTEND_NVISUST
```

### 3️⃣ Install Dependencies

```bash
npm install
```

### 7️⃣ Start Server

```bash
npm run dev
```


## 🌐 Deployment

### Backend (AWS EC2)

* Hosted on **Ubuntu 22.04 AWS EC2**
* Gunicorn + Nginx setup with **SSL (Certbot)**
* Domain: `https://www.athishulleri.online`

### Frontend (Vercel)

* React.js frontend deployed on **Vercel**
* Connected to backend API `https://www.athishulleri.online`

### Static Files (Cloudinary)

* Images & static files are served via **Cloudinary CDN**

---

## 🔑 API Endpoints

### Authentication

* `POST /api/auth/register/` → Register a new user
* `POST /api/auth/login/` → Authenticate & get JWT token
* `POST /api/auth/logout/` → Logout user
* `POST /api/token/refresh/` → Refresh JWT token

### User Management

* `GET /api/auth/users/` → List all users (**Admin, Manager only**)
* `GET /api/auth/users/<id>/` → Get user details (**Admin only**)
* `PUT /api/auth/users/<id>/` → Update user (**Admin only**)
* `DELETE /api/auth/users/<id>/` → Delete user (**Admin only**)

### Profile

* `GET /api/auth/profile/` → View logged-in user profile (**All roles**)

---

## 🔒 Role-Based Access Control (RBAC)

### Admin

✅ Create, Update, Delete Users
✅ View All Users
✅ Full Access

### Manager

✅ View All Employees
❌ Cannot Edit/Delete Admins

### Employee

✅ View Own Profile Only
❌ No Access to Other Users

---

## 🛠️ Tech Stack

* **Backend**: Django, Django REST Framework
* **Database**: PostgreSQL / MySQL
* **Authentication**: JWT (djangorestframework-simplejwt)
* **Frontend**: React.js (Vercel)
* **Deployment**: AWS EC2, Nginx, Gunicorn
* **Static Files**: Cloudinary

---


## 👨‍💻 Author

**Athish Ulleri**

* 🌐 [www.athishulleri.online](https://www.athishulleri.online)
* 📧 Contact: athishulleri@gmail.com
