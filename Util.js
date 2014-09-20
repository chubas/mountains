Module('Util')({

    makeArray : function makeArray(length, parameterOrFunction) {
        var result = [];
        var i;

        if(typeof parameterOrFunction === 'function') {
            for(i = 0; i < length; i++) {
                result.push(parameterOrFunction(i));
            }
        } else {
            for(i = 0; i < length; i++) {
                result.push(parameterOrFunction);
            }
        }
        return result;
    }

});
