# Using Cloud Datastore

This sample application shows how to use Google Cloud Datastore on Google App
Engine.

[App Engine standard environment][appengine-std] users: See tutorial [Using Cloud Datastore][tutorial-std] for more information on running and deploying this app.

[App Engine flexible environment][appengine-flex] users: See tutorial [Using Cloud Datastore][tutorial-flex] for more information on running and deploying this app.

* [Setup](#setup)
* [Running locally](#running-locally)
* [Deploying to App Engine](#deploying-to-app-engine)
* [Running the tests](#running-the-tests)

## Setup
      npm install

## Running locally

### Running server
    gcloud auth application-default login
    npm start

### Running DataStore Emulator

    gcloud beta emulators datastore env-init
    gcloud beta emulators datastore start

## Deploying to App Engine standard environment

	gcloud app deploy app.yaml

## Running the tests

See [Contributing][contributing].

[appengine-flex]: https://cloud.google.com/appengine/docs/flexible/nodejs
[appengine-std]: https://cloud.google.com/appengine/docs/standard/nodejs
[tutorial-std]: https://cloud.google.com/appengine/docs/standard/nodejs/using-cloud-datastore
[tutorial-flex]: https://cloud.google.com/appengine/docs/flexible/nodejs/using-cloud-datastore
[readme]: ../README.md
[contributing]: https://github.com/GoogleCloudPlatform/nodejs-docs-samples/blob/master/CONTRIBUTING.md
