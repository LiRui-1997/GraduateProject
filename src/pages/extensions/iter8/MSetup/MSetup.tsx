import * as React from 'react';
// import DefaultSecondaryMasthead from '../../../../components/DefaultSecondaryMasthead/DefaultSecondaryMasthead';
// import { RenderContent } from '../../../../components/Nav/Page';
// import { style } from 'typestyle';

// iframe Url
// var metrics_url = "http://metric.ingress.isa.buaanlsde.cn/d/eXPEaNnZz/experiment-metrics?orgId=1&refresh=10s&kiosk=tv"
var yaml_url = "https://yamleditor.ingress.isa.buaanlsde.cn/"

// const containerPadding = style({ padding: '20px 20px 20px 20px' });

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
        console.log(yaml_url)
        return (
          <>
            <div>
            <iframe ref="iframe" title="yamlEditorUrl" scrolling='yes' frameBorder="0" style={{
                width:'100%', height:this.state.iFrameHeight, overflow:'visible'}}
                onLoad={() => {
                    let h = document.documentElement.clientHeight - 20;
                    this.setState({
                        "iFrameHeight": h + 'px'
                    });
                }}
                src={yaml_url}
            />
            </div>
          </>
        )
    }
}