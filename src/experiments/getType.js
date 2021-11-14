import { head } from 'ramda';
export default (value) => {
    if (Array.isArray(value)) {
        const entry = head(value);
        //stupid JS weirdness - 15minutes of my life... 0...
        if (entry === 0)
            return 'array of number';
        //array of number , array of string
        return entry
            ? (Array.isArray(entry)
                ? 'array of array' : `array of ${typeof entry}`)
            : `array`;
    }
    return typeof value;
};
