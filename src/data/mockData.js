// Clearly marked as Demo Data for data honesty compliance
export const IS_DEMO_DATA = true;

export const INITIAL_PROJECTS = [
  {
    id: 'PRJ-101',
    name: 'Customer Billing Gateway',
    category: 'Fintech',
    status: 'Active',
    region: 'us-east-1',
    nodes: 8,
    monthlySpend: '$2,450.00',
    healthScore: 99.8,
    lastDeployed: '2025-02-18 14:30',
    owner: 'Sarah Jenkins',
    tags: ['Production', 'PCI-DSS', 'High-Traffic']
  },
  {
    id: 'PRJ-102',
    name: 'AI Analytics Pipeline',
    category: 'Machine Learning',
    status: 'Active',
    region: 'us-west-2',
    nodes: 24,
    monthlySpend: '$6,820.50',
    healthScore: 96.4,
    lastDeployed: '2025-02-19 09:15',
    owner: 'Alex Rivera',
    tags: ['GPU-Cluster', 'Batch-Jobs']
  },
  {
    id: 'PRJ-103',
    name: 'Legacy Auth Sync Service',
    category: 'Infrastructure',
    status: 'Degraded',
    region: 'eu-central-1',
    nodes: 3,
    monthlySpend: '$840.00',
    healthScore: 82.1,
    lastDeployed: '2025-02-10 11:00',
    owner: 'David Chen',
    tags: ['Migration-Pending', 'Deprecated']
  },
  {
    id: 'PRJ-104',
    name: 'Realtime Notification Hub',
    category: 'Messaging',
    status: 'Active',
    region: 'ap-southeast-1',
    nodes: 12,
    monthlySpend: '$1,920.00',
    healthScore: 99.9,
    lastDeployed: '2025-02-20 02:45',
    owner: 'Maria Garcia',
    tags: ['WebSocket', 'Production']
  },
  {
    id: 'PRJ-105',
    name: 'Staging E-Commerce API',
    category: 'Web Services',
    status: 'Maintenance',
    region: 'us-east-1',
    nodes: 2,
    monthlySpend: '$310.00',
    healthScore: 100.0,
    lastDeployed: '2025-02-17 18:20',
    owner: 'Kenji Sato',
    tags: ['Staging', 'QA-Automated']
  },
  {
    id: 'PRJ-106',
    name: 'Global CDN Ingress Proxy',
    category: 'Networking',
    status: 'Active',
    region: 'global',
    nodes: 40,
    monthlySpend: '$12,400.00',
    healthScore: 99.99,
    lastDeployed: '2025-02-19 22:10',
    owner: 'Infrastructure Team',
    tags: ['Global', 'Edge', 'Cloudflare']
  },
  {
    id: 'PRJ-107',
    name: 'Data Warehouse Extract Indexer',
    category: 'Data Engineering',
    status: 'Inactive',
    region: 'us-west-2',
    nodes: 0,
    monthlySpend: '$0.00',
    healthScore: 0.0,
    lastDeployed: '2025-01-05 08:00',
    owner: 'Elena Rostova',
    tags: ['Archived', 'Cost-Optimized']
  }
];

export const INITIAL_ACTIVITY_LOGS = [
  {
    id: 'LOG-881',
    timestamp: '2 mins ago',
    actor: 'Sarah Jenkins',
    action: 'Scaled cluster nodes',
    target: 'PRJ-101 (Billing)',
    status: 'Success'
  },
  {
    id: 'LOG-882',
    timestamp: '14 mins ago',
    actor: 'AutoScaler Policy',
    action: 'Provisioned 4 GPU instances',
    target: 'PRJ-102 (AI Pipeline)',
    status: 'Success'
  },
  {
    id: 'LOG-883',
    timestamp: '45 mins ago',
    actor: 'David Chen',
    action: 'Triggered failover health check',
    target: 'PRJ-103 (Legacy Auth)',
    status: 'Warning'
  },
  {
    id: 'LOG-884',
    timestamp: '2 hours ago',
    actor: 'CI/CD Pipeline',
    action: 'Deployed build v2.4.12',
    target: 'PRJ-104 (Notification)',
    status: 'Success'
  }
];

export const SYSTEM_METRICS = {
  activeClusters: 14,
  totalNodes: 89,
  monthlyCloudSpend: '$24,740.50',
  avgUptime: '99.94%',
  activeIncidents: 1,
  demoLabel: 'Demo Data Environment'
};