# Portfolio API Usage Guide

## 🚀 Quick Start

### 1. Import the Collection

1. Open Postman
2. Click "Import" button
3. Upload `Portfolio_API.postman_collection.json`
4. Upload `Portfolio_API.postman_environment.json`
5. Select "Portfolio API Environment" from the environment dropdown

### 2. Set Up Environment Variables

Update the environment variables in Postman:

- `base_url`: Your API base URL (default: `http://localhost:5000/api`)
- `auth_token`: Will be automatically set after login

### 3. Authentication Flow

1. **Register Admin** (First time only)
   - Run "Register Admin" request
   - Creates the admin user account

2. **Login**
   - Run "Login" request
   - Token will be automatically saved to environment variables
   - All subsequent authenticated requests will use this token

## 📋 API Endpoints Overview

### 🔐 Authentication

- `POST /auth/register` - Register admin user
- `POST /auth/login` - Login and get JWT token
- `GET /auth/me` - Get current user info
- `POST /auth/change-password` - Change password
- `POST /auth/logout` - Logout

### 👤 Profile

- `GET /profile` - Get profile (Public)
- `PUT /profile` - Update profile (Admin only)

### 🎓 Education

- `GET /education` - List all education records (Public)
- `POST /education` - Create education record (Admin only)
- `GET /education/:id` - Get single education record (Public)
- `PUT /education/:id` - Update education record (Admin only)
- `DELETE /education/:id` - Delete education record (Admin only)

### 💼 Experience

- `GET /experience` - List all experience records (Public)
- `POST /experience` - Create experience record (Admin only)
- `GET /experience/:id` - Get single experience record (Public)
- `PUT /experience/:id` - Update experience record (Admin only)
- `DELETE /experience/:id` - Delete experience record (Admin only)

### 🛠️ Skills

- `GET /skills` - List all skills (Public)
- `POST /skills` - Create skill (Admin only)
- `GET /skills/:id` - Get single skill (Public)
- `PUT /skills/:id` - Update skill (Admin only)
- `DELETE /skills/:id` - Delete skill (Admin only)

### 🚀 Projects

- `GET /projects` - List all projects (Public)
- `POST /projects` - Create project (Admin only)
- `GET /projects/:id` - Get single project (Public)
- `PUT /projects/:id` - Update project (Admin only)
- `DELETE /projects/:id` - Delete project (Admin only)

### 📝 Blog

- `GET /blogs` - List all blog posts (Public)
- `POST /blogs` - Create blog post (Admin only)
- `GET /blogs/:slug` - Get single blog post (Public)
- `PUT /blogs/:slug` - Update blog post (Admin only)
- `DELETE /blogs/:slug` - Delete blog post (Admin only)

### 📞 Contact

- `GET /contact/settings` - Get contact settings (Public)
- `PUT /contact/settings` - Update contact settings (Admin only)
- `POST /contact/message` - Send contact message (Public, Rate Limited)
- `GET /contact/messages` - List all messages (Admin only)
- `GET /contact/messages/:id` - Get single message (Admin only)
- `PUT /contact/messages/:id` - Update message status (Admin only)
- `DELETE /contact/messages/:id` - Delete message (Admin only)

### 📁 File Upload

- `POST /upload` - Upload image file (Public)

## 🔍 Query Parameters

### Pagination

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

### Sorting

- `sort`: Sort field with direction (e.g., `-createdAt`, `name`)

### Filtering

- `searchTerm`: Search across searchable fields
- `status`: Filter by status (for blogs, projects, messages)
- `category`: Filter by category (for skills, blogs)
- `featured`: Filter featured items (true/false)

### Examples

\`\`\`
GET /api/blogs?status=published&featured=true&limit=5&sort=-createdAt
GET /api/skills?category=Frontend&limit=20
GET /api/projects?status=completed&searchTerm=react
\`\`\`

## 🔒 Authentication

### Bearer Token

All admin-only endpoints require authentication:
\`\`\`
Authorization: Bearer <your-jwt-token>
\`\`\`

The token is automatically included when using the Postman collection after login.

### Token Expiration

- Access tokens expire in 7 days (configurable)
- Re-login when token expires

## 📝 Request Examples

### Create a Project

\`\`\`json
{
"name": "Portfolio Website",
"shortDescription": "Personal portfolio built with React and Node.js",
"detailedDescription": "A comprehensive portfolio website showcasing my projects, skills, and experience. Built with modern technologies and responsive design.",
"techStack": ["React", "Node.js", "MongoDB", "Tailwind CSS"],
"images": ["https://example.com/screenshot1.jpg"],
"links": {
"live": "https://myportfolio.com",
"github": "https://github.com/username/portfolio"
},
"featured": true,
"status": "completed"
}
\`\`\`

### Create a Blog Post

\`\`\`json
{
"title": "Getting Started with React Hooks",
"content": "# React Hooks Guide\n\nReact Hooks revolutionized...",
"excerpt": "Learn the fundamentals of React Hooks",
"category": "Frontend",
"tags": ["React", "JavaScript", "Hooks"],
"status": "published",
"featured": true
}
\`\`\`

### Send Contact Message

\`\`\`json
{
"name": "John Doe",
"email": "john@example.com",
"subject": "Project Inquiry",
"message": "I'd like to discuss a potential project..."
}
\`\`\`

## 🚨 Rate Limiting

### Contact Form

- 3 submissions per 15 minutes per IP address
- Returns 429 status when limit exceeded

### General API

- 100 requests per 15 minutes per IP (in production)
- Booking endpoints: 10 requests per 15 minutes per IP

## 🐛 Error Handling

### Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `429` - Too Many Requests (rate limited)
- `500` - Internal Server Error

### Error Response Format

\`\`\`json
{
"success": false,
"message": "Error description",
"errorSources": [
{
"path": "field_name",
"message": "Specific error message"
}
]
}
\`\`\`

## 🔧 Environment Setup

### Local Development

\`\`\`
base_url = http://localhost:5000/api
\`\`\`

### Production

\`\`\`
base_url = https://your-api-domain.com/api
\`\`\`

## 📊 Testing Workflow

### 1. Initial Setup

1. Register admin user
2. Login to get token
3. Update profile information

### 2. Content Creation

1. Create education records
2. Add work experience
3. Add skills
4. Create projects
5. Write blog posts
6. Update contact settings

### 3. Public API Testing

1. Test all GET endpoints without authentication
2. Verify pagination and filtering
3. Test contact form submission

### 4. Admin Operations

1. Test all CRUD operations
2. Verify authentication requirements
3. Test message management

## 💡 Tips

1. **Auto-save IDs**: The collection automatically saves created resource IDs for subsequent requests
2. **Token Management**: Login token is automatically saved and used for authenticated requests
3. **Error Debugging**: Check the response body for detailed error information
4. **Rate Limiting**: Be mindful of rate limits when testing contact form
5. **File Upload**: Use form-data for file uploads, not JSON

## 🔗 Related Resources

- [API Documentation](./API_Documentation.md)
- [Environment Variables Guide](../.env.example)
- [Database Schema](./Database_Schema.md)
