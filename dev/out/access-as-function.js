const f = objs => {
  objs.map(_x => _x.x);
  objs.map(_ref => _ref.x + 1);
  objs.map(_x$y => _x$y.x().y(_z => _z.z));
  g(x, _ref2 => _ref2.length + 1, y);

  (_map => _map.map(g))(objs);

  (_map2 => _map2.map(_ref3 => _ref3.length + 1))(objs);

  objs.map(_ref4 => {
    var _ref4$length;

    return _ref4$length = _ref4.length, g(_ref4$length);
  });
};

const g = _map3 => _map3.map(_x2 => _x2.x);

