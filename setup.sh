#!/bin/bash

echo "Starting CIIDS project setup..."

# 1. Check Node.js
if ! command -v node &> /dev/null
then
    echo "Node.js could not be found. Please install Node.js >=18."
    exit
fi

# 2. Check Python
if ! command -v python3 &> /dev/null
then
    echo "Python3 could not be found. Please install Python >=3.10."
    exit
fi

# 3. Install npm dependencies
echo "Installing frontend dependencies..."
cd frontend || exit
npm install
cd ..

echo "Installing backend dependencies..."
cd backend || exit
npm install
cd ..

# 4. Copy .env example
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo ".env file created. Please edit it with your secrets."
fi

# 5. Build Docker containers
echo "Building Docker containers..."
docker-compose build

echo "Setup completed successfully!"
