# Complete Setup Guide: React Dashboard ↔ Python/SQL

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Project Structure](#project-structure)
3. [Database Setup](#database-setup)
4. [Python Backend Setup](#python-backend-setup)
5. [React Frontend Setup](#react-frontend-setup)
6. [Running the Complete Application](#running-the-application)
7. [How the Connection Works](#how-it-works)
8. [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

### Required Software
```bash
# Check if installed:
python --version      # Python 3.8+
node --version        # Node.js 16+
npm --version         # npm 8+
mysql --version       # MySQL 8.0+
```

### Install if Missing
```bash
# Python (macOS/Linux)
brew install python3

# Python (Windows)
# Download from python.org

# Node.js (all platforms)
# Download from nodejs.org

# MySQL
brew install mysql       # macOS
apt install mysql-server # Ubuntu/Linux
# Download from mysql.com for Windows
```

---

## 📁 Project Structure

Create this folder structure:

```
vaccination-project/
│
├── backend/                    # Python Flask API
│   ├── app.py                 # Main Flask application
│   ├── requirements.txt       # Python dependencies
│   ├── .env                   # Environment variables
│   └── config.py              # Configuration
│
├── frontend/                   # React Dashboard
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── Dashboard.js   # Main dashboard component
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .env
│
├── database/                   # SQL Scripts
│   ├── schema.sql             # Database schema
│   ├── load_data.sql          # Data loading
│   └── views.sql              # Analytical views
│
└── README.md
```

---

## 🗄️ Database Setup

### Step 1: Create Database

```bash
# Start MySQL
mysql -u root -p

# Or on macOS:
mysql.server start
mysql -u root -p
```

```sql
-- Create database
CREATE DATABASE vaccination_db;
USE vaccination_db;

-- Run your schema
SOURCE /path/to/database/schema.sql;
```

### Step 2: Load Data

```bash
# Load cleaned CSV data into MySQL
python scripts/load_data_to_mysql.py
```

**load_data_to_mysql.py:**
```python
import pandas as pd
import mysql.connector
from sqlalchemy import create_engine

# Database connection
engine = create_engine('mysql+mysqlconnector://root:password@localhost/vaccination_db')

# Load CSVs
coverage_df = pd.read_csv('cleaned_data/coverage_cleaned.csv')
incidence_df = pd.read_csv('cleaned_data/incidence_cleaned.csv')
cases_df = pd.read_csv('cleaned_data/cases_cleaned.csv')

# Load into database
coverage_df.to_sql('fact_coverage', engine, if_exists='append', index=False)
incidence_df.to_sql('fact_incidence', engine, if_exists='append', index=False)
cases_df.to_sql('fact_cases', engine, if_exists='append', index=False)

print("✓ Data loaded successfully!")
```

### Step 3: Verify Data

```sql
-- Check record counts
SELECT 'Coverage' as table_name, COUNT(*) as records FROM fact_coverage
UNION ALL
SELECT 'Incidence', COUNT(*) FROM fact_incidence
UNION ALL
SELECT 'Cases', COUNT(*) FROM fact_cases;
```

---

## 🐍 Python Backend Setup

### Step 1: Create Backend Directory

```bash
mkdir backend
cd backend
```

### Step 2: Create requirements.txt

```txt
flask==3.0.0
flask-cors==4.0.0
mysql-connector-python==8.2.0
pandas==2.1.0
python-dotenv==1.0.0
sqlalchemy==2.0.0
```

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 4: Create .env File

```bash
# backend/.env
DB_HOST=localhost
DB_NAME=vaccination_db
DB_USER=root
DB_PASSWORD=your_mysql_password
FLASK_ENV=development
```

### Step 5: Create app.py

Copy the Flask API code I provided earlier to `backend/app.py`

### Step 6: Test Backend

```bash
python app.py
```

You should see:
```
🚀 Vaccination Data API Server
Server starting on http://localhost:5000
```

### Step 7: Test API Endpoints

```bash
# Test in terminal
curl http://localhost:5000/api/health

# Or visit in browser
http://localhost:5000/api/health
http://localhost:5000/api/eda/global-trends
```

**Expected Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-12-16T10:30:00",
  "version": "1.0.0"
}
```

---

## ⚛️ React Frontend Setup

### Step 1: Create React App

```bash
npx create-react-app frontend
cd frontend
```

### Step 2: Install Dependencies

```bash
npm install lucide-react
```

### Step 3: Create Dashboard Component

```bash
# Create components folder
mkdir src/components
```

Copy the React dashboard code to `src/components/Dashboard.js`

### Step 4: Update App.js

```javascript
// src/App.js
import React from 'react';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
```

### Step 5: Add Tailwind CSS

**Option A: CDN (Quick Start)**
```html
<!-- public/index.html -->
<head>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
```

**Option B: Full Installation**
```bash
npm install -D tailwindcss
npx tailwindcss init
```

```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Step 6: Configure API URL

```javascript
// src/config.js
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

```bash
# frontend/.env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🚀 Running the Application

### Terminal 1: Start MySQL

```bash
# Make sure MySQL is running
mysql.server start
# or
sudo systemctl start mysql
```

### Terminal 2: Start Flask Backend

```bash
cd backend
python app.py
```

**You should see:**
```
🚀 Vaccination Data API Server
Server starting on http://localhost:5000
```

### Terminal 3: Start React Frontend

```bash
cd frontend
npm start
```

**Browser opens automatically at:**
```
http://localhost:3000
```

---

## 🔗 How the Connection Works

### Data Flow Diagram

```
┌─────────────────────────────────────────────────────┐
│                   MySQL Database                     │
│  - fact_coverage                                    │
│  - fact_incidence                                   │
│  - fact_cases                                       │
│  - dim_countries, dim_vaccines, dim_diseases        │
└────────────────┬────────────────────────────────────┘
                 │
                 │ SQL Queries
                 │
┌────────────────▼────────────────────────────────────┐
│              Flask Backend (Python)                  │
│  - Executes SQL queries                             │
│  - Processes data with pandas                       │
│  - Returns JSON via REST API                        │
│                                                      │
│  Endpoints:                                         │
│  GET /api/eda/global-trends                        │
│  GET /api/eda/top-countries                        │
│  GET /api/insights/summary                         │
└────────────────┬────────────────────────────────────┘
                 │
                 │ HTTP Requests (fetch API)
                 │ Returns JSON data
                 │
┌────────────────▼────────────────────────────────────┐
│            React Frontend (JavaScript)               │
│  - Calls API endpoints with fetch()                 │
│  - Stores data in React state (useState)            │
│  - Renders interactive UI                           │
│  - Updates automatically when data changes          │
└─────────────────────────────────────────────────────┘
```

### Example: Fetching Global Trends

**1. User Opens Dashboard**
```javascript
// React component loads
useEffect(() => {
  loadAllData();
}, []);
```

**2. React Makes HTTP Request**
```javascript
const response = await fetch('http://localhost:5000/api/eda/global-trends');
const data = await response.json();
setGlobalTrends(data.data);
```

**3. Flask Receives Request**
```python
@app.route('/api/eda/global-trends', methods=['GET'])
def get_global_trends():
    query = """
        SELECT t.year, AVG(fc.coverage_percentage) as avg_coverage
        FROM fact_coverage fc
        JOIN dim_time t ON fc.time_id = t.time_id
        GROUP BY t.year
    """
    results = execute_query(query)
    return jsonify({'success': True, 'data': results})
```

**4. MySQL Executes Query**
```sql
-- Database processes query and returns results
year | avg_coverage
-----|-------------
2020 | 84.3
2021 | 85.1
2022 | 86.4
```

**5. Flask Returns JSON**
```json
{
  "success": true,
  "data": [
    {"year": 2020, "avg_coverage": 84.3},
    {"year": 2021, "avg_coverage": 85.1},
    {"year": 2022, "avg_coverage": 86.4}
  ]
}
```

**6. React Displays Data**
```javascript
{globalTrends.map(item => (
  <div>{item.year}: {item.avg_coverage}%</div>
))}
```

---

## 🔍 Code Walkthrough

### Flask API Endpoint Anatomy

```python
@app.route('/api/eda/global-trends', methods=['GET'])  # 1. URL route
def get_global_trends():                                # 2. Function name
    
    # 3. SQL Query
    query = """
        SELECT t.year, AVG(fc.coverage_percentage) as avg_coverage
        FROM fact_coverage fc
        JOIN dim_time t ON fc.time_id = t.time_id
        GROUP BY t.year
    """
    
    # 4. Execute query and get results
    results = execute_query(query)
    
    # 5. Return JSON response
    return jsonify({
        'success': True,
        'data': results,
        'timestamp': datetime.now().isoformat()
    })
```

### React Data Fetching

```javascript
// 1. Define state to store data
const [globalTrends, setGlobalTrends] = useState(null);

// 2. Fetch function
const fetchData = async (endpoint, setter) => {
    const response = await fetch(`${API_BASE}${endpoint}`);
    const data = await response.json();
    setter(data.data);  // Store in state
};

// 3. Load data on component mount
useEffect(() => {
    fetchData('/eda/global-trends', setGlobalTrends);
}, []);

// 4. Display data
{globalTrends && globalTrends.map(item => (
    <div key={item.year}>
        {item.year}: {item.avg_coverage}%
    </div>
))}
```

---

## 🐛 Troubleshooting

### Issue 1: "Connection Refused" Error

**Problem:** React can't connect to Flask
```
Error: Failed to fetch
Network Error: Connection refused
```

**Solutions:**
```bash
# 1. Check if Flask is running
curl http://localhost:5000/api/health

# 2. Check Flask is on port 5000
# In app.py, verify:
app.run(port=5000)

# 3. Check CORS is enabled
# In app.py:
from flask_cors import CORS
CORS(app)
```

### Issue 2: "Access Denied" MySQL Error

**Problem:** Can't connect to database
```
mysql.connector.errors.ProgrammingError: Access denied for user 'root'@'localhost'
```

**Solutions:**
```bash
# 1. Check password in .env file
DB_PASSWORD=your_actual_password

# 2. Reset MySQL password
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
FLUSH PRIVILEGES;

# 3. Test connection
mysql -u root -p vaccination_db
```

### Issue 3: Empty Data in Dashboard

**Problem:** Dashboard loads but shows no data

**Debug Steps:**
```bash
# 1. Check if data exists in database
mysql -u root -p
USE vaccination_db;
SELECT COUNT(*) FROM fact_coverage;

# 2. Test API endpoint directly
curl http://localhost:5000/api/eda/global-trends

# 3. Check browser console (F12)
# Look for error messages

# 4. Add console.log in React
console.log('Fetched data:', data);
```

### Issue 4: CORS Error

**Problem:**
```
Access to fetch at 'http://localhost:5000' from origin 'http://localhost:3000' 
has been blocked by CORS policy
```

**Solution:**
```python
# In app.py
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Or specific origins:
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
```

### Issue 5: Port Already in Use

**Problem:**
```
Error: Port 5000 is already in use
```

**Solutions:**
```bash
# Option 1: Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Option 2: Use different port
# In app.py:
app.run(port=5001)

# Update React .env:
REACT_APP_API_URL=http://localhost:5001/api
```

---

## ✅ Verification Checklist

- [ ] MySQL is running and accessible
- [ ] Database `vaccination_db` exists
- [ ] Tables have data (fact_coverage, etc.)
- [ ] Flask server starts without errors
- [ ] Can access http://localhost:5000/api/health
- [ ] React app starts on http://localhost:3000
- [ ] No CORS errors in browser console
- [ ] Dashboard displays real data from database
- [ ] Refresh button updates data
- [ ] All tabs show correct information

---

## 📊 Testing the Complete Flow

### Test 1: Health Check

```bash
curl http://localhost:5000/api/health
```

**Expected:**
```json
{"status": "healthy", "timestamp": "2024-12-16T10:30:00", "version": "1.0.0"}
```

### Test 2: Data Retrieval

```bash
curl http://localhost:5000/api/eda/global-trends
```

**Expected:**
```json
{
  "success": true,
  "data": [
    {"year": 2020, "avg_coverage": 84.3, "countries": 194},
    {"year": 2021, "avg_coverage": 85.1, "countries": 194}
  ]
}
```

### Test 3: React Display

1. Open http://localhost:3000
2. Click "Analytics" tab
3. Expand "Global Coverage Trends"
4. See data from your database displayed

---

## 🎯 Next Steps

1. **Add More Endpoints:**
   - Disease correlation analysis
   - Regional comparisons
   - Vaccine effectiveness scores

2. **Enhance Frontend:**
   - Add charts with Chart.js or Recharts
   - Export functionality (CSV, PDF)
   - Real-time updates with WebSockets

3. **Deploy:**
   - Backend: Heroku, AWS, or DigitalOcean
   - Frontend: Vercel, Netlify, or GitHub Pages
   - Database: AWS RDS, Google Cloud SQL

4. **Security:**
   - Add authentication (JWT tokens)
   - API rate limiting
   - Input validation

---

## 📚 Additional Resources

- **Flask Documentation:** https://flask.palletsprojects.com/
- **React Documentation:** https://react.dev/
- **MySQL Documentation:** https://dev.mysql.com/doc/
- **Tailwind CSS:** https://tailwindcss.com/docs

---

**Congratulations! You now have a fully connected full-stack application!** 🎉