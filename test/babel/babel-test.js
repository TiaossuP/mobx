import {
    observable, asStructure, observe, observeAsync, extendObservable, 
    IObservableArray, IArrayChange, IArraySplice, IObservableValue,
    extras,
    logLevel,
    strict,
    default as mobservable
} from "mobservable";

class Box {
    @observable height = 20;
    @observable sizes = [2];
    @observable someFunc = function () { return 2; }
    @observable get width() {
        return this.height * this.sizes.length * this.someFunc();
    }
}

export function test_babel(test) {
    var box = new Box();
    
    var ar = []
    
    observe(() => {
        ar.push(box.width);
    });

    test.deepEqual(ar.slice(), [40]);
    box.height = 10;
    test.deepEqual(ar.slice(), [40, 20]);
    box.sizes.push(3, 4);
    test.deepEqual(ar.slice(), [40, 20, 60]);
    box.someFunc = () => 7;
    test.deepEqual(ar.slice(), [40, 20, 60, 210]);

    test.done();
};
