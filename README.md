# sb_47-04-12_LinkedListExercise
 
## Technology Stack
- **Front-end**: n/a
- **Back-end**: NodeJS script

## Assignment Details

Create and test 9 methods -- `push(val)`, `unshift(val)`, `pop()`, `shift()`, `getAt(idx)`,  `setAt(idx, val)`, `insertAt(idx, val)`, `removeAt(idx, val)`, and `average()` --  for the `LinkedList` class.

## Additional Details

**Enhancements**
- Right from the start, the `LinkedList` class was impletemed as a doubly-linked list. 
- `getAt(idx)`, `setAt(idx, val)`, `insertAt(idx, val)`, and `removeAt(idx, val)` all use a common method called `positionToIdx(idx)` which returns the node at the specified index. `positionToIdx(idx)` makes use of the `prev`ious links by checking the index and starting at `head` for indexes in the 'first half' and the list is traversed using `next` otherwise `tail` is the starting point and the list is traversed using `prev`.
- Methods are reused when possible. As an example, `insertAt(0, val)` -- inserting at the head of the list -- is an `unshift(val)`.

**Difficulties**
- Need to remember to add `"use strict";` at the top of code. 
- Some minor pointer setting issues and deficient testing -- for shift, only 2 items were on the list. Had the test included 3 items (it has since been updated), it would have shown that the prev pointer was incorrectly set to `null`. This error became an issue when `shift` was called from the `removeAt()` method which tested with 5 items in the list.
- Not entirely sure the node is removed from the list correctly. The `next` and `prev` for items in the list no longer point to the removed node, but the node, in some cases, is left dangling to the list because the removed node's `prev` and `next` are still pointing to nodes on the list. Is there a call to remove / deallocate the node or does JavaScript remove *eventually* remove it? And does non-null values in the `prev` and `next` keep it from getting deallocated?

