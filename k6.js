import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    {duration: '1s', target: 1},
    {duration: '1s', target: 10},
    {duration: '1s', target: 100},
    {duration: '10s', target: 1000},
    {duration: '10s', target: 8000},
  ],
};

export default function() {
  const zip = Math.floor(Math.random() * 90000) + 10000;
  http.get(`http://localhost:3003/places/${zip}`);
  sleep(1);

  const userid = Math.floor((Math. random() * 1000000) + 1);
  http.get(`http://localhost:3003/users/${userid}`);
  sleep(1);

  // before running test, be sure to create list called 'stresslist' from userid 1
  // const placeid = Math.floor((Math. random() * 1000000) + 1);
  // const payload = {
  //   userid: 1,
  //   placeid: placeid,
  //   listname: 'stresslist'
  // };
  // const headers = {'Content-Type': 'application/json'};
  // http.patch(`http://localhost:3003/users/lists`, JSON.stringify(payload), {headers: headers});
  // sleep(1);
}