import {
  pipe,
  pick,
  sum,
  flatten,
  map,
  mapObjIndexed,
  filter,
  groupBy,
  head,
  pluck,
  omit,
  zipObj,
  last
} from 'ramda';

import mockDataTB from '../telemetryData/tb.json'

const ACGT = { A: 0, C: 1, G: 2, T: 3 };
const SNPCoverage = ({ hq_bcounts: hqBcounts, genotype }) =>
  hqBcounts[ACGT[genotype]];

const spreadMultiDrugCodons = map(read =>
  map(drugName => ({ ...read, drugs: drugName }), read.drugs.split(',')),
);

const hasMutation = ({ genotype, wildtype }) => genotype !== wildtype;
const hasEnoughCoverage = coverage => filter(read => read.coverage >= coverage);
const groupByProp = prop => groupBy(obj => obj[prop]);
const enrichReadDetails = map(read => ({
  ...read,
  coverage: SNPCoverage(read),
  totalBcounts: sum(read.hq_bcounts),
}));

const drugs = mockDataTB.barcodes['barcode01'].drugs_table
const drugNameDict = zipObj(drugs.map(head), drugs.map(last));

const transformTB = pipe(
  ({ barcodes }) => barcodes,
  mapObjIndexed(
    (bc, key) => bc.panel_details.map(pd => ({ ...pd, barcode: key }))),
  Object.values,
  flatten,
  // splitDrugNameString,
  spreadMultiDrugCodons, // 1 -> m, 1 -> 1
  flatten,
  map(read => ({ ...read, conf: parseInt(read.conf), drug: `${read.drugs}–${drugNameDict[read.drugs]}` })),
  map(omit(['drugs'])),
  // filter(hasMutation),
  enrichReadDetails,
  // filter(read => SNPCoverage(read) > 5),
  // groupBy(read => read.drugs)
);


export default transformTB


