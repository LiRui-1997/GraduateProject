import * as React from 'react';

// iframe Url
// var metrics_url = "http://metric.ingress.isa.buaanlsde.cn/d/eXPEaNnZz/experiment-metrics?orgId=1&refresh=10s&kiosk=tv"
var metrics_url = 'https://metric.ingress.isa.buaanlsde.cn/d/eXPEaNnZz/experiment-metrics?orgId=1&refresh=10s&kiosk';

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
