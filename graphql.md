# TUTORIAL: Using cursor-based pagination in a GraphQL API

## Summary
This tutorial explains the benefits of using cursor-based pagination for GraphQL-based web applications, and leads you through the required steps.

## What to expect in this tutorial
* Typical time to complete: 20 minutes
* Expected outcome: after completing this tutorial you will understand the concepts and uses of cursor-based paginaton, and you will have a reference implementation of a GrahphQL API.
* Technologies used in this tutorial:
   * Prisma Framework and CLI tool (@prisma/client)
   * [GraphQL Nexus](https://github.com/prisma/nexus-prisma), with the nexus-prisma (Nexus plugin for Prisma)
   * SQLite (a common, easy to setup database)
   * [Apollo Server]() (a state management library for handling GraphQL data)

## Prerequisites
* ??
* ??

## Introduction
Pagination is used to define the way in which data (specifically list fields) are retrieved and then displayed as output on a web application's page. Using pagination is important for managing application performance and usability. Modern web applications that handle real-time data are expected to load pages efficiently and minimize slow-rendering pages or scrolls that roll down into grey, unloaded emptiness. Pagination is particularly critical when accessing data graphs that might contain very large sets; for example a simple query of a list of all songs written in the 1990s would return a tremendously large list of songs, and a potentially miserable user experience.

The two most common ways of implementing pagination in a GraphQL API are _limit/offset_  and _cursor-based pagination_.
* limit/offset: this method defines two values, the *limit* or the number of data a page will contain, and *offset*, the number of records to skip over before selecting the next data set set, or limit."
* cursor-based: this method uses a unique ID for each list element (known as a cursor), to delineate each set of data.

Cursor-based pagination is typically the preferred method, for several reasons.

* Real-time data is volatile, meaning that the content can change even as it is being queried. (Think of a Twitter feed; people delete tweets seconds after posting them.) With cursor-based pagination, the cursor parameter acts as a pointer to a specific record (like a timestamp) in the dataset to indicate where the last page of results left off. This means it doesn't matter if the exact data changed between queries; you will still get results that reflect the current reality of every item that occurred after the "cursor."

* Performance (speed!) is  one of the most important attributes of a successful web application. The query doesn't iterate through all of the records from the start, but rather it starts collecting at the point of the cursor element. This precise, targeted selection of the exact data that was requested results in a much speedier return, and a happier user.

## Technology Stack
Let's take a quick look at the tools we will be working with in this tutorial.

* [Prisma](https://www.prisma.io/) is the data link, or bridge, between the database and the web application; Prisma "maps" the data stored in a database to the data in a web application.

* Nexus, and the nexus-prisma integration,

## Install and Configure Nexus-Prisma
(Refer to https://github.com/prisma/nexus-prisma for details.)

1. Create a new directory for this work (this will be your Prisma root directory).

2. CD into your new directory, and download the packages for Prisma and GraphQL Nexus (with nexus-prisma) and required dependencies with the following commands in your terminal:

```bash
npm init -y
npm add nexus-prisma nexus graphql @prisma/client apollo-server
npm add --save-dev prisma typescript

---
**NOTE**
Using the `--save-dev` option adds the listed dependencies to your `package.json` file.
---

2. Next, create a new file named `tsconfig.json` file with the following content:

```bash
{
    "compilerOptions": {
        "target": "ES2018",
        "module": "commonjs",
        "lib": ["esnext"],
        "strict": true,
        "rootDir": ".",
        "outDir": "dist",
        "sourceMap": true,
        "esModuleInterop": true
    }
}
```


## Create your Prisma schema
WRITE WORDS HERE ABOUT WHAT SCHEMA DOES

1. Invoke the Prisma CLI with
`npx prisma`

3. Create a Prisma schema with the command:  

`npx prisma init`

Your new schema is created in your root directory at /prisma/schema.prisma. A .env file is also created and pre-populated with a placeholder connection string.


## Connect to your SQLite database

1. Install SQLite.

2. For the purpose of this tutorial, create a new, empty SQLite database named **prisma.db** in the same root directory where you installed Prisma.

3. Edit the `schema.prisma` file to add the following block, which points to the `env` variable that is defined in the /.env file:

``` bash
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

4. Define the variable for the database URL in the ./.env file:

```bash
DATABASE_URL="file:./prisma.db"
```

3. Run the command `prisma db pull` to sync the database with your Prisma schema .

4. Run `prisma generate` to generate the Prisma Client. We can now start adding queries to the index.js file.

## Configure Nexus-prisma

Add a nexus-prisma generator block to your schema by adding the following to your schema.prisma:

```bash
generator nexusPrisma {
   provider = "nexus-prisma"
}
```


## Install and initialize Apollo Client

1. To install the Apollo Client, run:
`npm install @apollo/client graphql`
