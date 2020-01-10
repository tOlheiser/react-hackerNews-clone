# Notes

## Main Feed
* When the component first mounts, I want to display 50 of the top stories. 
* Clicking 'Top' or 'New' sets the state of 'Feed' to that corresponding value. Feed is set to 'null' if the Discussion or User views are active. *Display the feed so long as the value isn't null*
* Clicking on the flashlight will toggle the state of the styles. 

**Pulling data**
1. Send a request which pulls the topstories or new stories. 
2. Use slice() to cut this down to the first 50. 
3. Run a request on every ID to pull their data. 

## Things I've Learned

**Promise.all**
When trying to pull the top stories, I was given an array of the ID's for the top stories. So I then had to send another request for each individual ID to obtain the post information. I hit a stumbling block when I had to use 'Promise.all' because I didn't quite understand it. 

Promise.all takes an array of promises as an input. 