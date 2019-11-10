
install:
  #npm install
  jlpm install
  
build: install
  #npm run build
  jlpm run build
  
 jupyter-install: install
  #jupyter labextension install
  jupyter labextension install .
  jupyter lab build

watch: install
  jlpm run watch

run: watch
  jupyter lab --watch
