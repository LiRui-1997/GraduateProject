import * as React from 'react';

// iframe Url
// var metrics_url = "http://metric.ingress.isa.buaanlsde.cn/d/eXPEaNnZz/experiment-metrics?orgId=1&refresh=10s&kiosk=tv"
var repo_url = "https://ubuntu-ui.ingress.isa.buaanlsde.cn/"

interface isState{
    iFrameHeight: string
}

export default class MetricsPage extends React.Component<any,isState> {
    constructor(props: isState) {
        super(props);
        this.state = {
            iFrameHeight: '0px'
        };
    }

    render() {
        console.log(repo_url)
        return (
            <div>
                <iframe ref="iframe" title="repoUrl" scrolling='yes' frameBorder="1" style={{
                    width:'99%', height:this.state.iFrameHeight, overflow:'visible'}}
                    onLoad={() => {
                        let h = document.documentElement.clientHeight - 60;
                        this.setState({
                            "iFrameHeight": h + 'px'
                        });
                    }}
                    src={repo_url}
                />
            </div>
        )
    }
}