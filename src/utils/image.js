export const imageSet = (images) => {
  const photos = images.map((img, i) => {
    let media = "(min-width: 501px) and (max-width: 991px)";
    if (i > 0) {
      media = "(max-width: 500px)";
    }
    return {
      srcSet: img,
      media,
    };
  });
  return photos;
};

export const processImages = (images, checkStatus) => {
  return images.map((item) => {
    const { favourite, cart } = checkStatus(item.media_id);

    return {
      id: item.media_id,
      url: item.path,
      // path    : item.path,
      guid: item.guid,
      type: item.fileType,
      title: item.title,
      width: item.width,
      height: item.height,
      caption: item.caption,
      networkId: item.sourceNetwork_id,
      createdDate: item.createdDate,
      cart, //boolean to show if photo is in the cart
      favourite, // boolean to show if photo is in the favourites
      original: item.path[0], // needed for gallery
      imageSet: imageSet(item.path.slice(1)),
      // galleryType: galleryType,
    };
  });
};
