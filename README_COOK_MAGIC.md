# Cook Magic Backend Setup

This guide explains how to set up and deploy the Cook Magic recipe generator with a secure backend.

## What Changed

- ✅ **API key is now secure**: Moved from frontend to backend environment variables
- ✅ **Input validation**: Server validates all inputs before sending to Gemini API
- ✅ **Error handling**: Better error messages and handling
- ✅ **CORS enabled**: Frontend can safely communicate with backend

## Local Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Create `.env` File

Copy `.env.example` to `.env` and add your Gemini API key:

```bash
cp .env.example .env
```

Edit `.env`:
```
PORT=3000
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### 3. Run Locally

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will run on `http://localhost:3000`

### 4. Access Cook Magic

Open your browser and go to:
```
http://localhost:3000/cook-magic.html
```

## Deployment Options

### Option 1: Render.com (Recommended - Easy setup)

1. Push this branch to GitHub
2. Go to [render.com](https://render.com)
3. Click "Create new +" and select "Web Service"
4. Connect your GitHub repo
5. Add environment variable: `GEMINI_API_KEY=your_key_here`
6. Deploy!

### Option 2: Railway.app

1. Connect GitHub repo at [railway.app](https://railway.app)
2. Add `GEMINI_API_KEY` environment variable
3. Railway auto-detects Node.js and deploys

### Option 3: Heroku

```bash
heroku login
heroku create your-app-name
heroku config:set GEMINI_API_KEY=your_key_here -a your-app-name
git push heroku add-cook-magic-backend:main
```

## API Endpoint

**POST** `/api/generate-recipe`

**Request:**
```json
{
  "ingredient1": "chicken",
  "ingredient2": "garlic",
  "ingredient3": "tomato"
}
```

**Response:**
```json
{
  "recipe": "Recipe Name: Garlic Tomato Chicken\n\nIngredients:\n..."
}
```

## Security Benefits

- ✅ API key never exposed to users
- ✅ Environment variables keep secrets safe
- ✅ CORS prevents unauthorized API access
- ✅ Input validation prevents malicious requests
