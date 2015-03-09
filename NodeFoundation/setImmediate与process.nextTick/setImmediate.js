function recurse(i, end) {
    if (i > end) {
        console.log('Done!');
    }
    else {
        console.log(i);
        setImmediate(recurse, i + 1, end);
    }

}

recurse(0,999999);