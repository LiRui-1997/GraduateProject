import * as React from 'react';
// import { Button } from '@patternfly/react-core';
import { message, Button } from 'antd';
import '../../../../styles/index.css';
import { style } from 'typestyle';
// import DefaultSecondaryMasthead from '../../../../components/DefaultSecondaryMasthead/DefaultSecondaryMasthead';
// import { RenderContent } from '../../../../components/Nav/Page';
// import { style } from 'typestyle';
import { Collapse } from 'antd';

//指标列表
const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

const text1 = `
sum(increase(istio_requests_total{reporter='source',job='kubernetes-pods'}[$interval])) by ($version_labels)
`;

const text2 = `
sum(increase(istio_request_duration_milliseconds_sum{reporter='source',job='kubernetes-pods'}[$interval])) by ($version_labels)
`;
const text3 = `
sum(increase(istio_requests_total{response_code=~'5..',reporter='source',job='kubernetes-pods'}[$interval])) by ($version_labels)
`;

// iframe Url
// var metrics_url = "http://metric.ingress.isa.buaanlsde.cn/d/eXPEaNnZz/experiment-metrics?orgId=1&refresh=10s&kiosk=tv"
var yaml_url = 'https://yamleditor.ingress.isa.buaanlsde.cn/';

// const containerPadding = style({ padding: '20px 20px 20px 20px' });

interface isState {
  iFrameHeight: string;
  random: number;
}

// const openNotification = () => {
//   notification.open({
//     message: 'Notification Title',
//     description:
//       'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
//     onClick: () => {
//       console.log('Notification Clicked!');
//     },
//   });
// };

const info = () => {
  message.success('配置已保存！');
};

const containerPadding = style({ padding: '20px 20px 20px 20px' });

export default class MetricsPage extends React.Component<any, isState> {
  constructor(props: isState) {
    super(props);
    this.state = {
      iFrameHeight: '0px',
      random: 0
    };
  }

  refresh() {
    this.setState({
      random: this.state.random + 1
    });
  }

  render() {
    console.log(yaml_url);
    return (
      <>
        <div className={containerPadding}>
          <Collapse onChange={callback}>
            <Panel header="request_count（服务请求数）" key="1">
              <p>{text1}</p>
            </Panel>
            <Panel header="total_latency（累计延迟）" key="2">
              <p>{text2}</p>
            </Panel>
            <Panel header="error_count（响应错误数）" key="3">
              <p>{text3}</p>
            </Panel>
          </Collapse>
          <span style={{ float: 'left', paddingLeft: '5px', paddingTop: '20px', paddingBottom: '20px' }}>
            <span style={{ paddingRight: '5px' }}>
              <Button type="primary" onClick={info}>
                保存
              </Button>
            </span>
            <span style={{ paddingRight: '5px' }}>
              <Button
                type="primary"
                onClick={() => {
                  this.refresh();
                }}
              >
                刷新
              </Button>
            </span>
          </span>
          <iframe
            key={this.state.random}
            ref="iframe"
            title="yamlEditorUrl"
            scrolling="no"
            frameBorder="0"
            style={{
              width: '100%',
              height: this.state.iFrameHeight,
              overflow: 'visible'
            }}
            onLoad={() => {
              let h = document.documentElement.clientHeight - 214;
              this.setState({
                iFrameHeight: h + 'px'
              });
            }}
            src={yaml_url}
          />
        </div>
      </>
    );
  }
}
