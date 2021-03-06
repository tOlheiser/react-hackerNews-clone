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

## Mounting the Component when data isn't available
I found myself in this odd situation where I need to use this pattern "profile !== null && data" for everything. 

```javascript
<div className="flex container-sm col">
    <h1 className="userHeading" style={style === 'light' ? userHeadingLight : userHeadingDark}>
        {profile != null && profile.id}
    </h1>
    <p className="userInfo">joined 
        <span className="userData"> {profile != null && getItemDate(profile.created)} </span>
        has <span className="userData">{profile != null && profile.karma} </span>karma
    </p>
</div>
```

I ran into a problem where the words "joined has karma" would load before all the data. I'd prefer instead to have everything appear at once. So then I tried nesting everything inside "profile != null" but it failed to compile.

```javascript
{profile != null && 
    <div className="container">
        <div className="flex container-sm col">
            <h1 className="userHeading" style={style === 'light' ? userHeadingLight : userHeadingDark}>
                {profile.id}
            </h1>
            <p className="userInfo">joined 
                <span className="userData"> {getItemDate(profile.created)} </span>
                has <span className="userData">{profile.karma} </span>karma
            </p>
        </div>
    </div>
}
```

Solution: wrap everything inside of a React.Fragment. 
```javascript
<React.Fragment>
    {profile != null && 
    <div className="container">
        <div className="flex container-sm col">
            <h1 className="userHeading" style={style === 'light' ? userHeadingLight : userHeadingDark}>
                {profile.id}
            </h1>
            <p className="userInfo">joined 
                <span className="userData"> {getItemDate(profile.created)} </span>
                has <span className="userData">{profile.karma} </span>karma
            </p>
        </div>
    </div>
    }
</React.Fragment>
```

## Getting User Posts

It seems I have a few options here:
1. Run another fetch request for the user when the UserFeed component mounts, grab their IDs, then run requests on each ID. 

2. Take the post ID's from the state object in UserProfile, lift them up to User, then pass them down to UserFeed. *This is something I attempted to do. I tried to run 'componentDidUpdate' to ensure I had the data from the requrest. Inside componentDidUpdate, I had a function passed through props which would update the parent component with that data. It gave me the error, 'maximum update depth exceeded'.*

3. Run the first fetch request inside User. Pass 'created', 'karma', and 'Bio' to UserProfile, and 'item IDs' to UserFeed. 

4. Nest the Posts inside of the UserProfile component. Pass the profile info down to Posts as props from UserProfile.

**Learning moment**: When contemplating passing data between siblings, consider nesting one sibling inside the other. Data flow is far easier this way. 

**Issues with my function using Promise.all**

With the below code, I was getting the error, "items.filter is not a function". This was confusing to me.

```javascript
export function getUserPosts(postIDs) {
    // Reduces what could be an array of 1000's of items down to 50
    postIDs = postIDs.slice(0, 100);

    // running a fetch request on every item ID.
    return Promise.all(postIDs.map(id => 
      fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
        // convert the response to json
        .then(response => response.json())
        // of the items received, I only want the stories. 
        .then(items => items.filter(item => item.type === "story"))
      )) 
}
```

**Solution**

Turns out I had to place my .then with the filter function one level higher (outside of the Promise.all). This was so I could filter over the response data Promise.all returned, as opposed to trying to filter on every request. 

```javascript
export function getUserPosts(postIDs) {
    // Reduces what could be an array of 1000's of items down to 50
    postIDs = postIDs.slice(0, 100);

    // running a fetch request on every item ID.
    return Promise.all(postIDs.map(id => 
      fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
        // convert the response to json
        .then(response => response.json())
      )) // of the items received, I only want the stories. 
      .then(items => items.filter(item => item.type === "story"))
}
```

## Issue: 
The 'Posts' h2 loads before my data loads in the UserProfile component.

## Getting to know Modules

'..' is used to navigate outside your current directory.
'.' is used to navigate inside your current directory.
Absence of any of those above dots directs node to look for the module in the *node_modules* folder.

In importing functions from my API, here is something I noticed:
- When User is the parent component of UserFeed
- Both of these components require 'getItemDate' from api.js
- I figured 'I can just import getItemDate into User, and not have to do that with UserFeed, right?
- Wrong. I had to import that function into both components. When rendering the child component, you don't necessarily pass on any imports. 

## Ternaries vs If Statements

Ternaries are expressions, if statements are... statements.

<ul>
  {numComments !== null ? ( comments === null ? <Loading /> : <Comment />) : null}
</ul>

render() {
  if (numComments === null) return;

  return (
    <ul>
      {comments === null ? <Loading /> : <Comments />}
    </ul>
  )
}

### Code readability:
I noticed Tyler McGinnis creates functions for small things (remove deleted comments). The by product of this is that it makes code more readable. This is something I should strive for. 

## Implementing Themes Via Context

**1. Create your Context**
* Create a separate folder named, 'contexts'. Within it, I created a file called theme.js.

```javascript
// theme.js
import React from 'react';

const { Consumer, Provider } = React.createContext();

export const ThemeConsumer = Consumer;
export const ThemeProvider = Provider;
```

The provider makes the data available to any component in our app that consumes it. Consumer is used to consume the information on the Provider.

**2. Wrap Application inside the ThemeProvider**
```javascript
// index.js
import { ThemeProvider } from './contexts/theme';

...

return (
    <Router>
        <ThemeProvider>
            <div className="body" style={lightBody}>
                <Nav 
                    setFeed={this.setFeed}
                    toggleStyles={this.toggleStyles}
                    feed={this.state.feed}
                    style={this.state.style}
                /> 
                        
                <Route exact path='/' component={Feed} />
                <Route path='/new' component={Feed} />
                <Route path='/user' component={User} />
                <Route path='/post' component={Post}/>
            </div>
        </ThemeProvider>
    </Router>
)
```

**3. Pass in a value to the Provider**
```javascript
<ThemeProvider value={this.state}>
```

Whatever is inside 'value' will be available to any component in our application that 'consumes' it. 

```javascript
this.state = {
    theme: 'light',
    toggleTheme: () => {
        this.setState(({ theme }) => ({
            theme: theme === 'light' ? 'dark' : 'light'
        }))
    }
};
```

**4. Consuming data from the Provider**

Wrap everything inside the return output of your component inside ThemeConsumer.

```javascript
// Nav.js
import { ThemeConsumer } from '../contexts/theme';

...

return (
    <ThemeConsumer>

    </ThemeConsumer>
)
```

Pull the data

```javascript
return (
    <ThemeConsumer>
        {/* Whatever you passed into ThemeProvider's value prop gets passed into here.*/}
        {({ theme, toggleTheme }) => (

        )}
    </ThemeConsumer>
)
// Required knowledge: Render Prop pattern.
```

React passes 'theme' and 'toggleTheme' to this function '{() => }' within ThemeConsumer, because that is what was passed into Provider.

**5. Using the data to apply a theme**

For the page background, he nested his whole app in a container div and gave it the classname of the current theme.

```javascript
<ThemeProvider>
    <div className={this.state.theme}>
        <div className='container'>
            <Nav />
        </div>
    </div>
</ThemeProvider>
```

Pattern: make a unique prefix, then attach 'light' or 'dark' to it. 
```javascript
className={`bg-${theme}`} //bg-light or bg-dark
```

Which looks much better then: 
```javascript
className={theme === 'light' ? classNameLight : classNameDark};
```

## Quick tip: Destructuring Props

```javascript
export default function Comment ({ comment }) {
```

## Styling Data Inside dangerouslySetInnerHTML

Just because you can't target it directly, you can still reach the element by their parent.

```css
.dark a {
  color: #DADADA;
}
```

## Implementing Class Properties

*Why do my functions need to be arrow functions?*
*What is a 'static' value inside of a class?*

**Step 1: Install the babel plugin for the class properties proposal**
```javascript
npm install --save-dev @babel/plugin-proposal-class-properties
```

**Step 2: Update your package.json file**
```javascript
"babel": {
    "presets": [
        // ...
    ],
    "plugins": [
        "@babel/plugin-proposal-class-properties"
    ]
}
```

**Step 3: Remove the Constructor**

Before:
```javascript
class PlayerInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: ''
        }

        // No more binding 'this'!!
        this.handleSubmit = this.handleSubmit.bind(this);
    }
}
```

After:
```javascript
class PlayerInput extends React.Component {
    state {
        username: ''
    }
}
```

**Step 4: Modify Methods**
Before:
```javascript
handleChange(event) {
    this.setState({
        username: event.target.value
    })
}
```

The methods are converted to arrow functions.

After:
```javascript
handleChange = (event) => {
    this.setState({
        username: event.target.value
    })
}
```

*Drawbacks?*

## Implementing Code Splitting

McGinnis gives an exceptional breakdown at the 6:55 mark of his video.

**If you're not using create-react-app, install the plugin**
```javascript
// npm install babel-plugin-syntax-dynamic-import
```

**Enable your plugin**
```javascript
"babel": {
    "presets": [
        // ...
    ],
    "plugins": [
        "@babel/plugin-proposal-class-properties",
        "syntax-dynamic-import"
    ]
}
```

```javascript
import React, { Component } from 'react'
import Loading from './Loading'
import DynamicImport from './DynamicImport'
import { BrowserRouter as Router, Route, Link, } from 'react-router-dom'

//No need for 'import Topics from './Topics'. Instead:
const Topics = React.lazy(() => import('./Topics'))

...

// Suspense displays the fallback component until the nested components have been loaded.
<React.Suspense fallback={<Loading />}>
    <Route exact path='/' component={LazyHome} />
    <Route path='/topics' component={LazyTopics} />
    <Route path='/settings' component={LazySettings} />
</React.Suspense>
```

Consider using 'error boundaries' for if there is a network failure and the component doesn't load.

## More on Readability: Components

“The separation of container and presentational components.”

If you think about the anatomy of a React component, it usually involves some state, potentially some lifecycle hooks, and markup via JSX. What if, instead of having all of that in one component, we separate the state and the lifecycle hooks from the markup. This leaves us with two components. The first has state, life cycle methods, and is responsible for how the component works. The second receives data via props and is responsible for how the component looks. This approach allows us to have better reusability of our presentational components since they’re no longer coupled to the data they receive. I’ve also found that it will enable you (and newcomers to your project) to better understand the structure of your application. You’re able to swap out the implementation of a component without seeing or caring about the UI and vice versa - designers can tweak the UI without ever having to worry about how those presentational components are receiving data." - Tyler McGinnis

I'm thinking that it would be best to seperate a component into two components: Container and Presentational. 

The container handles state and lifecycle methods.

The presentational is a single component that renders the presentation (which may have more presentational components nested within)