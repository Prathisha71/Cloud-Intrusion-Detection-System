# ==========================
# CIIDS Project Setup Script (Windows)
# ==========================

Write-Host "Starting CIIDS project setup..." -ForegroundColor Cyan

# 1. Check Node.js
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js not found. Please install Node.js >= 18." -ForegroundColor Red
    exit
}

# 2. Check Python
if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
    Write-Host "Python not found. Please install Python >= 3.10." -ForegroundColor Red
    exit
}

# 3. Install npm dependencies
Write-Host "Installing frontend dependencies..."
cd frontend
npm install
cd ..

Write-Host "Installing backend dependencies..."
cd backend
npm install
cd ..

# 4. Copy .env example
if (-Not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host ".env file created. Please edit it with your secrets." -ForegroundColor Yellow
}

# 5. Build Docker containers
Write-Host "Building Docker containers..."
docker-compose build

Write-Host "Setup completed successfully!" -ForegroundColor Green
