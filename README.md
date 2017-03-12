# The Spec

Each implementation calls 5 functions named `A` through `E` while satisfying the following conditions:

 * B depends on the results of A
 * C depends on the results of A
 * D depends on the results of A and B
 * E depends on the results of A and C
 * Each function should be called as soon as its dependencies are satisfied. i.e.
    * D should not wait on C
    * E should not wait on B

# Usage

## Run Tests

```bash
npm test
```

or with test descriptions `--verbose -v` and auto reload on file changes `--watch -w`
```bash
npm test -- -vw
```
