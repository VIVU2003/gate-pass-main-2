# Gate Pass System

The **Gate Pass System** is a digital solution designed to streamline the student leave approval process at Thapar Institute. It ensures secure authentication by verifying student leave requests through parental approval via email. The request is also sent to the hostel caretaker for review on the admin side. Once approved, the system generates a **QR code**, which students present at the main gate for verification by the security guard. This system enhances security, reduces paperwork, and ensures a seamless leave approval process.

---

## 🚀 Features

### **Authentication System**

- Secure user signup with role-based access.
- Login system with JWT authentication.
- Protected routes for authenticated users.

### **Student Leave Management**

- Submit leave requests with necessary details.
- Parent verification via **email authentication link**.
- Admin review and approval of leave requests.
- Automatic QR code generation upon approval.

### **Parental Authentication**

- Parents receive an email with authentication request.
- Secure **one-time verification link**.
- Expiration-based security for authentication tokens.

### **Admin Panel**

- View all pending student leave requests.
- Approve or reject student leave applications.
- Monitor leave request status.

### **QR Code Verification**

- QR code generation upon leave approval.
- QR code verification at the security gate.
- Automatic entry log generation.

---

## 🛠️ Tech Stack

- **Backend Framework**: Express.js (Node.js)
- **Database**: PostgreSQL (Prisma ORM)
- **Authentication**: JWT-based authentication
- **Email Service**: Nodemailer (Gmail SMTP)
- **QR Code Generation**: QR Code Library

---

## 📌 API Documentation

### **Authentication APIs**

#### **Sign Up**

**POST** `/signup`

```json
{
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "securepassword",
    "rollno": "TI12345",
    "parentEmail": "parent@example.com",
    "hostelName": "Hostel A"
}
```

#### **Sign In**

**POST** `/signin`

```json
{
    "email": "johndoe@example.com",
    "password": "securepassword"
}
```

---

### **Leave Request APIs**

#### **Submit Leave Request**

**POST** `/sendMail`

```json
{
    "from": "2024-03-10",
    "to": "2024-03-15",
    "place": "Home",
    "reason": "Family Function"
}
```

#### **Parental Authentication**

**PUT** `/auth?token=<auth_token>`

- This endpoint is accessed via the email link sent to parents.

---

### **Admin APIs**

#### **Fetch Pending Requests**

**GET** `/getAll`

- Returns all student leave requests that have **parental approval** but await **admin approval**.

#### **Approve Leave Request**

**PUT** `/allow?id=<user_id>`

- Marks the student's leave request as **approved**.

#### **Reset Leave Status**

**PUT** `/done?id=<user_id>`

- Resets the leave status for the next cycle.

---

## 🚦 Environment Variables

Ensure you set up the following environment variables in your `.env` file:

```env

JWT_SECRET=<your-secret-key>
EMAIL=<your-email>
PASSWORD=<your-email-password>
DATABASE_URL=<your-database-url>
```

---

## 🛠️ Installation & Setup

1. **Clone the Repository**

```sh
git clone <repository-url>
```

2. **Navigate to the Project Directory**

```sh
cd thapar-gatepass
```

3. **Install Dependencies**

```sh
npm install
```

4. **Setup Environment Variables**

```sh
cp .env.example .env
# Fill in your environment variables
```

5. **Run the Server**

```sh
npm run dev
```

---

## 📌 Future Enhancements

- **Real-time notifications** for students on leave request status.
- **Mobile app integration** for easier request submission and tracking.
- **Admin dashboard UI** for a better management experience.

---


## 📞Support

For support ,raise an issue in repository.

---
