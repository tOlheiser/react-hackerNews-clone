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

**Require an alternate solution for loading data**
```javascript
repos != null && repos.map((repo) => {
    return (
        <li className="item"> 
            <p className="title">{repo.title}</p>
            <p className="info">by {repo.by} on {repo.time} with {repo.kids != null && repo.kids.length} comments</p>
            {console.log(repo.kids)}
        </li>)
})
```

It feels like a handicap. But when I do '{repo.kids != null && repo.kids.length}' it makes me wonder if that's the correct solution to this problem. It works nonetheless.

**Loading data when the component mounts**
Something I was stuck on for a while was adding the news items to my component's state when it first mounts. 

```javascript
export function getMainFeed(feed) {
    return fetch(`https://hacker-news.firebaseio.com/v0/${feed}stories.json?print=pretty`)
      // Convert the response to json
      .then(response => response.json())
      // Only take the first 50 items
      .then(ids => ids.slice(0, 50))
      // map over the id's, making a fetch request on each of them and then convert that to json
      .then(ids => Promise.all(ids.map(id => 
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
        .then(response => response.json())
        )))
}
```

The function above returns an array of items.

```javascript
    componentDidMount() {
        getMainFeed(this.props.feed)
        // returns the feed of items in JSON format
            .then(items => this.setState({
                //grab the items and store them in the 'items' state
                items: items
            }))
    }
```

Since getMainFeed returns a promise object, I can use '.then' function to store the items into my component's state.  

**Using componentDidUpdate()**
In working on the navigation, I reached a point where I wanted the main feed to update when I clicked on a navigation link. I already had in place a click event which triggers the function passed in as props (this updates the parent component's state)

Then, I took the current state of 'feed' from the parent component and passed it down to the Feed component. This was where I was stuck. I did not know how to update the component. After spending a little time on stackoverflow, I found 'componentDidUpdate()'. It allowed me to compare the current props to the previous props and setState if the current props was shown to be updated.

```javascript
    componentDidUpdate(prevProps) {
        if (this.props.feed !== prevProps.feed) {
            console.log(this.props.feed);
            getMainFeed(this.props.feed)
                .then(items => this.setState({
                    items: items
                }))
        }
    }
```

## Currently Working On

### Navigation

When I click on 'Top' or 'New':
* The clicked link becomes 'Active', changing its color to red.
* The corresponding feed is displayed. 

When I click on the lightbulb:
* Toggles the styles across the whole app.


# User View

The component structure I came up with is:
```javascript
<User />
    <UserProfile />
    <UserFeed />
```

## Grabbing the User Profile

Click event: When the user clicks on the username attached to a story in the main feed:
1. Sets the state of the 'user' in the App component.
2. The username is passed as props into the User component
3. The username is passed as props from the User component into the UserProfile and UserFeed components.