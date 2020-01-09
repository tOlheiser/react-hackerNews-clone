# Notes

## Main Feed
* When the component first mounts, I want to display 50 of the top stories. 
* Clicking 'Top' or 'New' sets the state of 'Feed' to that corresponding value. Feed is set to 'null' if the Discussion or User views are active. *Display the feed so long as the value isn't null*
* Clicking on the flashlight will toggle the state of the styles. 

**Pulling data**
1. Send a request which pulls the topstories or new stories. 
2. Use slice() to cut this down to the first 50. 
3. Run a request on every ID to pull their data. 