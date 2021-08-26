# TUTORIAL: Using cursor-based pagination in a GraphQL API

## Summary
The two most common ways of implementing pagination in a GraphQL API are _limit/offset_  and _cursor-based pagination_. 
* limit/offset: this method defines two values, the *limit* or the number of data a page will contain, and *offset*, the number of records to skip over belfore selecting the next data set set, or limit." 
* cursor-based: this method uses a unique ID for each list element (known as a cursor), to deliminate each set of data.

This tutorial explains the benefits of using cursor-based pagination for web aplications, and leads you through the required steps. 

## What to expect in this tutorial
* Typical time to complete: 20 minutes
* Expected outcome: after completing this tutorial you will understand the concepts and uses of cursor-based paginaton, and you will have a reference implementation of a GrahpQL API. 
* Technologies used in this tutorial: 
   * Prisma Framework
   * GraphQL Nexus (with nexus-prisma)
   * SQLite
   * Apollo Server

## Prerequisites
* ??
* ??

## Introduction
Pagination is used to define the way in which data (specifically list fields) are retrieved and then displayed as output on a web application's page. Using pagination is important for managing applicaion performance and usability. Modern web applications that handle real-time data are expected to load pages efficiently and minimize slow-rendering pages or scrolls that roll down into grey, unloaded emptiness. Pagination is particularly critical when accessing data graphs that might contain very large sets; for example a simple query of a list of all songs written in the 1990s would return a tremendously large list of songs, and a potentially miserable user experience. 

Cursor-based pagination is typically the preferred method, for several reasons. 

* First, real-time data is volatile, meaning that the content can change even as it is being queried. (Think of a Twitter feed; people delete tweets seconds after posting them.) With cursor-based pagination, the cursor parameter acts as a pointer to a specific record (like a timestamp) in the dataset to indicate where the last page of results left off. This means it doesn't matter if the exact data changed between queries; you will still get results that reflect the current reality of every item that occurred after the "cursor." 

* Second, performance (speed!) is  one of the most iportant attributes of a successful web application. The query doesn't iterate through all of the records from the start, but rather it starts collecting at the point of the cursor element.

"Apollo Client provides flexible cache APIs that **help you merge results from a paginated list field**, regardless of which pagination strategy your GraphQL server uses." (https://www.apollographql.com/docs/react/pagination/overview/)

## Install and Configure 
bbbb

## _____ your SQLite database
