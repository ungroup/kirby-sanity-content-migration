export default {
  name: "project",
  type: "document",
  title: "Project",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 200,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "")
            .slice(0, 200),
      },
    },
    {
      title: "Text",
      name: "text",
      type: "text",
    },
    {
      title: "Images",
      name: "images",
      type: "images",
    },
  ],
};
