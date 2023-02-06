Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages./


# Task
## We need to implement search engine
Search "engine" requirements:

+ Search data source `search.json` should be persisted, and should not be re-downloaded on each app load (for FE implementaion only).
+ Each search request should be cached in order to prevent unnecessary search function invocation
+ Minimum string length to initiate search should be 2 symbols
+ Fields used to search: type, name (Model defined below)
+ Results prioritization
  + Market
  + Growing price: `lastTradedPrevious` closer to all time high price `high`
  + Type


### Display options (React):
+ For the search we should use just input field, no buttons or additional actions \
+ For displaying search result show a list where each list item looks like below:\

// ######################## \
// # item name | market | price # \
// ########################

+ We should show all results from the API, and manage performance on the FE side.

Item name: `${name}_${type}`\
Price: we should show `lastTraded * lotSize`, and it should be colored in:\
red - if `price` < `lastTradedPrevious`,\
grey - if price are equal\
green - if `price` > `lastTradedPrevious`

## Model
``` ts
type Market = "US" | "CH" | "EU" | "IN";
type ItemType = "PRIVATE" | "OFFCHAIN" | "ONCHAIN";

interface Model {
  id: number;
  i: {
    type: ItemType;
    price: {
      high: number;
      low: number;
      lastTradedPrevious: number;
      lastTraded: number;
    };
    lotSize: "10" | "100" | "1";
    currency: string;
    name: string;
  };
  market: Market;
};

```

## Priority
``` js
const marketPriority: Record<number, Market> = {
  "US": 1,
  "CH": 2,
  "EU": 3,
  "IN": 4,
};

const typePriority: Record<number, ItemType> = {
  "ONCHAIN": 1,
  "OFFCHAIN": 2,
  "PRIVATE": 3,
};
```