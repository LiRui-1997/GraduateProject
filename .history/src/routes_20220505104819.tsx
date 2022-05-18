import WorkloadListPage from './pages/WorkloadList/WorkloadListPage';
import ServiceListPage from './pages/ServiceList/ServiceListPage';
import IstioConfigPage from './pages/IstioConfigList/IstioConfigListPage';
import IstioConfigDetailsPage from './pages/IstioConfigDetails/IstioConfigDetailsPage';
import WorkloadDetailsPage from './pages/WorkloadDetails/WorkloadDetailsPage';
// import AppListPage from './pages/AppList/AppListPage';
import AppDetailsPage from './pages/AppDetails/AppDetailsPage';
import OverviewPageContainer from './pages/Overview/OverviewPage';
import { MenuItem, Path } from './types/Routes';
import GraphPageContainer from './pages/Graph/GraphPage';
import { Paths } from './config';
import ServiceDetailsPageContainer from './pages/ServiceDetails/ServiceDetailsPage';
import IstioConfigNewPageContainer from './pages/IstioConfigNew/IstioConfigNewPage';
import ExperimentListPage from './pages/extensions/iter8/Iter8ExperimentList/ExperimentListPage';
import ExperimentCreatePageContainer from './pages/extensions/iter8/Iter8ExperimentDetails/ExperimentCreatePage';
import ExperimentDetailsPage from './pages/extensions/iter8/Iter8ExperimentDetails/ExperimentDetailsPage';
import ExperimentCreateFromFileContainer from './pages/extensions/iter8/Iter8ExperimentDetails/ExperimentCreateFromFile';
import MeshPage from 'pages/Mesh/MeshPage';
import Metrics from './pages/extensions/iter8/metrics/Metrics';
import Traffic from './pages/extensions/iter8/TrafficInjection/Traffic';
import MSetup from './pages/extensions/iter8/MSetup/MSetup';
import Repo from './pages/extensions/iter8/Repo/repo';

/**
 * Return array of objects that describe vertical menu
 * @return {array}
 */
const navItems: MenuItem[] = [
  {
    title: '智能决策实验',
    to: '/extensions/iter8',
    pathsActive: [/^\/extensions\/iter8/, new RegExp('^/extensions/namespaces/(.*)/iter8')]
  },
  {
    title: '服务网格配置',
    to: '/' + Paths.ISTIO,
    pathsActive: [new RegExp('^/namespaces/(.*)/' + Paths.ISTIO + '/(.*)'), new RegExp('/' + Paths.ISTIO + '/new/(.*)')]
  },
  {
    title: '服务调用分析',
    to: '/graph/namespaces/',
    pathsActive: [/^\/graph\/(.*)/]
  },
  // {
  //   title: 'Overview',
  //   to: '/overview',
  //   pathsActive: [/^\/overview\/(.*)/]
  // },
  {
    title: '服务流量注入',
    to: '/' + Paths.Traffic,
    pathsActive: [new RegExp('^/namespaces/(.*)/' + Paths.WORKLOADS + '/(.*)')]
  },
  {
    title: '性能指标设置',
    to: '/' + Paths.MSetup,
    pathsActive: [new RegExp('^/namespaces/(.*)/' + Paths.WORKLOADS + '/(.*)')]
  },
  {
    title: '性能指标监控',
    to: '/' + Paths.Metrics,
    pathsActive: [new RegExp('^/namespaces/(.*)/' + Paths.APPLICATIONS + '/(.*)')]
  },
  {
    title: '版本同步仓库',
    to: '/' + Paths.Repo,
    pathsActive: [new RegExp('^/namespaces/(.*)/' + Paths.WORKLOADS + '/(.*)')]
  }
  // {
  //   title: 'Services',
  //   to: '/' + Paths.SERVICES,
  //   pathsActive: [new RegExp('^/namespaces/(.*)/' + Paths.SERVICES + '/(.*)')]
  // },

  // {
  //   title: 'Distributed Tracing',
  //   to: '/jaeger'
  // },
  // {
  //   title: 'Mesh',
  //   to: '/mesh'
  // }
];

// const extensionsItems: MenuItem[] = [
//   {
//     title: '智能决策实验',
//     to: '/extensions/iter8',
//     pathsActive: [/^\/extensions\/iter8/, new RegExp('^/extensions/namespaces/(.*)/iter8')]
//   }
// ];

const defaultRoute = '/extensions/iter8';

const pathRoutes: Path[] = [
  {
    path: '/overview',
    component: OverviewPageContainer
  },
  {
    path: '/graph/node/namespaces/:namespace/' + Paths.AGGREGATES + '/:aggregate/:aggregateValue',
    component: GraphPageContainer
  },
  {
    path: '/graph/node/namespaces/:namespace/' + Paths.APPLICATIONS + '/:app/versions/:version',
    component: GraphPageContainer
  },
  {
    path: '/graph/node/namespaces/:namespace/' + Paths.APPLICATIONS + '/:app',
    component: GraphPageContainer
  },
  {
    path: '/graph/node/namespaces/:namespace/' + Paths.SERVICES + '/:service',
    component: GraphPageContainer
  },
  {
    path: '/graph/node/namespaces/:namespace/' + Paths.WORKLOADS + '/:workload',
    component: GraphPageContainer
  },
  {
    path: '/graph/namespaces',
    component: GraphPageContainer
  },
  {
    path: '/namespaces/:namespace/' + Paths.SERVICES + '/:service',
    component: ServiceDetailsPageContainer
  },
  {
    path: '/namespaces/:namespace/' + Paths.ISTIO + '/:objectType/:object',
    component: IstioConfigDetailsPage
  },
  {
    path: '/' + Paths.SERVICES,
    component: ServiceListPage
  },
  {
    path: '/' + Paths.Metrics,
    component: Metrics
  },
  {
    path: '/' + Paths.Traffic,
    component: Traffic
  },
  {
    path: '/' + Paths.MSetup,
    component: MSetup
  },
  {
    path: '/' + Paths.Repo,
    component: Repo
  },
  {
    path: '/' + Paths.APPLICATIONS,
    component: Metrics
  },
  {
    path: '/namespaces/:namespace/' + Paths.APPLICATIONS + '/:app',
    component: AppDetailsPage
  },
  {
    path: '/' + Paths.WORKLOADS,
    component: WorkloadListPage
  },
  {
    path: '/namespaces/:namespace/' + Paths.WORKLOADS + '/:workload',
    component: WorkloadDetailsPage
  },
  {
    path: '/' + Paths.ISTIO + '/new/:objectType',
    component: IstioConfigNewPageContainer
  },
  {
    path: '/' + Paths.ISTIO,
    component: IstioConfigPage
  },
  {
    path: '/' + Paths.JAEGER,
    component: undefined
  },
  {
    path: '/' + Paths.MESH,
    component: MeshPage
  }
];

const extensionsRoutes: Path[] = [
  // Keep routes ordered with the more specific URLs first
  // Extension will follow /extensions/<extension>/namespaces/:namespace/experiments/:name pattern
  // To make RenderPage.tsx routes easy to filter without regex
  {
    path: '/extensions/namespaces/:namespace/iter8/:name',
    component: ExperimentDetailsPage
  },
  {
    path: '/extensions/iter8/new',
    component: ExperimentCreatePageContainer
  },
  {
    path: '/extensions/iter8/newFromFile',
    component: ExperimentCreateFromFileContainer
  },
  {
    path: '/extensions/iter8',
    component: ExperimentListPage
  },
  {
    path: '/extensions/iter8/metrics',
    component: Metrics
  }
];

export { defaultRoute, navItems, pathRoutes, extensionsRoutes };
