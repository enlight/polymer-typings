declare module polymer {
  /** Used to define a property on a Polymer element. */
  interface IProperty<T> {
    /** Constructor, one of `Boolean`, `Date`, `Number`, `String`, `Array`, or `Object`. */
    type: any;
    /**
     * Provides a default value for an element's property.
     *
     * This value is set on the element's prototype which means that it will be shared by all
     * instances of a particular element type. If this value is a function then Polymer will call
     * it for each element instance and set the corresponding property's default value to the
     * value returned by the function.
     */
    value?: T | {(): T};
    reflectToAttribute?: boolean;
    readOnly?: boolean;
    notify?: boolean;
    computed?: string;
    observer?: string;
  }

  /** Used to define a Polymer behavior mixin. */
  interface IBehavior {
    properties?: any;
    observers?: string[];
    listeners?: any;
    hostAttributes?: any;
    behaviors?: any[];

    // Element Lifecycle
    // These callbacks are called on the base prototype first, and then on each behavior in the
    // element's behaviors array (in ascending order).

    /**
     * Called after all elements have been configured, but propagates bottom-up.
     * This element's children are ready, but parents are not.
     *
     * This callback can modify the DOM if needed.
     */
    ready?: () => void;
    /**
     * Called after the element and its parents have been inserted into a document.
     *
     * This callback can perform any work related to the element's visual state or active behavior
     * (measuring sizes, beginning animations, loading resources, etc).
     */
    attached?: () => void;
    /**
     * Called after the element has been removed from a document.
     *
     * This callback should clean up whatever was done in [[attached]].
     */
    detached?: () => void;
  }

  /** Used to define a Polymer element prototype. */
  interface IElement extends IBehavior {
    is: string;
  }

  interface Base extends HTMLElement {}
}

declare var Polymer: {
  /**
   * Creates an element constructor and registers it with the document.
   *
   * @param <T> Type of element the constructor should create.
   * @returns Constructor that can be invoked to create a new element instance.
   */
  <T>(elementDefinition: polymer.IElement): T;
  /**
   * Creates an element constructor but doesn't register it with the document.
   * Use `document.registerElement` to register the new element constructor.
   *
   * @param <T> Type of element the constructor should create.
   * @returns Constructor that can be invoked to create a new element instance.
   */
  Class<T>(elementDefinition: polymer.IElement): T;

  Base: polymer.Base;
}
