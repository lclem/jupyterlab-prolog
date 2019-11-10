
install:
  npm install
  
build: install
  npm run build
  
 jupyter-install: install
  jupyter labextension install
  jupyter lab build
