# polymer-typings
These TypeScript type definitions for Polymer 1.0 are still a work in progress
and are subject to change. I'm still figuring out the best way to use Polymer
and TypeScript together.

Usage
=====
```TypeScript
// my-element.ts

interface IAuthorProperty {
  firstName: string;
  lastName: string;
}

// This is the base behavior of the element, it could've been defined
// as part of the prototype we pass to Polymer() instead of separating it
// out into a behavior like this but then TypeScript wouldn't type check or
// auto-complete much.
class MyElement implements polymer.IBehavior {
  isAwesome: boolean;
  author: IAuthorProperty;

  getAuthorFullName(): string {
    return this.author.firstName + ' ' + this.author.lastName;
  }

  ready(): void {
    console.log('MyElement is ready!');
    console.log('Author: ' + this.getAuthorFullName());
    if (this.isAwesome) {
      console.log('^ is awesome!');
    }
  }

  attached(): void {
    console.log("MyElement has been attached!");
  }

  detached(): void {
    console.log("MyElement has been detached!");
  }
}

Polymer({
  is: 'my-element',
  behaviors: [ MyElement.prototype ],
  properties: {
    isAwesome: Boolean,

    // Note the cast to polymer.IProperty<IAuthorProperty> is entirely optional,
    // but it's the only way to get type checking and auto-completion for the
    // property definition.
    author: <polymer.IProperty<IAuthorProperty>>{
      type: Object,
      value: () => {
        return {
          firstName: 'John',
          lastName: 'Smith'
        };
      }
    }
  }
});
```

```html
<!-- my-element.html -->

<link rel="import" href="../polymer/polymer.html">

<dom-module id="my-element">

  <template>
    <h2>my-element</h2>
    <content></content>
  </template>

</dom-module>

<script src="./my-element.js"></script>

```

```html
<!-- demo.html -->
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes">
    <title>my-element Demo</title>
    <script src="../../webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="../my-element.html">
  </head>
  <body>
    <my-element author='{"firstName": "Bob", "lastName": "Johnson"}' is-awesome>
      <h2>Bob was here.</h2>
    </my-element>
  </body>
</html>
```
