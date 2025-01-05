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


  getValue(key, value, node) {
    if (node.nextNode == null && node.key != key) {
      return null;
    }
    if (node.key == key) {
       return node.value;
    } else {
      return this.replaceValue(key, value, node.nextNode);
    }
  }

  toString(string = "", node = this.first) {
    string = string + "( " + node.key + "," + node.value + " )";
    if (node.nextNode == null) {
      return string + " -> " + null;
    } else {
      return this.toString(string + " -> ", node.nextNode);
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

//Testing

const list = new LinkedList();

list.append("dog", "chocolate");
list.append("sheep", "chocolate");
list.append("cat", "fish")
list.replaceValue("cat", "bus", list.first)

console.log(list.contains("cat"));

export { Node, LinkedList };
