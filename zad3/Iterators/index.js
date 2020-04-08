// Type JavaScript here and click "Run Code" or press Ctrl + s
console.log('Hello, world!');

// CHALLENGE 1

function sumFunc(arr) {
  // YOUR CODE HERE
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

// Uncomment the lines below to test your work
// const array = [1, 2, 3, 4];
// console.log(sumFunc(array)); // -> should log 10

function returnIterator(arr) {
  // YOUR CODE HERE
  let i = 0;
  return function() {
    let elem = arr[i];
    i++;
    return elem;
  };
}

// Uncomment the lines below to test your work
// const array2 = ['a', 'b', 'c', 'd'];
// const myIterator = returnIterator(array2);
// console.log(myIterator()); // -> should log 'a'
// console.log(myIterator()); // -> should log 'b'
// console.log(myIterator()); // -> should log 'c'
// console.log(myIterator()); // -> should log 'd'



// CHALLENGE 2

function nextIterator(arr) {
  // YOUR CODE HERE
  let i = 0;
  return {
    next: function() {
      let elem = arr[i];
      i++;
      return elem;
    }
  };
}

// Uncomment the lines below to test your work
// const array3 = [1, 2, 3];
// const iteratorWithNext = nextIterator(array3);
// console.log(iteratorWithNext.next()); // -> should log 1
// console.log(iteratorWithNext.next()); // -> should log 2
// console.log(iteratorWithNext.next()); // -> should log 3



// CHALLENGE 3

function sumArray(arr) {
  // YOUR CODE HERE
  // use your nextIterator function
  let sum = 0;
  const it = nextIterator(arr);
  for (let i = 0; i < arr.length; i++) {
    sum += it.next();
  }
  return sum;
}

// Uncomment the lines below to test your work
// const array4 = [1, 2, 3, 4];
// console.log(sumArray(array4)); // -> should log 10



// CHALLENGE 4

function setIterator(set) {
  // YOUR CODE HERE
  let it = set.values();
  return {
    next: function() {
      return it.next().value;
    }
  };
}

// Uncomment the lines below to test your work
// const mySet = new Set('hey');
// const iterateSet = setIterator(mySet);
// console.log(iterateSet.next()); // -> should log 'h'
// console.log(iterateSet.next()); // -> should log 'e'
// console.log(iterateSet.next()); // -> should log 'y'



// CHALLENGE 5

function indexIterator(arr) {
  // YOUR CODE HERE
  let i = 0;
  return {
    next: function() {
      let elem = [i, arr[i]];
      i++;
      return elem;
    }
  };
}

// Uncomment the lines below to test your work
// const array5 = ['a', 'b', 'c', 'd'];
// const iteratorWithIndex = indexIterator(array5);
// console.log(iteratorWithIndex.next()); // -> should log [0, 'a']
// console.log(iteratorWithIndex.next()); // -> should log [1, 'b']
// console.log(iteratorWithIndex.next()); // -> should log [2, 'c']



// CHALLENGE 6

function Words(string) {
  this.str = string;
  return this.str.split(" ");
}

Words.prototype[Symbol.iterator] = function() {
  // YOUR CODE HERE
  let i = 0;
  return {
    next: function() {
      let elem = this[i];
      i++;
      return elem;
    }
  };
};

// Uncomment the lines below to test your work
// const helloWorld = new Words('Hello World');
// for (word of helloWorld) { console.log(word); } // -> should log 'Hello' and 'World'

// CHALLENGE 7

function valueAndPrevIndex(array){
    let i = 0;
    return {
        sentence: function() {
            i++;
            if (i === 1) {
                return "first element";
            }
            return `${array[i - 1]} was found after index ${i - 2}`;
        }
    };
}

const returnedSentence = valueAndPrevIndex([4,5,6])
console.log(returnedSentence.sentence());
console.log(returnedSentence.sentence());
console.log(returnedSentence.sentence());


//CHALLENGE 8

function* createConversation(string) {
    yield setInterval(function() {
        if (string == "english") {
          console.log("hello there");
        } else {
          console.log("gibberish");
        }
      }, 3000);

}

createConversation('english').next();



//CHALLENGE 9
function waitForVerb(noun) {
    const verb = "play";
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(noun + " " + verb), 3000);
    })
}

async function f(noun) {
    const data = await waitForVerb(noun);
  console.log(data);
}

f("dog");

