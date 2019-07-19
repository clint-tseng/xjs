const xs = [1, 2, 3];
const ys = [{
  xs: [1, 2, 3]
}, {
  xs: [4, 5, 6]
}, {
  xs: [7, 8, 9]
}];
const z = {
  a: [1, 2],
  b: [3, 4],
  c: [5, 6]
};

const a = (() => {
  const _r = [],
        _l = xs.length;

  for (let _i = 0; _i < _l; _i++) {
    const x = xs[_i];

    _r.push(x * 2);
  }

  return _r;
})();

console.log('a', a);

const b = (() => {
  const _r2 = [],
        _l2 = xs.length;

  for (let idx = 0; idx < _l2; idx++) {
    const x = xs[idx];

    _r2.push(`${idx}: ${x}`);
  }

  return _r2;
})();

console.log('b', b);

const c = (() => {
  const _r3 = [],
        _l3 = xs.length;

  for (let _i2 = 0; _i2 < _l3; _i2++) {
    const x = xs[_i2];
    if (x > 1) _r3.push(x);
  }

  return _r3;
})();

console.log('c', c);

const d1 = (() => {
  const _r4 = [],
        _l4 = ys.length;

  for (let _i3 = 0; _i3 < _l4; _i3++) {
    const y = ys[_i3],
          _c = y.xs,
          _l5 = _c.length;

    for (let _i4 = 0; _i4 < _l5; _i4++) {
      const x = _c[_i4];

      _r4.push(x - 1);
    }
  }

  return _r4;
})();

console.log('d1', d1);

const d2 = (() => {
  const _r5 = [],
        _l6 = ys.length;

  for (let _i5 = 0; _i5 < _l6; _i5++) {
    const y = ys[_i5],
          _c2 = y.xs,
          _l7 = _c2.length;

    for (let _i6 = 0; _i6 < _l7; _i6++) {
      const x = _c2[_i6];
      if (x % 2) _r5.push(x - 1);
    }
  }

  return _r5;
})();

console.log('d2', d2);

const e1 = (() => {
  const _r7 = [],
        _l9 = ys.length;

  for (let _i8 = 0; _i8 < _l9; _i8++) {
    const y = ys[_i8];

    _r7.push((() => {
      const _r6 = [],
            _c3 = y.xs,
            _l8 = _c3.length;

      for (let _i7 = 0; _i7 < _l8; _i7++) {
        const x = _c3[_i7];

        _r6.push(x - 1);
      }

      return _r6;
    })());
  }

  return _r7;
})();

console.log('e1', e1);

const e2 = (() => {
  const _r9 = [],
        _l11 = ys.length;

  for (let _i10 = 0; _i10 < _l11; _i10++) {
    const {
      xs
    } = ys[_i10];

    _r9.push((() => {
      const _r8 = [],
            _l10 = xs.length;

      for (let _i9 = 0; _i9 < _l10; _i9++) {
        const x = xs[_i9];

        _r8.push(x - 1);
      }

      return _r8;
    })());
  }

  return _r9;
})();

console.log('e2', e2);

const f1 = (() => {
  const _r10 = [],
        _ks = Object.keys(z),
        _l12 = _ks.length;

  for (let _i11 = 0; _i11 < _l12; _i11++) {
    const v = z[_ks[_i11]];

    _r10.push(v[0] + v[1]);
  }

  return _r10;
})();

console.log('f1', f1);

const f2 = (() => {
  const _r11 = [],
        _ks2 = Object.keys(z),
        _l13 = _ks2.length;

  for (let _i12 = 0; _i12 < _l13; _i12++) {
    const k = _ks2[_i12];

    _r11.push(k);
  }

  return _r11;
})();

console.log('f2', f2);

const f3 = (() => {
  const _r12 = [],
        _ks3 = Object.keys(z),
        _l14 = _ks3.length;

  for (let _i13 = 0; _i13 < _l14; _i13++) {
    const k = _ks3[_i13],
          v = z[k];

    _r12.push(k + v);
  }

  return _r12;
})();

console.log('f3', f3);

const g1 = (() => {
  const _r13 = {},
        _ks4 = Object.keys(z),
        _l15 = _ks4.length;

  for (let _i14 = 0; _i14 < _l15; _i14++) {
    const k = _ks4[_i14],
          v = z[k];
    _r13[v[0]] = k;
  }

  return _r13;
})();

console.log('g1', g1);

const g2 = (() => {
  const _r14 = {},
        _ks5 = Object.keys(z),
        _l16 = _ks5.length;

  for (let _i15 = 0; _i15 < _l16; _i15++) {
    const k = _ks5[_i15];
    _r14[k] = k;
  }

  return _r14;
})();

console.log('g2', g2);

const g3 = (() => {
  const _r15 = {},
        _ks6 = Object.keys(z),
        _l17 = _ks6.length;

  for (let _i16 = 0; _i16 < _l17; _i16++) {
    const x = z[_ks6[_i16]];
    _r15.xyz = x;
  }

  return _r15;
})();

console.log('g3', g3);

const g4 = (() => {
  const _r16 = {},
        _l18 = xs.length;

  for (let _i17 = 0; _i17 < _l18; _i17++) {
    const x = xs[_i17];
    _r16[x] = x;
  }

  return _r16;
})(); // TODO: rm brackets


console.log('g4', g4);

const h = (() => {
  const _r17 = [],
        _l19 = xs.length;

  for (let _i18 = 0; _i18 < _l19; _i18++) {
    const x = xs[_i18];

    _r17.push(x);
  }

  return _r17;
})();

console.log('h', h);

const i = (() => {
  const _r18 = [],
        _l20 = ys.length;

  for (let _i19 = 0; _i19 < _l20; _i19++) {
    const {
      xs
    } = ys[_i19];

    _r18.push(xs[0]);
  }

  return _r18;
})();

console.log('i', i);

const j = (() => {
  const _r20 = [],
        _c4 = (() => {
    const _r19 = [],
          _l21 = xs.length;

    for (let _i20 = 0; _i20 < _l21; _i20++) {
      const x = xs[_i20];

      _r19.push(x * 2);
    }

    return _r19;
  })(),
        _l22 = _c4.length;

  for (let _i21 = 0; _i21 < _l22; _i21++) {
    const x = _c4[_i21];

    _r20.push(x * 2);
  }

  return _r20;
})();

console.log('j', j);

const noop = () => {};

const k1 = (() => {
  const _r21 = [],
        _l23 = xs.length;

  for (let _i22 = 0; _i22 < _l23; _i22++) {
    const i = _i22,
          x = xs[_i22];

    _r21.push(() => {
      console.log(i, x);
    });
  }

  return _r21;
})();

const k2 = (() => {
  const _r22 = [],
        _l24 = xs.length;

  for (let i = 0; i < _l24; i++) {
    const x = xs[i];

    _r22.push(noop(i, x));
  }

  return _r22;
})();

const k3 = (() => {
  const _r23 = [],
        _l25 = xs.length;

  for (let _i23 = 0; _i23 < _l25; _i23++) {
    const i = _i23,
          x = xs[_i23];

    _r23.push({
      method() {
        return i;
      }

    });
  }

  return _r23;
})();

