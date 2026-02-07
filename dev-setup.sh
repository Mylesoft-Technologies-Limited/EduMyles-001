#!/bin/bash

# EduMyles Development Setup Script
# This script sets up and runs both Convex and Next.js dev servers

echo "🚀 EduMyles Development Environment Setup"
echo "=========================================="
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local not found!"
    echo "Please create .env.local with your Convex URL"
    exit 1
fi

echo "✅ Environment variables configured"
echo ""

# Install dependencies if needed
if [ ! -d node_modules ]; then
    echo "📦 Installing dependencies..."
    pnpm install
fi

echo ""
echo "🔧 Starting development servers..."
echo "=========================================="
echo ""

# Start Convex dev server in background
echo "Starting Convex dev server..."
npx convex dev --once 2>&1 &
CONVEX_PID=$!

# Wait a bit for Convex to start
sleep 3

# Start Next.js dev server
echo "Starting Next.js dev server..."
pnpm dev

# Cleanup on exit
trap "kill $CONVEX_PID" EXIT
