import * as React from 'react';
import { Button, EmptyState, EmptyStateBody, EmptyStateIcon, EmptyStateVariant, Title } from '@patternfly/react-core';
import { style } from 'typestyle';
import * as _ from 'lodash';
import Namespace from '../../types/Namespace';
import { KialiIcon } from '../../config/KialiIcon';
import { DecoratedGraphElements } from '../../types/Graph';

type EmptyGraphLayoutProps = {
  action?: any;
  elements?: DecoratedGraphElements;
  namespaces: Namespace[];
  isLoading?: boolean;
  isError: boolean;
  isMiniGraph: boolean;
  error?: string;
  showIdleNodes: boolean;
  toggleIdleNodes: () => void;
};

const emptyStateStyle = style({
  height: '98%',
  marginRight: 'auto',
  marginLeft: 'auto',
  marginBottom: 10,
  marginTop: 10
});

type EmptyGraphLayoutState = {};

export default class EmptyGraphLayout extends React.Component<EmptyGraphLayoutProps, EmptyGraphLayoutState> {
  shouldComponentUpdate(nextProps: EmptyGraphLayoutProps) {
    const currentIsEmpty = this.props.elements === undefined || _.isEmpty(this.props.elements.nodes);
    const nextIsEmpty = nextProps.elements === undefined || _.isEmpty(nextProps.elements.nodes);

    // Update if we have elements and we are not loading
    if (!nextProps.isLoading && !nextIsEmpty) {
      return true;
    }

    // Update if we are going from having no elements to having elements or vice versa
    if (currentIsEmpty !== nextIsEmpty) {
      return true;
    }
    // Do not update if we have elements and the namespace didn't change, as this means we are refreshing
    return !(!nextIsEmpty && _.isEqual(this.props.namespaces, nextProps.namespaces));
  }

  namespacesText() {
    if (this.props.namespaces && this.props.namespaces.length > 0) {
      if (this.props.namespaces.length === 1) {
        return (
          <>
            <b>{this.props.namespaces[0].name}</b>
          </>
        );
      } else {
        const namespacesString =
          this.props.namespaces
            .slice(0, -1)
            .map(namespace => namespace.name)
            .join(',') +
          ' and ' +
          this.props.namespaces[this.props.namespaces.length - 1].name;
        return (
          <>
            <b>{namespacesString}</b>
          </>
        );
      }
    }
    return null;
  }

  render() {
    if (this.props.isError) {
      return (
        <EmptyState variant={EmptyStateVariant.large} className={emptyStateStyle}>
          <EmptyStateIcon icon={KialiIcon.Error} />
          <Title headingLevel="h5" size="lg">
            生成服务网格流量图出错
          </Title>
          <EmptyStateBody>{this.props.error}</EmptyStateBody>
        </EmptyState>
      );
    }
    if (this.props.isLoading) {
      return (
        <EmptyState variant={EmptyStateVariant.large} className={emptyStateStyle}>
          <Title headingLevel="h5" size="lg">
            服务网格流量图加载中...
          </Title>
        </EmptyState>
      );
    }

    if (this.props.namespaces.length === 0) {
      return (
        <EmptyState variant={EmptyStateVariant.large} className={emptyStateStyle}>
          <Title headingLevel="h5" size="lg">
            未选择命名空间
          </Title>
          <EmptyStateBody>
            请选择要展示服务网格流量图的命名空间
          </EmptyStateBody>
        </EmptyState>
      );
    }

    const isGraphEmpty = !this.props.elements || !this.props.elements.nodes || this.props.elements.nodes.length < 1;

    if (isGraphEmpty && !this.props.isMiniGraph) {
      return (
        <EmptyState variant={EmptyStateVariant.large} className={emptyStateStyle}>
          <Title headingLevel="h5" size="lg">
            未能生成服务网格流量图
          </Title>
          <EmptyStateBody>
            {this.namespacesText()}命名空间下暂时无法生成服务网格流量图，可能是由于{this.props.namespaces.length === 1 ? '此命名空间' : '这些命名空间'}下没有进行相关服务网格配置，
            或者相关服务还未接收到访问请求。
            {this.props.showIdleNodes && (
              <> You are currently displaying 'Idle nodes', send requests to the service mesh and click 'Refresh'.</>
            )}
            {!this.props.showIdleNodes && (
              <> 可以点击下方按钮展示此命名空间下的服务</>
            )}
          </EmptyStateBody>
          <Button onClick={this.props.showIdleNodes ? this.props.action : this.props.toggleIdleNodes} variant="primary">
            {(this.props.showIdleNodes && <>Refresh</>) || <>服务详情</>}
          </Button>
        </EmptyState>
      );
    }

    if (isGraphEmpty && this.props.isMiniGraph) {
      return (
        <EmptyState variant={EmptyStateVariant.large} className={emptyStateStyle}>
          <Title headingLevel="h5" size="lg">
            Empty Graph
          </Title>
          <EmptyStateBody>No graph traffic for the time period.</EmptyStateBody>
        </EmptyState>
      );
    }

    return this.props.children;
  }
}
