import DynamoClient from './dynamoClient.js';
import { GetItemCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';

const getById = async (id: string) => {
  const input = {
    'Key': {
      'short': {
        'S': id
      }
    },
    'TableName': 'shortstack'
  };
  
  const command = new GetItemCommand(input);
  const res = await DynamoClient.send(command);
  if (!res.Item){
    return null;
  }
  return unmarshall(res.Item);
}; 

export { getById };