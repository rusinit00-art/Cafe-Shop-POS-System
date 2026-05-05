export class Setting {
    #shopName;
    #ownerName;

    constructor(shopName, ownerName) {
        this.#shopName = shopName;
        this.#ownerName = ownerName;
    }

    get shopName() { return this.#shopName; }
    get ownerName() { return this.#ownerName; }

    set shopName(name) { this.#shopName = name; }
    set ownerName(name) { this.#ownerName = name; }
}