export function getMainFeed(feed) {
    // feed should hold the value 'top' or 'new'
    return fetch(`https://hacker-news.firebaseio.com/v0/${feed}stories.json?print=pretty`)
      .then(response => response.json())
      .then(ids => ids.slice(0, 50))
      .then(ids => Promise.all(ids.map(id => 
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
        .then(response => response.json())
        )))
}

export function getUserProfile(username) {
  return fetch(`https://hacker-news.firebaseio.com/v0/user/${username}.json?print=pretty`)
    .then(response => response.json())
}

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