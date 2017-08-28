# MMM - QuotesFromReddit

A magic mirror module that is to replace the compliments module. It pulls a random title from reddit.com/r/quotes and displays it on your magic mirror

## Installation

To install simply clone this repository into the `modules` folder within the `MagicMirror` folder. Then run npm install to install necessary packages.

```shell
cd ~/MagicMirror/modules
git clone https://github.com/bthuilot/MMM-QuotesFromReddit.git
npm install
```

Then edit your config file in the `config` folder to feature the following.

**Important**
I Would recommend removing the compliments module and putting this in place

```javascript
{
  module: "MMM-QuotesFromReddit",
  position: "lower_third" // Can be any of the regions
}
```

It should be said that this module isn't perfect due to the nature of reddit and the fact that the posts are selected at random but it's cool in the sense that you never need to
