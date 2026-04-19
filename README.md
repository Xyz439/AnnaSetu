# AnnaSetu - Food Donation Platform

## Overview
AnnaSetu is a parish-based food donation platform designed to connect generous donors with verified volunteers. By bridging the gap between abundance and need, AnnaSetu aims to reduce food wastage and ensure that surplus food is properly and safely distributed to those in need through local community engagement.

## Key Features
* **User Authentication**: Secure login and signup flows for Donors, Volunteers, and Admins.
* **Role-Based Access Control (RBAC)**: Tailored dashboards and permissions depending on the user's role.
* **Donation Lifecycle Tracking**: Track donations from availability to acceptance, collection, and final distribution.
* **Volunteer Verification System**: Admin-approved verification workflow to ensure the integrity and safety of the volunteers handling the food.
* **Impact Dashboard**: Real-time statistics displaying active parishes, total donations, verified volunteers, and meals served.
* **Contact & Support**: Built-in support system for users to reach out to the platform administration.

## Tech Stack
* **Frontend**: React (Vite)
* **Backend Integration**: Supabase (PostgreSQL, Authentication)
* **Styling**: Tailwind CSS with custom design tokens for a premium UI experience.
* **Routing**: React Router DOM

## Project Structure
```
/src
  /assets        # Static assets
  /components    # Reusable UI components (Navbar, Footer, ProtectedRoutes, etc.)
  /contexts      # React Contexts (AuthContext)
  /hooks         # Custom React hooks (useImpactData)
  /lib           # External library configurations (Supabase client)
  /pages         # Page-level components for routing
/public          # Public static files
```

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tisd_prj
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Ensure you have your Supabase credentials configured. Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## Database Setup
The initial schema setup for Supabase is located in `init.sql`. Execute this script in your Supabase SQL editor to create the required tables (`parishes`, `users`, `donations`, `messages`) and RLS policies.

## Contributors
* **Member 1**: Frontend & Integration
* **Member 2**: Backend & Database
* **Member 3**: UI/Testing/Documentation
