# Overview

Custom React hook to manage listing data, combining initial loader data and fetcher data, and providing a utility to check if data is being fetched.

# Options

| Option                  | Type                                                             | Description                                                                  |
| ----------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| loaderData              | `SimpleListingResponse<T> \| undefined`                          | Data loaded initially, typically from server-side rendering or initial fetch |
| fetcherData             | `{ data: SimpleListingResponse<T> \| undefined, state: string }` | Data fetched asynchronously, usually in response to client-side actions      |
| getNearestPageAvailable | `(page: number) => void`                                         | Function to get the nearest available page given a specific page number      |

# Usage

```jsx
import { useListingData } from "...";

export default function ListingComponent() {
  const { loaderData, fetcherData } = useLoaderData(); // Example of obtaining loader and fetcher data
  const getNearestPageAvailable = (page) => {
    // Your implementation to get nearest page
  };

  const { data, isFetchingList } = useListingData({
    loaderData,
    fetcherData,
    getNearestPageAvailable,
  });

  return (
    <div>
      {isFetchingList ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```
