---
layout: default
title: Algorithm I
nav_order: 1
parent: 🔥 LeetCode Study Plan
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

***

## **`Two Pointers` [Move Zeroes](https://leetcode.com/problems/move-zeroes/)**

### 👎 `임시 배열 생성`

```java
class Solution {
    public void moveZeroes(int[] nums) {
        int[] tmp = new int[nums.length];
        int tmpIndex = -1;
        int zeroCount = 0;
        
        for(int i = 0 ; i < nums.length ; i++){
            if(nums[i] == 0){
                zeroCount++;
                continue;
            }
            tmpIndex++;
            tmp[tmpIndex] = nums[i];
        }
        
        for(int i = nums.length - zeroCount ; i < nums.length ; i++){
            tmp[i] = 0;
        }
        
        for(int i = 0 ; i < nums.length ; i++){
            nums[i] = tmp[i];
        }
    }
}
```

### 👍 `최적화`

```java
class Solution {
    public void moveZeroes(int[] nums) {
        int lastNoneZeroIndex = 0;
        
        for(int i = 0 ; i < nums.length ; i++){
            if(nums[i] != 0){
                nums[lastNoneZeroIndex++] = nums[i];
                continue;
            }
        }
        
        for(int i = lastNoneZeroIndex ; i < nums.length ; i++){
            nums[i] = 0;
        }
    }
}
```

***

## **`Two Pointers` [Two Sum II - Input Array Is Sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)**

### `Two Pointers`

```java
class Solution {
    public int[] twoSum(int[] numbers, int target) {
        int[] result = new int[2];
        int left = 0;
        int right = numbers.length - 1;
        while(left < right){
            int sum = numbers[left] + numbers[right];
            if(target == sum){
                result[0] = left + 1;
                result[1] = right + 1;
                break;
            }
            else if(sum < target){
                ++left;
            }
            else{
                --right;
            }
        }
        return result;
    }
}
```


### 👍 `Binary Search`

```java
class Solution {
    public int[] twoSum(int[] numbers, int target) {
        int[] result = new int[2];
        int left = 0;
        int right = numbers.length - 1;
        while(left < right){
            int mid = (left + right) / 2;
            int sum = numbers[left] + numbers[right];
            if(target == sum){
                result[0] = left + 1;
                result[1] = right + 1;
                break;
            }
            else if(sum < target){
                left = (numbers[mid] + numbers[right] < target) ? mid : left + 1;
            }
            else{
                right = (numbers[mid] + numbers[left] > target) ? mid : right - 1;
            }
        }
        return result;
    }
}
```

***

## **`Two Pointers` [Reverse String](https://leetcode.com/problems/reverse-string/)**

```java
class Solution {
    public void reverseString(char[] s) {
        int left = 0;
        int right = s.length - 1;
        while(left < right){
            char tmp = s[left];
            s[left] = s[right];
            s[right] = tmp;
            left++;
            right--;
        }
    }
}
```

***

## **[Reverse Words in a String III](https://leetcode.com/problems/reverse-words-in-a-string-iii/)**

### `Two Pointers`

```java
class Solution {
    public String reverseWords(String s) {
        StringBuilder sb = new StringBuilder();
        String[] sArr = s.split(" ");
        int count = 1;
        for(String word : sArr){
            for(int i = word.length() - 1 ; i >= 0 ; i--){
                sb.append(word.charAt(i));
            }
            if(count != sArr.length){
                sb.append(" ");
                count++;
            }
        }
        return sb.toString();
    }
}
```

### `Stream` ✨

```java
class Solution {
    public String reverseWords(String s) {
        return Arrays.stream(s.split(" "))
            .map(word -> new StringBuilder(word).reverse().toString())
            .collect(Collectors.joining(" "));
    }
}
```

***

## **[Middle of the Linked List](https://leetcode.com/problems/middle-of-the-linked-list/)**

### `Array`

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode middleNode(ListNode head) {
        ListNode[] arr = new ListNode[101];
        int depth = 0;
        while(head != null){
            arr[depth++] = head;
            head = head.next;
        }
        return arr[depth / 2];
    }
}
```

### `Pointer` ✨

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode middleNode(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;
        int depth = 0;
        while(fast != null && fast.next != null){
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }
}
```

***

# **[Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)**

## `Two Pass algorithm`

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        int length = 0;
        ListNode currentNode = head;
        
        // find length of list
        while(currentNode != null){
            currentNode = currentNode.next;
            length++;
        }
        
        if(length == n){
            return head.next;
        }
        
        // find node to remove index = (length - n)
        int nodeBeforeRemoveIndex = length - n - 1;
        currentNode = head;
        
        for(int i = 0 ; i < nodeBeforeRemoveIndex ; i++){
            currentNode = currentNode.next;
        }
        currentNode.next = currentNode.next.next;
        
        return head;
    }
}
```

## `One Pass algorithm`

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode currentNode = head;
        
        for(int i = 0 ; i < n ; i++){
            currentNode = currentNode.next;
        }=-]
        
        if(currentNode == null){
            return head.next;
        }

        ListNode nodeBeforeRemoved = head;
        
        while(currentNode.next != null){
            currentNode = currentNode.next;
            nodeBeforeRemoved = nodeBeforeRemoved.next;
        }
        
        nodeBeforeRemoved.next = nodeBeforeRemoved.next.next;
        
        return head;
    }
}
```

***

# **[Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)**

## `Sliding Window`

```java
public class Solution {
    public int lengthOfLongestSubstring(String s) {
        int[] chars = new int[128];
        int left = 0;
        int right = 0;
        int res = 0;
        while(right < s.length()){
            char rightChar = s.charAt(right);
            chars[rightChar]++;
            
            while(chars[rightChar] > 1){
                char leftChar = s.charAt(left);
                chars[leftChar]--;
                left++;
            }
                
            res = Math.max(res , right - left + 1);
            
            right++;
        }
        return res;
    }
}
```

## `Sliding Window Optimized 1` ✨

```java
public class Solution {
    public int lengthOfLongestSubstring(String s) {
        int n = s.length(), ans = 0;
        Map<Character, Integer> map = new HashMap<>(); // current index of character
        // try to extend the range [i, j]
        for (int j = 0, i = 0; j < n; j++) {
            if (map.containsKey(s.charAt(j))) {
                i = Math.max(map.get(s.charAt(j)), i);
            }
            ans = Math.max(ans, j - i + 1);
            map.put(s.charAt(j), j + 1);
        }
        return ans;
    }
}
```

## `Sliding Window Optimized 2` ✨

```java
public class Solution {
    public int lengthOfLongestSubstring(String s) {
        Integer[] chars = new Integer[128];

        int left = 0;
        int right = 0;

        int res = 0;
        while (right < s.length()) {
            char r = s.charAt(right);

            Integer index = chars[r];
            if (index != null && index >= left && index < right) {
                left = index + 1;
            }

            res = Math.max(res, right - left + 1);

            chars[r] = right;
            right++;
        }

        return res;
    }
}
```

***

# **[Permutation in String](https://leetcode.com/problems/permutation-in-string/)**

## `Using Array` - `2xx ms`

```java
class Solution {
    public boolean checkInclusion(String s1, String s2) {
        if(s1.length() > s2.length())
            return false;
        int[] s1Map = new int[26];
        for(int i = 0 ; i < s1.length() ; i++){
            s1Map[s1.charAt(i) - 'a']++;           
        }
        
        for(int i = 0 ; i <= s2.length() - s1.length() ; i++){
            int[] s2Map = new int[26];
            for(int j = 0 ; j < s1.length() ; j++){
                // s2의 인덱스를 하나씩 증가 시키며, s1 길이만큼 아스키코드를 이용힌 인덱스에 카운트한다.
                s2Map[s2.charAt(i + j) - 'a']++;
            }
            if(matches(s1Map , s2Map))
                return true;
        }
        
        return false;
    }
    
    public boolean matches(int[] s1Map , int[] s2Map){
        for(int i = 0 ; i < 26 ; i++){
            if(s1Map[i] != s2Map[i])
                return false;
        }
        return true;
    }
}
```

## `Sliding Window` - `1x ms`

```java
class Solution {
    public boolean checkInclusion(String s1, String s2) {
        // s1 "ab"
        // s2 "eidbaooo"        
        if(s1.length() > s2.length())
            return false;
        int[] s1Map = new int[26];
        int[] s2Map = new int[26];
        
        for(int i = 0 ; i < s1.length() ; i++){
            // s1의 길이만큼 각 s1,s2의 문자 카운트를 증가
            s1Map[s1.charAt(i) - 'a']++;
            s2Map[s2.charAt(i) - 'a']++;
        }
        for(int i = 0 ; i < s2.length() - s1.length() ; i++){
            if(matches(s1Map , s2Map)) 
                return true;
            // s2의 i + s1.length()의 문자 카운트를 증가
            s2Map[s2.charAt(i + s1.length()) - 'a']++;
            
            // matches를 통해 똑같은지 체크하였지만 다르다면 s2의 문자 카운트를 감소
            // 1. 처음 for문에서 [a , b] , [e , i]를 증가
            // 2. 해당 반복문 matches 체크
            // 3. 다르다면 앞에서 증가시켜놓은 문자 카운트를 감소 시킨다.
            
            s2Map[s2.charAt(i) - 'a']--;
        }
        
        return matches(s1Map , s2Map);
    }
    
    public boolean matches(int[] s1Map , int[] s2Map){
        for(int i = 0 ; i < 26 ; i++){
            if(s1Map[i] != s2Map[i])
                return false;
        }
        return true;
    }
}
```

***

# **`BFS` [Flood Fill](https://leetcode.com/problems/flood-fill/)**

```java
class Solution {
    int[] moveX = {-1 , 0 , 1 , 0};
    int[] moveY = {0 , 1 , 0 , -1};    
    int rowSize , colSize , beforeColor;
    boolean[][] checked;
    Queue<int[]> queue;
    public int[][] floodFill(int[][] image, int sr, int sc, int newColor) {
        rowSize = image.length;
        colSize = image[0].length;
        checked = new boolean[rowSize][colSize];
        beforeColor = image[sr][sc];
        
        queue = new LinkedList<int[]>();
        filling(image , sr , sc , newColor);
        
        while(!queue.isEmpty()){
            int[] now = queue.poll();
            for(int i = 0 ; i < 4 ; i++){
                int moveXpos = now[0] + moveX[i];
                int moveYpos = now[1] + moveY[i];
                filling(image , moveXpos , moveYpos , newColor);
            }
        }
        return image;
    }
    public void filling(int[][] image , int x , int y , int newColor ){
        if(x >= 0 && x < rowSize && y >= 0 && y < colSize){
            if(image[x][y] == beforeColor && !checked[x][y]){
                checked[x][y] = true;
                image[x][y] = newColor;
                queue.offer(new int[]{x , y});
            }
        }        
    }
}
```

***

# **`BFS` [Max Area of Island](https://leetcode.com/problems/max-area-of-island/)**

```java
class Solution {
    int[] moveX = {-1 , 0 , 1 , 0};
    int[] moveY = {0 , 1 , 0 , -1};    
    int rowSize , colSize;
    Queue<int[]> queue;
    public int maxAreaOfIsland(int[][] grid) {
        rowSize = grid.length;
        colSize = grid[0].length;
        int maxCount = 0;
        
        for(int i = 0 ; i < rowSize ; i++){
            for(int j = 0 ; j < colSize ; j++){
                if(grid[i][j] == 1){
                    maxCount = Math.max(maxCount , fillZero(grid , i , j));
                }
            }
        }
        return maxCount;
    }
    
    public int fillZero(int[][] grid , int sx , int sy){
        queue = new LinkedList<int[]>();
        queue.offer(new int[] {sx , sy});
        int areaCount = 1;
        grid[sx][sy] = 0;
        
        while(!queue.isEmpty()){
            int[] now = queue.poll();
            for(int i = 0 ; i < 4 ; i++){
                int x = now[0] + moveX[i];
                int y = now[1] + moveY[i];
                if(x >= 0 && x < rowSize && y >= 0 && y < colSize){
                    if(grid[x][y] == 1){
                        grid[x][y] = 0;
                        areaCount++;
                        queue.offer(new int[]{x , y});
                    }
                }
            }
        }
        return areaCount;
    }
}
```

***

# **[Populating Next Right Pointers in Each Node](https://leetcode.com/problems/populating-next-right-pointers-in-each-node/)**

## `각 레벨별 순회`

```
Your input
[1,2,3,4,5,6,7]
stdout

[전위순회]

1 Node@685f4c2e Node@7daf6ecc null
2 Node@2e5d6d97 Node@238e0d81 Node@7daf6ecc
4 null null Node@238e0d81
5 null null Node@31221be2
3 Node@31221be2 Node@377dca04 null
6 null null Node@377dca04
7 null null null
```

```java
/*
// Definition for a Node.
class Node {
    public int val;
    public Node left;
    public Node right;
    public Node next;

    public Node() {}
    
    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, Node _left, Node _right, Node _next) {
        val = _val;
        left = _left;
        right = _right;
        next = _next;
    }
};
*/

class Solution {
    public Node connect(Node root) {
        Queue<Node> queue = new LinkedList<>();
        queue.offer(root);
        
        while(!queue.isEmpty()){
            int queueSize = queue.size();
            for(int i = 0 ; i < queueSize ; i++){
                Node now = queue.poll();    
                if(now == null) continue;
                
                if(i < queueSize - 1){
                    now.next = queue.peek();
                }
                if(now.left != null) queue.offer(now.left);
                if(now.right != null) queue.offer(now.right);   
            }
        }
        return root;
    }
}
```

## `이전에 설정된 포인터 사용` 👍👍

```java
class Solution {
    public Node connect(Node root) {
        
        if (root == null) {
            return root;
        }
        
        // Start with the root node. There are no next pointers
        // that need to be set up on the first level
        Node leftmost = root;
        
        // Once we reach the final level, we are done
        while (leftmost.left != null) {
            
            // Iterate the "linked list" starting from the head
            // node and using the next pointers, establish the 
            // corresponding links for the next level
            Node head = leftmost;
            
            while (head != null) {
                
                // CONNECTION 1
                head.left.next = head.right;
                
                // CONNECTION 2
                if (head.next != null) {
                    head.right.next = head.next.left;
                }
                
                // Progress along the list (nodes on the current level)
                head = head.next;
            }
            
            // Move onto the next level
            leftmost = leftmost.left;
        }
        
        return root;
    }
}
```