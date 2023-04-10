
import { Readable } from "stream";
// Create a readable stream;

// Need to implement the read method, otherwise the stream will not work.
const readableStream = new Readable({
    read(size) {
        // Push some data into the internal buffer.
        for(let i = 0; i < 100; i++) {
            this.push(`Hello ${i}!`);
        }
        this.push(`Total size: ${size}.\n`)  // 
        // No more data to push - Push null will send the end event.
        this.push(null);
    }
});

// Consume it through an writable stream using pipe (e.g. process.stdout)
readableStream.pipe(process.stdout);
readableStream.on('data', (chunk) => {
    console.log(`Received ${chunk.length} bytes of data.`); // <= read the size chunk of data
    console.log(chunk.toString());
});

// Create an async iterable from a readable stream
async function readChunks(stream) {
    for await (const chunk of stream) {
        console.log(chunk.toString());
    }
}

const newReadableStream = Readable.from(['Hello', 'World', '!', 'This', 'is', 'a', 'readable', 'stream', 'from', 'an', 'array', '.']);

readChunks(newReadableStream).then(() => {
    console.log('Done reading chunks');
});

// Using generators
function* generate() {
    for(let i = 0; i < 100; i++) {
        yield `Hello ${i}!`;
    }
}

const readableStreamFromGenerator = Readable.from(generate());

readChunks(readableStreamFromGenerator).then(() => {
    console.log('Done reading chunks');
});


