import * as React from 'react';
import { Collapse } from 'antd';

//指标列表
const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;


// iframe Url
// var metrics_url = "http://metric.ingress.isa.buaanlsde.cn/d/eXPEaNnZz/experiment-metrics?orgId=1&refresh=10s&kiosk=tv"
var metrics_url = 'https://metric.ingress.isa.buaanlsde.cn/d/eXPEaNnZz/experiment-metrics?orgId=1&refresh=10s&var-service=reviews&var-baseline=reviews-v2&var-candidate=reviews-v3&var-candidate=reviews-v4&var-namespace=bookinfo-iter8&var-window_size=30s&kiosk=tv';

interface isState {
  iFrameHeight: string;
}

export default class MetricsPage extends React.Component<any, isState> {
  constructor(props: isState) {
    super(props);
    this.state = {
      iFrameHeight: '0px'
    };
  }

  render() {
    console.log(metrics_url);
    return (
      <div>
        <Collapse defaultActiveKey={['1']} onChange={callback}>
          <Panel header="This is panel header 1" key="1">
          <p>{text}</p>
          </Panel>
          <Panel header="This is panel header 2" key="2">
          <p>{text}</p>
          </Panel>
          <Panel header="This is panel header 3" key="3">
          <p>{text}</p>
          </Panel>
        </Collapse>
        <iframe
          ref="iframe"
          title="metricUrl"
          scrolling="yes"
          frameBorder="0"
          style={{
            width: '100%',
            height: this.state.iFrameHeight,
            overflow: 'visible'
          }}
          onLoad={() => {
            let h = document.documentElement.clientHeight - 34;
            this.setState({
              iFrameHeight: h + 'px'
            });
          }}
          src={metrics_url}
        />
      </div>
    );
  }
}
