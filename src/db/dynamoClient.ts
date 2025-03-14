import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { fromIni } from '@aws-sdk/credential-providers';

const credentials = process.env.IS_LAMBDA ? undefined : fromIni();
const DynamoClient = new DynamoDBClient(
  { region: process.env.AWS_REGION, credentials }
);

export default DynamoClient;