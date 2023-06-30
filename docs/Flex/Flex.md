# Flex

The `Flex` component is a div providing the CSS flex. It allows you to adjust the properties of the flex via the props without changing the SCSS directly.

```tsx
import Flex from '@vieolo/vieolo-ui/Flex';

function Example() {
    return <Flex direction="column" justifyContent="center">
        <Child />
        <Child />
        <Child />
    </Flex>
}
```

## Properties

- `direction`: options for CSS `flex-direction`
- `justifyContent`: options for CSS `justify-content`
- `alignItems`: options for CSS `align-items` 
- `wrap`: options for CSS `flex-wrap`

- `rowGap`: providing a value for CSS `row-gap` which inserts a gap between rows. The values are based on VUI's `base-unit` and options are `none`, `half`, `one`, and `two`
- `columnGap`: providing a value for CSS `column-gap` which inserts a gap between columns. The values are based on VUI's `base-unit` and options are `none`, `half`, `one`, and `two`


## Responsiveness

If you want to change the properties of the `Flex` for different screen sizes, you can use the `lg`, `md`, and `sm` props.

All the props outside these three are applied to all screen sizes. But every property that you describe for sizes, will be applied for that screen size and smaller screens.

For example, providing a property for `md` will change the property for `md` and `sm` screen.

The size breakpoint use these variables under the hood:

- `lgBreakPoint`: `$laptop13BreakPoint`
- `mdBreakPoint`: `$tablet10LandscapeBreakPoint`
- `smBreakPoint`: `$mobileBreakPoint`

You can override these variables in your project.