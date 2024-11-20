# Momo Store Backend

A NestJS-based backend service for the Momo Store application with PostgreSQL database.

## Features

- User Authentication (JWT-based)
- User Profile Management
- Points System
- Swagger API Documentation
- Docker Support
- Development and Production Environments

## Prerequisites

- Node.js (v16 or later)
- Docker and Docker Compose
- pnpm (Package Manager)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd momo-backend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env` for production
   - Copy `.env.example` to `.env.dev.local` for development
   - Update the variables as needed

## 🐳 Docker Setup

The project uses a multi-stage Dockerfile optimized for both development and production environments.

### Development Environment

```bash
# Build and start services in development mode
NODE_ENV=development docker-compose up --build

# Start services without rebuilding
NODE_ENV=development docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f app-server
```

Development environment features:
- Hot-reloading enabled
- Source code mounted into container
- All dependencies installed (including devDependencies)
- Swagger documentation available

### Production Environment

```bash
# Build and start services in production mode
docker-compose up --build

# Start services without rebuilding
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f app-server
```

Production environment features:
- Optimized multi-stage build
- Minimal image size
- Only production dependencies included
- Enhanced security and performance

### Docker Image Stages

Our Dockerfile uses a multi-stage build process for optimization:

1. **Base**: Node.js 20 Alpine with pnpm
2. **Dependencies**: Installs all project dependencies
3. **Builder**: Compiles TypeScript to JavaScript
4. **Production Dependencies**: Installs only production packages
5. **Production**: Final minimal image with compiled code
6. **Development**: Full development environment with hot-reload

### Database Credentials

#### Development
- Host: localhost (or 'postgres' from within Docker network)
- Port: 5432
- User: momo_dev_user
- Password: momo_dev_password
- Database: momo_store_dev

#### Production
- Host: localhost (or 'postgres' from within Docker network)
- Port: 5432
- User: momo_user
- Password: momo_password
- Database: momo_store

## API Documentation

The API documentation is available through Swagger UI:
- Development: http://localhost:3001/api-docs
- Production: http://your-domain/api-docs

### Available Endpoints

#### Authentication
- POST `/auth/register` - Register new user
- POST `/auth/login` - Login user
- GET `/auth/profile` - Get authenticated user profile

#### Users
- GET `/users/:id/points` - Get user points
- GET `/users/:id/profile` - Get user profile

## 🔒 Environment Variables

### Required Variables
```env
# Application
PORT=3001
NODE_ENV=development|production  # Determines Docker build target

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name

# JWT Configuration
JWT_SECRET=your-secret-key
```

### Docker-specific Variables
The following variables are used in docker-compose.yml:
- `NODE_ENV`: Determines the build target (development/production)
- `PORT`: Application port (mapped to host)
- `DB_*`: Database connection details
- `JWT_SECRET`: Authentication secret key

## Security

- JWT-based authentication
- Password hashing
- Protected routes
- Environment-specific secrets

## Testing

```bash
# Run unit tests
pnpm test

# Run e2e tests
pnpm test:e2e

# Run test coverage
pnpm test:cov
```

## Project Structure

```
src/
├── modules/           # Feature modules
│   ├── auth/         # Authentication
│   └── users/        # User management
├── common/           # Shared resources
├── config/           # Configuration
└── main.ts          # Application entry
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
