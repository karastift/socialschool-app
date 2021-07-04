import { createClient, dedupExchange, fetchExchange, stringifyVariables } from "urql";
// import { cacheExchange } from '@urql/exchange-graphcache';
// import { betterUpdateQuery } from './betterUpdateQuery';
// import ME_QUERY from "../graphql/queries/MeQuery";

export const cursorPagination = () => {

  return (_parent: any, fieldArgs: any, cache: { inspectFields: (arg0: any) => any; resolve: (arg0: any, arg1: string) => any; resolveFieldByKey: (arg0: any, arg1: string) => any; }, info: { partial?: any; parentKey?: any; fieldName?: any; }) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter((info: { fieldName: any; }) => info.fieldName === fieldName);
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
    const results: any = [];
    fieldInfos.forEach((fi: { fieldKey: any; }) => {
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
    url: 'http://192.168.178.61:4000/graphql',
    fetchOptions: {
        credentials: 'include',
        // exchanges: [dedupExchange, cacheExchange({
        //     resolvers: {
        //         Query: {
        //             posts: cursorPagination(),
        //         },
        //     },
        //     updates: {
        //         Mutation: {
        //             logout: (_result, _args, cache, _info) => {
        //                 betterUpdateQuery(
        //                     cache,
        //                     {query: ME_QUERY},
        //                     _result,
        //                     () => ({me: null})
        //                 );
        //             },
        //             login: (_result, _args, cache, _info) => {
        //                 betterUpdateQuery(
        //                     cache,
        //                     { query: ME_QUERY },
        //                     _result,
        //                     (result: { login: { errors: any; user: any; }; }, query: any) => {
        //                         if (result.login.errors) {
        //                             return query;
        //                         }
        //                         else {
        //                             return {
        //                                 me: result.login.user,
        //                             };
        //                         }
        //                     }
        //                 );
        //             },
        //             register: (_result, _args, cache, _info) => {
        //                 betterUpdateQuery(
        //                     cache,
        //                     { query: ME_QUERY },
        //                     _result,
        //                     (result: { register: { errors: any; user: any; }; }, query: any) => {
        //                         if (result.register.errors) {
        //                             return query;
        //                         }
        //                         else {
        //                             return {
        //                                 me: result.register.user,
        //                             };
        //                         }
        //                     }
        //                 );
        //             },
        //         },
        //     },
        // }), fetchExchange],
    }
});