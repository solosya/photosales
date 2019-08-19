


export const imageSet = images => {
    const photos = images.map((img, i) => {
        let media = "(min-width: 501px) and (max-width: 991px)";
        if (i>0) {
            media = "(max-width: 500px)";
        }
        return {
            srcSet: img,
            media
        }
    });
    return photos;
}
