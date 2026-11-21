# iNoteIt

A full-stack note-taking app where you design your own notebooks. Each notebook gets its own set of columns, so a "Reading list" can have *Author / Status* while a "Recipes" notebook has *Ingredients / Time*. Built on the **MERN stack**, with all styling in hand-written CSS (no UI framework).

<!-- Add a screenshot or GIF here, e.g.:
![iNoteIt screenshot](./docs/screenshot.png)
-->

## Features

- **Accounts & auth:** sign up and sign in, with passwords hashed using `bcryptjs` and sessions held by JWT
- **Custom notebooks:** create, rename and delete notebooks, each with user-defined columns
- **Notes:** add, edit and delete notes inside a notebook; each note is timestamped
- **Search:** filter notes within a notebook as you type
- **Per-user data:** every notebook and note belongs to the signed-in user; other users' data is never returned
- **UI:** responsive layout, toast notifications, plus About and Contact pages

## Tech stack

| Layer | Tech |
|---|---|
| Frontend | React 18, Vite, React Router, React Context (state), react-icons, plain CSS |
| Backend | Node.js, Express, express-validator |
| Database | MongoDB with Mongoose |
| Auth | JWT (`jsonwebtoken`), `bcryptjs` |

## Getting started

### Prerequisites

- Node.js 18+
- MongoDB running locally on `mongodb://localhost:27017` (or a MongoDB Atlas URI)

### 1. Backend

```bash
cd backend
npm install
node index.js          # runs on http://localhost:3000
```

The backend connects to the `inoteit` database (configured in `backend/db.js`).

### 2. Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_SERVER_URL=http://localhost:3000
```

Then run:

```bash
npm run dev            # opens on http://localhost:5173
```

## API overview

All `/api/notes` routes need the JWT from login, sent as the `authToken` header.

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Create an account |
| `POST` | `/api/auth/login` | Log in and get a JWT |
| `POST` | `/api/auth/getuser` | Get the logged-in user |
| `GET` | `/api/notes/notetypes` | List your notebooks |
| `POST` | `/api/notes/addtype` | Create a notebook (name + columns) |
| `PUT` | `/api/notes/notetypes/:id` | Update a notebook |
| `DELETE` | `/api/notes/notetypes/:id` | Delete a notebook |
| `GET` | `/api/notes/:id` | List the notes in a notebook |
| `POST` | `/api/notes` | Add a note |
| `PUT` | `/api/notes/:id` | Update a note |
| `DELETE` | `/api/notes/:id` | Delete a note |

## Project structure

```
iNoteIt/
├── backend/
│   ├── index.js              # Express app entry
│   ├── db.js                 # MongoDB connection
│   └── src/
│       ├── models/           # Users, NoteTypes (notebooks), Notes
│       ├── routes/           # auth.js, notes.js
│       └── middlewares/      # JWT auth, notebook lookup, validation
└── frontend/
    └── src/
        ├── components/       # Pages and UI components (+ css/)
        └── contexts/         # users, notes, toasts (React Context)
```

## Author

**Prithvirajsinh Jadav** · [GitHub](https://github.com/PrithvirajJadav)
