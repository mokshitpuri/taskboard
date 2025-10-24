# 🧠 TaskBoard — Project & Task Management App

**TaskBoard** is a modern, full-stack project management application built to help teams organize, track, and manage tasks efficiently — with a focus on speed, clarity, and real-time collaboration.

---

## 🚀 Features

- ✅ **Task Management** — Create, edit, assign, and delete tasks with status tracking (To-Do, In Progress, Done)  
- ✅ **Project Dashboard** — Manage multiple projects from a single dashboard  
- ✅ **Drag-and-Drop UI** — Reorder tasks easily across columns  
- ✅ **User Management** — Register, login, and manage users (via Node or FastAPI backend)  
- ✅ **Responsive Design** — Built with Tailwind CSS for a sleek look on all devices  
- ✅ **TypeScript + React** — Strong typing, better maintainability  
- ✅ **REST API** — Fully documented endpoints for backend communication  

---

## 🧩 Tech Stack

### **Frontend**
- React + TypeScript  
- Tailwind CSS  
- React Router  
- Axios for API calls  
- Vite for fast development  

### **Backend (Option 1 — Node.js + Express)**
- Node.js  
- Express.js  
- PostgreSQL (via Prisma ORM)  
- JWT Authentication  
- bcrypt for password hashing  

### **Backend (Option 2 — FastAPI)**
- Python 3.12+  
- FastAPI  
- SQLAlchemy  
- PostgreSQL  
- JWT-based authentication  

---

## 🛠️ Installation & Setup

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/yourusername/taskboard.git
cd taskboard
```

---

### **2️⃣ Frontend Setup**
```bash
cd taskboard-frontend
npm install
npm run dev
```

Frontend runs by default on:  
👉 http://localhost:5173  

If you face a Vite 404 error, ensure you’re running from the correct project root and that `vite.config.ts` exists.

---

### **3️⃣ Backend Setup (Node.js + Express)**
```bash
cd taskboard-backend
npm install
```

#### **Create a `.env` file in `taskboard-backend/`**
```env
PORT=5000
DATABASE_URL=postgresql://username:password@host:port/dbname
JWT_SECRET=your_jwt_secret
```

#### **Run Migrations & Start Server**
```bash
npx prisma migrate dev
npm run dev
```

Backend runs by default on:  
👉 http://localhost:5000  

---

### **4️⃣ Backend Setup (FastAPI Option)**
```bash
cd taskboard-fastapi
pip install -r requirements.txt
uvicorn main:app --reload
```

FastAPI runs by default on:  
👉 http://127.0.0.1:8000  

---

### **5️⃣ Connect Frontend with Backend**

Create or edit `.env` in the **frontend folder**:

#### **For Node.js Backend**
```env
VITE_API_URL=http://localhost:5000
```

#### **For FastAPI Backend**
```env
VITE_API_URL=http://127.0.0.1:8000
```

---

## 📂 Folder Structure
```plaintext
taskboard/
├── taskboard-frontend/        # React + TypeScript + Tailwind app
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── vite.config.ts
│   └── package.json
│
├── taskboard-backend/         # Node.js + Express API
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── prisma/
│   │   ├── middleware/
│   │   └── server.ts
│   └── package.json
│
└── taskboard-fastapi/         # Optional Python backend
    ├── main.py
    ├── models.py
    ├── routes/
    └── requirements.txt
```

---

## ⚙️ API Endpoints (Node.js Example)

| Method | Endpoint | Description |
|--------|-----------|-------------|
| **POST** | `/api/auth/register` | Register a new user |
| **POST** | `/api/auth/login` | Login user |
| **GET** | `/api/tasks` | Get all tasks |
| **POST** | `/api/tasks` | Create a new task |
| **PUT** | `/api/tasks/:id` | Update a task |
| **DELETE** | `/api/tasks/:id` | Delete a task |

---

## 💡 Future Enhancements

- Real-time updates using WebSockets  
- Admin dashboard  
- Role-based access control  
- Team collaboration features (comments, mentions, etc.)

---

## 🧑‍💻 Contributing

Pull requests are welcome!  
For major changes, open an issue first to discuss what you’d like to change.  
Make sure to update tests as appropriate.

---

## 🪪 License

This project is licensed under the **MIT License**.

---

## 💬 Author

**Mokshit Puri**  
📧 [mokshitp44@gmail.com](mailto:mokshitp44@gmail.com)  
💼 [LinkedIn](https://linkedin.com/in/mokshit-puri)
