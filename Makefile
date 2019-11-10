install: build
	#npm install
	jlpm install
  
build: src/*.ts
	#npm run build
	jlpm run build
  
 jupyter-install: install
	jupyter labextension install .
	jupyter lab build

watch: jupyter-install
	jlpm run watch

run: jupyter-install
	jupyter lab --watch --no-browser

login:
	npm login

pack:
	npm pack

publish:
	npm publish