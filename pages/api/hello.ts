// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../search.json";

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
}

const dataSource = db as Model[];
