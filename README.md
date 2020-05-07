<p align="center">
  <img width="280px" src="https://raw.githubusercontent.com/Norbz/nuxt-snapchat-tracker-module/master/assets/logo.png" alt="logo" />
</p>
<br>
<p align="center">

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

</p>

# nuxt-snapchat-tracker-module
> A nuxt module for snapchat tracker integration

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

1. Add `nuxt-snapchat-tracker-module` dependency to your project

```bash
yarn add nuxt-snapchat-tracker-module # or npm install nuxt-snapchat-tracker-module --save
```

2. Add `nuxt-snapchat-tracker-module` to the `modules` section of `nuxt.config.js`

```js
{
  modules: [
    // Simple usage
    'nuxt-snapchat-tracker-module',

    // With options
    ['nuxt-snapchat-tracker-module', {
      track: 'PageView', // default
      id: '<YOUR TRACKING ID>', // mandatory
      disabled: false // default, but beware of GDPR
    }]
  ]
}
```

You can also put your options outside modules
```js
{
  modules: [
    'nuxt-snapchat-tracker-module',
  ],
  snaptr: {
    track: 'PAGE_VIEW', // default
    id: '<YOUR TRACKING ID>', // mandatory
    disabled: false // default, but beware of GDPR
  }
}
```
> All user informations are optionnals. Read more below

## GDPR
You should collect consent before enabling the tracker to be compliant with GDPR.

First, disable snaptr in yoiur nuxt config file :
```js
{
  modules: [
    'nuxt-snapchat-tracker-module',
  ],
  snaptr: {
    ...
    disabled: true // <-- change this
  }
}
```

Then, collect consent on a popin or whatever then call (in any VueJS component)
```js
this.$snaptr.enable();
```

This will enable the tracker AND call a track event with the Event specified in options `(defaut: PAGE_VIEW)`

> Please note that this module won't remember consent from one session to another. If you want to save the user preference, just hold the information on a local cookie and programatically call `this.$snaptr.enable()`

## User informations
In attempt to better match the user browser, snapchat tracker allows you to provide an email or a phone number when initialising the tracker.

To init the tracker providing user's informations, simply add them as an argument when enabling the tracker. You won't be able to pass some user information if you auto start the tracker as it wouldn't make any sense.

```js
this.$snaptr.enable({
  user_email: 'nospam@nospam.org'
})
```
Read more about the possible user informations here : https://businesshelp.snapchat.com/en-US/a/pixel-website-install


# API

## Options

| Option   | Default  | Required | Description                                                                               |
|----------|----------|----------|-------------------------------------------------------------------------------------------|
| id  | null     | true     | The unique tracker identifier provided by Snap.                                         |
| track    | PAGE_VIEW | false    | Default tracking event.                                                                   |
| disabled | false    | false    | Prevent the tracker to automatically initialize

## Tracker instance

The tracker  is available everywhere and allows you to call specific tracking event during navigation or on some user actions.

> Access the tracker with `this.$snaptr`

| Method            | Purpose                                                                                                  | Args                  |
|-------------------|----------------------------------------------------------------------------------------------------------|--------------------------------|
| enable(user)          | Initialize the pixel and tracks the current page view | `user:Object`: Snapchat user information (Optionnal, see above)        |
| init(user)            | Initialises the tracker but do not track the current page                                                                                   | `user:Object`: Snapchat user information (Optionnal, see above)  |
| track(event, parameters)           | Sends a track event with optional `parameters`.                          | `event:String` : defaults to `track` option if not specified.<br>`parameters:Object`: Some object containing additional info such as purchase price. defaults to null.  |
| query(cmd, name, parameters) | Call the snaptr tracker directly. Only use case would be to call future commands yet not implemented in this module.                                     | `cmd:String`: the snaptr command (ex: "track").<br>`value:String`: The snaptr event name (ex: "PAGE_VIEW").<br>`parameters:Object`: Optionnal snaptr parameters

## License

[MIT License](./LICENSE)

Copyright (c) Nicolas Chesné

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-snapchat-tracker-module/latest.svg
[npm-version-href]: https://npmjs.com/package/nuxt-snapchat-tracker-module

[npm-downloads-src]: https://img.shields.io/npm/dt/nuxt-snapchat-tracker-module.svg
[npm-downloads-href]: https://npmjs.com/package/nuxt-snapchat-tracker-module

[github-actions-ci-src]: https://github.com/Norbz/nuxt-snapchat-tracker-module/workflows/ci/badge.svg
[github-actions-ci-href]: https://github.com/Norbz/nuxt-snapchat-tracker-module/actions?query=workflow%3Aci

[codecov-src]: https://img.shields.io/codecov/c/github/Norbz/nuxt-snapchat-tracker-module.svg
[codecov-href]: https://codecov.io/gh/Norbz/nuxt-snapchat-tracker-module

[license-src]: https://img.shields.io/npm/l/nuxt-snapchat-tracker-module.svg
[license-href]: https://npmjs.com/package/nuxt-snapchat-tracker-module
