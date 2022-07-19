export class Media {

    constructor (data) {
        this.id = data.id;
        this.photographerId = data.photographerId;
        this.date = new Date(data.date);
        this.title = data.title;
    }
}

export class Picture extends Media {

    constructor (data, photographer) {
        super(data);
        this.type = "picture";
        this.image = data.image;
        this.photographerName = photographer;
        this.imageThumbPath = `assets/images/works/${this.photographerName}/medium/${this.image}`;
        this.imagePath = `assets/images/works/${this.photographerName}/original/${this.image}`;
    }
}

export class Video extends Media {

    constructor (data, photographer) {
        super(data);
        this.type = "video";
        this.video = data.video;
        this.photographerName = photographer;
        this.videoPath = `assets/images/works/${this.photographerName}/${this.video}`;
    }
}