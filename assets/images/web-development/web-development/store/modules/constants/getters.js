
const getTempData = (state) => {
    return state.tempData;
};
const getConstants = (state) => {
    const constants = state.constants;
    return constants ? constants : {};
};
const getSocialLinks = (state,getters) => {
    const temp=getters.getConstants?.social_infos|| {};
    return temp.social_links || [];
};

const getstrategies = (state,getters) => {
    const temp=getters.getConstants||{};
    return temp?.streagy || [];
};

const getFutrue = (state,getters) => {
    const temp=getters.getConstants;
    return temp?.futrue || 0;
};

const getSpot = (state,getters) => {
    const temp=getters.getConstants;
    return temp?.spot || 0;
};
const getEmails = (state,getters) => {
    const temp=getters.getConstants?.social_infos|| {};
    return  temp.emails || [];
};
 


export default {   
    getTempData,
    getSocialLinks,
    getConstants,
    getstrategies,
    getFutrue,
    getSpot,
    getEmails
};
