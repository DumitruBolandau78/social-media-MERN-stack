import { domain } from "../utils/variables";

export default async function getUser() {
  await fetch(domain + '/api/getCurrentUser', {
    method: 'GET',
    credentials: 'include'
  })
    .then(res => res.json())
    .then(data => {
      if (data.user) {
        console.log(data.user);
        return data.user;
      }
    })
    .catch(e => console.log(e));
}