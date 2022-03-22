import * as React from 'react';
import DefaultSecondaryMasthead from '../../../../components/DefaultSecondaryMasthead/DefaultSecondaryMasthead';
import { RenderContent } from '../../../../components/Nav/Page';
// import { UnControlled as CodeMirror } from 'react-codemirror2';

// const getYAMLJS = require('yamljs');

type YamlConfig = { yaml?: string };

const YamlContent = ({ yaml }: YamlConfig) => <pre className="config-yaml">{yaml}</pre>;
YamlContent.displayName = 'Config';


export default class ConfigContent extends React.Component {

  render() {
    return (
      <>
        <div style={{ backgroundColor: '#fff' }}>
                <DefaultSecondaryMasthead />
        </div>
        <RenderContent>
  
        </RenderContent>
      </>
    );
  }
};

