import {
  Utensils,
  HelpCircle,
  ArrowRight,
  Flame,
  Terminal,
  Code2,
  MessageSquare,
} from "lucide-react";

export const CHEAT_SHEET = [
  {
    cmd: "ingredient",
    desc: "Declare a number variable instance.",
    ex: "ingredient x = 10;",
    icon: <Utensils size={18} />,
  },
  {
    cmd: "taste",
    desc: "Start a conditional block (if).",
    ex: "taste(x > 5) { ... }",
    icon: <HelpCircle size={18} />,
  },
  {
    cmd: "retaste",
    desc: "Else-if condition.",
    ex: "retaste(x == 5) { ... }",
    icon: <HelpCircle size={18} />,
  },
  {
    cmd: "serve",
    desc: "Else block (time to move on).",
    ex: "serve { ... }",
    icon: <ArrowRight size={18} />,
  },
  {
    cmd: "simmer",
    desc: "While loop (keep waiting until condition fails).",
    ex: "simmer(x > 0) { ... }",
    icon: <Flame size={18} />,
  },
  {
    cmd: "plate",
    desc: "Print something to the output.",
    ex: 'plate("hello");',
    icon: <Terminal size={18} />,
  },
  {
    cmd: "rest",
    desc: "Print a new line (take a breath).",
    ex: "rest;",
    icon: <Terminal size={18} />,
  },
  {
    cmd: "kitchen_closed",
    desc: "Exit program 0 / Return value in func.",
    ex: "kitchen_closed(0);",
    icon: <Flame size={18} />,
  },
  {
    cmd: "finish",
    desc: "Return value in func.",
    ex: "finish(0);",
    icon: <ArrowRight size={18} />,
  },
  {
    cmd: "recipe",
    desc: "Define function.",
    ex: "recipe add(ingredient a) { finish(a+1); }",
    icon: <Code2 size={18} />,
  },
  {
    cmd: "note",
    desc: "Single line comment (shhh).",
    ex: "note hidden text",
    icon: <MessageSquare size={18} />,
  },
  {
    cmd: "cookbook",
    desc: "Multi-line comment block.",
    ex: "cookbook ... cookbook",
    icon: <MessageSquare size={18} />,
  },
];

export const DEFAULT_CODE = `note Relationship Viability Calculator

recipe calculate_viability(ingredient texts_received, ingredient texts_sent) {
    note If you send more than you receive... oh no.
    taste(texts_sent > texts_received * 2) {
        rest;
        plate("Stage 5 Clinger Alert.");
        kitchen_closed(0);
    }
    
    ingredient ratio = texts_received * 10 / texts_sent;
    finish(ratio);
}

ingredient my_texts = 50;
ingredient her_texts = 2;

plate("Calculating viability...");
rest;

ingredient score = calculate_viability(her_texts, my_texts);

taste(score < 5) {
   plate("Viability Score: Low.");
   rest;
   plate("It is not you, it is... actually, it is you.");
} serve {
   plate("Viability Score: Good.");
   plate("Plan the wedding.");
}

kitchen_closed(0);
`;
