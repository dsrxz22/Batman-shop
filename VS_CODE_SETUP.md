# 🎯 Visual Studio Code Setup Guide

Complete guide to run the Banking Fraud Detection AI system in VS Code.

## 📦 Prerequisites

- **Visual Studio Code** (Download: https://code.visualstudio.com/)
- **Python 3.9+** (Download: https://www.python.org/)
- **Git** (Download: https://git-scm.com/)

## ⚙️ Step 1: Install Required VS Code Extensions

### Automatic Installation (Recommended)

When you open this project in VS Code, you'll see a popup to install recommended extensions. Click **"Install All"**.

### Manual Installation

Or install these extensions manually:

1. Open VS Code Extensions (Ctrl+Shift+X / Cmd+Shift+X)
2. Search and install:
   - **Python** (ms-python.python)
   - **Pylance** (ms-python.vscode-pylance)
   - **Live Server** (ritwickdey.LiveServer)
   - **REST Client** (humao.rest-client)
   - **Prettier** (esbenp.prettier-vscode)
   - **GitHub Copilot** (GitHub.copilot) - Optional

## 🚀 Step 2: Initial Setup

### Option A: Using VS Code Tasks (Easiest)

1. **Open the project folder** in VS Code:
   - File → Open Folder → Select the project directory

2. **Open Terminal** in VS Code:
   - View → Terminal (or Ctrl+`)

3. **Run Setup Task**:
   - Press `Ctrl+Shift+B` (or Cmd+Shift+B on Mac)
   - Select "Setup: Install Dependencies"
   - Wait for completion

### Option B: Manual Setup

1. **Open Terminal** (Ctrl+`)

2. **Create Virtual Environment**:
   ```bash
   python3 -m venv venv
   ```

3. **Activate Virtual Environment**:
   - **Windows**: `venv\Scripts\activate`
   - **Mac/Linux**: `source venv/bin/activate`

4. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

## 🤖 Step 3: Train ML Model

### Using Tasks
1. Press `Ctrl+Shift+B`
2. Select "Setup: Train ML Model"
3. Wait for training to complete

### Or Manually
```bash
# In VS Code Terminal
source venv/bin/activate  # or venv\Scripts\activate on Windows
python ml_model/train_model.py
```

**You should see:**
```
✓ Generating synthetic data...
✓ Training models...
✓ Model training complete!
✓ Saving model and scaler...
```

## ▶️ Step 4: Run the Application

### Option A: Using Debug Configuration (Recommended)

1. **Start Backend**:
   - Press `Ctrl+Shift+D` (Debug panel)
   - Select "Python: Flask Backend" from dropdown
   - Press Play button or F5
   - You should see: `Running on http://127.0.0.1:5000`

2. **Open Frontend in another terminal**:
   - Press Ctrl+` to open new terminal
   - Run: `cd frontend && python -m http.server 8000`
   - You should see: `Serving HTTP on 0.0.0.0 port 8000`

3. **Open in Browser**:
   - Visit: http://localhost:8000/frontend/index.html

### Option B: Using VS Code Tasks

1. Press `Ctrl+Shift+P` (Command Palette)
2. Search: "Tasks: Run Task"
3. Select "Run: Flask Backend"
4. Repeat and select "Run: Frontend Server" in a new terminal

### Option C: Run All at Once

```bash
# In terminal (Ctrl+`)
source venv/bin/activate
python backend/app.py

# In another terminal (Ctrl+Shift+`)
cd frontend
python -m http.server 8000
```

## 🧪 Testing the Application

### Test API Health

1. **Using REST Client**:
   - Create file: `test.http`
   - Add:
     ```
     GET http://localhost:5000/api/health
     ```
   - Click "Send Request" above the line

2. **Using Terminal**:
   ```bash
   curl http://localhost:5000/api/health
   ```

3. **Using Live Server**:
   - Right-click on `frontend/index.html`
   - Select "Open with Live Server"

## 🎮 Using the Application

### Dashboard
1. Open: http://localhost:8000/frontend/index.html
2. Fill in transaction details
3. Click "Analyze Transaction"
4. View results and risk level

### View Dashboard
- Click "Dashboard" link
- See real-time statistics
- Monitor transaction history

## 🐛 Debugging in VS Code

### Set Breakpoints
1. Open `backend/app.py`
2. Click on line number to add breakpoint (red dot)
3. Run with Debug (F5)
4. Code will pause at breakpoint
5. Use Debug Panel to inspect variables

### Debug Console
- When debugging, use Debug Console to evaluate expressions
- Type in Console to check variable values

## 📁 File Navigation

### Quick File Open
- Press `Ctrl+P` (Cmd+P on Mac)
- Type filename to search
- Examples: `app.py`, `index.html`, `style.css`

### Go to Definition
- Right-click on function → "Go to Definition"
- Or press `Ctrl+Click` on function name

## 🔍 Using Python REPL

1. Open VS Code Terminal
2. Run: `python`
3. Test code interactively:
   ```python
   import numpy as np
   print(np.array([1, 2, 3]))
   ```

## 🌐 Using Live Server for Frontend

1. Right-click `frontend/index.html`
2. Select "Open with Live Server"
3. Automatically opens in browser
4. Auto-reloads on file changes

## 📝 Keyboard Shortcuts

| Action | Windows/Linux | Mac |
|--------|---------------|-----|
| Terminal | Ctrl+` | Cmd+` |
| Debug | F5 | Fn+F5 |
| Command Palette | Ctrl+Shift+P | Cmd+Shift+P |
| File Search | Ctrl+P | Cmd+P |
| Find/Replace | Ctrl+H | Cmd+H |
| Format Code | Ctrl+Shift+F | Cmd+Shift+F |
| Go to Line | Ctrl+G | Cmd+G |

## ✅ Troubleshooting

### Python Not Found
```bash
# Make sure Python is installed
python --version

# Or use python3
python3 --version
```

### Virtual Environment Not Activated
```bash
# Activate it manually
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate     # Windows
```

### Port 5000 Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9  # Mac/Linux
netstat -ano | findstr :5000    # Windows (find PID then: taskkill /PID <PID>)
```

### Model Files Not Found
```bash
# Train the model
python ml_model/train_model.py
```

### CORS Errors in Frontend
- Make sure backend is running on http://localhost:5000
- CORS is already enabled in `backend/app.py`
- Check browser console for errors (F12)

## 🚀 Running Full Project Workflow

### Complete Step-by-Step

1. **Open Project**
   ```bash
   # Open in VS Code
   code .
   ```

2. **Open Terminal** (Ctrl+`)

3. **Setup**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   pip install -r requirements.txt
   ```

4. **Train Model**
   ```bash
   python ml_model/train_model.py
   ```

5. **Run Backend** (Terminal 1)
   ```bash
   python backend/app.py
   ```
   Output: `Running on http://127.0.0.1:5000`

6. **Run Frontend** (Terminal 2 - Ctrl+Shift+`)
   ```bash
   cd frontend
   python -m http.server 8000
   ```
   Output: `Serving HTTP on 0.0.0.0 port 8000`

7. **Open Browser**
   - http://localhost:8000/frontend/index.html

8. **Test API**
   - Fill in transaction details
   - Click "Analyze Transaction"
   - View fraud detection results

## 📊 Dashboard URL

- **Main Page**: http://localhost:8000/frontend/index.html
- **Dashboard**: http://localhost:8000/frontend/dashboard.html
- **API Health**: http://localhost:5000/api/health

## 💾 Recommended VS Code Settings

Already configured in `.vscode/settings.json`:

- Python formatting with autopep8
- Auto-save on format
- Linting enabled
- __pycache__ excluded from search
- Type checking enabled

## 🎯 Next Steps

1. ✅ Explore the code in `backend/app.py`
2. ✅ Modify frontend styling in `frontend/style.css`
3. ✅ Train custom models with different data
4. ✅ Add new features to the API
5. ✅ Deploy using Docker

## 🆘 Need Help?

- Check Python version: `python --version`
- List installed packages: `pip list`
- Check pip version: `pip --version`
- View VS Code version: Help → About

---

**You're all set! Happy coding! 🎉**
