# AssetVerse - Corporate Asset Management System

## 🌐 Live URL
[AssetVerse Live Site](https://asseetverse.netlify.app/)

## 📋 Project Purpose
AssetVerse is a comprehensive B2B (Business-to-Business) HR & Asset Management web application that helps companies efficiently manage their physical assets (laptops, keyboards, chairs, etc.) and track which employee has which equipment. The system streamlines the entire asset management process, prevents asset loss, improves accountability, and reduces administrative overhead for HR departments.

## ✨ Key Features

### For HR Managers
- **Asset Management**: Add, edit, delete, and track company assets with real-time inventory
- **Request Approval System**: Review and approve/reject employee asset requests with one-click actions
- **Auto-Affiliation**: Automatically affiliate employees when approving their first request
- **Employee Management**: View and manage team members with profile images
- **Analytics Dashboard**: Visualize asset distribution with Pie and Bar charts using Recharts
- **Package Upgrades**: Seamless Stripe integration for upgrading employee limits
- **Multi-tenant Support**: Manage assets for your specific company with data isolation

### For Employees
- **Asset Requests**: Browse and request available assets from multiple companies
- **My Assets**: View all assigned assets across different companies with search and filter
- **Team View**: See colleagues from each affiliated company
- **Profile Management**: Update personal information and profile picture
- **Multi-Company Support**: Work with multiple companies simultaneously
- **Print Functionality**: Generate printable asset reports

### General Features
- **Modern UI/UX**: Beautiful gradient-based design with smooth animations using Framer Motion
- **Responsive Design**: Fully responsive for mobile, tablet, and desktop devices
- **Secure Authentication**: JWT-based authentication with role-based access control
- **Image Upload**: Integrated ImageBB for profile and asset images
- **Real-time Updates**: Instant package limit updates after payment
- **Search & Filter**: Advanced search and filtering capabilities
- **Pagination**: Server-side pagination for better performance

## 📦 NPM Packages Used

### Core Dependencies
- **react** (^19.2.0) - UI library
- **react-dom** (^19.2.0) - React DOM rendering
- **react-router** (^7.10.1) - Client-side routing
- **vite** (^6.0.5) - Build tool and dev server

### UI & Styling
- **tailwindcss** (^3.4.17) - Utility-first CSS framework
- **daisyui** (^4.12.23) - Tailwind CSS component library
- **motion** (^11.15.0) - Animation library (Framer Motion)
- **react-icons** (^5.4.0) - Icon library

### Forms & Validation
- **react-hook-form** (^7.54.2) - Form management
- **sweetalert2** (^11.15.3) - Beautiful alerts and modals

### Data Fetching & State
- **@tanstack/react-query** (^5.64.2) - Server state management
- **axios** (^1.7.9) - HTTP client

### Authentication
- **firebase** (^11.1.0) - Authentication and user management

### Payment Integration
- **@stripe/react-stripe-js** (^3.1.0) - Stripe React components
- **@stripe/stripe-js** (^5.3.0) - Stripe JavaScript SDK

### Charts & Analytics
- **recharts** (^2.15.0) - Charting library for analytics

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase account
- ImageBB API key
- Stripe account

### Installation

1. Clone the repository
```bash
git clone https://github.com/imtiaz-al-kabir/AssetVerse-client.git
cd assetverse-client
```

2. Install dependencies
```bash
npm install
```

3. Create `.env.local` file in the root directory
```env
# Firebase Configuration
VITE_APIKEY=your_firebase_api_key
VITE_AUTHDOMAIN=your_firebase_auth_domain
VITE_PROJECTID=your_firebase_project_id
VITE_STORAGEBUCKET=your_firebase_storage_bucket
VITE_MESSAGINGSENDERID=your_firebase_messaging_sender_id
VITE_APPID=your_firebase_app_id

# ImageBB API
VITE_IMGBB_API_KEY=your_imgbb_api_key

# Backend API URL
VITE_API_URL=http://localhost:5000
```

4. Start the development server
```bash
npm run dev
```

5. Build for production
```bash
npm run build
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable components
│   ├── AssetForm/      # Asset creation/edit form
│   ├── RequestForm/    # Asset request form
│   ├── AssetList/      # Asset listing component
│   ├── RequestList/    # Request listing component
│   ├── DashboardCharts/# Analytics charts
│   ├── Navbar/         # Navigation bar
│   ├── Footer/         # Footer component
│   └── ImageUpload/    # Image upload component
├── pages/              # Page components
│   ├── Home/           # Landing page sections
│   ├── Auth/           # Login & Registration
│   ├── Dashboard/      # Dashboard layout
│   ├── Profile/        # User profile
│   ├── MyAssets/       # Employee assets
│   ├── MyTeam/         # Team members
│   ├── RequestAsset/   # Asset request page
│   ├── Subscription/   # Package upgrade
│   └── NotFound/       # 404 page
├── hooks/              # Custom React hooks
│   ├── useAuth.jsx     # Authentication hook
│   ├── useAxiosSecure.jsx # Secure axios instance
│   └── useAxiosBase.jsx   # Base axios instance
├── providers/          # Context providers
│   └── AuthProvider.jsx # Auth context
└── routes/             # Route configuration
    └── Routes.jsx      # App routes
```

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_APIKEY` | Firebase API Key |
| `VITE_AUTHDOMAIN` | Firebase Auth Domain |
| `VITE_PROJECTID` | Firebase Project ID |
| `VITE_STORAGEBUCKET` | Firebase Storage Bucket |
| `VITE_MESSAGINGSENDERID` | Firebase Messaging Sender ID |
| `VITE_APPID` | Firebase App ID |
| `VITE_IMGBB_API_KEY` | ImageBB API Key for image uploads |
| `VITE_API_URL` | Backend API base URL |

## 🧪 Testing Credentials

**HR Manager:**
- Email: hr@gmail.com
- Password: Test@123

**Employee:**
- Email: employee@gmail.com
- Password: Test@123

## 🛠️ Technologies Used

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + DaisyUI
- **Animations**: Framer Motion
- **State Management**: TanStack Query
- **Authentication**: Firebase Auth + JWT
- **Payment**: Stripe
- **Charts**: Recharts
- **Image Upload**: ImageBB API

## 📱 Features Breakdown

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (HR/Employee)
- Protected routes with middleware
- Persistent login sessions

### Asset Management
- CRUD operations for assets
- Image upload with preview
- Quantity tracking (total vs available)
- Asset type classification (Returnable/Non-returnable)

### Request Workflow
- Employee request submission
- HR approval/rejection system
- Auto-affiliation on first approval
- Package limit enforcement

### Analytics
- Pie chart for asset type distribution
- Bar chart for top requested assets
- Real-time data visualization

### Payment Integration
- Stripe checkout integration
- Package upgrade workflow
- Payment history tracking
- Immediate limit updates

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Imtiaz Al Kabir - [GitHub Profile](https://github.com/imtiaz-al-kabir)

## 🙏 Acknowledgments

- Programming Hero for the project requirements
- DaisyUI for the beautiful component library
- Stripe for payment processing
- ImageBB for image hosting
