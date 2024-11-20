# Logging Setup with Grafana and Prometheus

This guide explains how to set up and use logging with Grafana and Prometheus in the Momo Store Backend.

## Overview

The logging system consists of three main components:
1. NestJS Application (Metrics Source)
2. Prometheus (Metrics Collection)
3. Grafana (Visualization)

## Setup Instructions

### 1. Prerequisites

Make sure you have the following installed:
- Docker and Docker Compose
- Node.js (v16 or later)
- pnpm

### 2. Configuration Files

#### Prometheus Configuration (`config/prometheus/prometheus.yml`):
```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'nestjs'
    static_configs:
      - targets: ['app-server:3001']
    metrics_path: /metrics

  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']
```

#### Grafana Datasource (`config/grafana/provisioning/datasources/datasource.yml`):
```yaml
apiVersion: 1

datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    isDefault: true
    editable: true
```

### 3. Starting the Services

```bash
# Development mode
NODE_ENV=development docker compose --env-file .env.dev.local up

# Production mode
docker compose up
```

### 4. Accessing the Dashboards

1. **Prometheus UI**:
   - URL: http://localhost:9090
   - Use this to query raw metrics and check scrape status

2. **Grafana Dashboard**:
   - URL: http://localhost:3000
   - Default credentials:
     - Username: admin
     - Password: admin
   - First-time setup:
     1. Log in with default credentials
     2. The Prometheus datasource is automatically configured
     3. Import or create dashboards

## Available Metrics

The following metrics are available from the NestJS application:

1. **HTTP Metrics**:
   - Request count
   - Response times
   - Status codes

2. **System Metrics**:
   - Memory usage
   - CPU usage
   - Node.js garbage collection

3. **Custom Business Metrics**:
   - User registration count
   - Login attempts
   - API endpoint usage

## Creating Dashboards

### 1. Basic Dashboard Setup

1. Click '+ Create' in Grafana
2. Select 'Dashboard'
3. Add a new panel

### 2. Example Queries

#### HTTP Request Rate:
```promql
rate(http_request_total[5m])
```

#### Average Response Time:
```promql
rate(http_request_duration_seconds_sum[5m]) / rate(http_request_duration_seconds_count[5m])
```

#### Error Rate:
```promql
rate(http_request_total{status_code=~"5.."}[5m])
```

## Best Practices

1. **Retention Settings**:
   - Configure Prometheus data retention based on your needs
   - Default retention is 15 days

2. **Dashboard Organization**:
   - Group related metrics in the same dashboard
   - Use meaningful names and descriptions
   - Add documentation to panels

3. **Alerting**:
   - Set up alerts for critical metrics
   - Configure notification channels
   - Use appropriate thresholds

## Troubleshooting

### Common Issues

1. **Prometheus Can't Scrape Metrics**:
   - Check if the NestJS application is exposing metrics
   - Verify network connectivity
   - Check Prometheus targets page

2. **Grafana Can't Connect to Prometheus**:
   - Verify Prometheus is running
   - Check datasource configuration
   - Check network connectivity

3. **Missing Metrics**:
   - Verify metrics are being generated
   - Check Prometheus scrape configs
   - Check application instrumentation

## Maintenance

### Regular Tasks

1. **Backup**:
   - Regularly backup Grafana dashboards
   - Export important dashboard configurations

2. **Updates**:
   - Keep Grafana and Prometheus updated
   - Review and update dashboard configurations

3. **Cleanup**:
   - Monitor disk usage
   - Adjust retention periods if needed
   - Remove unused dashboards

## Security Considerations

1. **Authentication**:
   - Change default credentials
   - Use strong passwords
   - Enable authentication for Prometheus if exposed

2. **Network Security**:
   - Use secure connections
   - Restrict access to monitoring endpoints
   - Configure appropriate firewalls

3. **Data Protection**:
   - Regular backups
   - Access control for sensitive metrics
   - Audit logging

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review Grafana and Prometheus documentation
3. Contact the development team
