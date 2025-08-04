import { buildSchema, graphql } from 'graphql';

// Initial data
const stores = [
  {
    id: "fashion-square",
    name: "Fashion Square",
    location: "SCOTTSDALE, AZ",
    address: "7014 E Camelback Rd, STE #1448",
    status: "active",
    opening_date: "2023-05-15",
    image: "https://cdn.shopify.com/s/files/1/0752/2998/7029/files/store-fashion-square.webp",
    shopify_url: "https://your-store.myshopify.com/pages/fashion-square"
  },
  {
    id: "westfield-valley-fair",
    name: "Westfield Valley Fair",
    location: "SANTA CLARA, CA",
    address: "2855 Stevens Creek Blvd, STE #2144",
    status: "active",
    opening_date: "2023-03-20",
    image: "https://cdn.shopify.com/s/files/1/westfield-valley.jpg",
    shopify_url: "https://your-store.myshopify.com/pages/westfield-valley-fair"
  },
  {
    id: "pentagon-city-mall",
    name: "Pentagon City Mall",
    location: "ARLINGTON, VA",
    address: "1100 S Hayes St, STE #1052",
    status: "active",
    opening_date: "2023-07-10",
    image: "https://cdn.shopify.com/s/files/1/pentagon-city.jpg",
    shopify_url: "https://your-store.myshopify.com/pages/pentagon-city"
  },
  {
    id: "south-coast-plaza",
    name: "South Coast Plaza",
    location: "COSTA MESA, CA",
    address: "3333 Bristol St, STE #2068",
    status: "active",
    opening_date: "2023-02-14",
    image: "https://cdn.shopify.com/s/files/1/south-coast.jpg",
    shopify_url: "https://your-store.myshopify.com/pages/south-coast-plaza"
  },
  {
    id: "north-park-center",
    name: "NorthPark Center",
    location: "DALLAS, TX",
    address: "8687 N Central Expy, STE #1234",
    status: "active",
    opening_date: "2023-06-01",
    image: "https://cdn.shopify.com/s/files/1/northpark.jpg",
    shopify_url: "https://your-store.myshopify.com/pages/northpark-center"
  },
  {
    id: "tysons-corner",
    name: "Tysons Corner Center",
    location: "MCLEAN, VA",
    address: "1961 Chain Bridge Rd, STE #G230",
    status: "active",
    opening_date: "2023-04-18",
    image: "https://cdn.shopify.com/s/files/1/tysons.jpg",
    shopify_url: "https://your-store.myshopify.com/pages/tysons-corner"
  },
  {
    id: "century-city",
    name: "Westfield Century City",
    location: "LOS ANGELES, CA",
    address: "10250 Santa Monica Blvd, STE #1180",
    status: "active",
    opening_date: "2023-01-25",
    image: "https://cdn.shopify.com/s/files/1/century-city.jpg",
    shopify_url: "https://your-store.myshopify.com/pages/century-city"
  },
  {
    id: "lenox-square",
    name: "Lenox Square",
    location: "ATLANTA, GA",
    address: "3393 Peachtree Rd NE, STE #3126",
    status: "active",
    opening_date: "2023-08-12",
    image: "https://cdn.shopify.com/s/files/1/lenox.jpg",
    shopify_url: "https://your-store.myshopify.com/pages/lenox-square"
  },
  {
    id: "town-center-boca",
    name: "Town Center at Boca Raton",
    location: "BOCA RATON, FL",
    address: "6000 Glades Rd, STE #1156",
    status: "active",
    opening_date: "2023-03-08",
    image: "https://cdn.shopify.com/s/files/1/boca-raton.jpg",
    shopify_url: "https://your-store.myshopify.com/pages/town-center-boca"
  },
  {
    id: "highland-park-village",
    name: "Highland Park Village",
    location: "DALLAS, TX",
    address: "47 Highland Park Village, STE #15",
    status: "active",
    opening_date: "2023-05-22",
    image: "https://cdn.shopify.com/s/files/1/highland-park.jpg",
    shopify_url: "https://your-store.myshopify.com/pages/highland-park"
  },
  {
    id: "galleria-houston",
    name: "The Galleria",
    location: "HOUSTON, TX",
    address: "5085 Westheimer Rd, STE #2570",
    status: "active",
    opening_date: "2023-04-03",
    image: "https://cdn.shopify.com/s/files/1/galleria-houston.jpg",
    shopify_url: "https://your-store.myshopify.com/pages/galleria-houston"
  },
  {
    id: "aventura-mall",
    name: "Aventura Mall",
    location: "AVENTURA, FL",
    address: "19501 Biscayne Blvd, STE #1044",
    status: "active",
    opening_date: "2023-07-28",
    image: "https://cdn.shopify.com/s/files/1/aventura.jpg",
    shopify_url: "https://your-store.myshopify.com/pages/aventura-mall"
  },
  {
    id: "cherry-creek-mall",
    name: "Cherry Creek Shopping Center",
    location: "DENVER, CO",
    address: "3000 E 1st Ave, STE #368",
    status: "active",
    opening_date: "2023-06-15",
    image: "https://cdn.shopify.com/s/files/1/cherry-creek.jpg",
    shopify_url: "https://your-store.myshopify.com/pages/cherry-creek"
  },
  {
    id: "roosevelt-field",
    name: "Roosevelt Field",
    location: "GARDEN CITY, NY",
    address: "630 Old Country Rd, STE #1275",
    status: "active",
    opening_date: "2023-02-28",
    image: "https://cdn.shopify.com/s/files/1/roosevelt-field.jpg",
    shopify_url: "https://your-store.myshopify.com/pages/roosevelt-field"
  },
  {
    id: "king-of-prussia",
    name: "King of Prussia Mall",
    location: "KING OF PRUSSIA, PA",
    address: "160 N Gulph Rd, STE #2186",
    status: "active",
    opening_date: "2023-09-05",
    image: "https://cdn.shopify.com/s/files/1/king-prussia.jpg",
    shopify_url: "https://your-store.myshopify.com/pages/king-of-prussia"
  },
  {
    id: "water-tower-place",
    name: "Water Tower Place",
    location: "CHICAGO, IL",
    address: "835 N Michigan Ave, STE #2-124",
    status: "active",
    opening_date: "2023-01-12",
    image: "https://cdn.shopify.com/s/files/1/water-tower.jpg",
    shopify_url: "https://your-store.myshopify.com/pages/water-tower-place"
  },
  {
    id: "crossgates-mall",
    name: "Crossgates Mall",
    location: "ALBANY, NY",
    address: "1 Crossgates Mall Rd, STE #C204",
    status: "active",
    opening_date: "2023-10-20",
    image: "https://cdn.shopify.com/s/files/1/crossgates.jpg",
    shopify_url: "https://your-store.myshopify.com/pages/crossgates"
  },
  {
    id: "bellevue-square",
    name: "Bellevue Square",
    location: "BELLEVUE, WA",
    address: "575 Bellevue Square, STE #176",
    status: "active",
    opening_date: "2023-08-07",
    image: "https://cdn.shopify.com/s/files/1/bellevue.jpg",
    shopify_url: "https://your-store.myshopify.com/pages/bellevue-square"
  },
  {
    id: "mall-of-america",
    name: "Mall of America",
    location: "BLOOMINGTON, MN",
    address: "60 E Broadway, STE #186",
    status: "active",
    opening_date: "2023-11-14",
    image: "https://cdn.shopify.com/s/files/1/mall-america.jpg",
    shopify_url: "https://your-store.myshopify.com/pages/mall-of-america"
  },
  {
    id: "palisades-center",
    name: "Palisades Center",
    location: "WEST NYACK, NY",
    address: "1000 Palisades Center Dr, STE #U238",
    status: "active",
    opening_date: "2023-04-30",
    image: "https://cdn.shopify.com/s/files/1/palisades.jpg",
    shopify_url: "https://your-store.myshopify.com/pages/palisades-center"
  },
  {
    id: "fashion-island",
    name: "Fashion Island",
    location: "NEWPORT BEACH, CA",
    address: "1145 Newport Center Dr, STE #150",
    status: "active",
    opening_date: "2023-12-03",
    image: "https://cdn.shopify.com/s/files/1/fashion-island.jpg",
    shopify_url: "https://your-store.myshopify.com/pages/fashion-island"
  },
  {
    id: "scottsdale-quarter",
    name: "Scottsdale Quarter",
    location: "SCOTTSDALE, AZ",
    address: "15279 N Scottsdale Rd, STE #C5",
    status: "active",
    opening_date: "2023-09-18",
    image: "https://cdn.shopify.com/s/files/1/scottsdale-quarter.jpg",
    shopify_url: "https://your-store.myshopify.com/pages/scottsdale-quarter"
  },
  {
    id: "summit-sierra",
    name: "The Summit at Sierra",
    location: "RENO, NV",
    address: "13925 S Virginia St, STE #395",
    status: "active",
    opening_date: "2023-06-25",
    image: "https://cdn.shopify.com/s/files/1/summit-sierra.jpg",
    shopify_url: "https://your-store.myshopify.com/pages/summit-sierra"
  },
  {
    id: "woodfield-mall",
    name: "Woodfield Mall",
    location: "SCHAUMBURG, IL",
    address: "5 Woodfield Mall, STE #H235",
    status: "active",
    opening_date: "2023-07-04",
    image: "https://cdn.shopify.com/s/files/1/woodfield.jpg",
    shopify_url: "https://your-store.myshopify.com/pages/woodfield-mall"
  },
  {
    id: "legacy-west",
    name: "Legacy West",
    location: "PLANO, TX",
    address: "7201 Bishop Rd, STE #B214",
    status: "active",
    opening_date: "2023-05-09",
    image: "https://cdn.shopify.com/s/files/1/legacy-west.jpg",
    shopify_url: "https://your-store.myshopify.com/pages/legacy-west"
  },
  {
    id: "maine-mall",
    name: "Maine Mall",
    location: "SOUTH PORTLAND, ME",
    address: "364 Maine Mall Rd, STE #316",
    status: "temporarily_closed",
    opening_date: "2023-03-15",
    image: "https://cdn.shopify.com/s/files/1/maine-mall.jpg",
    shopify_url: "https://your-store.myshopify.com/pages/maine-mall"
  },
  {
    id: "partridge-creek",
    name: "Partridge Creek",
    location: "CLINTON TOWNSHIP, MI",
    address: "17420 Hall Rd, STE #132",
    status: "active",
    opening_date: "2023-10-08",
    image: "https://cdn.shopify.com/s/files/1/partridge-creek.jpg",
    shopify_url: "https://your-store.myshopify.com/pages/partridge-creek"
  },
  {
    id: "promenade-temecula",
    name: "The Promenade Temecula",
    location: "TEMECULA, CA",
    address: "40820 Winchester Rd, STE #2630",
    status: "active",
    opening_date: "2023-08-21",
    image: "https://cdn.shopify.com/s/files/1/promenade-temecula.jpg",
    shopify_url: "https://your-store.myshopify.com/pages/promenade-temecula"
  },
  {
    id: "town-square-vegas",
    name: "Town Square Las Vegas",
    location: "LAS VEGAS, NV",
    address: "6605 Las Vegas Blvd S, STE #201",
    status: "active",
    opening_date: "2023-11-27",
    image: "https://cdn.shopify.com/s/files/1/town-square-vegas.jpg",
    shopify_url: "https://your-store.myshopify.com/pages/town-square-vegas"
  },
  {
    id: "natick-collection",
    name: "Natick Collection",
    location: "NATICK, MA",
    address: "1245 Worcester St, STE #2096",
    status: "active",
    opening_date: "2023-04-12",
    image: "https://cdn.shopify.com/s/files/1/natick.jpg",
    shopify_url: "https://your-store.myshopify.com/pages/natick-collection"
  },
  {
    id: "easton-town-center",
    name: "Easton Town Center",
    location: "COLUMBUS, OH",
    address: "160 Easton Town Center, STE #255",
    status: "active",
    opening_date: "2023-09-12",
    image: "https://cdn.shopify.com/s/files/1/easton.jpg",
    shopify_url: "https://your-store.myshopify.com/pages/easton-town-center"
  },
  {
    id: "polaris-fashion",
    name: "Polaris Fashion Place",
    location: "COLUMBUS, OH",
    address: "1500 Polaris Pkwy, STE #2062",
    status: "active",
    opening_date: "2023-02-07",
    image: "https://cdn.shopify.com/s/files/1/polaris.jpg",
    shopify_url: "https://your-store.myshopify.com/pages/polaris-fashion"
  },
  {
    id: "valley-view-center",
    name: "Valley View Center",
    location: "DALLAS, TX",
    address: "13331 Preston Rd, STE #566",
    status: "temporarily_closed",
    opening_date: "2023-01-30",
    image: "https://cdn.shopify.com/s/files/1/valley-view.jpg",
    shopify_url: "https://your-store.myshopify.com/pages/valley-view-center"
  },
  {
    id: "southdale-center",
    name: "Southdale Center",
    location: "EDINA, MN",
    address: "66 Southdale Center, STE #1144",
    status: "active",
    opening_date: "2023-06-08",
    image: "https://cdn.shopify.com/s/files/1/southdale.jpg",
    shopify_url: "https://your-store.myshopify.com/pages/southdale-center"
  },
  {
    id: "west-town-mall",
    name: "West Town Mall",
    location: "KNOXVILLE, TN",
    address: "7600 Kingston Pike, STE #E208",
    status: "active",
    opening_date: "2023-12-15",
    image: "https://cdn.shopify.com/s/files/1/west-town.jpg",
    shopify_url: "https://your-store.myshopify.com/pages/west-town-mall"
  },
  {
    id: "cool-springs-galleria",
    name: "CoolSprings Galleria",
    location: "FRANKLIN, TN",
    address: "1800 Galleria Blvd, STE #2134",
    status: "active",
    opening_date: "2023-10-31",
    image: "https://cdn.shopify.com/s/files/1/coolsprings.jpg",
    shopify_url: "https://your-store.myshopify.com/pages/coolsprings-galleria"
  },
  {
    id: "brook-stone-center",
    name: "Brookstone Center",
    location: "COLUMBUS, GA",
    address: "3131 Manchester Expy, STE #15",
    status: "coming_soon",
    opening_date: "2024-02-14",
    image: "https://cdn.shopify.com/s/files/1/brookstone.jpg",
    shopify_url: "https://your-store.myshopify.com/pages/brookstone-center"
  },
  {
    id: "gateway-center",
    name: "Gateway Center",
    location: "BROOKLYN, NY",
    address: "9200 4th Ave, STE #FC14",
    status: "active",
    opening_date: "2023-07-19",
    image: "https://cdn.shopify.com/s/files/1/gateway.jpg",
    shopify_url: "https://your-store.myshopify.com/pages/gateway-center"
  },
  {
    id: "marketplace-mall",
    name: "Marketplace Mall",
    location: "ROCHESTER, NY",
    address: "1 Miracle Mile Dr, STE #820",
    status: "active",
    opening_date: "2023-05-17",
    image: "https://cdn.shopify.com/s/files/1/marketplace.jpg",
    shopify_url: "https://your-store.myshopify.com/pages/marketplace-mall"
  },
  {
    id: "destiny-usa",
    name: "Destiny USA",
    location: "SYRACUSE, NY",
    address: "9090 Destiny USA Dr, STE #201",
    status: "active",
    opening_date: "2023-11-08",
    image: "https://cdn.shopify.com/s/files/1/destiny.jpg",
    shopify_url: "https://your-store.myshopify.com/pages/destiny-usa"
  }
];

// Define schema
const schema = buildSchema(`
  type Store {
    id: ID!
    name: String!
    location: String!
    address: String!
    status: String!
    opening_date: String!
    image: String!
    shopify_url: String
  }

  input CreateStoreInput {
    id: ID!
    name: String!
    location: String!
    address: String!
    status: String!
    opening_date: String!
    image: String!
    shopify_url: String
  }

  type Query {
    stores(status: String): [Store]
    store(id: ID!): Store
  }

  type Mutation {
    createStore(input: CreateStoreInput!): Store
  }
`);

// Define resolvers
const rootValue = {
  stores: ({ status }) => status ? stores.filter(s => s.status === status) : stores,
  store: ({ id }) => stores.find(s => s.id === id),
  createStore: ({ input }) => {
    const exists = stores.find(s => s.id === input.id);
    if (exists) {
      throw new Error(`Store with ID "${input.id}" already exists.`);
    }
    stores.push(input);
    return input;
  }
};

// Define handler
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { query, variables } = req.body;

    if (!query) {
      res.status(400).json({ error: 'Query is required' });
      return;
    }

    const result = await graphql({
      schema,
      source: query,
      rootValue,
      variableValues: variables,
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('GraphQL Error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
}
