#!/bin/bash

# ResumeAI Pro Service Monitor and Auto-Restart Script
# This script monitors both backend and frontend services and restarts them if they're down

LOG_FILE="/home/ai_analyser/AI-Analyser/service-monitor.log"
BACKEND_DIR="/home/ai_analyser/AI-Analyser"
FRONTEND_DIR="/home/ai_analyser/AI-Analyser/frontend"
BACKEND_URL="http://127.0.0.1:8006"
FRONTEND_URL="http://127.0.0.1:3006"

# Function to log messages with timestamp
log_message() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Function to check if backend is running
check_backend() {
    if pgrep -f "python3 main.py" > /dev/null; then
        if curl -s "$BACKEND_URL" > /dev/null 2>&1; then
            return 0  # Backend is running and responding
        else
            log_message "WARNING: Backend process exists but not responding"
            return 1
        fi
    else
        log_message "WARNING: Backend process not found"
        return 1
    fi
}

# Function to check if frontend is running
check_frontend() {
    if pgrep -f "serve -s build -l 3006" > /dev/null; then
        if curl -s "$FRONTEND_URL" > /dev/null 2>&1; then
            return 0  # Frontend is running and responding
        else
            log_message "WARNING: Frontend process exists but not responding"
            return 1
        fi
    else
        log_message "WARNING: Frontend process not found"
        return 1
    fi
}

# Function to start backend
start_backend() {
    log_message "Starting backend service..."
    cd "$BACKEND_DIR"
    nohup python3 main.py > backend.log 2>&1 &
    sleep 5
    if check_backend; then
        log_message "SUCCESS: Backend service started successfully"
    else
        log_message "ERROR: Failed to start backend service"
    fi
}

# Function to start frontend
start_frontend() {
    log_message "Starting frontend service..."
    cd "$FRONTEND_DIR"
    nohup serve -s build -l 3006 > frontend.log 2>&1 &
    sleep 3
    if check_frontend; then
        log_message "SUCCESS: Frontend service started successfully"
    else
        log_message "ERROR: Failed to start frontend service"
    fi
}

# Function to restart backend
restart_backend() {
    log_message "Restarting backend service..."
    pkill -f "python3 main.py"
    sleep 2
    start_backend
}

# Function to restart frontend
restart_frontend() {
    log_message "Restarting frontend service..."
    pkill -f "serve -s build"
    sleep 2
    start_frontend
}

# Main monitoring loop
log_message "=== ResumeAI Pro Service Monitor Started ==="

while true; do
    # Check backend
    if ! check_backend; then
        log_message "Backend is down. Attempting to restart..."
        restart_backend
    fi
    
    # Check frontend
    if ! check_frontend; then
        log_message "Frontend is down. Attempting to restart..."
        restart_frontend
    fi
    
    # Wait 30 seconds before next check
    sleep 30
done