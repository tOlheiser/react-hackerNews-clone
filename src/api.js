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