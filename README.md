# Serverless Frontend - Portfolio
## Development time (6hrs~)

## Requirements
- NodeJS
- AWS Credentials with required IAM roles

## Technologies
- React
- TypeScript
- Tailwind Css
- AWS SDK

### Demo

A live demo can be found [here](https://zemoga.netlify.app/)

## Environment Setup

Clone the project and install dependencies

```bash
git clone https://github.com/ImJesusDev/zemoga-frontend.git
```
```bash
cd zemoga-frontend
npm i
```


Configure env variables

`cp .env.example .env.local`

```
REACT_APP_AWS_SECRET_KEY=
REACT_APP_AWS_ACCESS_KEY=
REACT_APP_AWS_REGION=
REACT_APP_AWS_BUCKET=
REACT_APP_API_URL=
```

## Running locally
```bash
npm start
```
## Building the project

```bash
npm run build
```
