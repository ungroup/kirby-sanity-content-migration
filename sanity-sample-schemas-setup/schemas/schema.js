import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

import project from "./documents/project";
import images from "./objects/images";
import imageObj from "./objects/imageObj";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([project, images, imageObj]),
});
