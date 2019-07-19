const x = y;

if (x != null) {
  g(x);
}

const y = f();

if (y != null) {
  g(x);
}

const a = f(),
      b = g();

if (a != null && b != null) {
  h();
}

