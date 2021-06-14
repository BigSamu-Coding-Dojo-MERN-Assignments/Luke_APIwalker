
import _ from "lodash";

export function getPrivateKey(urlApiCall){
    var stringLength = urlApiCall.length;
    var index = stringLength-2; // Omit first '/' character
    var pk = 0;
    var decimalBase = 1;
    while (urlApiCall[index] !== '/'){
        pk = pk + parseInt(urlApiCall[index])*decimalBase;
        index--;
        decimalBase = decimalBase*10;
    }
    return pk;
}