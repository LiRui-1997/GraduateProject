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
            ?????????????????????????????????
          </Title>
          <EmptyStateBody>{this.props.error}</EmptyStateBody>
        </EmptyState>
      );
    }
    if (this.props.isLoading) {
      return (
        <EmptyState variant={EmptyStateVariant.large} className={emptyStateStyle}>
          <Title headingLevel="h5" size="lg">
            ??????????????????????????????...
          </Title>
        </EmptyState>
      );
    }

    if (this.props.namespaces.length === 0) {
      return (
        <EmptyState variant={EmptyStateVariant.large} className={emptyStateStyle}>
          <Title headingLevel="h5" size="lg">
            ?????????????????????
          </Title>
          <EmptyStateBody>
            ??????????????????????????????????????????????????????
          </EmptyStateBody>
        </EmptyState>
      );
    }

    const isGraphEmpty = !this.props.elements || !this.props.elements.nodes || this.props.elements.nodes.length < 1;

    if (isGraphEmpty && !this.props.isMiniGraph) {
      return (
        <EmptyState variant={EmptyStateVariant.large} className={emptyStateStyle}>
          <Title headingLevel="h5" size="lg">
            ?????????????????????????????????
          </Title>
          <EmptyStateBody>
            {this.namespacesText()}????????????????????????????????????????????????????????????????????????{this.props.namespaces.length === 1 ? '???????????????' : '??????????????????'}??????????????????????????????????????????
            ????????????????????????????????????????????????
            {this.props.showIdleNodes && (
              <> You are currently displaying 'Idle nodes', send requests to the service mesh and click 'Refresh'.</>
            )}
            {!this.props.showIdleNodes && (
              <> ?????????????????????????????????????????????????????????</>
            )}
          </EmptyStateBody>
          <Button onClick={this.props.showIdleNodes ? this.props.action : this.props.toggleIdleNodes} variant="primary">
            {(this.props.showIdleNodes && <>Refresh</>) || <>????????????</>}
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
