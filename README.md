# Hacker News Clone

**There are three views:**
* News Feed
* Post View
* User View

The commonality between all these pages is that they all have a navbar with the links 'Top', 'New', and a light button to toggle the styles of the page.

**Workflow**
While following Tyler McGinnis' React course, I found that he builds one view at a time and then ties them all together when they're all built. I intend on doing the same with this project.

## News Feed
Displays a list of 50 posts. Each 'post item' contains:
* **Title** of the post + **embedded link** to the page.
* String: "by **username** on **date**, **time** with **number of comments**
*'username' links to the user view of the user who submitted the post, and the comment integer links to the post view of that page displaying the comments.* 

**Data needed from the API**
An array of posts, each containing the:
* Post title
* Link to page
* User who submitted the post
* Date it was posted
* Comments

The time is in an unformatted number format, and each post contains comment ID's. I'll have to iterate over each comment, send a request, and pull the comment data to display it.

## User View
I need to fetch two things: 
* User information 
* Stories the user has contributed. 
These will be separated into two components. 