export default () => ({
    currentChannel: '',
    currentSearchText: '',
    articleChannels: {},
    latestArticles: [],
    recomendArticles: [],
    announcements: [],
    selectedKey: '',
    subItems: [],
    searchResults: [], // New state for onSearch results
    newsSubItems: [],
    subItemPagination: {
        currentPageIndex: 1,
        hasNextPage: false,
        hasPreviousPage: false,
        pageSize: 10,
        totalItemCount: 9,
        totalPageCount: 1,
    },
    newsSubItemPagination:{
        currentPageIndex: 1,
        hasNextPage: false,
        hasPreviousPage: false,
        pageSize: 10,
        totalItemCount: 9,
        totalPageCount: 1,
    },
    commentsPagination: {
        currentPageIndex: 1,
        hasNextPage: false,
        hasPreviousPage: false,
        pageSize: 10,
        totalItemCount: 9,
        totalPageCount: 1,
    },
    articleComments: [],
    subItem: {},
    footerData: [],
    promotions: []
})