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

# # **`Binary Search` [Search Insert Position](https://leetcode.com/problems/search-insert-position/)**

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