/*
 * Stores an arbitrary set of coordinates, and allows to do operations
 * like copying submatrices or translating the reference system
 */
Class('CoordinateSystem')({

    prototype : {

        // { width : x, height : y }
        initialDimensions : null,

        _data : null,

        init : function(config) {
            Object.keys(config || {}).forEach(function(property) {
                this[property] = config[property];
            }, this);

            if(!this.initialDimensions) {
                this.initialDimensions = {
                    width : 100, // {mn}
                    height : 100 // {mn}
                };
            }

            var size = this.initialDimensions;

            this._data = Util.makeArray(size.height, function() {
                return Util.makeArray(size.width);
            });

        },

        get : function(x, y) {
            return this._data[y][x];
        },

        set : function(x, y, value) {
            this._data[y][x] = value;
            return this;
        },

        mergeGrid : function(grid, x, y, mergeFn) {
            var plane = this;
            var nX, nY, val;

            if(!mergeFn) {
                mergeFn = function(existing, foreign) {
                    return foreign;
                };
            }

            grid.forEach(function(row, rowIndex) {
                row.forEach(function(col, colIndex) {
                    val = grid[rowIndex][colIndex];
                    nX = x + colIndex;
                    nY = y + rowIndex;
                    plane.set(
                        nX, nY,
                        mergeFn(plane.get(nX, nY), val)
                    );
                });
            });
        },

        _debug : function() {
            console.group();
            this._data.forEach(function(row) {
                console.log(row.join(','));
            });
            console.groupEnd();
        }


    }

});