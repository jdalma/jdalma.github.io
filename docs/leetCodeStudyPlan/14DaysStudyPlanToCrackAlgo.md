---
layout: default
title: 14 Days Study Plan To Crack Algo
nav_order: 1
parent: LeetCode Study Plan
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## **`Binary Search` [Search Insert Position](https://leetcode.com/problems/search-insert-position/)**

```java
class Solution {
    public int searchInsert(int[] nums, int target) {
        if(nums[nums.length - 1] < target) return nums.length;
        int left = 0;
        int right = nums.length - 1;
        while(left <= right){
            int mid = left + (right - left) / 2;
            if(nums[mid] == target) return mid;
            else if(nums[mid] < target)
                left = mid + 1;
            else 
                right = mid - 1;
        }
        return left;
    }
}
```

## **`Two Pointers` [Squares of a Sorted Array](https://leetcode.com/problems/squares-of-a-sorted-array/)** ✨

```java

class Solution {
    public int[] sortedSquares(int[] nums) {
        int[] result = new int[nums.length];
        int start = 0;
        int end = nums.length - 1;
        int insert = end;
        while(start <= end){
            int pow1 = nums[start] * nums[start];
            int pow2 = nums[end] * nums[end];
            if(pow1 > pow2){
                result[insert--] = pow1;
                start++;
            }
            else{
                result[insert--] = pow2;
                end--;
            }
        }
        
        return result;
    }
}
```

***

## **`Two Pointers` [Rotate Array](https://leetcode.com/problems/rotate-array/submissions/)**

### 여분의 배열 사용 , 공간 : `O(N)`

```java
class Solution {
    public void rotate(int[] nums, int k) {
        int[] result = new int[nums.length];
        for(int i = 0 ; i < nums.length ; i++){
            result[(i + k) % nums.length] = nums[i];
        }
        for(int i = 0 ; i < nums.length ; i++){
            nums[i] = result[i];
        }
    }
}
```

### 공간 : `O(1)` 👍 

```
n = 7 , k = 3

Original List                   : 1 2 3 4 5 6 7
After reversing all numbers     : 7 6 5 4 3 2 1
After reversing first k numbers : 5 6 7 4 3 2 1
After revering last n-k numbers : 5 6 7 1 2 3 4 --> Result
```

```java
class Solution {
    public void rotate(int[] nums, int k) {
        k %= nums.length;
        reverse(nums , 0 , nums.length - 1);
        reverse(nums , 0 , k - 1);
        reverse(nums , k , nums.length - 1);
    }
    
    public void reverse(int[] nums , int start , int end){
        while(start < end){
            int tmp = nums[start];
            nums[start] = nums[end];
            nums[end] = tmp;
            start++;
            end--;
        }
    }
}
```