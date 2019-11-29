# Hacker News Clone

**There are three views:**
* News Feed
* Post View
* User View

The commonality between all these pages is that they all have a navbar with the links 'Top', 'New', and a light button to toggle the styles of the page.

## News Feed
Displays a list of 50 posts. Each 'post item' contains:
* Title of the post + embedded link to the page.
* String: "by {username} on {date}, {time} with {postview} comments
*'username' links to the user view of the user who submitted the post, and 'postview' links to the post view of that page displaying the comments.* 

**Data needed from the API**
An array of posts, each containing the:
* Post title
* Link to page
* User who submitted the post
* Date it was posted
* Link to the post discussion page
* The amount of comments on that post

**Unclear:** To sort posts by new, you just sort dates by newest. What about sorting posts by top? *My assumption is that when you pull posts from the fetch request, they are automatically sorted by top. You then take that array and sort it by date in the 'New' filter.*

## Post View

The 'header' section essentially contains the exact same info from the 'post item'. Some posts also contain text from the author attached to their post. 

**Grabbing a specific post**: I noticed that after visiting a post page, the url changes to contain something like ".com/post?id=21660118"

Each comment is a separate styled card, which contains:
* A string, "by {username} on {date}". 
* *The username contains a link to that user's page.*
* A string containing that user's actual comment.

**Data needed from the API**
* The comments.
* Each comment contains the name of the user, when they posted the comment, and the content of the comment.

## User View

You can divide this into a few sections:
* Username, history on the site
* User's bio
* Posts by the user

**Data needed from the API**
* Date the user joined
* Karma points
* User's bio information
* User's posts - *identical info from post items from the landing page*

## Workflow

In following Tyler's course, he built each individual view before linking them together. I think this will be the same approach I take. I now just need to learn about the Hacker News API. 