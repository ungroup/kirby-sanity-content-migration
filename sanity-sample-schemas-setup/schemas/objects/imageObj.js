export default {
  name: "imageObj",
  type: "object",
  title: "Image",
  options: {
    collapsible: false, // Makes the whole fieldset collapsible
    collapsed: false, // Defines if the fieldset should be collapsed by default or not
  },
  fields: [
    {
      name: "image",
      type: "image",
      title: "Image",
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: false,
      },
      fields: [
        {
          name: "caption",
          type: "string",
          title: "Caption",
          options: {
            isHighlighted: true,
          },
        },
      ],
    },
    {
      title: "Title",
      type: "string",
      hidden: true,
      name: "title",
      initialValue: "Item",
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
};
