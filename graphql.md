# TUTORIAL: Using cursor-based pagination in a GraphQL API

## Summary
This tutorial explains the benefits of using cursor-based pagination for GraphQL-based web applications, and leads you through the required steps.

## What to expect in this tutorial
* Typical time to complete: 30 minutes
* Expected outcome: After completing this tutorial you will understand the concepts and uses of cursor-based pagination, and you will have a reference implementation of a GraphQL API.

   Note that this tutorial assumes you are new to Prisma, and do not yet have Prisma configured and connected to a database. If you already have Prisma configured, you can skip to the section below on implementing cursor-based pagination in your GraphQL API.

## Technologies used in this tutorial:
   * [Prisma](https://www.prisma.io/) framework and CLI tool (@prisma/client)
   * [GraphQL Nexus](https://github.com/prisma/nexus-prisma), with the nexus-prisma (Nexus plugin for Prisma)
   * SQLite (a common, easy to setup database)
   * Apollo Server (a state management library for handling GraphQL data)

## Introduction
Pagination is used to define the way in which data (specifically list fields) are retrieved and then displayed as output on a web application's page. Using pagination is important for managing application performance and usability. Modern web applications that handle real-time data are expected to load pages efficiently and minimize slow-rendering pages or scrolls that roll down into grey, unloaded emptiness. Pagination is particularly critical when accessing data graphs that might contain very large sets; for example a simple query of a list of all songs written in the 1990s would return a tremendously large list of songs, and a potentially miserable user experience.

The two most common ways of implementing pagination in a GraphQL API are _limit/offset_  and _cursor-based pagination_.
* limit/offset: this method defines two values, the *limit* or the number of data a page will contain, and *offset*, the number of records to skip over before selecting the next data set set, or limit."
* cursor-based: this method uses a unique ID for each list element (known as a cursor), to delineate each set of data.

Cursor-based pagination is typically the preferred method, for several reasons.

* Real-time data is volatile, meaning that the content can change even as it is being queried. (Think of a Twitter feed; people delete tweets seconds after posting them.) With cursor-based pagination, the cursor parameter acts as a pointer to a specific record (like a timestamp) in the dataset to indicate where the last page of results left off. This means it doesn't matter if the exact data changed between queries; you will still get results that reflect the current reality of every item that occurred after the "cursor."

* Performance (speed!) is  one of the most important attributes of a successful web application. With cursor-based pagination, the query doesn't iterate through all of the records from the very start, but rather it starts collecting at the point of the cursor element. This precise, targeted selection of the exact data that was requested results in a much speedier return, and a happier user.

## High-level workflow

1. [Install and configure](#install-and-configure)
2. [Create your Prisma schema](#create-your-prisma-schema)
3. [Configure Nexus-prisma](#configure-nexus-prisma)
4. [Connect to your SQLite database](#connect-to-your-sqlite-database)
5. [Add tables to your database](#add-tables-to-your-database)
5. [Install and initialize Apollo Client](install-and-initialize-apollo-client)
6. [Add queries to your API](add-queries-to-your-api)
7. [Verify your results](verify-your-results)

## Install and Configure

First, you will need to download the required packages toset up your development environment with Nexus-Prisma and other required tools.
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

3. Next, create a new file named `tsconfig.json` file. The tsconfig.json file specifies the project's root files and the required compiler options. Put the the following content into your `tsconfig.json` file:

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

## Configure Nexus-prisma

Add a nexus-prisma generator block to your schema by adding the following to your schema.prisma:

```bash
generator nexusPrisma {
   provider = "nexus-prisma"
}
```


## Connect to your SQLite database

1. Install SQLite.

2. For the purpose of this tutorial, create a new, empty SQLite database named **prisma.db** in the same root directory where you installed Prisma. This is simply an empty file; we will populate it in the upcoming steps.

3. Edit the `schema.prisma` file to add the following block, which points to the `env` variable that is defined in the /.env file:

``` bash
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

4. Define the `DATABASE_URL` variable in the ./.env file:

```bash
DATABASE_URL="file:./prisma.db"
```

5. Run the command `prisma db pull` to sync the database with your Prisma schema.

6. Run `prisma generate` to generate the Prisma Client.
words here about Prisma Client...

## Add tables to your database

You can use Prisma migrate for many data management tasks, but in this tutorial we will use it to create a few basic tables in your database (`prisma.db`).

1. Edit the ____ file define the db model....

2. Run the `npx prisma migrate dev --name init` command.

## Install and initialize Apollo Client

1. To install the Apollo Client, run:
`npm install @apollo/client graphql`

## Query the database

Now that we have Prisma and out tools set up, let's add some queries and specify that we want to use cursor-based pagination to return the results.

1. Edit the `index.ts` file to add a query:

```bash
query {
  artistID(limit: 2, cursor: 1) {
    id
    title
  }
}
```

2. Run `npx ts-node index.ts`

## Verify your results

words here about what you should see in the returned set...
