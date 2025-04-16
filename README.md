# 🍽️ My Recipe Book

## 📚 Overview

My Recipe Book is a recipe browser where users can:

- Explore a curated list of meals
- View detailed instructions for each recipe
- Create an account or log in
- Save their favorite recipes to a personal collection

All favorites are protected and personalized — only visible to the user who created them.

---

## 🔧 Features

### ✅ Public Features (No Login Required)
- View a list of at least 20 recipes from the API
- Click on any recipe to view its full details
- Register for a new account
- Log in with valid credentials

### 🔒 Authenticated Features (Login Required)
- Favorite a recipe
- Remove a recipe from favorites
- View all their favorited recipes on a dedicated `/favorites` page

### ❌ Restrictions
- Unauthenticated users **cannot** view or manage favorites
- Authenticated users **cannot** see or modify anyone else’s favorites

---

## 🧭 Routes

| Route              | Description                                          |
|-------------------|------------------------------------------------------|
| `/recipe`         | Home page – shows at least 20 recipes                |
| `/recipe/:id`     | Detailed view for an individual recipe               |
| `/login`          | Log in form with username/password                   |
| `/register`       | Sign-up form for new users                           |
| `/favorites`      | Auth-only route for viewing user's favorite recipes  |

---

## 📦 Tech Stack

- **Frontend**: React, React Router
- **Authentication**: JSON Web Tokens (JWT), persisted with `localStorage`
- **API**: [TheMealDB](https://themealdb.com/api.php) (served via a custom Railway-hosted endpoint)
- **State Management**: React Context + Custom `useAuth()` hook

---

## 🚀 Stretch Goals (Optional Enhancements)

- 🔍 Add a search bar to easily find recipes
- 🗂️ Filter recipes by location or category
- 🎲 Generate a random recipe of the day via `/recipes/random`

---

## 🧠 What I Learned

- How to manage global state securely with Context API
- Protecting frontend routes and conditionally rendering UI based on auth
- Handling async authentication flows using `fetch()` and JWT
- Structuring a React project for scalability and clarity

---