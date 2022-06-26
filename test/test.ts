"use strict";
import assert from 'assert';
import on from '../lib';

describe('Await Handler', function() {
    it('should return promise', function() {
        let result = on(Promise.resolve('success'));
        assert.ok(result instanceof Promise);
    });
    
    describe('Signature', function() {
        it('should receive both properties on success', async function() {
            let [err, res] = await on(Promise.resolve('success'));
            assert.ok(err === null);
            assert.ok(res === 'success');
        });
        
        it('should receive error and undefined', async function() {
            let [err, res] = await on(Promise.reject('error'));
            assert.ok(err === 'error');
            assert.ok(res === null);
        });
        
        it('should include additional properties on error object', async function() {
            let [err, res] = await on<{prop: string}, string>(Promise.reject(new Error('Test')), { prop: 'test' });
            assert.ok(err!.prop === 'test');
            assert.ok(err instanceof Error);
            assert.ok(res === null);
        });
        
        it('should apply the right type', async () => {
            let [err, res] = await on<Error, string>(Promise.reject(new Error('Test')));
            assert.ok(typeof err === "object");
            assert.ok(err instanceof Error);
            assert.ok(res === null);
        })
    });
});
