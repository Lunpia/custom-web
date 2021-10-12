# custom-web

Basic SCSS and JS compiler used to customize webpages


## Installation
These plugins are used to launch a local server to load local css and js files

1. Add [Witchcraft](https://chrome.google.com/webstore/detail/witchcraft-inject-js-and/hokcepcfcicnhalinladgknhaljndhpc).
2. Add [Webserver](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?utm_source=chrome-app-launcher-info-dialog).
3. And read [this](https://luciopaiva.com/witchcraft/how-to-install.html) / copy from this image.

![web server configuration](https://github.com/robbsnor/custom-web/blob/master/web-server-configuration.png)

[Extra info over Witchcraft](https://luciopaiva.com/witchcraft/).

4. Install packages (node 14)
```
npm ci
```

5. Run gulp to start editing files
```
npm run start
```


## Add new website
1. Create a new folder with a corresponding name to the website you want to edit
2. Name your files (.scss and/or .js) to the URL of the website
