# Marketing Agency Backend

A Node.js & Express based backend for a Digital Marketing Agency platform.

## Features (Planned/Implemented)
- **User Management**: Admin, Marketer, and Client roles.
- **Campaign Management**: Budgeting, scheduling, and status tracking.
- **Ads Management**: Cross-platform ad tracking (Facebook, Instagram, Google, etc.).
- **Analytics**: Performance monitoring (views, clicks, conversions).
- **Payment Integration**: Orange Money, Mobile Money, and Card payments.
- **Task Workflow**: Task assignment and tracking for marketers.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Environment**: dotenv

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB instance (Atlas or local)

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_CONNECTION_URI=your_mongodb_uri
   ```
4. Start the server:
   ```bash
   npm start
   ```

## Project Structure
- `Models/`: Database schema definitions.
- `Controllers/`: Request handling logic.
- `Routers/`: API route definitions.
- `config/`: Configuration files (e.g., database).
- `middleware/`: Custom middleware.
- `server.js`: Entry point.
