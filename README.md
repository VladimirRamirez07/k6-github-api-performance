# k6 GitHub API Performance Testing

Performance testing suite for the GitHub REST API using **k6**, **Grafana** and **GitHub Actions**.

![GitHub Actions](https://github.com/VladimirRamirez07/k6-github-api-performance/actions/workflows/performance.yml/badge.svg)
![k6](https://img.shields.io/badge/k6-7D64FF?style=flat&logo=k6&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Grafana](https://img.shields.io/badge/Grafana-F46800?style=flat&logo=grafana&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=githubactions&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)

## 🎯 Test Scenarios

| Script | Type | VUs | Description |
|--------|------|-----|-------------|
| `search-repos.js` | Load Test | 2 | Repository search under sustained load |
| `list-issues.js` | Load Test | 5 | Issue listing across popular repos |
| `traffic-spike.js` | Spike Test | 2→8→2 | Traffic burst simulation with recovery |

## ✅ Thresholds

| Metric | Threshold |
|--------|-----------|
| `http_req_duration` | p(95) < 3000ms |
| `http_req_failed` | rate < 5% |

## 🚀 Run Locally

```bash
k6 run -e GITHUB_TOKEN=your_token tests/search-repos.js
k6 run -e GITHUB_TOKEN=your_token tests/list-issues.js
k6 run -e GITHUB_TOKEN=your_token tests/traffic-spike.js
```
## 📊 Local Visualization (Grafana + InfluxDB)

```bash
# Start InfluxDB and Grafana
docker compose up -d

# Run tests sending metrics to InfluxDB
k6 run -e GITHUB_TOKEN=your_token --out influxdb=http://localhost:8086/k6 tests/search-repos.js
```

Open Grafana at `http://localhost:3001` (user: `admin`, password: `admin`)  
Import `grafana/dashboard.json` to visualize results.

## 📁 Project Structure

```
k6-github-api-performance/
├── .github/
│   └── workflows/
│       └── performance.yml
├── config/
│   └── thresholds.js
├── grafana/
│   └── dashboard.json
├── tests/
│   ├── search-repos.js
│   ├── list-issues.js
│   └── traffic-spike.js
├── .gitignore
├── docker-compose.yml
└── README.md
```

## 🛠️ Tech Stack

- **k6** — Performance testing engine
- **JavaScript** — Test scripting
- **GitHub Actions** — CI/CD automation
- **Grafana** — Metrics visualization
- **InfluxDB** — Metrics storage
- **Docker** — Container orchestration

## 👤 Author

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Vladimir_Ramirez-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/vladimir-ramírez-303a433ba)
[![GitHub](https://img.shields.io/badge/GitHub-VladimirRamirez07-181717?style=flat&logo=github&logoColor=white)](https://github.com/VladimirRamirez07)