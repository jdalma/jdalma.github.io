---
layout: default
title: Reflection
parent: JAVA
nav_order: 4
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
---

# **리플렉션의 시작은 `Class<T>`**

[Class (Java Platform SE 8 ) (oracle.com)](https://docs.oracle.com/javase/8/docs/api/java/lang/Class.html)

## **`Class<T>`에 접근하는 방법**

-   모든 클래스를 로딩 한 다음 `Class<T>`의 인스턴스가 생긴다. `타입.class`로 접근할 수 있다.
-   모든 인스턴스는 `getClass()`메소드를 가지고 있다. `인스턴스.getClass()`로 접근할 수 있다.
-   클래스를 문자열로 읽어오는 방법
    -   `Class.forName("FQCN")`
    -   클래스패스에 해당 클래스가 없다면 `ClassNotFoundException`이 발생한다.

## **`Class<T>`를 통해 할 수 있는 것**

-   필드(목록) 가져오기
-   메소드(목록) 가져오기
-   상위 클래스 가져오기
-   인터페이스(목록) 가져오기
-   어노테이션 가져오기
-   생성자 가져오기
-   ...

## **예제**

> **Test (Entity)**

```java
public class Test {

    private String super_a = "private : [a]";
    public static String super_b = "public static : [b]";
    public static final String super_c = "public static final : [c]";
    public String super_d = "public : [d]";
    protected String super_e = "protected : [e]";

    public Test(){}

    public Test(String super_a, String super_d, String super_e) {
        this.super_a = super_a;
        this.super_d = super_d;
        this.super_e = super_e;
    }

    private void super_f(){
        System.out.println("private method : [f]");
    }

    public void super_g(){
        System.out.println("public method : [g]");
    }

    public int super_h(){
        return 100;
    }
}
```
> **MyTest (Entity)** extends Test implements  MyInterface

```java
public class MyTest extends Test implements  MyInterface{
    private String child_a = "child private : [a]";
    public static String child_b = "child public static : [b]";
    public static final String child_c = "child public static final : [c]";
    public String child_d = "child public : [d]";
    protected String child_e = "child protected : [e]";

    public MyTest(String super_a, String super_d, String super_e, String child_a, String child_d, String child_e) {
        super(super_a, super_d, super_e);
        this.child_a = child_a;
        this.child_d = child_d;
        this.child_e = child_e;
    }
}

```

```java
public static void main( String[] args ) throws ClassNotFoundException{
// Class 가져오기
    // 힙 영역에서 가져오기
    Class<Test> testClass = Test.class;
    Class<MyTest> myTestClass = MyTest.class;
    // 객체 생성 후 가져오기
    Test test = new Test();
    Class<? extends Test> aClass = test.getClass();
    // 문자열로 가져오기
    Class<?> aClass1 = Class.forName("org.example.Test");

// getFields()
    Arrays.stream( testClass.getFields()).forEach(System.out::println);
    // 출력
    // public static java.lang.String org.example.Test.super_b
    // public static final java.lang.String org.example.Test.super_c
    // public java.lang.String org.example.Test.super_d
    System.out.println();

    Arrays.stream( myTestClass.getFields()).forEach(System.out::println);
    // 출력
    // public static java.lang.String org.example.MyTest.child_b
    // public static final java.lang.String org.example.MyTest.child_c
    // public java.lang.String org.example.MyTest.child_d
    // public static java.lang.String org.example.Test.super_b
    // public static final java.lang.String org.example.Test.super_c
    // public java.lang.String org.example.Test.super_d
    System.out.println();

// getDeclaredFields()
    Arrays.stream( testClass.getDeclaredFields()).forEach(System.out::println);
    // 출력
    // private java.lang.String org.example.Test.super_a
    // public static java.lang.String org.example.Test.super_b
    // public static final java.lang.String org.example.Test.super_c
    // public java.lang.String org.example.Test.super_d
    // protected java.lang.String org.example.Test.super_e
    System.out.println();

    Arrays.stream( myTestClass.getDeclaredFields()).forEach(System.out::println);
    // 출력
    // private java.lang.String org.example.MyTest.child_a
    // public static java.lang.String org.example.MyTest.child_b
    // public static final java.lang.String org.example.MyTest.child_c
    // public java.lang.String org.example.MyTest.child_d
    // protected java.lang.String org.example.MyTest.child_e
    System.out.println();

// 접근하기
    Test t1 = new Test();
    Arrays.stream( testClass.getDeclaredFields()).forEach(field ->{
        try {
            // field.setAccessible(true) 해주지 않으면 private에 접근할 수 없다.
            field.setAccessible(true);
            System.out.println(field + " , " + field.get(t1));
            // 출력
            // private java.lang.String org.example.Test.super_a , private : [a]
            // public static java.lang.String org.example.Test.super_b , public static : [b]
            // public static final java.lang.String org.example.Test.super_c , public static final : [c]
            // public java.lang.String org.example.Test.super_d , public : [d]
            // protected java.lang.String org.example.Test.super_e , protected : [e]
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }
    });
    System.out.println();

    // 필드의 접근지정자
    Arrays.stream( testClass.getDeclaredFields()).forEach(field -> {
        int modifiers = field.getModifiers();
        System.out.println(field + " - isPrivate? " + Modifier.isPrivate(modifiers) + ", isPublic? " + Modifier.isPublic(modifiers));
        // 출력
        // private java.lang.String org.example.Test.super_a - isPrivate? true, isPublic? false
        // public static java.lang.String org.example.Test.super_b - isPrivate? false, isPublic? true
        // public static final java.lang.String org.example.Test.super_c - isPrivate? false, isPublic? true
        // public java.lang.String org.example.Test.super_d - isPrivate? false, isPublic? true
        // protected java.lang.String org.example.Test.super_e - isPrivate? false, isPublic? false
    });
    System.out.println();

// getMethods()
    Arrays.stream( testClass.getMethods()).forEach(System.out::println);
    // 출력
    // public void org.example.Test.super_g()
    // public int org.example.Test.super_h()
    // public final native void java.lang.Object.wait(long) throws java.lang.InterruptedException
    // public final void java.lang.Object.wait(long,int) throws java.lang.InterruptedException
    // public final void java.lang.Object.wait() throws java.lang.InterruptedException
    // public boolean java.lang.Object.equals(java.lang.Object)
    // public java.lang.String java.lang.Object.toString()
    // public native int java.lang.Object.hashCode()
    // public final native java.lang.Class java.lang.Object.getClass()
    // public final native void java.lang.Object.notify()
    // public final native void java.lang.Object.notifyAll()
    System.out.println();

// getConstructors()
    Arrays.stream( testClass.getConstructors()).forEach(System.out::println);
    // 출력
    // public org.example.Test()
    // public org.example.Test(java.lang.String,java.lang.String,java.lang.String)
    System.out.println();

// getSuperClass()
    System.out.println(myTestClass.getSuperclass());
    // 출력
    // class org.example.Test
    System.out.println();

// getInterfaces()
    Arrays.stream( myTestClass.getInterfaces()).forEach(System.out::println);
    // 출력
    // interface org.example.MyInterface
}
```


 ✅**TmpClass.class.getDeclaredFields()**
 {: .fh-default .fs-4 }
-   부모클래스 제외 , 자신의 private한 필드 까지

✅**TmpClass.class.getFields()**
{: .fh-default .fs-4 }
-   부모클래스에 있는 것 과 자신의 public한 필드 까지

***

# **Annotation 과  Reflection**
**Annotation은 값을 가질 수 있다.**
{: .fh-default .fs-4 }
```java
@Retention(RetentionPolicy.CLASS)
@Target({ElementType.TYPE, ElementType.FIELD})
public @interface MyAnnotation {
    String name() default "hyunjun";
    int number() default 100;

    //or

    String name();
    int number();
}
```
```java

public class Test {
    @MyAnnotation(name = "hyunjun" , number = 100)
    private String super_a = "private : [a]";
}
```
```java
Arrays.stream(Test.class.getDeclaredFields()).forEach(field -> {
    Arrays.stream(field.getAnnotations()).forEach(anno ->{
        if(anno instanceof MyAnnotation){
            MyAnnotation myAnnotation = (MyAnnotation) anno;
            System.out.println(myAnnotation.name());
            System.out.println(myAnnotation.number());
            // 출력
            // hyunjun
            // 100
        }
    });
});
```

## **중요 Annotation**

### `@Retention`
- **해당 Annotation을 언제까지 유지할 것인가?**
  - 소스 , 클래스 , 런타임
  - `@Retention(RetentionPolicy.CLASS)` - 기본 값
    - **바이트코드를 로딩하였을 때 메모리에 남아있지 않는다.**
  - `@Retention(RetentionPolicy.RUNTIME)`
    - **런타임에도 남아 있는다.**

**바이트 코드 `javap -c -v {경로}`**
```
SourceFile: "MyAnnotation.java"
RuntimeVisibleAnnotations:
  0: #7(#8=e#9.#10)
    java.lang.annotation.Retention(
      value=Ljava/lang/annotation/RetentionPolicy;.RUNTIME
    )
```
```java
Arrays.stream(MyInterface.class.getAnnotations())
      .forEach(System.out::println)
      // 출력
      // @org.example.MyAnnotation()
```

> ✋
> **`@Retention(RetentionPolicy.RUNTIME)` 선언 시**
> 바이트 코드에서 `RuntimeVisibleAnnotations` 을 확인할 수 있다.
> 런타임 시점에 `getAnnotations()`시 조회가 가능하다.

### `@Inherited`
- **해당 Annotation을 하위 클래스 까지 전달할 것인가?**

### `@Target`
- **어디에 사용할 수 있는가?**
```java
public enum ElementType {
    TYPE, /** Class, interface (including annotation type), or enum declaration */

    FIELD, /** Field declaration (includes enum constants) */

    METHOD, /** Method declaration */

    PARAMETER, /** Formal parameter declaration */

    CONSTRUCTOR, /** Constructor declaration */

    LOCAL_VARIABLE, /** Local variable declaration */

    ANNOTATION_TYPE, /** Annotation type declaration */

    PACKAGE, /** Package declaration */

    /**
     * Type parameter declaration
     *
     * @since 1.8
     */
    TYPE_PARAMETER,

    /**
     * Use of a type
     *
     * @since 1.8
     */
    TYPE_USE,

    /**
     * Module declaration.
     *
     * @since 9
     */
    MODULE
}
```

***


## **Reflection**

### 클래스 정보 조회

##### `getAnnotations()`
{: .fh-default .fs-4 }
- **상속 받은 (`@Inherited`) Annotation까지 조회**

##### `getDeclaredAnnotations()`
{: .fh-default .fs-4 }
- **자기 자신에만 붙어있는 Annotation 조회**

### 클래스 정보 수정

##### Class 인스턴스 만들기
{: .fh-default .fs-4 }
- `Class.newInstance()`는 deprecated(비추천) 됐으며 이제부터는
- **생성자**를 통해서 만들어야한다.

##### 생성자로 인스턴스 만들기
{: .fh-default .fs-4 }
- **`Constructor.newInstance(params)`**

##### 필드 값 접근하기 / 설정하기
{: .fh-default .fs-4 }
- 특정 인스턴스가 가지고 있는 값을 가져오는 것이기 때문에 인스턴스가 필요하다.
- **`Field.get(object)`**
- **`Field.set(object , value)`**
- **Static** 필드를 가져올 때는 object가 없어도 되니 `null`을 넘기면 된다.

##### 메소드 실행하기
{: .fh-default .fs-4 }
```java
Object Method invoke(object , params)
```
