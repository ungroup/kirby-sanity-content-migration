# Example Kirby Setup

![Screenshot of example website](../images/01.png?raw=true "Screenshot of example website")

The example setup of our website.

## The important part

The _important_ part is the JSON path we created for the Sanity API request. In order for it to work we added the `sanity` folder to Kirby‘s `content` folder. Theoretically we could have used the Kirby API but in our real world case our client was still using Kirby 2 without the API functionality.

## The JSON Structure

We templated a cusom JSON template, you could also do it as in the [provided example](https://getkirby.com/docs/cookbook/templating/generating-json) from Kirby.
The JSON will be under `http://THE-WEBSITE-URL.com/sanity` The JSON structure is as such:

```json
[
  {
    "slug": "",
    "title": "",
    "text": "",
    "images": [
      {
        "url": "",
        "caption": ""
      }
    ]
  }
]
```
