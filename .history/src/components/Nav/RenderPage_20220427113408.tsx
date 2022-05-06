import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import SwitchErrorBoundary from '../SwitchErrorBoundary/SwitchErrorBoundary';
import { pathRoutes, defaultRoute, extensionsRoutes } from '../../routes';
import { Path } from '../../types/Routes';
import { style } from 'typestyle';
import { PFColors } from '../Pf/PfColors';
import { serverConfig } from '../../config';
// import AnimatedRouter from 'react-animated-router';
// import 'react-animated-router/animate.css';

const containerStyle = style({ marginLeft: 0, marginRight: 0 });
const containerPadding = style({ padding: '0 20px 0 20px' });
const containerGray = style({ background: PFColors.Black150 });

class RenderPage extends React.Component<{ isGraph: boolean }> {
  renderPaths(paths: Path[]) {
    return paths.map((item, index) => {
      return <Route key={index} path={item.path} component={item.component} render={item.render} />;
    });
  }

  renderPathRoutes() {
    const allPathRoutes = pathRoutes.concat(
      extensionsRoutes.filter(route => {
        // Extensions are conditionally rendered
        if (route.path.includes('iter8') && serverConfig.extensions!.iter8.enabled) {
          return true;
        }
        return false;
      })
    );
    return this.renderPaths(allPathRoutes);
  }

  render() {
    const component = (
      <div className={`${containerStyle} ${this.props.isGraph && containerPadding}`}>
        <SwitchErrorBoundary
          fallBackComponent={() => <h2>页面加载失败，请尝试刷新页面。</h2>}
        >
          {this.renderPathRoutes()}
          <Redirect from="/" to={defaultRoute} />
        </SwitchErrorBoundary>
      </div>
    );
    return <>{!this.props.isGraph ? <div className={containerGray}>{component}</div> : component}</>;
  }
}

export default RenderPage;
