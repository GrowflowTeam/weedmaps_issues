import axios from 'axios';
import { weedmapsAccessToken, orgID, catalogID } from '../config'

const defaultPageSize = 10;
const totalNumberOfProductsExpected = 27;
const testIterations = 3;

const createGetOptions = ({
  pageNumber = 1,
  pageSize = defaultPageSize,
} = {}) => ({
  method: 'GET',
  url: 'https://api-g.weedmaps.com/catalog/v1/products/',
  params: {
    'scope_by[organization_id]': orgID,
    'scope_by[catalog_id]': catalogID,
    'filter[is_master]': 'false',
    'filter[discontinued]': 'false',
    'page[size]': pageSize,
    'page[page]': pageNumber,
    include: 'product_images',
  },
  headers: {
    authorization: `Bearer ${weedmapsAccessToken}`,
    accept: 'application/vnd.api+json',
  },
});

const fetchProducts = ({ pageNumber = 1, pageSize = defaultPageSize } = {}) =>
  axios(createGetOptions({ pageNumber, pageSize }));

describe('duplicates with paged products request', () => {
  new Array(testIterations).fill(null).forEach((_, index) => {
    describe(`Iteration: ${index + 1}`, () => {
      let uniqueIds;
      let results;
      let rawData;

      beforeEach(async () => {
        rawData = await Promise.all([
          fetchProducts(),
          fetchProducts({ pageNumber: 2 }),
          fetchProducts({ pageNumber: 3 }),
        ]);
      });

      beforeEach(() => {
        results = rawData.reduce(
          (acc, { data: { data } }) => acc.concat(data),
          []
        );

        uniqueIds = results.reduce((acc, { id }) => ({ ...acc, [id]: id }), {});
      });

      it('the correct number of products are returned', () => {
        expect(results.length).toEqual(totalNumberOfProductsExpected);
      });

      it('number of unique product ids should match the number of products retrieved', () => {
        expect(Object.keys(uniqueIds).length).toEqual(results.length);
      });
    });
  });
});
