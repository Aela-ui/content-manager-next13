export const getPermission = (permissions, permissionName) => {
    for(let i=0; i< permissions.length; i++) {
        if(permissions[i].permission.name === permissionName) {
            return true;
        }
    }
    return false;
}