# ERP-PROJECT
University project for ERP system development intended for SME

## TO RUN
Requirements:
- PostgreSQL running with imported DB: ```/postgre/erp-project.sql```
- Running Redis server (at default port 6379)

Step-by-step:
1. Run ```npm i``` on both ```/server``` and ```/client``` to install dependecy.
2. Create ```.env``` file on both ```/server``` and ```/client``` (refer to ```.env.template```). Adjust it according to your environment.
3. Run ```npm start``` on both ```/server``` and ```/client``` to start both servers.
4. Open your favorite browser and access ```http://localhost:3000```

## INGREDIENTS WE USE
- NodeJS with ExpressJS
  - PassportJS
- ReactJS
  - react-router
  - MUI
- Redis
- PostgreSQL

## ARCHITECTURE
<img style="height:400px" alt="architecture" src="https://user-images.githubusercontent.com/85065433/165529722-254cd1aa-75ad-4ca1-b30d-5b739cb7f944.png"/>

