export class Pokemon {

    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.animatedGif = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
        this.image = data["sprites"]["front_default"];
        console.log(data);
    }

    getValidImage() {
        return this.animatedGif ?? this.image;
    }
}