Zerodha (Kite) Clone

A full-stack trading and portfolio platform replicating the core UI and functionality of Zerodha's Kite web app, built with the MERN stack.

Features


Authentication: Login and Signup pages with session-based user accounts
Static Pages: About page, Contact page, with a consistent header and footer across the app
Order Placement: Users can place buy/sell orders on stocks
Holdings: View current stock holdings and their performance
Positions: Track open positions in real time
Charts: Candlestick/price charts for visualizing stock trends
Mock Price Feed: Stock prices are currently simulated (mock data) — not yet connected to a live market data API


Tech Stack


Frontend: React
Backend: Node.js, Express
Database: MongoDB


Known Issues / In Progress

Email-based two-factor verification (2FA) has been partially implemented but is not fully functional yet — currently being debugged
Deployment is currently facing a configuration issue; the app runs correctly in local development

# Clone the repo
git clone <your-repo-url>
cd zerodha-clone

# Install dependencies
cd client && npm install
cd ../server && npm install

# Set up environment variables (.env)
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>

# Run backend
cd server && npm start

# Run frontend
cd ../client && npm start

License

This project is for educational/portfolio purposes only and is not affiliated with Zerodha Broking Ltd.
