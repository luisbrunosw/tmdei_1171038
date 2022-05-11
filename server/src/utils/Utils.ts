export const removeNullKeys= (obj: any) => {
    Object.keys(obj).forEach(key => {
    if (!obj[key]) {
        delete obj[key];
    }
    });
    return obj;
}

export const formatQuery= (obj: any) => {
    return {where: removeNullKeys(obj)};
}
