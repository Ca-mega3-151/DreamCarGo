# Caf

## Overview

The `caf` function cancels an animation frame request.

## API

##### Parameters

- `timer` (number | null): The ID of the animation frame request as returned by `requestAnimationFrame`. If `null`, no action is taken.

##### Return Value

- void

## Usage

1. Cancelling an animation frame request:

```javascript
import { caf } from "path-to-caf";

const timer = requestAnimationFrame(myCallback);

// Later, cancel the animation frame request
caf(timer);
```

# Raf

## Overview

The `raf` function requests an animation frame and executes the provided callback function.

## Example

1. Requesting an animation frame:

```javascript
import { raf } from "path-to-raf";

// Define a callback function
function myCallback() {
  console.log("Animation frame requested");
}

// Request an animation frame
raf(myCallback);
```
