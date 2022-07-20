// Create media object
export class Media {
    /**
     * @param {Object} - data
     */
    constructor (data) {
        this.id = data.id;
        this.title = data.title;
    }
}

// Create picture object
export class Picture extends Media {
    /**
     * @param {Object} - current media
     * @param {String} - photographer
     */
    constructor (data, photographer) {
        super(data);
        this.type = "picture";
        this.image = data.image;
        this.photographerName = photographer;
        this.imageThumbPath = `dist/assets/images/works/${this.photographerName}/medium/${this.image}`;
        this.imagePath = `dist/assets/images/works/${this.photographerName}/original/${this.image}`;
    }
}

// Create video object
export class Video extends Media {
    /**
     * @param {Object} - current media
     * @param {String} - photographer
     */
    constructor (data, photographer) {
        super(data);
        this.type = "video";
        this.video = data.video;
        this.photographerName = photographer;
        this.videoPath = `dist/assets/images/works/${this.photographerName}/${this.video}`;
    }
}