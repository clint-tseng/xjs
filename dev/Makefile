XJS = $(shell find src -name "*.xjs" -type f | sort)
OUT = $(XJS:src/%.xjs=out/%.js)
DIFF = $(XJS:src/%.xjs=out/%.diff)

.PHONY: link commit diff clean
default: diff

node_modules/@xjs/babel-preset:
	mkdir -p node_modules/@xjs
	cd node_modules/@xjs; ln -s ../../../compiler/packages/xjs-babel-preset babel-preset

link: node_modules/@xjs/babel-preset

out/%.js: src/%.xjs
	node babel.js $< --presets=@xjs > $@

commit: clean $(OUT)

out/%.diff: src/%.xjs out/%.js
	node babel.js $< --presets=@xjs | diff -u $(patsubst %.diff,%.js,$@) -

diff: $(DIFF)

clean:
	rm -f out/*.js

