const api = 'https://hacker-news.firebaseio.com/v0';
const json = '.json?print=pretty';

// ----- Top & New 

export function getMainFeed(feed) {
  return getIDs(feed)
    .then(stories => stories.slice(0, 50))
    .then(ids => getItems(ids))
    .then(stories => removeDeadStories(stories))
}


// ----- User

export function getUserProfile(username) {
  return fetch(`${api}/user/${username}${json}`)
    .then(response => response.json())
}

export function getUserPosts(postIDs) {
  postIDs = postIDs.slice(0, 50);

  return getItems(postIDs) 
    .then(posts => removeJunkPosts(posts))
}

// ----- Post

export function getComments(ids) {
  return getItems(ids)
    .then(comments => comments.filter(comment => comment.deleted !== true)
    )
}


// ----- Helpers

export function getItem(postID) {
  return fetch(`${api}/item/${postID}${json}`)
    .then(response => response.json())
}

function getIDs(feed) {
  return fetch(`${api}/${feed}stories${json}`)
    .then(response => response.json())
}

function getItems(ids) {
  return Promise.all(ids.map(id => getItem(id)))
}


// ----- Filter Functions 

function removeDeadStories(items) {
  return items.filter(item => item !== null) // no undefined items
              .filter(item => item.url !== null) // no dead urls
}

function removeJunkPosts(posts) {
  return posts.filter(post => post.type === "story") // only stories
    .filter(post => post.deleted !== true) // remove deleted posts
    .filter(post => post.url != null) // no dead urls
}

export function getItemDate(time) {
  let dateObj = new Date(time * 1000);

  let year = dateObj.getFullYear();
  let month = dateObj.getMonth() + 1;
  let day = dateObj.getDate();
  let hours = dateObj.getHours() + 1;
  let minutes = dateObj.getMinutes();
  let dayAbbrv = 'AM';

  if (hours > 12) {
    hours = hours - 12;
    dayAbbrv = 'PM';
  }

  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  return `${month}/${day}/${year}, ${hours}:${minutes} ${dayAbbrv}`;
}