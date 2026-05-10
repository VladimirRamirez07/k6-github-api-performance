import http from 'k6/http';
import { check, sleep } from 'k6';
import { thresholds } from '../config/thresholds.js';

export const options = {
  thresholds: thresholds,
  stages: [
    { duration: '20s', target: 5  },
    { duration: '1m',  target: 5  },
    { duration: '20s', target: 0  },
  ],
};

const BASE_URL = 'https://api.github.com';
const TOKEN = __ENV.GITHUB_TOKEN;

const HEADERS = {
  'Accept': 'application/vnd.github.v3+json',
  'User-Agent': 'k6-performance-test',
  'Authorization': `Bearer ${TOKEN}`,
};

const REPOS = [
  'microsoft/vscode',
  'facebook/react',
  'vuejs/vue',
];

export default function () {
  const repo = REPOS[Math.floor(Math.random() * REPOS.length)];

  const res = http.get(
    `${BASE_URL}/repos/${repo}/issues?state=open&per_page=10`,
    { headers: HEADERS }
  );

  check(res, {
    'status is 200':          (r) => r.status === 200,
    'has issues':             (r) => JSON.parse(r.body).length > 0,
    'response time < 3000ms': (r) => r.timings.duration < 3000,
  });

  sleep(1);
}