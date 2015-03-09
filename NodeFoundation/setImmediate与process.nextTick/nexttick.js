function recurse(i, end) {
    if (i > end) {
        console.log('Done!');
    } else {
        console.log(i);
        process.nextTick(recurse(i + 1, end));
    }
}

recurse(0, 99999999);

//技术讨论
//https://cnodejs.org/topic/519b523c63e9f8a5429b25e3