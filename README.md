# Class vs. Functional Context

# Issue

We are running off the assumption that creating context as class components prevents unneccessary re-renders. One of those unneccessary re-renders was assumed to be the case where a child component only uses one value from state and should not rerender when state values it does not use is changed.

This is not the case. Changing any part of the state in a context causes a re-render of any child component using that state, no matter whether the context component is created as a class or function.

This is an old issue with much discussion:

[Provide more ways to bail out inside Hooks #14110](https://github.com/facebook/react/issues/14110)

This issue comment provides three ways to work around it:

[Preventing rerenders with React.memo and useContext hook. #15156](https://github.com/facebook/react/issues/15156#issuecomment-474590693)

I've created a demo app that demonstrates how both forms of a Context component cause the same re-renders and also how the `useMemo` solution works for either one.

[CodeSandbox Demo](https://codesandbox.io/s/flamboyant-cdn-y1knl?file=/README.md)

<iframe src="https://codesandbox.io/embed/flamboyant-cdn-y1knl?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="flamboyant-cdn-y1knl"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

This solution isn't really feasible for RBS so the first option listed of splitting contexts that aren't related is probably the way to go. We do this, but this just affirms that.

## RBS Docs

[Providers must be written by making a Class component with state and then passing a reference to its state to the context object's (returned from react.CreateContext) provider component's value prop. This Provider component can then be put high in the tree for any child component to consume.](https://github.com/buildcom/react-build-store/tree/main/src/contexts#how-to-use-context)

[We have made an exception for using Class-based Components when writing React Context. In this case, we typically make a Provider component that passes a reference to its state to the Context's Provider. Using a Class-based Component guarantees us that we can have the same reference to state every change, which in turn prevents unnecessary re-renders of the context Provider's children.](https://github.com/buildcom/react-build-store/blob/main/docs/architecture/decisions/0021-usage-of-function-components.md#exceptions)

## React Docs

[Context.Provider](https://reactjs.org/docs/context.html#contextprovider)

> The Provider component accepts a value prop to be passed to consuming components that are descendants of this Provider. One Provider can be connected to many consumers. Providers can be nested to override values deeper within the tree.

> All consumers that are descendants of a Provider will re-render whenever the Provider’s value prop changes. The propagation from Provider to its descendant consumers (including .contextType and useContext) is not subject to the shouldComponentUpdate method, so the consumer is updated even when an ancestor component skips an update.

> Changes are determined by comparing the new and old values using the same algorithm as Object.is.
