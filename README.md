#  NODE.JS TYPESCRIPT MONGODB REST JWT POC

## Dependencies
- Node.js (14.15.1)
- MongoDB (4.4.1)
- Docker (Optional)

## Before running project
- Run: cp .env.example .env
- Update values in .env as per your configuration
- Run: npm i

## To run project
- In development, run: npm run dev
- In production, run: npm run build && npm run start

## Docker Commands
- To run the project in production: docker-compose up -d
- To destroy a running docker instance: docker-compose down
- To observe live docker logs: docker-compose logs -f