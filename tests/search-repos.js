import http from 'k6/http';
import { check, sleep } from 'k6';
import { thresholds } from '../config/thresholds.js';

export const options = {
  thresholds: thresholds,
  stages: [
    { duration: '30s', target: 2 },
    { duration: '1m',  target: 2 },
    { duration: '20s', target: 0 },
  ],
};

const BASE_URL = 'https://api.github.com';
const TOKEN = __ENV.GITHUB_TOKEN;

const HEADERS = {
  'Accept': 'application/vnd.github.v3+json',
  'User-Agent': 'k6-performance-test',
  'Authorization': `Bearer ${TOKEN}`,
};

export default function () {
  const queries = ['playwright', 'k6', 'selenium', 'cypress', 'jest'];
  const query = queries[Math.floor(Math.random() * queries.length)];

  const res = http.get(
    `${BASE_URL}/search/repositories?q=${query}&per_page=10`,
    { headers: HEADERS }
  );

  check(res, {
    'status is 200':          (r) => r.status === 200,
    'response has items':     (r) => JSON.parse(r.body).items.length > 0,
    'response time < 3000ms': (r) => r.timings.duration < 3000,
  });

  sleep(5); // 5 segundos entre requests
}