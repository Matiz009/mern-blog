# MERN Blog (Backend)

The REST API for a blog: users, auth, posts and categories, with image uploads.

## Features

- Register and log in (`/api/auth`) with bcrypt-hashed passwords
- Users: get, update, delete
- Posts: create, read, update, delete
- Categories: create and list
- Image uploads with Multer, saved to `backend/images`

## Tech stack

Node.js · Express · MongoDB / Mongoose · bcrypt · Multer

## Getting started

Requires MongoDB running locally (`mongodb://127.0.0.1:27017/blog`).

```bash
cd backend
npm install
npm start
```

TODO: the `frontend/` folder is empty.

## Author

**Mati ul Rehman**: [github.com/Matiz009](https://github.com/Matiz009)
