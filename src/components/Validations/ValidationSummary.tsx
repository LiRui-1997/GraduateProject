import * as React from 'react';
import { CSSProperties } from 'react';
import { ValidationTypes } from '../../types/IstioObjects';
import { style } from 'typestyle';
import { Text, TextVariants, Tooltip, TooltipPosition } from '@patternfly/react-core';
import Validation from './Validation';

interface Props {
  id: string;
  errors: number;
  warnings: number;
  objectCount?: number;
  style?: CSSProperties;
}

const tooltipListStyle = style({
  textAlign: 'left',
  border: 0,
  padding: '0 0 0 0',
  margin: '0 0 0 0'
});

const tooltipSentenceStyle = style({
  textAlign: 'center',
  border: 0,
  padding: '0 0 0 0',
  margin: '0 0 0 0'
});

export class ValidationSummary extends React.PureComponent<Props> {
  getTypeMessage = (count: number, type: ValidationTypes): string => {
    return count > 1 ? `发现 ${count} ${type}s ` : `发现 ${count} ${type} `;
  };

  severitySummary() {
    const issuesMessages: string[] = [];

    if (this.props.errors > 0) {
      issuesMessages.push(this.getTypeMessage(this.props.errors, ValidationTypes.Error));
    }

    if (this.props.warnings > 0) {
      issuesMessages.push(this.getTypeMessage(this.props.warnings, ValidationTypes.Warning));
    }

    if (issuesMessages.length === 0) {
      issuesMessages.push('配置验证通过');
    }

    return issuesMessages;
  }

  severity() {
    let severity = ValidationTypes.Correct;
    if (this.props.errors > 0) {
      severity = ValidationTypes.Error;
    } else if (this.props.warnings > 0) {
      severity = ValidationTypes.Warning;
    }

    return severity;
  }

  tooltipNA() {
    return <Text className={tooltipSentenceStyle}>未找到服务网格配置</Text>;
  }

  tooltipNoValidationAvailable() {
    return <Text className={tooltipListStyle}>服务网格配置检测不可用</Text>;
  }

  tooltipSummary() {
    return (
      <>
        <Text style={{ textAlign: 'left', textEmphasis: 'strong' }} component={TextVariants.p}>
          包含服务网格配置数量: {this.props.objectCount}
        </Text>
        <div className={tooltipListStyle}>
          {this.severitySummary().map(cat => (
            <div key={cat}>{cat}</div>
          ))}
        </div>
      </>
    );
  }

  tooltipContent() {
    if (this.props.objectCount !== undefined) {
      if (this.props.objectCount === 0) {
        return this.tooltipNA();
      } else {
        return this.tooltipSummary();
      }
    } else {
      return this.tooltipNoValidationAvailable();
    }
  }

  tooltipBase() {
    return this.props.objectCount === undefined || this.props.objectCount > 0 ? (
      <Validation iconStyle={this.props.style} severity={this.severity()} />
    ) : (
      <div style={{ display: 'inline-block', marginLeft: '5px' }}>N/A</div>
    );
  }

  render() {
    return (
      <Tooltip
        aria-label={'Validations list'}
        position={TooltipPosition.auto}
        enableFlip={true}
        content={this.tooltipContent()}
      >
        {this.tooltipBase()}
      </Tooltip>
    );
  }
}

export default ValidationSummary;
