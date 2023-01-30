This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. This will start the app and the json server so you can just proceed to use the app

```bash
yarn spin-server
```

Use Postman (or any Api testing tool) to test the json-api on [http://localhost:3500](http://localhost:3500)

## Packages used

### `json-server`

Even though it is stated that in memory DB/state/object can be used I have gambled here and decided to use `json-server` to mimic the actual environment where you would do CRUD operation against some API. So this is also the reason why the dataset is a bit altered, because I needed to add the `id`

### `axios`

Here as well, I could have used just simple fetch but to show the flexibility in working with 3rd party libraries like `axios` (even though very well known) in my mind is a plus

### `uuid`

To generate the unique ids

### `date-fns`

For dates

### `dnd`

For draggable
