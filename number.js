class Node {
  constructor(name, start = false, end = false) {
    this.name = name;
    this.edges = {};
    this.start = start;
    this.end = end;
  }
  addEdge(state, to) {
    this.edges[state] = to;
  }

  getPossition(state) {
    return this.edges[state];
  }
}
class Automata {
  constructor() {
    this.nodes = [];
    this.deathNode = new Node("deathstate");
  }

  addNode(nodes) {
    this.nodes = [...nodes];
  }

  getEnd(startNode, str) {
    let node = startNode;
    for (let i = 0; i < str.length; i++) {
      node = node.getPossition(str[i]);
      if (!node) {
        break;
      }
    }
    return node ? node : this.deathNode;
  }
}

class NumberAutomata {
  constructor() {
    this.auto = new Automata();
    this.start = null;
    this.build();
  }

  build() {
    let q0 = new Node("q0", true);
    let q1 = new Node("q1", false, true);
    let q2 = new Node("q2", false, true);
    let q3 = new Node("q3", false, true);
    let q4 = new Node("q4", false, true);

    for (let i = 0; i < 10; i++) {
      q0.addEdge(String(i), q1);
      q1.addEdge(String(i), q1);
      q3.addEdge(String(i), q3);
    }
    q1.addEdge(".", q3);
    q1.addEdge(" ", q2);
    q3.addEdge(" ", q4);
    q2.addEdge(" ", q2);
    q4.addEdge(" ", q4);
    this.auto.addNode([q0, q1, q2, q3, q4]);
    this.start = q0;
  }
  test(str) {
    const node = this.auto.getEnd(this.start, str);
    const name = node.name;
    if (name == "deathstate") {
      return "erurr";
    } else if (name == "q1" || name == "q2") {
      return "رقم عادي";
    } else if (name == "q3" || name == "q4") {
      return "رقم عشري";
    }
  }
}

class Word {
  constructor() {
    this.auto = new Automata();
    this.start = null;
    this.build();
  }

  build() {
    let q0 = new Node("q0", true);
    let q1 = new Node("q1");
    let q2 = new Node("q2", false, true);
    let q3 = new Node("q3");
    let q4 = new Node("q4");
    let q5 = new Node("q5");
    let q6 = new Node("q6");
    let q7 = new Node("q7", false, true);

    q0.addEdge("i", q1);
    q1.addEdge("f", q2);
    q0.addEdge("w", q3);
    q3.addEdge("h", q4);
    q4.addEdge("i", q5);
    q5.addEdge("l", q6);
    q6.addEdge("e", q7);
    this.auto.addNode([q0, q1, q2, q3, q4, q5, q6, q7]);
    this.start = q0;
  }
  test(str) {
    const node = this.auto.getEnd(this.start, str);
    const name = node.name;
    if (name == "deathstate") {
      return "erurr";
    } else if (name == "q2") {
      return "If";
    } else if (name == "q7") {
      return "While";
    }
  }
}

const a = new NumberAutomata();
document.querySelector("button").addEventListener("click", function() {
  const val = document.querySelector("input").value;

  alert(val + " is " + a.test(val));
});
