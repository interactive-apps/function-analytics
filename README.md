# Function Analytics Library

Library to aid in the development of functions

![Travis](https://travis-ci.org/krasimir/webpack-library-starter.svg?branch=master)

## Features

* Fetching data for analytics.
* Fetching DHIS Identifiable objects.
* Perform execution of functions with optimization

## Getting started

### Browser
```
<script src="https://raw.githack.com/hisptz/function-analytics/master/lib/function-analytics.min.js"></script>
```

### Node
```
var Fn require('function-analytics').Fn;

```

## Initializing

```js
Fn.init({
    baseUrl: 'api_url_to_dhis_server',
    username:'username', //Optional if in a DHIS app
    pasword:'password', //Optional if in a DHIS app
  }
)

```
## Fetch analytics 

You can fetch analytic with a few lines of code

```js
(new Fn.Analytics()).setData('dx').setOrgUnit('ou').setPeriod('pe').get()
  .progress(function(value){
    // Do something with the progress value
  })
  .postProcess(function(analyticsObject){ // This adds post processing after fetching is done
    var ouHeader = analyticsObject.headers.ou // Gets the ou header
    var ouIndex = ouHeader.index // Gets the index of organisation unit header
    return analyticsObject;
  })
  .then(function(analyticsObject){ //The result after fetching and processing with the post process callback
     
  })
```

## Dependency

You can put together dependencies if calls depend on one another 

```js
  var orgunitProcessor = new Fn.OrganisationUnit(); // Example of an organisation fethcer

  orgunitProcessor.where('id', 'in', ['Rp268JB6Ne4', 'Rp268JB6Ne2']);

  var analytics = new Fn.Analytics();

  analytics.preProcess(new Fn.Dependency( // Adds dependency
      orgunitProcessor,
      (data, analyticsProcessor)=>{
        let ous = data.organisationUnits.map((organisationUnit) => {
          return organisationUnit.id;
        }).join(';');

        analyticsProcessor
          .setPeriod('2016')
          .setOrgUnit(ous);
      }));
  analytics.get().then((results) => {
      
  });
```
