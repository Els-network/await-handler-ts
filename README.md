# await-handler-ts

Simple signature to ease the paid of catching errors using async/await. This module will allow a simple method of catching errors from an `await` handler without the need to wrap everything in try/catch blocks. This module is a Node.js only version based on [await-to-js](https://github.com/scopsy/await-to-js) minus the typescript aspect. Credit for this module goes to [Dima Grossman](http://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/), as it was based off the code provided.

You continue to use async/await normally, except to wrap the function you are "awaiting", in this module to allow destructuring the returned array into variables. This is similar to the golang error handling syntax.

**NOTE:** This module works in Node 6+, but in order to use async/await, you need to use Node 8+ or compile with Babel.

**THIS ADD SUPPORT FOR TYPESCRIPT OF THE AWAIT-HANDLER MADE BY [KyleRoss](https://github.com/KyleRoss)**

## Install
Install via NPM:
```
npm i await-handler --save
```
Install via YARN:
```
yarn add await-handler
```

## Usage
**JS**
```js
const on = require('await-handler');

async function asyncFunctionExample() {
    let [err, result] = await on(myAsyncTask());
    if(err) {
        throw err;
    }
    
    // ... handle the result
    console.log(result);
}
```
**ES import**
```js
import on from "await-handler";
```
**TS**
```ts
import on from "await-handler";
async function asyncFunctionExample() {
    let [err, result] = await on(myAsyncTask());
    if(err) {
        throw err;
    }
    
    // ... handle the result
    console.log(result);
}

// with errorProps
async function asyncFunctionExampleWithErrorProps() {
    let [err, result] = await on<{props: string}, string>(myAsyncTask(), {props: "hey"});
    if(err) {
        console.log(err.props); // "hey"
        throw err;
    }
    
    // ... handle the result
    console.log(result);
}

// You can defined the type of the error adn the data by doing: 
async function asyncFunctionExampleWithErrorPropsAndDataType() {
    // the error will be of type Error or MyCustomError
    // the data will be of type string
    let [err, result] = await on<Error | MyCustomError, string>(myAsyncTask());
    if(err) {
        throw err; // err instanceof Error || err instanceof MyCustomError
    }
    
    // ... handle the result
    console.log(result); // result instanceOf string
}
```

## API

### on(promise[, errorProps])
**Type:** Function

Adds handler to `promise` in order to return an array which can be destructured. Optionally add additional properties to the returned error by providing an Object to `errorProps`.

| Argument   | Required? | Type    | Description                                                |
|------------|-----------|---------|------------------------------------------------------------|
| promise    | Yes       | Promise | Promise to wrap and return results for.                    |
| errorProps | No        | Object  | Optional object to append to the `Error` if one is thrown. |

***Generic***
```ts
on<errorType, dataType>() {};
```
**Examples:**
```js
async function basicExample() {
    let [err, result] = await on(myAsyncTask());
    if(err) throw err;
    
    // ... handle the result
    console.log(result);
}

async function errorPropsExample() {
    let [err, result] = await on(myAsyncTask(), { customMessage: 'Something failed!' });
    // With typescript
    let [err, result] = await on<{customMessage: string}>(myAsyncTask(), { customMessage: 'Something failed!' })
    if(err) {
        console.error(err.customMessage);
        return process.exit(1);
    }
    
    // ... handle the result
    console.log(result);
}
```

###### Returns _{Promise&lt;Array&gt;}_
> Returns Promise that resolves with array signature `[error, results]`. If an error is thrown, `error` will be the the rejection from the promise and `results` will be `undefined`. If an error is not thrown, `error` will be `null` and `results` will be the resolved value from the promise.

---

## Tests
To run the tests:

```
npm install
npm run test
```

## License
MIT License. See [License](https://github.com/KyleRoss/await-handler/blob/master/LICENSE) in the repository.
