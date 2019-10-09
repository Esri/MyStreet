# MyStreet

This application is a municipality viewer that allows users to input an address and receive information based on that location. More technically, the application points to an ArcGIS online Web Map that contains a series of layers bounded by a geographic extent - and then MyStreet returns relevant data based on the searched coordinates within that extent.

Additionally, this app can be used to demonstrate a set of "hub-ready" requirements that allow an application to become a part of the hub. The flagship requirements are Shared Themes, Data Citation, Indicator Awareness, and Accessibility. More information can be found [here](https://github.com/Esri/MyStreet/blob/master/hub-ready.md).

**Currently MyStreet is in development and should be thought of as a beta or preview.**


If you have any questions, please reach out to mshofner@esri.com, or make a PR/Issue in this repo!

### High Level Steps to Reproduce MyStreet with a New City
1. [Create](http://doc.arcgis.com/en/arcgis-online/share-maps/add-items.htm) a Web Map and associated feature layers.
![image](https://cloud.githubusercontent.com/assets/14302394/22866720/03f9e2ac-f149-11e6-974a-6f5f8a350b01.png)

2. Create a Web App which points to the :id from the Web Map above.
The hash should look something like
```
{
  "source": "My City",
  "folderId": null,
  "values": {
    "webmap": "f155264b2b0942daa2c30945b1023675",
    "themeId": "283b7cf014394d7fab7b3fd5b4bd6aeb"
  }
}
```

3. Point the MyStreet application to the :id of the Web App

e.g. for item "2f4c72dc471b4baab362c0437273bd51" put that on the tail end of the url - either  http://mystreet.surge.sh/2f4c72dc471b4baab362c0437273bd51 or http://localhost:4200/2f4c72dc471b4baab362c0437273bd51

4. Enjoy the app!

## [hub ready](https://github.com/Esri/hub-ready-apps/) checklist

- [X] [Live Content](https://github.com/Esri/hub-ready-apps/blob/master/README.md#live-content)
- [X] [Shared Theme](https://github.com/Esri/hub-ready-apps/blob/master/README.md#shared-theme)
- [X] [Durable State](https://github.com/Esri/hub-ready-apps/blob/master/README.md#durable-state)
- [X] [Accessibility](https://github.com/Esri/hub-ready-apps/blob/master/README.md#accessibility)
- [X] [Indicator Aware](https://github.com/Esri/hub-ready-apps/blob/master/README.md#indicator-aware)
- [X] [Data Citation](https://github.com/Esri/hub-ready-apps/blob/master/README.md#data-citation)
- [X] [Versioning](https://github.com/Esri/hub-ready-apps/blob/master/README.md#versioning)

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd MyStreet`
* `npm install`
* `bower install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

## Licensing

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

A copy of the license is available in the repository's [license.txt](./LICENSE.txt) file.

## Other

If you have any questions, please reach out to mshofner@esri.com, or make a PR/Issue in this repo!

[](Esri Tags: ArcGIS Web Mapping Leaflet JavaScript Hub Government)
[](Esri Language: JavaScript Ember)
