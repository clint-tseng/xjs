default: diff

XJS = $(shell find src -name "*.xjs" -type f | sort)
OUT = $(XJS:src/%.xjs=out/%.js)

out/%.js: src/%.xjs
	cat $< | node babel.js --no-babelrc --presets=@xjs > $@

commit: clean $(OUT)

clean:
	rm -f out/*.js

