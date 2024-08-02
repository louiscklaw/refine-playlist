'use client';

import dataProviderSimpleRest from '@refinedev/simple-rest';

const API_URL = 'http://192.168.10.89:3031/v1';

export const dataProvider = dataProviderSimpleRest(API_URL);
