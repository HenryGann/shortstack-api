import DynamoClient from './dynamoClient.js';
import { UrlMapping, APIResponse } from '../types/db.js';

import { GetItemCommand, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import getTTL from '../util/epoch.js';
import { isValidUrl, getShort } from '../util/urlHandler.js';

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

const createNewMapping = async (long: string): Promise<APIResponse> => {
  // Ensure that the link is formatted correctly
  if(!isValidUrl(long)){
    return {
      success: false,
      message: 'URL is not valid'
    };
  }

  const mapping: UrlMapping = {
    long,
    short: getShort(),
    ttl: getTTL(),
  };

  const data = {
    'TableName': 'shortstack',
    'Item': marshall(mapping)
  };

  const command = new PutItemCommand(data);
  await DynamoClient.send(command);
  // Upload the mapping to aws
  return {
    success: true,
    message: mapping.short
  };
};

export { getById, createNewMapping };