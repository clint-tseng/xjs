default: diff

XJS = $(shell find src -name "*.xjs" -type f | sort)
OUT = $(XJS:src/%.xjs=out/%.js)

node_modules/@xjs/babel-preset:
	mkdir -p node_modules/@xjs
	cd node_modules/@xjs; ln -s ../../../compiler/packages/xjs-babel-preset babel-preset

link: node_modules/@xjs/babel-preset

out/%.js: src/%.xjs
	cat $< | node babel.js --no-babelrc --presets=@xjs > $@

commit: clean $(OUT)

clean:
	rm -f out/*.js

