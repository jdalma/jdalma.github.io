---
layout: default
title: 티스토리 Open-API 사용하여 게시글 자동 수정
parent: Toy-Projects
nav_order: 30
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

# **개요**

- **[History 카테고리의 게시글](https://write-read.tistory.com/category/%EA%B8%B0%EB%A1%9D/History)은 일자별 내가 무슨 글을 작성하였는지를 기록할려고 만들었다.**
- **하지만 게시글을 작성할 때 마다 게시글을 매번 수정하여야 하는 번거로움이 있다.**
- **그래서 티스토리 OpenAPI를 활용하여 로컬 서버를 구동시키고 한 번의 클릭(허가하기)으로 게시글을 자동으로 수정할 수 있는 프로젝트를 만들어 볼려고 한다.**

## **HttpURLConnection 가져오기 (GET 메소드)**
```java
public HttpURLConnection urlConnectionGETMethod(String urlStr) throws IOException {
    URL accessTokenUrl = new URL(urlStr);

    HttpURLConnection urlConnection = (HttpURLConnection) accessTokenUrl.openConnection();
    urlConnection.setRequestMethod("GET");
    urlConnection.setRequestProperty("content-type" , "application/json");
    urlConnection.setConnectTimeout(100000);
    urlConnection.setReadTimeout(50000);

    return urlConnection;
}
```

## **HttpURLConnection 가져오기 (POST 메소드)**
```java
public HttpURLConnection urlConnectionPOSTMethod(String urlStr , Map<String , String> params) throws IOException {
    URL urlObj = new URL(urlStr);

    StringBuilder postData = new StringBuilder();
    for(Map.Entry<String , String> param : params.entrySet()){
        if(postData.length() != 0) postData.append('&');
        postData.append(URLEncoder.encode(param.getKey() , charset));
        postData.append('=');
        postData.append(URLEncoder.encode(param.getValue() , charset));
    }
    byte[] postDataBytes = postData.toString().getBytes(charset);

    HttpURLConnection urlConnection = (HttpURLConnection) urlObj.openConnection();
    urlConnection.setRequestMethod("POST");
    urlConnection.setRequestProperty("Content-Type" , "application/x-www-form-urlencoded");
    urlConnection.setRequestProperty("Content-Length" , String.valueOf(postDataBytes.length));
    urlConnection.setDoOutput(true);

    // POST 호출
    urlConnection.getOutputStream().write(postDataBytes);

    return urlConnection;
}
```

## **로그인**
```java
@GetMapping("/login")
public String login(){
    return "redirect:https://www.tistory.com/oauth/authorize?"
            + "client_id= {client_id}"
            + "&redirect_uri={redirect_uri}"
            + "&response_type=code";
}
```
✅ login로직이 정상적으로 끝나면 `afterLogin`으로 리다이렉트 된다..
{: .fh-default .fs-4 }

## **afterLogin**

1. **로그인 성공 시 받아온 code로 AccessToken획득**

1. **획득한 AccessToken으로 블로그 정보 획득**

1. **블로그 정보에서 게시글 총 개수 , 블로그 이름을 추출**

1. **게시글 조회 (1번 접근시 최대 10개) 마다 `postListBeforeProcessing`리스트에 추가**

1. **`postListProcessing`메소드 호출**


```java
@GetMapping("/afterLogin")
public String afterLogin(@RequestParam(value = "code") String code) throws Exception{
    // 1.로그인 성공 시 받아온 code로 AccessToken획득
    System.out.println("Login 콜백 정상 호출");
    System.out.println(code);
    String accessToken = "" , line = "";


    String accessTokenUrlStr = "https://www.tistory.com/oauth/access_token?"
                    + "client_id={client_id}"
                    + "&client_secret={client_secret}"
                    + "&redirect_uri={redirect_uri}"
                    + "&code=" + code
                    + "&grant_type=authorization_code";

    HttpURLConnection getAccessToken = urlConnectionGETMethod(accessTokenUrlStr);
    int responseCode = getAccessToken.getResponseCode();
    System.out.println("getAccessToken responseCode = " + responseCode);

    BufferedReader accessTokenIn = getData(getAccessToken);

    if((line = accessTokenIn.readLine()) != null) {
        accessToken = line.split("=")[1];
    }
    accessTokenIn.close();

    System.out.println("accessToken = " + accessToken);

    // 2.획득한 AccessToken으로 블로그 정보 획득
    if(!"".equals(accessToken) && accessToken != null){
        String blogInfoUrlStr = "https://www.tistory.com/apis/blog/info?"
                            + "access_token=" + accessToken
                            + "&output=json";
        HttpURLConnection getBlogInfo = urlConnectionGETMethod(blogInfoUrlStr);

        responseCode = getBlogInfo.getResponseCode();
        System.out.println("getBlogInfo responsecode = " + responseCode);

        BufferedReader blogInfoIn = getData(getBlogInfo);

        String blogName = "";   // 블로그 이름
        int totalCount = 0;     // 게시글 총 개수
        if((line = blogInfoIn.readLine()) != null) {
            JSONArray blogInfoArr = new JSONObject(line)
                    .getJSONObject("tistory")
                    .getJSONObject("item")
                    .getJSONArray("blogs");
            JSONObject firstBlog = (JSONObject) blogInfoArr.get(0);

            System.out.println(firstBlog);
            // 3.블로그 정보에서 게시글 총 개수를 추출
            blogName = firstBlog.getString("name");
            totalCount = firstBlog.getJSONObject("statistics").getInt("post");
        }
        // 4.게시글 조회
        String getPostListUrlStr = "https://www.tistory.com/apis/post/list?"
                        + "access_token=" + accessToken
                        + "&output=json"
                        + "&blogName=write-read";
        // 4.게시글 조회(1번 접근시 최대 10개) 조회 마다 postListBeforeProcessing리스트에 추가
        List<JSONObject> postListBeforeProcessing = new ArrayList<>();
        // ExecutorService service = Executors.newFixedThreadPool(4);
        for(int i = 1 ; i <= (totalCount / 10) + 1 ; i++){
            HttpURLConnection getPostList = urlConnectionGETMethod(getPostListUrlStr + "&page=" + i);

            BufferedReader postListIn = getData(getPostList);

            if((line = postListIn.readLine()) != null) {
                postListBeforeProcessing.add(new JSONObject(line));
            }
            postListIn.close();
        }
//            postListBeforeProcessing.forEach(System.out::println);

        // 5.postListProcessing메소드 호출
        String content = postListProcessing(postListBeforeProcessing);
//            System.out.println(content);

        // 6. 원하는 게시글 수정
        String updatePostUrl = "https://www.tistory.com/apis/post/modify";
        Map<String , String> postParam = new HashMap<>();
        postParam.put("access_token" , accessToken);
        postParam.put("output_type" , "json");
        postParam.put("blogName" , blogName);
        // <추후 수정 필요>
        postParam.put("postId" , "73");
        postParam.put("title" , "2021");
        // </추후 수정 필요>
        postParam.put("content" , content);

        HttpURLConnection updatePostCon = urlConnectionPOSTMethod(updatePostUrl , postParam);
        BufferedReader responseData = getData(updatePostCon);

        if((line = responseData.readLine()) != null){
            System.out.println(line);
        }
    }
    return "home";
}
```

```java
// posts리스트에서 작성일자 별로 , 게시글url , 게시글 제목을 추출하여 문자열(content) 반환 작업
private String postListProcessing(List<JSONObject> postListBeforeProcessing) {
    StringBuilder content = new StringBuilder();

    List<JSONObject> posts = new ArrayList<>();
    // 게시글의 정보들을 posts에 담는다.
    postListBeforeProcessing.forEach(obj -> obj.getJSONObject("tistory")
                                .getJSONObject("item")
                                .getJSONArray("posts")
                                .forEach(post -> posts.add((JSONObject) post)));

    // Comparator 정의 (게시글 id 오름차순 정렬 위함)
    Comparator<JSONObject> comparator = (o1, o2) -> {
        if(o1.getInt("id") > o2.getInt("id")){
            return 1;
        }
        else if(o1.getInt("id") < o2.getInt("id")){
            return -1;
        }
        else{
            return 0;
        }
    };
    posts.sort(comparator);

    // 작성일자 , 게시글url , 게시글 제목을 가져온다.
    for (JSONObject post : posts) {
        content.append(post.getString("date").substring(0,10));
        content.append(post.getString("title"));
        content.append(post.getString("postUrl"));
        if(post.getInt("visibility") == 0){
            content.append("(비공개)");
        }
    }
//        posts.forEach(System.out::println);
    return content.toString();
}
```

```java
public BufferedReader getData(HttpURLConnection con) throws IOException {
    return new BufferedReader(new InputStreamReader(con.getInputStream(), charset));
}
```

## 🚨 **문제점**

**[티스토리 블로그 - 자동 수정 게시글](https://write-read.tistory.com/entry/2021?category=904669)**

-   **현재 글 내용은 수정이 가능하지만 , css적용 문제**
  - html 태그 삽입 또는 마크다운을 사용하여도 모두 문자열 처리되는 문제
-   **게시글이 많이 늘어난다면 ExecutorService 멀티 쓰레드 고려**
  -   현재 게시글 100개 미만 기준 679ms 

**HttpURLConnection 참고**
- [HttpURLConnection을 이용해서 POST 호출 예제](https://nine01223.tistory.com/256)

**Comparator (게시글 정렬) 참고**
- [객체 정렬하기 1부 - Comparable vs Comparator](https://www.daleseo.com/java-comparable-comparator/)
