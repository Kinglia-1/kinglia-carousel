import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    {duration: '1s', target: 1},
    {duration: '1s', target: 10},
    {duration: '1s', target: 100},
    {duration: '1s', target: 1000},
    {duration: '1s', target: 1200},
  ],
};

export default function() {
  const zip = Math.floor(Math.random()*90000) + 10000;
  http.get(`http://localhost:3003/places/${zip}`);
  sleep(1);

  const userid = Math.floor((Math. random() * 1000000) + 1);
  http.get(`http://localhost:3003/users/${userid}`);
  sleep(1);
}