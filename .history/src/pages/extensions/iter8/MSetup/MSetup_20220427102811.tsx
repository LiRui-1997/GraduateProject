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

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
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
          <span style={{ float: 'left', paddingLeft: '5px', paddingTop: '20px' }}>
            <span style={{ paddingRight: '5px', paddingTop: '20px', paddingBottom: '5px' }}>
              <Button type="primary" onClick={info}>
                保存
              </Button>
            </span>
            <span style={{ paddingRight: '5px', paddingTop: '5px', paddingBottom: '5px' }}>
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
              let h = document.documentElement.clientHeight - 314;
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
