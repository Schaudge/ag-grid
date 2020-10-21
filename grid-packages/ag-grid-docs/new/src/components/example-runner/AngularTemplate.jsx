import React from 'react';
import ExampleStyle from './ExampleStyle';
import Extras from './Extras';
import Scripts from './Scripts';
import Styles from './Styles';
import SystemJs from './SystemJs';

const AngularTemplate = ({ appLocation, options, scriptFiles, styleFiles }) => {
    const boilerplatePath = '/example-runner/grid-angular-boilerplate/';

    return <html lang="en">
        <head>
            <title>Angular 2 example</title>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <ExampleStyle rootId="app" />
            <Styles files={styleFiles} />
            <Extras options={options} />
        </head>
        <body>
            <div id="app" dangerouslySetInnerHTML={{ __html: `<my-app>Loading Angular example&hellip;</my-app>` }}></div>

            <script dangerouslySetInnerHTML={{ __html: `document.write('<base href="' + document.location + '" />');` }}></script>
            <script src="https://unpkg.com/core-js@2.6.5/client/shim.min.js"></script>
            <script src="https://unpkg.com/zone.js@0.8.17/dist/zone.js"></script>
            <Scripts files={scriptFiles} />
            <SystemJs boilerplatePath={boilerplatePath} appLocation={appLocation} startFile={boilerplatePath + 'main.ts'} options={options} />
        </body>
    </html>;
};

export default AngularTemplate;