import * as React from 'react';
import DefaultSecondaryMasthead from '../../../../components/DefaultSecondaryMasthead/DefaultSecondaryMasthead';
import { RenderContent } from '../../../../components/Nav/Page';
import { style } from 'typestyle';
import { Table } from 'antd';


// iframe Url
// var metrics_url = "http://metric.ingress.isa.buaanlsde.cn/d/eXPEaNnZz/experiment-metrics?orgId=1&refresh=10s&kiosk=tv"
var traffic_url = 'https://fortio.ingress.isa.buaanlsde.cn/fortio/';

const containerPadding = style({ padding: '20px 20px 20px 20px' });

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

  //服务访问地址表格
  columns = [
    {
      title: '微服务项目',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: '命名空间',
      dataIndex: 'namespace',
      key: 'namespace',
    },
    {
      title: '访问地址',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: '操作',
      key: 'action',
      render: (record) => (
          <a>{record.name}</a>
      ),
    },
  ];

  data = [
    {
      key: '1',
      name: 'Bookinfo',
      namespace: 'bookinfo-iter8',
      url: 'http://bookinfo-iter8.ingress.isa.buaanlsde.cn/productpage?u=normal',
    },
  ];

  render() {
    console.log(traffic_url);
    return (
      <>
        <div style={{ backgroundColor: '#fff' }}>
          <DefaultSecondaryMasthead />
        </div>
        <RenderContent>
          <div className={containerPadding}>
            <Table columns={this.columns} dataSource={this.data} />
            <div>
              <iframe
                ref="iframe"
                title="trafficInjectionUrl"
                scrolling="no"
                frameBorder="0"
                style={{
                  width: '100%',
                  height: this.state.iFrameHeight,
                  overflow: 'visible'
                }}
                onLoad={() => {
                  let h = document.documentElement.clientHeight;
                  this.setState({
                    iFrameHeight: h + 'px'
                  });
                }}
                src={traffic_url}
              />
            </div>
          </div>
        </RenderContent>
      </>
    );
  }
}
