// ------------------------------------------
// Config Index and Search Client
// ------------------------------------------

import { atom, selector } from 'recoil';
import algoliasearch from 'algoliasearch';
import aa from 'search-insights';

// This export represents the information needed for the Algolia API client
export const searchClientCreds = {
  APIKey: '3ee0a9935626b75a1afc33da5ec48b74',
  appID: 'EDEJV24O6Q',
};

// This export is a single instance Algolia API client
export const searchClient = algoliasearch(
  searchClientCreds.appID,
  searchClientCreds.APIKey
);

// Please ignore this atom - DO NOT TOUCH
export const mainIndex = atom({
  key: 'mainIndex', // unique ID (with respect to other atoms/selectors)
  default: 'bootcamp_products', // default value (aka initial value)
});

// Initialise insights client
aa('init', {
  appId: searchClientCreds.appID,
  apiKey: searchClientCreds.APIKey,
});

// Export an active insights client
export const insightsClient = aa;



// DO NOT REMOVE ANYTHING, ONLY RENAME VALUES IF NEEDED
// IF YOU DON'T WANT IT USED, USE FEATURE CONFIG TO TURN OFF
// SEE config.js FOR GENERAL FEATURE CONFIGURATION
// You can change articlesIndex name or influencer index name
export const indexNames = selector({
  key: 'indexNames', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    return {
      suggestionsIndex: get(mainIndex) + '_query_suggestions',
      articlesIndex: 'canda_customDemo_articles',
      injectedContentIndex: get(mainIndex) + '_influencers',
    };
  },
});
