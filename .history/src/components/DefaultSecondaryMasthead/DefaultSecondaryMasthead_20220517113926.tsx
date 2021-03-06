import React from 'react';
import { Title } from '@patternfly/react-core';
import NamespaceDropdownContainer from '../NamespaceDropdown';
import { style } from 'typestyle';

const titles = [
  'applications',
  'istio',
  'istio/new',
  'mesh',
  'services',
  'workloads',
  'extensions/iter8',
  'extensions/iter8/new',
  'extensions/iter8/newfromfile',
  'traffic',
  'global-setup'
];

type Props = {
  actionsToolbar?: JSX.Element;
  hideNamespaceSelector?: boolean;
  rightToolbar?: JSX.Element;
};

const mainPadding = style({
  padding: '10px 20px 10px 20px'
});

const flexStyle = style({
  display: 'flex',
  flexWrap: 'wrap'
});

const rightToolbarStyle = style({
  marginLeft: 'auto'
});

const actionsToolbarStyle = style({
  marginLeft: 'auto',
  paddingTop: '17px'
});

export default class DefaultSecondaryMasthead extends React.Component<Props> {
  showTitle() {
    let path = window.location.pathname;
    path = path.substr(path.lastIndexOf('/console') + '/console'.length + 1);
    if (titles.some(t => path.startsWith(t))) {
      let title = path.charAt(0).toUpperCase() + path.slice(1);
      let disabled = false;
      if (path.startsWith('istio/new/')) {
        // 'istio/new/'.length() == 10
        const objectType = path.substring(10);
        title = 'Create ' + objectType;
      } else if (path === 'traffic') {
        title = '服务流量注入工具';
      } else if (path === 'msetup') {
        title = '服务性能指标设置';
      } else if (path === 'repo') {
        title = '服务部署配置仓库';
      } else if (path === 'istio') {
        title = '服务网格资源配置';
      } else if (path === 'extensions/iter8') {
        title = '持续交付智能决策实验';
      } else if (path === 'extensions/iter8/new') {
        title = '创建新的智能决策实验';
        disabled = true;
      } else if (path === 'extensions/iter8/newfromfile') {
        title = '导入配置文件创建实验';
      } else if (path === 'mesh') {
        title = 'Clusters';
      }
      return {
        title: (
          <Title headingLevel="h1" size="3xl" style={{ margin: '15px 0 11px' }}>
            {title}
          </Title>
        ),
        disabled: disabled
      };
    }

    return { title: undefined, disabled: false };
  }

  render() {
    const { title, disabled } = this.showTitle();
    return (
      <div className={mainPadding}>
        <div className={flexStyle}>
          <div>
            {this.props.hideNamespaceSelector === true ? null : <NamespaceDropdownContainer disabled={disabled} />}
          </div>
          {this.props.rightToolbar && <div className={rightToolbarStyle}>{this.props.rightToolbar}</div>}
        </div>
        <div className={flexStyle}>
          <div>{title}</div>
          {this.props.actionsToolbar && <div className={actionsToolbarStyle}>{this.props.actionsToolbar}</div>}
        </div>
      </div>
    );
  }
}
