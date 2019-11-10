//import { IInstanceTracker } from '@jupyterlab/apputils';

import { Token } from "@phosphor/coreutils";

import { Widget } from "@phosphor/widgets";

/**
 * An interface for a PrologRegistry.
 */
export interface IPrologRegistry extends PrologRegistry {}

/* tslint:disable */
/**
 * The PrologRegistry token.
 */
export const IPrologRegistry = new Token<PrologRegistry>(
  "jupyterlab-prolog:IPrologRegistry"
);
/* tslint:enable */

/**
 * A class that keeps track of the different kinds of widgets
 */
export class PrologRegistry {
  /**
   * Given a widget, find an IGenerator for it,
   * or undefined if none can be found.
   */
  findGeneratorForWidget(
    widget: Widget
  ): PrologRegistry.IGenerator | undefined {
    let generator: PrologRegistry.IGenerator | undefined;
    /* this._generators.forEach(gen => {
      if (gen.tracker.has(widget)) {
        // If isEnabled is present, check for it.
        if (gen.isEnabled && !gen.isEnabled(widget)) {
          return;
        }
        generator = gen;
      }
    }); */
    return generator;
  }

  /**
   * Add a new IGenerator to the registry.
   */
  addGenerator(generator: PrologRegistry.IGenerator): void {
    this._generators.push(generator);
  }

  private _generators: PrologRegistry.IGenerator[] = [];
}

/**
 * A namespace for PrologRegistry statics.
 */
export namespace PrologRegistry {
  /**
   * An interface for an object that knows how to generate a table-of-contents
   * for a type of widget.
   */

  export abstract class IGeneratorOptionsManager {}

  export interface IGenerator<W extends Widget = Widget> {
    /**
     * An instance tracker for the widget.
     */
    //tracker: IInstanceTracker<W>;

    /**
     * A function to test whether to generate a ToC for a widget.
     *
     * #### Notes
     * By default is assumed to be enabled if the widget
     * is hosted in `tracker`. However, the user may want to add
     * additional checks. For instance, this can be used to generate
     * a ToC for text files only if they have a given mimeType.
     */
    isEnabled?: (widget: W) => boolean;

    /**
     * Whether the document uses LaTeX typesetting.
     *
     * Defaults to `false`.
     */
    usesLatex?: boolean;

    /**
     * An object that manage user settings for the generator.
     *
     * Defaults to `undefined`.
     */
    options?: IGeneratorOptionsManager;

    /**
     * A function that generates JSX element for each heading
     *
     * If not given, the default renderer will be used, which renders the text
     */
    //itemRenderer?: (item: IHeading) => JSX.Element | null;

    /**
     * A function that generates a toolbar for the generator
     *
     * If not given, no toolbar will show up
     */
    toolbarGenerator?: () => any;

    /**
     * A function that takes the widget, and produces
     * a list of headings.
     */
    //generate(widget: W): IHeading[];
  }
}
