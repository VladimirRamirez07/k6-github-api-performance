import http from 'k6/http';
import { check, sleep } from 'k6';
import { thresholds } from '../config/thresholds.js';

export const options = {
  thresholds: thresholds,
  stages: [
    { duration: '10s', target: 2  },  // Carga normal
    { duration: '20s', target: 2  },  // Mantener normal
    { duration: '10s', target: 8  },  // SPIKE - pico de tráfico
    { duration: '20s', target: 8  },  // Mantener spike
    { duration: '10s', target: 2  },  // Bajar a normal
    { duration: '20s', target: 2  },  // Recuperación
    { duration: '10s', target: 0  },  // Ramp down
  ],
};

const BASE_URL = 'https://api.github.com';
const TOKEN = __ENV.GITHUB_TOKEN;

const HEADERS = {
  'Accept': 'application/vnd.github.v3+json',
  'User-Agent': 'k6-performance-test',
  'Authorization': `Bearer ${TOKEN}`,
};

const ENDPOINTS = [
  '/repos/microsoft/vscode',
  '/repos/facebook/react',
  '/repos/vuejs/vue',
  '/repos/denoland/deno',
];

export default function () {
  const endpoint = ENDPOINTS[Math.floor(Math.random() * ENDPOINTS.length)];

  const res = http.get(
    `${BASE_URL}${endpoint}`,
    { headers: HEADERS }
  );

  check(res, {
    'status is 200':          (r) => r.status === 200,
    'has repo name':          (r) => JSON.parse(r.body).name !== undefined,
    'response time < 3000ms': (r) => r.timings.duration < 3000,
  });

  sleep(3);
}