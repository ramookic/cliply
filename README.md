# Cliply

**Cliply** is a URL shortening service that allows users to shorten, track, and manage their URLs easily. With real-time analytics, it helps users track how their links are performing across different devices and locations.

## Technologies

- `Next.js`
- `TypeScript`
- `Supabase`
- `React Hook Form`
- `Zod`
- `Tailwind CSS`
- `Jest`

## How to Get Started

To get started with **Cliply**, follow these steps:

### 1. Clone the repository and install dependencies

```bash
git clone https://github.com/ramookic/cliply.git
cd cliply
npm install
```

### 2. Set up Supabase

In Supabase SQL Editor paste the SQL script from **src/utils/supabase/schema.sql**.

In Supabase Dashboard → Authentication → URL Configuration:

Change the Site URL from `http://localhost:3000` to `https://yourdomain.com`
In Redirect URLs add `https://yourdomain.com`

### 3. Set up environment variables

Rename **example.env** to **.env.local** and replace with your values

```bash
NEXT_PUBLIC_SUPABASE_URL=<your_supabase_url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_supabase_anon_key>
NEXT_PUBLIC_APP_URL=<APPLICATION_URL>
```

### 4. Run the development server

```bash
npm run dev
```

## API Endpoints

### 1. User registration

- **Endpoint:** `POST /api/auth/register`
- **Description:** Registers a new user with the provided `name`, `email`, and `password`.
- **Request Body:**

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

### 2. User login

- **Endpoint:** `POST /api/auth/login`
- **Description:** Logs in a user with the provided `email`, and `password`.
- **Request Body:**

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### 3. User logout

- **Endpoint:** `DELETE /api/auth/logout`
- **Description:** Logs out the current user.

### 4. Create link

- **Endpoint:** `POST /api/links`
- **Description:** Creates a new shortened link with provided details.
- **Request Body:**

```json
{
  "originalUrl": "https://example.com/article/2283",
  "shortcode": "eTxRIF", // Optional
  "expirationDate": "2025-01-18T20:00:00.000Z" // Optional
}
```

### 5. Update link

- **Endpoint:** `PATCH /api/links/:id`
- **Description:** Updates link with provided details.
- **Request Body:**

```json
{
  "originalUrl": "https://example.com/article/2283", // Optional
  "shortcode": "eTxRIF", // Optional
  "expirationDate": "2025-01-18T20:00:00.000Z" // Optional
}
```

### 6. Delete link

- **Endpoint:** `DELETE /api/links/:id`
- **Description:** Deletes link with linkId.

### 7. Get link

- **Endpoint:** `GET /api/links/:id`
- **Description:** Fetches the link with provided details.

### 8. Get all links

- **Endpoint:** `GET /api/links`
- **Description:** Fetches the links with provided details.

### 9. Redirect

- **Endpoint:** `GET /api/redirect?shortcode=example`
- **Description:** Redirects to original URL.

### 10. Reset Password

- **Endpoint:** `GET /api/auth/reset-password`
- **Description:** Sends an email to user containg update password link.

```json
{
  "email": "john.doe@example.com"
}
```

### 10. Update Password

- **Endpoint:** `GET /api/auth/update-password&code=example-code`
- **Description:** Updates users password with session code.

```json
{
  "password": "password123",
  "confirmPassword": "password123"
}
```
