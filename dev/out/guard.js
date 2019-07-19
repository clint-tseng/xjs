var _ref, _;

const f = async obj => {
  const a = obj.x;
  if (a == null) return;
  const b = obj.x,
        c = obj.y;
  if (b == null || c == null) return;
  const {
    e,
    f
  } = obj;
  if (e == null || f == null) return; //guard const { e, ...es } = obj;             // TODO: no worky

  if (obj == null) return;
  ; // TODO: works but extra ; artifact

  if ((await x) == null) return;
  ;
  const x = obj.x;
  if (x == null) return 42;
  const y = obj.x;

  if (y == null) {
    panic();
    return;
  }

  const z = obj.x;
  if (z == null) throw new Error('no x!');

  for (const obj of objs) {
    const {
      m
    } = obj;
    if (m == null) continue;
    const {
      n
    } = obj;
    if (n == null) break;
  }

  return x * 16;
};

_ref = (_ = 23, f(_)), console.log(_ref); //{ x: 2 } |> f |> console.log;

