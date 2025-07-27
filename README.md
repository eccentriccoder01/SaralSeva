<div align="center"><img src="S.png" style="width: 220px; height: 220px;" /></div>

# <div align="center">SaralSeva</div>

**SaralSeva** is a web-based full stack application designed to streamline the application and grievance resolution process for rural government schemes. This platform offers user-friendly features for users to apply for schemes, track their progress, and receive updates, as well as powerful tools for administrators and employees to manage scheme applications, monitor performance, and communicate effectively.

---

## 🇮🇳 The Vision: Digitising Governance at the Gram Panchayat Level

SaralSeva is more than just a software project; it's an initiative for social good, aimed at strengthening governance from the ground up. It directly contributes to building a more inclusive and transparent Digital India by focusing on:

* By bringing government services online, SaralSeva makes them accessible to citizens 24/7 from anywhere, reducing the need for physical travel to government offices.
* Every application and grievance is tracked digitally with a unique ID. This end-to-end visibility minimises ambiguity and holds the system accountable, building trust between the citizens and the administration.
* The platform automates the workflow of application processing, reducing processing times and ensuring that benefits reach the intended recipients faster.
* The platform serves as a central repository of information on all available government schemes. This empowers citizens with the information they need to claim their rights and improve their livelihoods.
* With dedicated portals for employees and administrators, tasks are clearly assigned and tracked. The integrated grievance redressal system ensures that citizen concerns are heard and addressed in a structured manner.

---
## 🚀 Live Demo

Experience SaralSeva live here: 
👉 [![**SaralSeva**](https://img.shields.io/badge/View-Live%20Demo-orange?style=for-the-badge)](https://SaralSeva.example.app)

 <div align="center">
 <p>

[![Open Source Love svg1](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)
![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat)
![Visitors](https://api.visitorbadge.io/api/Visitors?path=eccentriccoder01%2FSaralSeva%20&countColor=%23263759&style=flat)
![GitHub Forks](https://img.shields.io/github/forks/eccentriccoder01/SaralSeva)
![GitHub Repo Stars](https://img.shields.io/github/stars/eccentriccoder01/SaralSeva)
![GitHub Contributors](https://img.shields.io/github/contributors/eccentriccoder01/SaralSeva)
![GitHub Last Commit](https://img.shields.io/github/last-commit/eccentriccoder01/SaralSeva)
![GitHub Repo Size](https://img.shields.io/github/repo-size/eccentriccoder01/SaralSeva)
![Github](https://img.shields.io/github/license/eccentriccoder01/SaralSeva)
![GitHub Issues](https://img.shields.io/github/issues/eccentriccoder01/SaralSeva)
![GitHub Closed Issues](https://img.shields.io/github/issues-closed-raw/eccentriccoder01/SaralSeva)
![GitHub Pull Requests](https://img.shields.io/github/issues-pr/eccentriccoder01/SaralSeva)
![GitHub Closed Pull Requests](https://img.shields.io/github/issues-pr-closed/eccentriccoder01/SaralSeva)
 </p>
 </div>

## 📸 Screenshots

<div align="center"><img src="App.png"/></div>

---

## 🌟 Key Features

SaralSeva is built on a robust three-tier architecture, providing distinct, secure, and feature-rich portals for each user role.

### **Citizen Portal**
* **User Registration & Authentication**: Secure registration and login system with JWT and OTP verification via Twilio.
* **Scheme & Grievance Applications**: Users can easily apply for government schemes and submit grievances through intuitive forms.
* **Real-time Status Tracking**: Users can track the progress of their applications and grievances with a unique ID.
* **Personalised Dashboard**: A central place for users to view their application history and manage their profile.
* **PDF Downloads**: Users can download their applications as PDFs via `jsPDF` for their records.

### **Employee Portal**
* **Task-Oriented Dashboard**: A clear view of all assigned scheme applications (tickets) and grievances.
* **Application Processing**: Tools to review applications, verify documents, and update statuses.
* **Performance Insights**: Admins can track and visualise employee performance data.
* **Secure Messaging**: Internal chat system for communication with the admin.

### **Admin Portal**
* **Comprehensive Dashboard**: A high-level overview of all platform activity, including application statistics and employee performance.
* **Scheme Management**: Full control to add, update, and manage all available government schemes.
* **Automated Ticket Assignment**: Fair distribution of applications among employees.
* **Final Approval Authority**: Power to give the final approval or rejection for all applications.
* **Broadcast Announcements**: Create and display important updates for all citizens.

---

## 🛠️ Technology Stack

### Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![ShadCN](https://img.shields.io/badge/ShadCN-FED7D7?style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

### Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![bcrypt](https://img.shields.io/badge/bcrypt-00C7B7?style=for-the-badge)
![Twilio](https://img.shields.io/badge/Twilio-F22F46?style=for-the-badge&logo=twilio&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![Render](https://img.shields.io/badge/Render-0099FF?style=for-the-badge&logo=render&logoColor=white)

---

## ⚙️ Installation and Setup

> The project is a monorepo containing four separate applications: `backend`, `user`, `employee`, and `admin`. Each must be set up and run independently.

### Prerequisites

Ensure you have the following installed:
- **Node.js** and **npm**
- **MongoDB** (local or a cloud instance like MongoDB Atlas)

### 1. Clone the repository:

```bash
git clone [https://github.com/eccentriccoder01/SaralSeva.git](https://github.com/eccentriccoder01/SaralSeva.git)
cd SaralSeva
````

### 2\. Set up the Backend (`/backend`):

a. Navigate to the backend directory:

```bash
cd backend
```

b. Create a `.env` file and add the following environment variables with your credentials:

```env
PORT=8000

MONGODB_URL=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_JWT_SECRET_KEY

# Twilio Credentials (I haven't provided my Twilio credentials in the deployment, since it is paid, LOL)
TWILIO_ACCOUNT_SID=YOUR_TWILIO_SID
TWILIO_AUTH_TOKEN=YOUR_TWILIO_AUTH_TOKEN
TWILIO_PHONE_NUMBER=YOUR_TWILIO_PHONE_NUMBER

# Cloudinary Credentials
CLOUDINARY_NAME=YOUR_CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY
CLOUDINARY_SECRET_KEY=YOUR_CLOUDINARY_API_SECRET

# Firebase Credentials
FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID
FIREBASE_MEASUREMENT_ID=YOUR_FIREBASE_MEASUREMENT_ID
```

c. Install dependencies and run the server:

```bash
npm install
npm start
```

### 3\. Set up the Frontends (`/user`, `/employee`, `/admin`):

> Repeat the following steps for each frontend directory (`user`, `employee`, and `admin`) in a **separate terminal**.

a. Navigate to a frontend directory:

```bash
# In a new terminal
cd user 
```

b. Install dependencies and run the development server:

```bash
npm install
npm run dev
```

-----

## Issue Creation ✴

Report bugs and issues or propose improvements through our GitHub repository's "Issues" tab.

## Contribution Guidelines 📑

- Firstly Star(⭐) the Repository
- Fork the Repository and create a new branch for any updates/changes/issue you are working on.
- Start Coding and do changes.
- Commit your changes
- Create a Pull Request which will be reviewed and suggestions would be added to improve it.
- Add Screenshots and updated website links to help us understand what changes is all about.

- Check the [CONTRIBUTING.md](CONTRIBUTING.md) for detailed steps...

## Contributing is fun🧡

We welcome all contributions and suggestions!
Whether it's a new feature, design improvement, or a bug fix - your voice matters 💜

Your insights are invaluable to us. Reach out to us team for any inquiries, feedback, or concerns.

## 📄 License

This project is open-source and available under the MIT License.

## 📞 Contact

Developed by [Eccentric Explorer](https://eccentriccoder01.github.io/Me)

Feel free to reach out with any questions or feedback\!