import { PROLOG_MIME_TYPE, PROLOG_EXTENSION, PROLOG_NAME } from "./common";

import {
  ILabShell,
  ILayoutRestorer,
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from "@jupyterlab/application";

import { IDocumentManager } from "@jupyterlab/docmanager";

import { IEditorTracker } from "@jupyterlab/fileeditor";

import { IMarkdownViewerTracker } from "@jupyterlab/markdownviewer";

import { INotebookTracker } from "@jupyterlab/notebook";

import { IRenderMimeRegistry } from "@jupyterlab/rendermime";

/* import { TableOfContents } from './toc';

import {
  createLatexGenerator,
  createNotebookGenerator,
  createMarkdownGenerator,
  createRenderedMarkdownGenerator
} from './generators'; */

import { IPrologRegistry, PrologRegistry } from "./registry";

// import '../style/index.css';

/**
 * Initialization data for the jupyterlab-prolog extension.
 */
const extension: JupyterFrontEndPlugin<IPrologRegistry> = {
  id: "jupyterlab-prolog",
  autoStart: true,
  provides: IPrologRegistry,
  requires: [
    IDocumentManager,
    IEditorTracker
    //ILabShell,
    //ILayoutRestorer,
    //IMarkdownViewerTracker,
    //INotebookTracker,
    //IRenderMimeRegistry
  ],
  activate: activateProlog
};

/**
 * Activate the extension.
 */
function activateProlog(
  app: JupyterFrontEnd,
  docmanager: IDocumentManager,
  editorTracker: IEditorTracker,
  labShell: ILabShell,
  restorer: ILayoutRestorer,
  markdownViewerTracker: IMarkdownViewerTracker,
  notebookTracker: INotebookTracker,
  rendermime: IRenderMimeRegistry
): IPrologRegistry {
  // add the prolog file type
  app.docRegistry.addFileType({
    name: PROLOG_NAME,
    displayName: "Prolog File",
    extensions: [PROLOG_EXTENSION],
    mimeTypes: [PROLOG_MIME_TYPE]
    //iconClass: "jp-MaterialIcon prolog_icon"
  });

  // const prolog = new Prolog({ docmanager, rendermime });
  const registry = new PrologRegistry();

  // Do nothing for now
  /*
  // Create the ToC widget.

  // Create the ToC registry.
  

  // Add the ToC to the left area.
  toc.title.iconClass = 'jp-TableOfContents-icon jp-SideBar-tabIcon';
  toc.title.caption = 'Table of Contents';
  toc.id = 'table-of-contents';
  labShell.add(toc, 'left', { rank: 700 });

  // Add the ToC widget to the application restorer.
  restorer.add(toc, 'juputerlab-toc');

  // Create a notebook TableOfContentsRegistry.IGenerator
  const notebookGenerator = createNotebookGenerator(
    notebookTracker,
    rendermime.sanitizer,
    toc
  );
  registry.addGenerator(notebookGenerator);

  // Create an markdown editor TableOfContentsRegistry.IGenerator
  const markdownGenerator = createMarkdownGenerator(
    editorTracker,
    toc,
    rendermime.sanitizer
  );
  registry.addGenerator(markdownGenerator);

  // Create an rendered markdown editor TableOfContentsRegistry.IGenerator
  const renderedMarkdownGenerator = createRenderedMarkdownGenerator(
    markdownViewerTracker,
    rendermime.sanitizer,
    toc
  );
  registry.addGenerator(renderedMarkdownGenerator);

  // Create a latex editor TableOfContentsRegistry.IGenerator
  const latexGenerator = createLatexGenerator(editorTracker);
  registry.addGenerator(latexGenerator);

  // Change the ToC when the active widget changes.
  labShell.currentChanged.connect(() => {
    let widget = app.shell.currentWidget;
    if (!widget) {
      return;
    }
    let generator = registry.findGeneratorForWidget(widget);
    if (!generator) {
      // If the previously used widget is still available, stick with it.
      // Otherwise, set the current TOC widget to null.
      if (toc.current && toc.current.widget.isDisposed) {
        toc.current = null;
      }
      return;
    }
    toc.current = { widget, generator };
  });

  */

  console.log("JupyterLab extension jupyter-prolog is activated!");
  return registry;
}

export default extension;
