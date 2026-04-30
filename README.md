# 🧭 Employee Performance Evaluation Dashboard

A full-stack performance management system built with **Next.js 15+ App Router**, enabling administrators and employees to manage and conduct evaluations including self-assessments, peer reviews, and admin evaluations.

---

## ✨ Features

### 🔒 Authentication
- Secure login/signup using **NextAuth.js**
- Role-based access: Admin & Employee views

### 📊 Admin Panel
- View organization-wide evaluation metrics
- Evaluate individual employees
- Monitor task completion and performance ratings

### 👤 Employee Dashboard
- View self, peer, and admin evaluations
- Complete self-evaluation forms
- Select peers for performance reviews

### 📈 Real-time Feedback & Summary
- Performance charts and evaluation summaries
- History of evaluations and progress tracking

---

## 🚀 Technologies Used

| Tech | Purpose |
|------|---------|
| **Next.js 15+ (App Router)** | Full-stack React framework |
| **Javascript**
| **NextAuth.js** | Authentication and session management |
| **MongoDB + Mongoose** | NoSQL database for storing evaluations |
| **Tailwind CSS / ShadCN** | UI styling and component library |
| **Radix UI** | Accessible UI primitives |
| **Chart.js or Recharts** | Performance data visualization |

---


## 🛠 Installation & Setup

### 1. Clone the Repo
```bash
git clone https://github.com/kenenisabeyan/Performance-Evaluator.git
cd employee-evaluation-dashboard
```
### 2. Install Dependencies
```
cd
npm install next react react-dom
npm install next-auth
npm install mongoose
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input card textarea separator dialog accordion tooltip table label avatar badge toast
npm install react-icons




```
### 3. Configure Environment Variables
```
.env

MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```
### 4. Run the Dev Server
```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

## 📂 Project Structure

```text
├── app/                  # Next.js 15 App Router pages & API routes
│   ├── (auth)/           # Authentication pages (login/register)
│   ├── admin/            # Admin dashboard & evaluation management
│   ├── employee/         # Employee self & peer evaluation interfaces
│   ├── team-leader/      # Team leader specific views
│   └── api/              # API endpoints for evaluations & users
├── components/           # Reusable UI components (Shadcn UI, Radix)
├── lib/                  # Utility functions & database connection
├── models/               # Mongoose schema definitions
├── public/               # Static assets (images, icons)
└── middleware.js         # NextAuth route protection & role verification
```

---

## 🚢 Deployment

This application is optimized for deployment on Vercel.

1. Push your code to a GitHub repository.
2. Import the project into [Vercel](https://vercel.com).
3. Add the required **Environment Variables** (MongoDB URI, NextAuth Secret, NextAuth URL).
4. Click **Deploy**.

For deploying the database, **MongoDB Atlas** is recommended.

---

## 🌟 High-Level Problem Solving

- **Complex Evaluation Workflows:** Engineered a multi-tier evaluation system supporting self, peer, and admin reviews seamlessly through unified Next.js API routes.
- **Role-Based Access Control (RBAC):** Implemented strict middleware-level protection to ensure employees, team leaders, and admins only access authorized dashboard views and data endpoints.
- **Dynamic State Management:** Leveraged React Server Components (RSC) along with client-side state hooks to provide a fast, responsive, and optimistic UI for form submissions.

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
