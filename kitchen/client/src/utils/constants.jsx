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

export const DEFAULT_CODE = `note The Midnight Snack Loop

cookbook
  WARNING: High calorie count.
  Proceed with caution.
cookbook

recipe get_snack_count(ingredient hunger_level) {
    taste(hunger_level > 8) {
        plate("Critical hunger detected!");
        finish(3);
    } retaste(hunger_level > 4) {
        plate("Moderate hunger detected.");
        finish(1);
    } serve {
        plate("Not hungry. Go to sleep.");
        finish(0);
    }
}

ingredient my_hunger = 9;
ingredient snacks_eaten = 0;

plate("Initiating midnight raid...");
rest;

ingredient items_found = get_snack_count(my_hunger);

simmer(items_found > 0) {
    plate("Munching on a snack...");
    items_found = items_found - 1;
    snacks_eaten = snacks_eaten + 1;
}

rest;
taste(snacks_eaten > 0) {
    plate("Belly full. Happy chef.");
} serve {
    plate("Mission failed. Sad chef.");
}

kitchen_closed(0);
`;
