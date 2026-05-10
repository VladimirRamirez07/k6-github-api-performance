export const thresholds = {
  http_req_duration: ['p(95)<3000'],  // 95% de requests bajo 3s
  http_req_failed:   ['rate<0.05'],   // Menos del 5% de errores
};