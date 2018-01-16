This file describes the process a developer can follow to achieve a state of hub-readiness for their application. By matching the following hub ready requirements (described from a high-level [here](https://github.com/Esri/open-streets/blob/master/hub-ready.md)), an application will more seamlessly integrate with the hub.

#### Data Citation
- Create hyperlinks to page that is informing that data represented on the page.
- Dataset, then Feature Service, then Layer is the suggested hierarchy of fallbacks
- These hyperlinks should be automatically generated

#### Shared Themes
- Create Shared Theme
  - Portal Path
    - Shared Theme JSON
  - Open Data Path
    - Shared Theme CSS endpoint
    - Shared Theme JSON
- Fetch Shared Theme JSON (at either Portal or Open Data endpoint) or Shared Theme CSS (at Open Data endpoint).
- Inject Shared Theme JSON/CSS into the application.

#### Indicator Awareness / Configurable App
- Create a configurable app
  - Add item. Type: Web Mapping. Purpose: Configurable. API: Javascript. URL: [whatever your deployed url is]
  - Share the configurable app.
  - In the settings tab (past overview, and usage) of the app,
- Then create app using a template (see picture)
- Select my-street Application
- Select a properly configured web map
- Share with public
- Fix the extent
- Configure away

#### Accessibility
- https://www.w3.org/WAI/intro/wcag.php
- Adhere to - Web Content Accessibility Guidelines (WCAG) 2.0 principles

--------------------------------

#### High Level Steps to Reproduce my-street
1. [Create](http://doc.arcgis.com/en/arcgis-online/share-maps/add-items.htm) a Web Map and associated feature layers.
![image](https://cloud.githubusercontent.com/assets/14302394/22866720/03f9e2ac-f149-11e6-974a-6f5f8a350b01.png)
2. Create a Web App which points to the :id from the Web Map above.
The hash should look something like
```
{
  "source": "TheApplication",
  "folderId": null,
  "values": {
    "webmap": "f155264b2b0942daa2c30945b1023675",
    "themeId": "283b7cf014394d7fab7b3fd5b4bd6aeb"
  }
}
```
