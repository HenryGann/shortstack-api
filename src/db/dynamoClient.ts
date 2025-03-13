import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { fromIni } from '@aws-sdk/credential-providers';

const DynamoClient = new DynamoDBClient(
  { region: process.env.AWS_REGION, credentials: fromIni({ 'profile':'henrygann' }) }
);

export default DynamoClient;