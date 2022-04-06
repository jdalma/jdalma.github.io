---
layout: default
title: Data Structure II
nav_order: 15
parent: 🔥 LeetCode Study Plan
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

# **Array**

## **`Bit Manipulation` [Single Number](https://leetcode.com/problems/single-number/)** ✨

### **List Uses** - `7xx ms`

```java
class Solution {
    public int singleNumber(int[] nums) {
        List<Integer> list = new ArrayList<>();
        
        for(int num : nums){
            if(!list.contains(num)){
                list.add(num);
            }
            else{
                list.remove(new Integer(num));
            }
        }
        
        return list.get(0);
    }
}
```

### **Hash Uses** - `x ms`

```java
class Solution {
    public int singleNumber(int[] nums) {
        HashMap<Integer, Integer> hash_table = new HashMap<>();

        for (int i : nums) {
            hash_table.put(i, hash_table.getOrDefault(i, 0) + 1);
        }
        for (int i : nums) {
            if (hash_table.get(i) == 1) {
                return i;
            }
        }
        return 0;
    }   
}
```

## **Math** 👍

```java
class Solution {
    public int singleNumber(int[] nums) {
        int sumOfSet = 0, sumOfNums = 0;
        Set<Integer> set = new HashSet();

        for (int num : nums) {
            if (!set.contains(num)) {
                set.add(num);
                sumOfSet += num;
            }
            sumOfNums += num;
        }
        return 2 * sumOfSet - sumOfNums;
    }
}
```

## **Bit 조작** 👍👍

```
If we take XOR of zero and some bit, it will return that bit
a ⊕ 0 = a
If we take XOR of two same bits, it will return 0
a ⊕ a = 0
a ⊕ b ⊕ a = (a ⊕ a) ⊕ b = 0 ⊕ b = b

[4,5,1,3,1,3,5,4,2]

(int) : 0  (bit) : 0
(int) : 4 (bit) : 100
result--------(int) : 4  (bit) : 100
(int) : 4  (bit) : 100
(int) : 5 (bit) : 101
result--------(int) : 1  (bit) : 1
(int) : 1  (bit) : 1
(int) : 1 (bit) : 1
result--------(int) : 0  (bit) : 0
(int) : 0  (bit) : 0
(int) : 3 (bit) : 11
result--------(int) : 3  (bit) : 11
(int) : 3  (bit) : 11
(int) : 1 (bit) : 1
result--------(int) : 2  (bit) : 10
(int) : 2  (bit) : 10
(int) : 3 (bit) : 11
result--------(int) : 1  (bit) : 1
(int) : 1  (bit) : 1
(int) : 5 (bit) : 101
result--------(int) : 4  (bit) : 100
(int) : 4  (bit) : 100
(int) : 4 (bit) : 100
result--------(int) : 0  (bit) : 0
(int) : 0  (bit) : 0
(int) : 2 (bit) : 10
result--------(int) : 2  (bit) : 10
```

```java
class Solution {
    public int singleNumber(int[] nums) {
        int a = 0;
        for (int i : nums) {
            a ^= i;
        }
        return a;
    }
}
```

***

## **[Majority Element](https://leetcode.com/problems/majority-element/)**

### **Brute Force**

```java
class Solution {
    public int majorityElement(int[] nums) {
        int majorityCount = nums.length/2;

        for (int num : nums) {
            int count = 0;
            for (int elem : nums) {
                if (elem == num) {
                    count += 1;
                }
            }
            if (count > majorityCount) {
                return num;
            }
        }
        return -1;    
    }
}
```

### **Boyer-Moore Voting Algorithm** 👍

```java
class Solution {
    public int majorityElement(int[] nums) {
        int count = 0;
        Integer candidate = null;

        for (int num : nums) {
            if (count == 0) {
                candidate = num;
            }
            count += (num == candidate) ? 1 : -1;
        }

        return candidate;
    }
}
```