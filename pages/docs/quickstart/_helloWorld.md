Griddle is in npm as `griddle-react`. Simply install Griddle and react from npm:

```
npm install react griddle-react
```

From there, require react and griddle modules and you should be ready to create your grid!

```
import React from 'react';
import Griddle from 'griddle-react';
```

Define an array of JSON objects -- for our examples we have something that resembles the following:

```
[
  {
    "name": "Mayer Leonard",
    "city": "Kapowsin",
    "state": "Hawaii",
    "country": "United Kingdom",
    "company": "Ovolo",
  }
  ...
]
```

Define a Griddle component referencing the data:

```
<Griddle data={data} />
```
