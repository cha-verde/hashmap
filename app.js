import { Node, LinkedList } from "./LinkedList";

class HashMap{
    constructor(loadFactor, capacity){
        this.loadFactor = loadFactor
        this.capacity = capacity
        this.buckets = new Array(16)
    }

    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
     
        return hashCode;
      } 

    set(key, value){
        const index = this.hashCode(key) % 16
        if (index < 0 || index >= buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }
        
    }
     
}

console.log("Hello world!")