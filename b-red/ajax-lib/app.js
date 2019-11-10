//
const http = new easyHttp();

//
// http.get('https://jsonplaceholder.typicode.com/posts', (err, posts) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(posts);
// });
// const data = { title: 'Custom', body: 'this is custom' };
// http.post('https://jsonplaceholder.typicode.com/posts', data, (err, post) => {
//   //
//   if (err) {
//     console.log(err);
//   }
//   console.log(post);
// });
const data = { title: 'Custom 2', body: 'this is custom' };
// http.put('https://jsonplaceholder.typicode.com/posts/1', data, (err, post) => {
//   //
//   if (err) {
//     console.log(err);
//   }
//   console.log(post);
// });
http.delete('https://jsonplaceholder.typicode.com/posts/1', (err, res) => {
  //
  if (err) {
    console.log(err);
  }
  console.log(res);
});
