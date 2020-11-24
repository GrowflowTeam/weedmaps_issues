import axios from "axios";
import {
  weedmapsAccessToken,
  orgID,
  catalogID,
  defaultPageSize,
  totalNumberOfProductsExpected,
  testIterations,
  totalNumberOfPages,
} from "../config";

const createGetOptions = ({
  pageNumber = 1,
  pageSize = defaultPageSize,
} = {}) => ({
  method: "GET",
  url: "https://api-g.weedmaps.com/catalog/v1/products/",
  params: {
    "scope_by[organization_id]": orgID,
    "scope_by[catalog_id]": catalogID,
    "filter[is_master]": "false",
    "filter[discontinued]": "false",
    "page[size]": pageSize,
    "page[page]": pageNumber,
    include: "product_images",
  },
  headers: {
    authorization: `Bearer ${weedmapsAccessToken}`,
    accept: "application/vnd.api+json",
    "user-agent": "growflow",
  },
});
const fetchProducts = ({ pageNumber = 1, pageSize = defaultPageSize } = {}) =>
  axios(createGetOptions({ pageNumber, pageSize }));

const createPageRequests = () =>
  // totalNumberOfPages should be coming from the response; not hard coded value
  new Array(totalNumberOfPages)
    .fill(null)
    .map((_, index) => fetchProducts({ pageNumber: index + 1 }));

describe("duplicates with paged products request", () => {
  new Array(testIterations).fill(null).forEach((_, index) => {
    describe(`Iteration: ${index + 1}`, () => {
      it("number of unique product ids should match the number of products available", async () => {
        const response = await Promise.all(createPageRequests());

        const results = response.reduce(
          (acc, { data: { data } }) => acc.concat(data),
          []
        );

        const uniqueIds = Object.keys(results.reduce((acc, { id }) => ({ ...acc, [id]: id }), {}));

        expect(uniqueIds.length).toEqual(totalNumberOfProductsExpected);
      });
    });
  });
});
