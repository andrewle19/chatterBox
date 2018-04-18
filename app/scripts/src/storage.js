class Store {

    constructor(storageApi) {
        this.api = storageApi;
    }
    get(){
        return this.api.getItem(this.key);
    }

    set(value){
      this.api.setItem(this.key, value);
    }
}

export class UserStore extends Store {
    constructor(key){
        // invokes store constructor passing session storage
        super(sessionStorage);
        // sets value of key
        this.key = key;
    }
}
