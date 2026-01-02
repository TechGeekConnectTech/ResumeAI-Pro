#!/bin/bash

# ResumeAI Pro Service Management Script

SERVICE_DIR="/home/ai_analyser/AI-Analyser"
FRONTEND_DIR="/home/ai_analyser/AI-Analyser/frontend"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to show status
show_status() {
    echo "=== ResumeAI Pro Service Status ==="
    echo
    
    # Check backend
    if pgrep -f "python3 main.py" > /dev/null; then
        echo -e "Backend:  ${GREEN}RUNNING${NC} (PID: $(pgrep -f 'python3 main.py'))"
        if curl -s http://127.0.0.1:8006 > /dev/null 2>&1; then
            echo -e "          ${GREEN}Responding at http://77.37.45.138:8006${NC}"
        else
            echo -e "          ${RED}Process running but not responding${NC}"
        fi
    else
        echo -e "Backend:  ${RED}STOPPED${NC}"
    fi
    
    # Check frontend
    if pgrep -f "serve -s build -l 3006" > /dev/null; then
        echo -e "Frontend: ${GREEN}RUNNING${NC} (PID: $(pgrep -f 'serve -s build -l 3006'))"
        if curl -s http://127.0.0.1:3006 > /dev/null 2>&1; then
            echo -e "          ${GREEN}Responding at http://77.37.45.138:3006${NC}"
        else
            echo -e "          ${RED}Process running but not responding${NC}"
        fi
    else
        echo -e "Frontend: ${RED}STOPPED${NC}"
    fi
    
    # Check monitor
    if pgrep -f "service-monitor.sh" > /dev/null; then
        echo -e "Monitor:  ${GREEN}RUNNING${NC} (PID: $(pgrep -f 'service-monitor.sh'))"
    else
        echo -e "Monitor:  ${RED}STOPPED${NC}"
    fi
    echo
}

# Function to start services
start_services() {
    echo "Starting ResumeAI Pro services..."
    
    # Start backend
    if ! pgrep -f "python3 main.py" > /dev/null; then
        cd "$SERVICE_DIR"
        nohup python3 main.py > backend.log 2>&1 &
        echo "Backend started"
        sleep 2
    else
        echo "Backend already running"
    fi
    
    # Start frontend
    if ! pgrep -f "serve -s build -l 3006" > /dev/null; then
        cd "$FRONTEND_DIR"
        nohup serve -s build -l 3006 > frontend.log 2>&1 &
        echo "Frontend started"
        sleep 2
    else
        echo "Frontend already running"
    fi
    
    # Start monitor
    if ! pgrep -f "service-monitor.sh" > /dev/null; then
        cd "$SERVICE_DIR"
        nohup ./service-monitor.sh > monitor.log 2>&1 &
        echo "Monitor started"
        sleep 1
    else
        echo "Monitor already running"
    fi
}

# Function to stop services
stop_services() {
    echo "Stopping ResumeAI Pro services..."
    
    pkill -f "service-monitor.sh" && echo "Monitor stopped"
    pkill -f "python3 main.py" && echo "Backend stopped"
    pkill -f "serve -s build" && echo "Frontend stopped"
    
    sleep 2
}

# Function to restart services
restart_services() {
    echo "Restarting ResumeAI Pro services..."
    stop_services
    sleep 3
    start_services
}

# Function to show logs
show_logs() {
    echo "=== Recent Service Logs ==="
    echo
    echo "--- Backend Log (last 10 lines) ---"
    tail -n 10 "$SERVICE_DIR/backend.log" 2>/dev/null || echo "No backend log found"
    echo
    echo "--- Frontend Log (last 10 lines) ---"
    tail -n 10 "$FRONTEND_DIR/frontend.log" 2>/dev/null || echo "No frontend log found"
    echo
    echo "--- Monitor Log (last 10 lines) ---"
    tail -n 10 "$SERVICE_DIR/service-monitor.log" 2>/dev/null || echo "No monitor log found"
}

# Main script logic
case "$1" in
    status)
        show_status
        ;;
    start)
        start_services
        echo
        show_status
        ;;
    stop)
        stop_services
        echo
        show_status
        ;;
    restart)
        restart_services
        echo
        show_status
        ;;
    logs)
        show_logs
        ;;
    *)
        echo "ResumeAI Pro Service Manager"
        echo
        echo "Usage: $0 {status|start|stop|restart|logs}"
        echo
        echo "Commands:"
        echo "  status   - Show current service status"
        echo "  start    - Start all services"
        echo "  stop     - Stop all services"
        echo "  restart  - Restart all services"
        echo "  logs     - Show recent logs from all services"
        echo
        exit 1
        ;;
esac