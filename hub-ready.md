Public facing session talks summary:
>The Hub builds smart communities for close collaboration with Governments and Citizens that are driven by focused initiatives. Developers can discover, create, and share data-based applications that improve collaboration through analytics-based decision making. Hub-Ready Apps extend WebGIS so that solutions built by the community are deeply integrated with Hubs. These capabilities include shared themes, indicator awareness, data citation, shared state, and accessibility consideration. When an app is Hub-Ready it can be easily reused and shared across many municipalities by many developers.

The following are draft requirements for hub-ready apps:

1. Shared Themes
1. Data Citation
1. Indicator Awareness
1. Accessibility
1. Shared URL State
1. Connected Apps
1. Global Profile

#### Shared Themes
Ability to pull in and apply agreed upon theming into a child application (e.g. local-perspective) from a parent organization (e.g. Los Angeles).
Further information can be found in the following links.

- [discussion forum in the issues](https://github.com/ArcGIS/arcgis-theme), includes the currently agreed upon [spec](https://github.com/ArcGIS/arcgis-theme/issues/7)
- [within context of our team](https://github.com/ArcGIS/Hub/issues/47 )

#### Data Citation

Easily navigable bibliography within the app itself. Users are able to trackback to data sources.

- [Example search for dataset by Layer URL](https://opendata.arcgis.com/api/v2/datasets?include=sites&filter[url]=http://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Public_Service_WebMercator/MapServer/27)

#### Indicator Awareness

Apps should provide information on which data are required. This makes configuration easier and ensures that data --> application isn't a one-way one-time event, but rather that apps stay up to date with indicator information.

- [Hub suggestion](https://github.com/ArcGIS/Hub/issues/48)
- or [Follow Configurable App specification](http://doc.arcgis.com/en/arcgis-online/create-maps/configurable-templates.htm)

#### Accessibility

- Adherence to [WCAG](https://www.w3.org/WAI/intro/wcag.php)
- Localizable strings.

--------------------------------------------------------------------------

#### Shared URL State

Configurable App Spec notes [URL parameters](http://doc.arcgis.com/en/arcgis-online/create-maps/create-app-templates.htm#ESRI_SECTION1_E383AB1F754746D19C8BF0251D22B54C) but only specifies `webmap=`. Apps should have consistent view state across apps (consistent set of query parameters). These enable bookmarkable links that maintain state of app at the time of tracking the url (extent, contents, etc...) as well as cross-linking between applications. For example, [DC Zoning for an house](http://maps.dcoz.dc.gov/zr16/#l=19&x=-8575669.181649944&y=4707024.994399112&mms=18!26!21!24!22!19!4!8!1!2&dcb=0) should be able to link to the [DC Lead pipe status](https://geo.dcwater.com/Lead/) for that same house or any other app. It should also allow opening apps from external third-party sites

- View: `extent=` or `center=&zoom=` or other?
- Selected feature: `selected=<item_id>:<feature_id>` ?
- Webmap or App configuration: `id=` or `item=` or `item_id=`

#### Connected Apps
Apps can be tagged/indexed in a way that allows them to be easily previewed and viewed from other (similarly connected apps). This requirement combines well with Shared State to allow users to navigate fluidly between applications.

#### Global Profile
Users can login across applications to save favorites, interact with data, act as part of a group, track datasets, etc... A Global Profile allows consistency between apps and a more seamless/fully-featured user experience.

---------------------

#### Additional Information

- More repos to reference:
  - https://github.com/ArcGIS/hub
- Please reach out to mshofner@esri.com, should you have any questions.
