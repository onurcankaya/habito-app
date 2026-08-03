# Habit Tracker Monorepo

## Habit Tracker API

### Auth API

```bash
POST /api/auth/register
POST /api/auth/login
```

### Users API

```bash
GET /api/users/me
```

### Categories API

```bash
GET /api/categories
GET /api/categories/:id
POST /api/categories
PATCH /api/categories/:id
DELETE /api/categories/:id
```

### Habits API

```bash
GET /api/habits
GET /api/habits/:id
POST /api/habits
PATCH /api/habits/:id
DELETE /api/habits/:id
```

### Completed Activities API

```bash
GET /api/activities
GET /api/activities/:id
POST /api/activities
DELETE /api/activities/:id
```
