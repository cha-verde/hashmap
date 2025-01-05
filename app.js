class LinkedList {
  constructor() {
    this.first = null;
    this.last = null;
  }

  append(key, value) {
    const node = new Node();
    node.key = key;
    node.value = value;
    if ((this.last == null) & (this.first == null)) {
      this.first = node;
      this.last = node;
    } else {
      this.last.nextNode = node;
      this.last = node;
    }
  }

  prepend(value) {
    const node = new Node();
    node.value = value;
    if ((this.last == null) & (this.first == null)) {
      this.first = node;
      this.last = node;
    } else {
      node.nextNode = this.first;
      this.first = node;
    }
  }

  size(count = 0, node = this.first) {
    if (node.nextNode == null) {
      return count + 1;
    } else {
      return this.size(count + 1, node.nextNode);
    }
  }

  head() {
    return this.first;
  }

  tail() {
    return this.last;
  }

  //index starts at 0

  at(index, count = 0, node = this.first) {
    if (index == count) {
      return node;
    } else {
      return this.at(index, count + 1, node.nextNode);
    }
  }

  contains(key, node = this.first) {
    if (node.nextNode == null && node.key != key) {
      return false;
    }
    if (node.key == key) {
      return true;
    } else {
      return this.contains(key, node.nextNode);
    }
  }

  find(key, index = 0, node = this.first) {
    if (node.nextNode == null && node.key != key) {
      return null;
    }
    if (node.key == key) {
      return index;
    } else {
      return this.find(key, index + 1, node.nextNode);
    }
  }

  replaceValue(key, value, node) {
    if (node.nextNode == null && node.key != key) {
      return null;
    }
    if (node.key == key) {
      node.value = value;
      return;
    } else {
      return this.replaceValue(key, value, node.nextNode);
    }
  }

  getValue(key, node) {
    if (node.nextNode == null && node.key != key) {
      return null;
    }
    if (node.key == key) {
      return node.value;
    } else {
      return this.getValue(key, node.nextNode);
    }
  }

  removeKey(key) {
    if (this.first == this.last) {
      first = null;
      last = null;
      return true;
    } else {
      const count = this.size();
      let node = this.first;
      for (let i = 0; i < count; i++) {
        let next = node.nextNode;
        if (next.key == key) {
          node.nextNode = next.nextNode;
          return true;
        }
        node = node.nextNode;
      }
      return false;
    }
  }

  keysOneBucket(keys = [], node = this.first) {
    keys.push(node.key)
    if (node.nextNode == null) {
      return keys;
    } else {
      return this.keysOneBucket(keys, node.nextNode);
    }
  }

  valuesOneBucket(values = [], node = this.first) {
    values.push(node.value);
    if (node.nextNode == null) {
      return values;
    } else {
      return this.valuesOneBucket(values, node.nextNode);
    }
  }

  entriesOneBucket(entries = [], node = this.first) {
    entries.push([node.key, node.value]);
    if (node.nextNode == null) {
      return entries;
    } else {
      return this.entriesOneBucket(entries, node.nextNode);
    }
  }
}

class Node {
  constructor(key, value) {
    this.key = null;
    this.value = null;
    this.nextNode = null;
  }
}

class HashMap {
  constructor(loadFactor, capacity) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = [];
    let count = 0;
    do {
      this.buckets.push(new LinkedList());
      count++;
    } while (count < capacity);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  set(key, value) {
    const hashed = this.hash(key);
    const index = hashed % this.capacity;

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (this.buckets[index].first != null) {
      if (this.buckets[index].contains(key)) {
        this.buckets[index].replaceValue(key, value, this.buckets[index].first);
      } else {
        this.buckets[index].append(key, value);
      }
    } else {
      this.buckets[index].append(key, value);
    }

    if (this.length() > this.loadFactor * this.capacity) {
      let count = 0;
      do {
        this.buckets.push(new LinkedList());
        count++;
      } while (count < this.capacity);
      this.capacity = this.capacity * 2;
    }
  }

  get(key) {
    const hashed = this.hash(key);
    const index = hashed % this.capacity;

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (this.buckets[index].first != null) {
      if (this.buckets[index].contains(key)) {
        return this.buckets[index].getValue(key, this.buckets[index].first);
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  has(key) {
    const hashed = this.hash(key);
    const index = hashed % this.capacity;

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (this.buckets[index].first != null) {
      if (this.buckets[index].contains(key)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  remove(key) {
    const hashed = this.hash(key);
    const index = hashed % this.capacity;

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (this.buckets[index].first != null) {
      if (this.buckets[index].contains(key)) {
        return this.buckets[index].removeKey(key);
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  length() {
    let length = 0;
    for (let i = 0; i < this.capacity; i++) {
      if (this.buckets[i].first != null) {
        length = length + this.buckets[i].size();
      }
    }
    return length;
  }

  clear() {
    this.buckets = [];
    let count = 0;
    do {
      this.buckets.push(new LinkedList());
      count++;
    } while (count < this.capacity);
  }

  keys() {
    let keys = [];
    for (let i = 0; i < this.capacity; i++) {
      if (this.buckets[i].first != null) {
        keys = keys.concat(this.buckets[i].keysOneBucket());
      }
    }
    return keys;
  }

  values() {
    let values = [];
    for (let i = 0; i < this.capacity; i++) {
      if (this.buckets[i].first != null) {
        values = values.concat(this.buckets[i].valuesOneBucket());
      }
    }
    return values
  }

  entries(){
    let entries = [];
    for (let i = 0; i < this.capacity; i++) {
      if (this.buckets[i].first != null) {
        entries = entries.concat(this.buckets[i].entriesOneBucket());
      }
    }
    return entries;
  }
}

const test = new HashMap(0.75, 16);

test.set("jeans", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

test.clear()

console.log(test.entries())
