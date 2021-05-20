import { cacheExchange } from '@urql/exchange-graphcache';
import { createClient, dedupExchange, fetchExchange } from "urql";
import { betterUpdateQuery } from './betterUpdateQuery';
import ME_QUERY from "../graphql/queries/MeQuery";

export const cursorPagination = () => {

  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    console.log(allFields);
    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter(info => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }
    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isItInTheCache = cache.resolve(
      cache.resolveFieldByKey(entityKey, fieldKey),
      "posts"
    );
    info.partial = !isItInTheCache;
    const results = [];
    fieldInfos.forEach((fi) => {
        const data = cache.resolve(entityKey, fi.fieldKey);
        results.push(...data);
    });

    return results;

//     const visited = new Set();
//     let result = [];
//     let prevOffset = null;

//     for (let i = 0; i < size; i++) {
//       const { fieldKey, arguments: args } = fieldInfos[i];
//       if (args === null || !compareArgs(fieldArgs, args)) {
//         continue;
//       }

//       const links = cache.resolve(entityKey, fieldKey);
//       const currentOffset = args[cursorArgument];

//       if (
//         links === null ||
//         links.length === 0 ||
//         typeof currentOffset !== 'number'
//       ) {
//         continue;
//       }

//       const tempResult;

//       for (let j = 0; j < links.length; j++) {
//         const link = links[j];
//         if (visited.has(link)) continue;
//         tempResult.push(link);
//         visited.add(link);
//       }

//       if (
//         (!prevOffset || currentOffset > prevOffset) ===
//         (mergeMode === 'after')
//       ) {
//         result = [...result, ...tempResult];
//       } else {
//         result = [...tempResult, ...result];
//       }

//       prevOffset = currentOffset;
//     }

//     const hasCurrentPage = cache.resolve(entityKey, fieldName, fieldArgs);
//     if (hasCurrentPage) {
//       return result;
//     } else if (!(info).store.schema) {
//       return undefined;
//     } else {
//       info.partial = true;
//       return result;
//     }
  };
};

export const client = createClient({
    url: 'http://192.168.178.113:4000/graphql',
    fetchOptions: {
        credentials: 'include',
        exchanges: [dedupExchange, cacheExchange({
            resolvers: {
                Query: {
                    posts: cursorPagination(),
                },
            },
            updates: {
                Mutation: {
                    logout: (_result, args, cache, info) => {
                        betterUpdateQuery(
                            cache,
                            {query: ME_QUERY},
                            _result,
                            () => ({me: null})
                        );
                    },
                    login: (_result, args, cache, info) => {
                        betterUpdateQueryry(
                            cache,
                            { query: ME_QUERY },
                            _result,
                            (result, query) => {
                                if (result.login.errors) {
                                    return query;
                                }
                                else {
                                    return {
                                        me: result.login.user,
                                    };
                                }
                            }
                        );
                    },
                    register: (_result, args, cache, info) => {
                        betterUpdateQuery(
                            cache,
                            { query: ME_QUERY },
                            _result,
                            (result, query) => {
                                if (result.register.errors) {
                                    return query;
                                }
                                else {
                                    return {
                                        me: result.register.user,
                                    };
                                }
                            }
                        );
                    },
                },
            },
        }), fetchExchange],
    }
});