document.createElement() generates the list item and its specific children in memory.
It helps to configure their properties and dataset attributes for state management.
Children are appended to the list item, which is then attached to the cart container using the appendChild function.

Currency values are converted to integers, and updates are optimized by adding or subtracting the specific difference in cost to the global total rather than recalculating the entire cart.

A conditional check is implemented at the start of the function to verify that the product name is not empty. It also verifies that the price is a positive and valid number. If this validation fails, an alert is displayed, preventing an invalid element from being created.

Ensuring that the global total is updated correctly before the element is removed was challenging. The item's stored data price value is retrieved to subtract from the total first, and only then is the remove function called to delete the HTML element.