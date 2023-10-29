
<!-- Headings -->
<!-- Installations should be either at the start or the end -->

# Twitter clone 

installation guide will be at the end

## Short Description
    Twitter clone is an web application with similar functionalities as the popular social media platform twitter.
    This project is constantly being developed with new functionalities. This readme is for describing it's architecture flow and data modelling

## Architecture

![image](https://github.com/vishalaitha/Twitter-Clone/assets/76663093/666e2d2d-4253-4232-a677-6f0b58ed2914)


### Steps : 
    
    1. Front end loads the page by fetching tweets from backend hosted on AWS EC2
    2. User authentication flow.
    3. If Tweets are already available on Redis it directly fetches from there.
    4. If not we'll fetch it from database through Apollo server with graphql requests.
    5. Postgresql is our db.
    6. Media content is stored on AWS S3.

## Data Model

![image](https://github.com/vishalaitha/Twitter-Clone/assets/76663093/a4310ae5-7ab5-4a7e-9954-68fea38560a4)


### Steps :
    1. Currently there are 3 models User, Tweet and Follows.
    2. Each of them has their set of Atrributes which helps us understand their properties and relations.
    3. All of these are being mapped using Prisma ORM.
    4. Postgresql is our server for data storage of non media storage and S3 is our storage service for media storage
    5. Postgresql is hosted on Supabse
    6. Queries are being asked fetched through Apollo server which requests via graphql API model


## installation guide
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
