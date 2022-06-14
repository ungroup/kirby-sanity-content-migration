import { client, axios, isImage } from "./helpers.js";

const jsonUrl = "http://localhost:8888/sanity";
var config = {
  method: "get",
  url: jsonUrl,
};

// get the json
axios(config)
  .then((response) => {
    const projectsData = response.data;
    processProjects(projectsData);
  })
  .catch((err) => {
    console.log("JSON could not be loaded.");
  });

async function processProjects(projects) {
  for (const project of projects) {
    console.log(`--- ${project.title}: Start process.`);
    // SANITY CREATES / REPLACES DOCUMENT
    const createdDoc = await createDoc(project);
    // DOWNLOAD ALL IMAGES FROM project
    const downloadedImages = await downloadImages(project);
    // SANITY UPLOAD ALL IMAGES
    const allUploadAssets = await uploadImagesToSanity(downloadedImages);
    // PUT ASSETS IN GALLERY
    await putAssetsInGallery(allUploadAssets, createdDoc, project);
    console.log(`--- ${project.title}: Completely processed.`);
  }
  console.log("All projects processed.");
}

async function putAssetsInGallery(assetArr, doc, project) {
  for (let i = 0; i < assetArr.length; i++) {
    await putAssetInGallery(assetArr[i], doc, i, project);
  }
}

async function putAssetInGallery(asset, doc, index, project) {
  return new Promise((resolve) => {
    client
      .patch(doc._id)
      .insert("after", "images[-1]", [
        {
          title: "Item",
          image: {
            alt: "",
            caption: project.images[index].caption,
            asset: {
              _type: "reference",
              _ref: asset._id,
            },
          },
        },
      ])
      .commit({ autoGenerateArrayKeys: true })
      .then(() => {
        console.log(`Added to gallery: #${index}`);
        resolve();
      })

      .catch((err) => {
        console.error("Oh no, updating the gallery failed: ", err.message);
      });
  });
}

function downloadImage(url, index) {
  return new Promise((resolve) => {
    axios
      .get(url, { responseType: "arraybuffer" })
      .then((res) => {
        const imageData = Buffer.from(res.data, "binary");
        console.log(`Downloaded: #${index}`);
        resolve(imageData), 3000;
      })
      .catch((err) => console.log("Error getting the image.", err));
  });
}

async function uploadImagesToSanity(imageArr) {
  const allAssets = [];
  for (let i = 0; i < imageArr.length; i++) {
    const uploadAsset = await uploadImageToSanity(imageArr[i], i);
    allAssets.push(uploadAsset);
  }
  return allAssets;
}

async function uploadImageToSanity(imageData, index) {
  return new Promise((resolve) => {
    client.assets
      .upload("image", imageData)
      .then((asset) => {
        console.log(`Uploaded image: #${index}`);
        return resolve(asset);
      })
      .catch((err) => {
        console.log("Error uploading image to Sanity", err);
      });
  });
}

async function downloadImages(project) {
  console.log(`Total images: ${project.images.length}`);
  const allImages = [];
  for (let i = 0; i < project.images.length; i++) {
    const image = project.images[i];
    if (isImage(image.url)) {
      const downloadedImage = await downloadImage(image.url, i);
      allImages.push(downloadedImage);
    }
  }
  return allImages;
}

function createDoc(project) {
  return new Promise((resolve) => {
    client
      .createOrReplace({
        _type: "project",
        // CAUTION: We were using the slug as the ID; you might not want this!
        _id: project.slug,
        title: project.title,
        images: [],
        slug: {
          current: project.slug,
        },
        text: project.text,
      })
      .then((document) => {
        console.log(`${project.title}: Document created.`);
        resolve(document);
      })
      .catch((err) =>
        console.log(`${project.title}: Error creating Sanity Document:`, err)
      );
  });
}
