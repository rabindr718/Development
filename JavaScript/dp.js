Dynamic Programming (DP) is an optimization technique often used to solve problems by breaking them down into overlapping subproblems and solving each subproblem only once, storing its result for future use.

Here's an example of how to implement a DP solution in JavaScript. We'll solve the **Fibonacci sequence** problem using dynamic programming, which is a classic example:

### Fibonacci Sequence using DP (Memoization Approach):
```javascript
const fibonacci = (n, memo = {}) => {
    if (n <= 1) return n;  // Base cases: fib(0) = 0, fib(1) = 1

    // Check if the value is already in the memo
    if (memo[n]) return memo[n];

    // Recursively compute the Fibonacci number and store it in the memo
    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);

    return memo[n];
};

// Example Usage
console.log(fibonacci(10));  // Output: 55
```

### Explanation:
1. **Base Case:** If `n` is 0 or 1, the function returns `n` (because `fib(0) = 0` and `fib(1) = 1`).
2. **Memoization:** We store the result of `fib(n)` in an object (`memo`) to avoid redundant calculations. If `fib(n)` has already been computed, we return the stored value from `memo`.
3. **Recursion:** The function computes `fib(n)` recursively by summing the values of `fib(n-1)` and `fib(n-2)` and stores the result in `memo` for future use.

### Fibonacci Sequence using DP (Tabulation Approach):
```javascript
const fibonacci = (n) => {
    if (n <= 1) return n;

    const dp = [0, 1];  // Initialize base cases: fib(0) = 0, fib(1) = 1

    // Build the dp table iteratively
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];  // Return the nth Fibonacci number
};

// Example Usage
console.log(fibonacci(10));  // Output: 55
```

### Explanation (Tabulation):
1. We create a `dp` array where `dp[i]` will store the value of `fib(i)`.
2. We initialize the base cases `dp[0] = 0` and `dp[1] = 1`.
3. We fill in the `dp` table iteratively by computing `dp[i] = dp[i - 1] + dp[i - 2]`.
4. Finally, the value of `fib(n)` is stored in `dp[n]`.

### When to Use Each:
- **Memoization (Top-Down DP):** Use when you naturally think in terms of recursion and want to optimize by storing intermediate results.
- **Tabulation (Bottom-Up DP):** Use when you want to build solutions iteratively from the ground up and minimize function call overhead.

Both approaches ensure that each subproblem is solved only once, making the time complexity O(n).