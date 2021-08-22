const LinkedList = require("./linked-list");

describe("push", function () {
  it("appends node and increments length", function () {
    let lst = new LinkedList();

    lst.push(5);
    expect(lst.length).toBe(1);
    expect(lst.head.val).toBe(5);
    expect(lst.tail.val).toBe(5);

    lst.push(10);
    expect(lst.length).toBe(2);
    expect(lst.head.val).toBe(5);
    expect(lst.head.next.val).toBe(10);
    expect(lst.tail.val).toBe(10);

    lst.push(15);
    expect(lst.length).toBe(3);
    expect(lst.head.val).toBe(5);
    expect(lst.head.next.next.val).toBe(15);
    expect(lst.tail.val).toBe(15);

    expect(lst.tail.prev.val).toBe(10);
    expect(lst.tail.prev.prev.val).toBe(5);

  });
});

describe("unshift", function () {
  it("adds node at start and increments length", function () {
    let lst = new LinkedList();

    lst.unshift(5);
    expect(lst.length).toBe(1);
    expect(lst.head.val).toBe(5);
    expect(lst.tail.val).toBe(5);

    lst.unshift(10);
    expect(lst.length).toBe(2);
    expect(lst.head.val).toBe(10);
    expect(lst.head.next.val).toBe(5);
    expect(lst.tail.val).toBe(5);

    lst.unshift(15);
    expect(lst.length).toBe(3);
    expect(lst.head.val).toBe(15);
    expect(lst.head.next.next.val).toBe(5);
    expect(lst.tail.val).toBe(5);

    // verify previous connectivity
    expect(lst.tail.prev.val).toBe(10);
    expect(lst.tail.prev.prev.val).toBe(15);
  });
});

describe("pop", function () {
  it("throws an error when the list is empty", function () {
    let lst = new LinkedList([]);

    function popWrapper() {
      const lastVal = lst.pop();
    }

    expect(lst.head).toBeNull();
    expect(lst.tail).toBeNull();
    expect(popWrapper).toThrowError("List is empty.")

  });

  it("removes node at end and decrements length", function () {
    let lst = new LinkedList([5, 10]);

    function popWrapper() {
      const lastVal = lst.pop();
    };

    expect(lst.pop()).toBe(10);
    expect(lst.head.val).toBe(5);
    expect(lst.tail.val).toBe(5);
    expect(lst.length).toBe(1);

    expect(lst.pop()).toBe(5);
    expect(lst.tail).toBe(null);
    expect(lst.head).toBe(null);
    expect(lst.length).toBe(0);

    expect(popWrapper).toThrowError("List is empty.")
  });
});

describe("shift", function () {
  it("throws an error when the list is empty", function () {
    let lst = new LinkedList([]);

    function shiftWrapper() {
      const firstVal = lst.shift();
    };

    expect(lst.head).toBeNull();
    expect(lst.tail).toBeNull();
    expect(shiftWrapper).toThrowError("List is empty.")

  });

  it("removes node at start and decrements length", function () {
    let lst = new LinkedList([5, 10, 15]);

    function shiftWrapper() {
      const firstVal = lst.shift();
    };

    // Check reverse traverse
    expect(lst.length).toBe(3);
    expect(lst.tail.val).toBe(15);
    expect(lst.tail.prev.val).toBe(10);
    expect(lst.tail.prev.prev.val).toBe(5);
    expect(lst.tail.prev.prev.prev).toBeNull();
    expect(lst.head.prev).toBeNull();

    expect(lst.shift()).toBe(5);
    expect(lst.length).toBe(2);
    expect(lst.head.val).toBe(10);
    expect(lst.head.next.val).toBe(15);
    expect(lst.tail.val).toBe(15);
    expect(lst.tail.prev.val).toBe(10);
    expect(lst.tail.prev.prev).toBeNull();

    expect(lst.shift()).toBe(10);
    expect(lst.length).toBe(1);
    expect(lst.head.val).toBe(15);
    expect(lst.tail.val).toBe(15);
    expect(lst.tail.prev).toBeNull();
    expect(lst.tail.next).toBeNull();
    expect(lst.head.prev).toBeNull();
    expect(lst.head.next).toBeNull();

    expect(lst.shift()).toBe(15);
    expect(lst.length).toBe(0);
    expect(lst.tail).toBe(null);
    expect(lst.head).toBe(null);

    expect(shiftWrapper).toThrowError("List is empty.")
  });
});

describe("getAt", function () {
  it("throws an error when the index is invalid", function () {
    let lst = new LinkedList([]);
    let idx = 0;
    function getAtWrapper() {
      const firstVal = lst.getAt(idx);
    };

    expect(getAtWrapper).toThrowError("List is empty.");
    idx = 1;
    lst.push(100);
    expect(lst.length).toBe(1);
    expect(lst.head.val).toBe(100);
    expect(getAtWrapper).toThrowError(`${idx} is an invalid index.`);
    idx = -1;
    expect(getAtWrapper).toThrowError(`${idx} is an invalid index.`);
  });
  it("gets val at index", function () {
    let lst = new LinkedList([5, 10]);

    expect(lst.getAt(0)).toBe(5);
    expect(lst.getAt(1)).toBe(10);
  });
});

describe("setAt", function () {
  it("sets val at index", function () {
    let lst = new LinkedList([5, 10]);

    expect(lst.setAt(0, 1));
    expect(lst.setAt(1, 2));
    expect(lst.head.val).toBe(1);
    expect(lst.head.next.val).toBe(2);
  });
});

describe("insertAt", function () {
  it("inserts node and adjusts nearby nodes", function () {
    let lst = new LinkedList([5, 10, 15, 20]);

    lst.insertAt(2, 12);
    expect(lst.length).toBe(5);
    expect(lst.head.val).toBe(5);
    expect(lst.head.next.val).toBe(10);
    expect(lst.head.next.next.val).toBe(12);
    expect(lst.head.next.next.next.val).toBe(15);
    expect(lst.head.next.next.next.next.val).toBe(20);

    lst.insertAt(5, 25);
    expect(lst.head.next.next.next.next.next.val).toBe(25);
    expect(lst.tail.val).toBe(25);

    // walk the list from tail to head
    expect(lst.tail.prev.val).toBe(20);
    expect(lst.tail.prev.prev.val).toBe(15);
    expect(lst.tail.prev.prev.prev.val).toBe(12);
    expect(lst.tail.prev.prev.prev.prev.val).toBe(10);
    expect(lst.tail.prev.prev.prev.prev.prev.val).toBe(5);

  });

  it("inserts into empty list", function () {
    let lst = new LinkedList();

    lst.insertAt(0, 5);
    expect(lst.length).toBe(1);
    expect(lst.head.val).toBe(5);
    expect(lst.tail.val).toBe(5);
  });
});

describe("removeAt", function () {
  it("throws an error when the index is invalid", function () {
    let lst = new LinkedList([]);
    let idx = 0;
    function removeAtWrapper() {
      const firstVal = lst.removeAt(idx);
    };

    expect(removeAtWrapper).toThrowError("List is empty.");
    idx = 1;
    lst.push(100);
    expect(lst.length).toBe(1);
    expect(lst.head.val).toBe(100);
    expect(removeAtWrapper).toThrowError(`${idx} is an invalid index.`);
    idx = -1;
    expect(removeAtWrapper).toThrowError(`${idx} is an invalid index.`);
  });

});

describe("removeAt", function () {
  it("removes from 1-item list", function () {
    let lst = new LinkedList(["a"]);

    lst.removeAt(0);
    expect(lst.length).toBe(0);
    expect(lst.head).toBe(null);
    expect(lst.tail).toBe(null);
  });

  it("removes the 1st item from a 3-item list", function () {
    let lst = new LinkedList(["a", "b", "c"]);
    expect(lst.length).toBe(3);
    expect(lst.head.val).toBe("a");
    expect(lst.head.next.val).toBe("b");
    expect(lst.head.next.next.val).toBe("c");
    expect(lst.tail.val).toBe("c");
    expect(lst.tail.prev.val).toBe("b");
    expect(lst.tail.prev.prev.val).toBe("a");
    expect(lst.tail.prev.prev).toBe(lst.head);

    expect(lst.removeAt(0)).toBe("a");
    expect(lst.length).toBe(2);
    expect(lst.head.val).toBe("b");
    expect(lst.head.next.val).toBe("c");
    expect(lst.tail.val).toBe("c");
    expect(lst.tail.prev.val).toBe("b");

    expect(lst.removeAt(1)).toBe("c");
    expect(lst.length).toBe(1);
    expect(lst.head.val).toBe("b");
    expect(lst.head.next).toBeNull();
    expect(lst.tail.val).toBe("b");
    expect(lst.tail.prev).toBeNull();

  });

  it("removes the middle item from a 3-item list", function () {
    let lst = new LinkedList(["a", "b", "c"]);
    expect(lst.length).toBe(3);
    expect(lst.head.val).toBe("a");
    expect(lst.head.next.val).toBe("b");
    expect(lst.head.next.next.val).toBe("c");
    expect(lst.tail.val).toBe("c");
    expect(lst.tail.prev.val).toBe("b");
    expect(lst.tail.prev.prev.val).toBe("a");
    expect(lst.tail.prev.prev).toBe(lst.head);

    expect(lst.removeAt(1)).toBe("b");
    expect(lst.length).toBe(2);
    expect(lst.head.val).toBe("a");
    expect(lst.head.next.val).toBe("c");
    expect(lst.tail.val).toBe("c");
    expect(lst.tail.prev.val).toBe("a");

  });

});

describe("average", function () {
  it("calculates the average of items in a list", function () {
    let lst = new LinkedList([2, 3, 1, 1, 7, 6, 9]);
    expect(lst.average()).toBeCloseTo(4.1429, 4);
  });

  it("returns 0 for empty lists", function () {
    let lst = new LinkedList();
    expect(lst.average()).toBe(0);
  });
});
