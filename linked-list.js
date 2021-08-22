"use strict";

/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}


/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = new Node(val);
    if (!(this.head)) this.head = newNode;

    if (this.tail) {
      // list has elements
      // prev for newNode points to the current last node.
      newNode.prev = this.tail;

      // the current last node, this.tail, needs to point to the 
      //  newNode. newNode is now on the link chain as the last node.
      this.tail.next = newNode;

      this.tail = newNode;
    } else {
      // this.tail is null
      this.tail = newNode;
    }

    this.length++;

  }


  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const newNode = new Node(val);
    newNode.next = this.head;

    // if node(s) are already on the list, set the 'prev' 
    //  pointer for the current first node to the new node.
    if (this.head) {
      this.head.prev = newNode;
    } else {
      // head pointer is null, list is empty, tail should
      //  also be null.
      this.tail = newNode;
    }

    this.head = newNode;

    this.length++;

  }


  /** pop(): return & remove last item. */

  pop() {

    if (!(this.tail)) {
      throw Error("List is empty.");
    }

    // retain value from the to-be-removed last node
    const val = this.tail.val;

    if (this.head === this.tail) {
      // list only has one value 
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }

    this.length--;
    return val;

  }


  /** shift(): return & remove first item. */

  shift() {

    if (!(this.head)) {
      throw Error("List is empty.");
    }

    // retain value from the to-be-removed first node
    const val = this.head.val;

    if (this.head === this.tail) {
      // list only had one value and we just removed it
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }

    this.length--;
    return val;

  }


  /** positionToIdx(idx): returns the node at index idx. */

  positionToIdx(idx) {
    if (!(this.head)) {
      throw Error("List is empty.");
    }

    if ((idx + 1 > this.length) || (idx < 0)) {
      throw Error(`${idx} is an invalid index.`);
    }

    // Taking full advantage of prev. Check to see
    //  if the index is closer to the front or 
    //  closer to the back. 
    let currNode;
    if (idx < (this.length / 2)) {
      // first half of list
      currNode = this.head;
      let ctr = 0;
      while (ctr < idx) {
        currNode = currNode.next;
        ctr++;
      }
    } else {
      // idx is closer to the end
      currNode = this.tail;
      let ctr = this.length - 1;
      while (ctr > idx) {
        currNode = currNode.prev;
        ctr--;
      }
    }

    return currNode;

  }


  /** getAt(idx): get val at idx. */
  getAt(idx) {

    const currNode = this.positionToIdx(idx);

    return currNode.val;

  }


  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {

    const currNode = this.positionToIdx(idx);
    currNode.val = val;

  }


  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {

    if (idx === 0) {
      // this is an unshift
      this.unshift(val);
      return;
    } else if (idx === this.length) {
      // this is a push
      this.push(val);
      return;
    }

    // inserting in the middle of the list
    const currNode = this.positionToIdx(idx);

    const newNode = new Node(val);
    newNode.next = currNode;
    newNode.prev = currNode.prev;

    (currNode.prev).next = newNode;
    currNode.prev = newNode;

    this.length++;

  }


  /** removeAt(idx): Remove & return value at position idx. 
   *  Throws error if index is invalid. 
   */

  removeAt(idx) {
    // check the index -- it is a shift when idx is 0 and a pop when the idx + 1 = length.
    let val;
    if (idx === 0) {
      // this is a shift / remove from start of list
      val = this.shift(val);
      return val;
    } else if (idx + 1 === this.length) {
      // this is a pop / remove from end of list
      val = this.pop(val);
      return val;
    }

    // removing from the middle of the list
    const currNode = this.positionToIdx(idx);
    val = currNode.val;

    // next on the previous node points to the node after 
    //  currNode via currNode.next
    (currNode.prev).next = currNode.next;

    // prev on the node after currNode points to the 
    //  node before currNode via currNode.prev
    (currNode.next).prev = currNode.prev;

    // remove currNode from the list. Not sure how these go away either.
    // currNode.next = null;
    // currNode.prev = null;

    this.length--;
    return val;

  }


  /** average(): return an average of all values in the list */

  average() {
    if (!(this.head)) {
      return 0;
    }

    let currNode = this.head;
    let total = currNode.val;
    while (currNode.next) {
      currNode = currNode.next;
      total = total + currNode.val;
    }

    return total / this.length;

  }
}

module.exports = LinkedList;
