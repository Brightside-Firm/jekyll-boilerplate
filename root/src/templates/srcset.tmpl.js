module.exports = function(templateParams) {
    const template = `
    {% assign imagesMetaData = site.data.images-metadata %}
    {% assign selectedImage = imagesMetaData | where: "filename", include.filename | first %}

    <img class="{{ include.class }}" alt="{{ include.alt }}" srcset="{{ selectedImage.srcSet }}" src="{{ selectedImage.src }}" sizes="(min-width: 300px) 50vw, 100vw" width="300">
    `;
    return template;
};
