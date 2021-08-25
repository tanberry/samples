# GraphQL: using cursor-based pagination

The two most common ways of implementing pagination in a GraphQL API are _limit/offset_  and _cursor-based pagination_. 
* limit/offset: this method defines two values, the `limit` or the number of data a page will contain, and `offset`, the number of records to skip over belfore selecting the next data set set, or limit." 
* cursor-based: this method uses a unique ID for each list element (known as a cursor), to deliminate each set of data.


This tutorial explains the beneiftis of using cursor-based pagination for web aplications, and leads you through the required steps. 

## What to expect
* Typical time to complete: 20 minutes
* Expected outcome: after completing this tutorial you will understand the concepts and uses of cursor-based paginaton, and you will have a reference implementation. 
* Technologies used in this tutorial: SQLite, Prisma Framework GraphQL Nexus (with nexus-prisma), and Apollo Server

# Summary
Pagination is used to define the way in which data (specifically list fields) are retrieved and then displayed as output. Using pagination is important for managing applicaion performance and usability. Modern web applications are expected to load pages efficiently and minimize slow-rendering pages or scrolls that roll down into grey, unloaded emptiness. Pagination is particularly critical when accessing data graphs that might contain very large sets; for example a simple query of a list of all songs written in the 1990s would return a tremendously large list of songs. 

"Apollo Client provides flexible cache APIs that **help you merge results from a paginated list field**, regardless of which pagination strategy your GraphQL server uses." (https://www.apollographql.com/docs/react/pagination/overview/)
