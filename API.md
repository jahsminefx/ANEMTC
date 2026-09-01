# ANINTA THERAPY CENTER - REST API DOCUMENTATION

Base URL: `/api`

---

## Public Endpoints

### 1. Health Check
* **`GET /api/health`**
  * **Response:** `{ success: true, status: "healthy", timestamp: "..." }`

### 2. Services
* **`GET /api/services`**
  * Returns list of published practitioner services.
* **`GET /api/services/:slug`**
  * Returns individual service record by URL slug.

### 3. Products
* **`GET /api/products`**
  * Query parameters: `search`, `partner`, `category`, `featured`, `limit`, `page`.
  * Returns list of published products with partner attributions and image galleries.
* **`GET /api/products/:slug`**
  * Returns detailed product spec + top 3 related products.

### 4. Categories & Partners
* **`GET /api/categories`**
* **`GET /api/categories/:slug`**
* **`GET /api/partners`**
* **`GET /api/partners/:slug`**

### 5. Blog
* **`GET /api/blog`**
* **`GET /api/blog/:slug`**

### 6. Newsletter Subscription
* **`POST /api/newsletter/subscribe`**
  * **Body:** `{ firstName: string, email: string, honeypot?: string }`
  * Includes rate limiting, honeypot anti-spam verification, and async Brevo sync.

---

## Admin Protected Endpoints (Requires JWT Auth)

### 1. Authentication
* **`POST /api/admin/auth/login`**
  * **Body:** `{ email: string, password: string }`
  * Sets HTTP-only cookie `admin_token` and returns JWT token + user profile.
* **`GET /api/admin/auth/me`**
* **`POST /api/admin/auth/logout`**

### 2. Admin Management CRUD
* **`GET /api/admin/stats`**
* **`POST /api/admin/upload`** (Multipart image upload)
* **`GET|POST|PUT|DELETE /api/admin/products`**
* **`GET|POST|PUT|DELETE /api/admin/partners`**
* **`GET|POST|PUT|DELETE /api/admin/services`**
* **`GET|POST|PUT|DELETE /api/admin/categories`**
* **`GET|POST|PUT|DELETE /api/admin/blog`**
* **`GET /api/admin/subscribers`**
* **`GET /api/admin/subscribers/export`** (CSV download)
* **`GET|PUT /api/admin/settings`**
