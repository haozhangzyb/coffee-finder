This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Coffee finder

This is a web app that can help you find your local coffee stores based on your location and you can upvote them. This app is created to demo pre-fetching feature of Next.js

## Features

- Different rendering methods:
  - **Static Site Generation (SSR)**
    for stores near pre-defined location (NYC)
  - **Statically Generated Dynamic Routes**
    for stores near pre-defined location (NYC).
  - **Client-side rendering (CSR)**
    for stores near user's location, SSR will fallback and coffee store info will be fetched on the client side
- React `context`
  - use `StoreContext` to store user's location and stores info
- Customized React hooks
  - `useGetLocation` to use `navigator.geolocation` to get user location.
- Places API
  - [FourSquare](https://location.foursquare.com/)
  - Setup a database with these fields: id(text), name(text), address(text), city(text), votes(number - integer), img_url(text).
- Database
  - [Airtable](https://airtable.com/)

## Environment Variables

For this app to work, you need to configure the following environment variables in your .env.local file so please create a .env.local file in the root of this project.

```
NEXT_PUBLIC_FOURSQUARE_API_KEY=<value>
NEXT_PUBLIC_AIRTABLE_API_KEY=<value>
NEXT_PUBLIC_AIRTABLE_BASE_ID=<value>
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.
