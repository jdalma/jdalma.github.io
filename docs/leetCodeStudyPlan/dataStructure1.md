---
layout: default
title: Data Structrue I
nav_order: 10
parent: 🔥 LeetCode Study Plan
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

# **`Array` [Contains Duplicate](https://leetcode.com/problems/contains-duplicate/)**

## `Sort`

```java
class Solution {
    public boolean containsDuplicate(int[] nums) {
        Arrays.sort(nums);
        for(int i = 0 ; i < nums.length - 1 ; i++){
            if(nums[i] == nums[i + 1]) return true;
        }
        return false;
    }
}
```

***

# **`Array` [Maximum Subarray](https://leetcode.com/problems/maximum-subarray/)** 🔥

## `Solve`

```java
class Solution {
    public int maxSubArray(int[] nums) {
        if(nums.length == 1) return nums[0];
        
        int result = nums[0];
        for(int i = 1 ; i < nums.length ; i++){
            nums[i] = Math.max(nums[i] , nums[i] + nums[i - 1]);
            result = Math.max(result , nums[i]);
        }
        return result;
    }
}
```

## `DP - Kadane's Algorithm` 👍


![](../../assets/images/algorithm/kadane.png)

- [이미지 출처](https://medium.com/@vdongbin/kadanes-algorithm-카데인-알고리즘-acbc8c279f29)

```java
class Solution {
    public int maxSubArray(int[] nums) {
        // Initialize our variables using the first element.
        int currentSubarray = nums[0];
        int maxSubarray = nums[0];
        
        // Start with the 2nd element since we already used the first one.
        for (int i = 1; i < nums.length; i++) {
            int num = nums[i];
            // If current_subarray is negative, throw it away. Otherwise, keep adding to it.
            currentSubarray = Math.max(num, currentSubarray + num);
            maxSubarray = Math.max(maxSubarray, currentSubarray);
        }
        
        return maxSubarray;
    }
}
```

## `Divide and Conquer (Advanced)`

```java
class Solution {
    private int[] numsArray;
    
    public int maxSubArray(int[] nums) {
        numsArray = nums;
        
        // Our helper function is designed to solve this problem for
        // any array - so just call it using the entire input!
        return findBestSubarray(0, numsArray.length - 1);
    }
    
    private int findBestSubarray(int left, int right) {
        // Base case - empty array.
        if (left > right) {
            return Integer.MIN_VALUE;
        }
        
        int mid = Math.floorDiv(left + right, 2);
        int curr = 0;
        int bestLeftSum = 0;
        int bestRightSum = 0;
        
        // Iterate from the middle to the beginning.
        for (int i = mid - 1; i >= left; i--) {
            curr += numsArray[i];
            bestLeftSum = Math.max(bestLeftSum, curr);
        }
        
        // Reset curr and iterate from the middle to the end.
        curr = 0;
        for (int i = mid + 1; i <= right; i++) {
            curr += numsArray[i];
            bestRightSum = Math.max(bestRightSum, curr);
        }
        
        // The bestCombinedSum uses the middle element and the best
        // possible sum from each half.
        int bestCombinedSum = numsArray[mid] + bestLeftSum + bestRightSum;
        
        // Find the best subarray possible from both halves.
        int leftHalf = findBestSubarray(left, mid - 1);
        int rightHalf = findBestSubarray(mid + 1, right);
        
        // The largest of the 3 is the answer for any given input array.
        return Math.max(bestCombinedSum, Math.max(leftHalf, rightHalf));
    }
}
```

***

# **`Array` [Two Sum](https://leetcode.com/problems/two-sum/)**

## `Solve`

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        int first = 0;
        int second = 0;
        Map<Integer , Integer> map = new HashMap<>();
        for(int i = 0 ; i < nums.length ; i++){
            map.put(nums[i] , i);
        }
        
        for(int i = 0 ; i < nums.length ; i++){
            int diff = target - nums[i]; 
            if(map.containsKey(diff) && map.get(diff) != i){
                first = i;
                second = map.get(diff);
                break;
            }
        }
        
        return new int[] {first , second};
    }
}
```

## `One Pass`

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        // In case there is no solution, we'll just return null
        return null;
    }
}
```

***

# **`Array` [Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/)**

## `Three Pointers`  ✨

```java
class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        int pointer1 = m - 1;
        int pointer2 = n - 1;
        
        for(int pointer3 = m + n - 1 ; pointer3 >= 0 ; pointer3--){
            if(pointer2 < 0) break;
            
            
            if(pointer1 < 0 || nums1[pointer1] < nums2[pointer2]){
                nums1[pointer3] = nums2[pointer2--];
            }
            else{
                nums1[pointer3] = nums1[pointer1--];
            }
        }
    }
}
```

***

# **`Array` [Intersection of Two Arrays II](https://leetcode.com/problems/intersection-of-two-arrays-ii/)**

- 중첩 원소를 반환

## `Two Pointers`

```java
import java.util.ArrayList;
import java.util.Arrays;

class Solution {
    public int[] intersect(int[] nums1, int[] nums2) {
        List<Integer> list = new ArrayList<>();
        Arrays.sort(nums1);
        Arrays.sort(nums2);
        
        int pointer1 = 0;
        int pointer2 = 0;
        
        while(true){
            if(pointer1 >= nums1.length || pointer2 >= nums2.length) break;
            
            int value1 = nums1[pointer1];
            int value2 = nums2[pointer2];  
            
            if(value1 == value2){
                list.add(value1);
                pointer1++;
                pointer2++;
            }
            else if(value1 < value2){
                pointer1++;
            }
            else{
                pointer2++;
            }
        }
    
        return list.stream().mapToInt(Integer::intValue).toArray();
    }
}
```

## `Two Pointers`

```java
    public int[] intersect(int[] nums1, int[] nums2) {
        Arrays.sort(nums1);
        Arrays.sort(nums2);
        int i = 0, j = 0, k = 0;
        while (i < nums1.length && j < nums2.length) {
            if (nums1[i] < nums2[j]) {
                ++i;
            } else if (nums1[i] > nums2[j]) {
                ++j;
            } else {
                nums1[k++] = nums1[i++];
                ++j;
            }
        }
        return Arrays.copyOfRange(nums1, 0, k);
    }
```

***

# **`Array` [Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)**

## `Brute Force` ➜ <span class="text-red-300">Time Limit Exceeded</span>

```java
class Solution {
    public int maxProfit(int[] prices) {
        int diff = Integer.MIN_VALUE;
        for(int i = 0 ; i < prices.length ; i++){
            for(int j = i ; j < prices.length ; j++){
                diff = Math.max(diff , prices[j] - prices[i]);
            }
        }
        return diff;
    }
}
```

## `One Pass`

```java
class Solution {
    public int maxProfit(int[] prices) {
        int profit = 0;
        int minPrice = Integer.MAX_VALUE;
        for(int i = 0 ; i < prices.length ; i++){
            if(minPrice > prices[i]){
                minPrice = prices[i];
            }   
            else{
                profit = Math.max(prices[i] - minPrice , profit);
            }
        }
        return profit;
    }
}
```

***

# **`Array` [Reshape The Matrix](https://leetcode.com/problems/reshape-the-matrix/)**

## `Queue 사용`

```java
class Solution {
    public int[][] matrixReshape(int[][] mat, int r, int c) {
        
        if(mat.length == 0 || r * c != mat.length * mat[0].length) return mat;
        
        Queue<Integer> queue = new ArrayDeque<>();
        int[][] resultMat = new int[r][c];
        
        for(int i = 0 ; i < mat.length ; i++){
            for(int j = 0 ; j < mat[0].length ; j++){
                queue.offer(mat[i][j]);
            }
        }
        
        for(int i = 0 ; i < r ; i++){
            for(int j = 0 ; j < c ; j++){
                resultMat[i][j] = queue.poll();
            }
        }
        
        return resultMat;
    }
}
```

## `Queue 없이 One Pass`

```java
class Solution {
    public int[][] matrixReshape(int[][] mat, int r, int c) {
        
        if(mat.length == 0 || r * c != mat.length * mat[0].length) return mat;
        
        int[][] resultMat = new int[r][c];
        
        int row = 0 , col = 0;
        
        for(int i = 0 ; i < mat.length ; i++){
            for(int j = 0 ; j < mat[0].length ; j++){
                if(col == c){
                    row++;
                    col = 0;
                }
                resultMat[row][col] = mat[i][j];
                col++;
            }
        }        
        return resultMat;
    }
}
```

## `인덱스 계산` 👍

```
nums = [[1,2],[3,4]], r = 1, c = 4

resultMat[i / c][i % c] = nums[i / nums[0].length][i % nums[0].length];

i / c
0   4 = 0
1   4 = 0
..

i % c
0   4 = 0
1   4 = 1
..

Output: [[1,2,3,4]]
```

```java
class Solution {
    public int[][] matrixReshape(int[][] nums, int r, int c) {
        if(nums.length == 0 || r * c != nums.length * nums[0].length)
            return nums;
        
        int[][]resultMat = new int[r][c];
        for(int i = 0; i < r*c; i++) {
            resultMat[i / c][i % c] = nums[i / nums[0].length][i % nums[0].length];
        }
        return resultMat;
    }
}
```

***

# **`Array` [Pascal's Triangle](https://leetcode.com/problems/pascals-triangle/)**

## `DP`

- 0번 인덱스의 1을 재사용하기 때문에 `DP`

```java
class Solution {
    public List<List<Integer>> generate(int numRows) {
        List<List<Integer>> result = new ArrayList<>();
        
        result.add(new ArrayList<>());
        result.get(0).add(1);
        
        for(int row = 1 ; row < numRows ; row++){
            result.add(new ArrayList<>());
            List<Integer> nowRow = result.get(row);
            nowRow.add(1);
            for(int col = 1 ; col < row ; col++){
                List<Integer> beforeRow = result.get(row - 1);
                nowRow.add(beforeRow.get(col - 1) + beforeRow.get(col));
            }
            nowRow.add(1);
        }
        
        return result;
    }
}
```

***

# **`Array` [Valid Sudoku](https://leetcode.com/problems/valid-sudoku/)** 📝

![](../../assets/images/leetcodeStudyPlan/sudoku.png)

## `HashSet`

```java
class Solution {
    public boolean isValidSudoku(char[][] board) {
        int N = 9;

        HashSet<Character>[] rows = new HashSet[N];
        HashSet<Character>[] cols = new HashSet[N];
        HashSet<Character>[] boxes = new HashSet[N];
        for (int r = 0; r < N; r++) {
            rows[r] = new HashSet<Character>();
            cols[r] = new HashSet<Character>();
            boxes[r] = new HashSet<Character>();
        }

        for (int r = 0; r < N; r++) {
            for (int c = 0; c < N; c++) {
                char val = board[r][c];

                if (val == '.') {
                    continue;
                }

                if (rows[r].contains(val)) {
                    return false;
                }
                rows[r].add(val);

                if (cols[c].contains(val)) {
                    return false;
                }
                cols[c].add(val);

                int idx = (r / 3) * 3 + c / 3;
                if (boxes[idx].contains(val)) {
                    return false;
                }
                boxes[idx].add(val);
            }
        }
        return true;
    }
}
```

## `Extra Array`

```java
class Solution {
    public boolean isValidSudoku(char[][] board) {
        int N = 9;

        int[][] rows = new int[N][N];
        int[][] cols = new int[N][N];
        int[][] boxes = new int[N][N];

        for (int r = 0; r < N; r++) {
            for (int c = 0; c < N; c++) {
                if (board[r][c] == '.') {
                    continue;
                }
                int pos = board[r][c] - '1';

                if (rows[r][pos] == 1) {
                    return false;
                }
                rows[r][pos] = 1;

                if (cols[c][pos] == 1) {
                    return false;
                }
                cols[c][pos] = 1;

                int idx = (r / 3) * 3 + c / 3;
                if (boxes[idx][pos] == 1) {
                    return false;
                }
                boxes[idx][pos] = 1;
            }
        }
        return true;
    }
}
```

***

# **`Array` [Sudoku Solver](https://leetcode.com/problems/sudoku-solver/)** 📝

```java
class Solution {
    // box size
    int n = 3;
    // row size
    int N = n * n;

    int [][] rows = new int[N][N + 1];
    int [][] columns = new int[N][N + 1];
    int [][] boxes = new int[N][N + 1];

    char[][] board;

    boolean sudokuSolved = false;

    public boolean couldPlace(int d, int row, int col) {
        /*
            Check if one could place a number d in (row, col) cell
        */
        int idx = (row / n ) * n + col / n;
        return rows[row][d] + columns[col][d] + boxes[idx][d] == 0;
    }

    public void placeNumber(int d, int row, int col) {
        /*
        Place a number d in (row, col) cell
        */
        int idx = (row / n ) * n + col / n;

        rows[row][d]++;
        columns[col][d]++;
        boxes[idx][d]++;
        board[row][col] = (char)(d + '0');
    }

    public void removeNumber(int d, int row, int col) {
        /*
        Remove a number which didn't lead to a solution
        */
        int idx = (row / n ) * n + col / n;
        rows[row][d]--;
        columns[col][d]--;
        boxes[idx][d]--;
        board[row][col] = '.';
    }

    public void placeNextNumbers(int row, int col) {
        /*
        Call backtrack function in recursion
        to continue to place numbers
        till the moment we have a solution
        */
        // if we're in the last cell
        // that means we have the solution
        if ((col == N - 1) && (row == N - 1)) {
            sudokuSolved = true;
        }
        // if not yet
        else {
        // if we're in the end of the row
            // go to the next row
            if (col == N - 1) backtrack(row + 1, 0);
            // go to the next column
            else backtrack(row, col + 1);
        }
    }

    public void backtrack(int row, int col) {
        /*
        Backtracking
        */
        // if the cell is empty
        if (board[row][col] == '.') {
            // iterate over all numbers from 1 to 9
            for (int d = 1; d < 10; d++) {
                if (couldPlace(d, row, col)) {
                    placeNumber(d, row, col);
                    placeNextNumbers(row, col);
                    // if sudoku is solved, there is no need to backtrack
                    // since the single unique solution is promised
                    if (!sudokuSolved) removeNumber(d, row, col);
                }
            }
        }
        else placeNextNumbers(row, col);
    }

    public void solveSudoku(char[][] board) {
        this.board = board;

        // init rows, columns and boxes
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                char num = board[i][j];
                if (num != '.') {
                    int d = Character.getNumericValue(num);
                    placeNumber(d, i, j);
                }
            }
        }
        backtrack(0, 0);
    }
}
```

***

# **`Array` [Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/)**

## `Solve`

```java
class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        int rowSize = matrix.length;
        int colSize = matrix[0].length;
        
        for(int i = 0 ; i < rowSize ; i++){
            if(matrix[i][0] <= target && target <= matrix[i][colSize - 1]){
                for(int j = 0 ; j < colSize ; j++){
                    if(matrix[i][j] == target) return true;
                }
            }
        }
        
        return false;
    }
}
```

## `Binary Search`

```java
class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        int rowSize = matrix.length;
        if (rowSize == 0)
            return false;
        int colSize = matrix[0].length;
        
        int left = 0, right = rowSize * colSize - 1;
        int pivotIdx, pivotElement;
        while (left <= right) {
            pivotIdx = (left + right) / 2;
            pivotElement = matrix[pivotIdx / colSize][pivotIdx % colSize];
            if (target == pivotElement)
                return true;
            else {
                if (target < pivotElement)
                    right = pivotIdx - 1;
                else
                    left = pivotIdx + 1;
            }
        }
        return false;
    }
}
```