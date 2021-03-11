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

> ✋ **FQCN** (Full Qualified Class name)
> **클래스가 속한 패키지명을 모두 포함한 이름을 말한다.**

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
- **`Object Method invoke(object , params)`**

### 📌 예제
```java
public class Test {
    public Test() { System.out.println("기본 생성자"); }
    public Test(String con){
        System.out.println("String 생성자 - " + con);
    }

    public static String A = "public static A";
    private String B = "private B";

    private void c(){
        System.out.println("private method C");
    }
    public int sum(int first , int second){
        System.out.println("public method sum - "+ (first + second));
        return first + second;
    }
}
```
```java
public static void main( String[] args ) throws Exception {
    Class<?> testClass = Class.forName("org.example.Test");

    // 1. 기본 생성자 메서드 가져오기
    Constructor<?> defaultConstructor = testClass.getConstructor(null);
    Test test1 = (Test) defaultConstructor.newInstance();
    // 출력
    // 기본 생성자

    // 2. String을 받는 생성자 메서드 가져오기
    Constructor<?> stringConstructor = testClass.getConstructor(String.class);
    Test test2 = (Test) stringConstructor.newInstance("생성자 테스트");
    // 출력
    // String 생성자 - 생성자 테스트

    // 3. public static field 가져오기
    Field a = Test.class.getDeclaredField("A");
    System.out.println(a.get(null));
    // 출력
    // public static A

    // 3-1. public static field 수정하기
    a.set(null , "public static A 수정 테스트");
    System.out.println(a.get(null));
    // 출력
    // public static A 수정 테스트

    // 4. private field 가져오기
    Field b = Test.class.getDeclaredField("B");

    // private은 setAccessible(true}
    b.setAccessible(true);

    // 일반 필드라서 null로는 가져올 수 없다.
    // 비어있어서 NullPointerException
    System.out.println(b.get(test1));
    // 출력
    // private B

    // 4-1. private field 수정하기
    b.set(test1 , "private B 수정 테스트");
    System.out.println(b.get(test1));
    // 출력
    // private B 수정 테스트

    // 5. private method 가져오기
    Method c = Test.class.getDeclaredMethod("c");

    // private은 setAccessible(true}
    c.setAccessible(true);

    // 특정 인스턴스의 메서드면 그 인스턴스를 넘겨줘야한다.
    // c.invoke(obj , params...)
    c.invoke(test1);

    // 6. public method 가져오기
    Method sum = Test.class.getDeclaredMethod("sum" , int.class , int.class);
    int result = (int) sum.invoke(test2 , 5 , 10);
    System.out.println(result);
    // 출력
    // public method sum - 15
    // 15
}
```

***

# **간단한 DI 프레임워크 만들기**

✅ **`@Inject` 어노테이션 만들어서 필드 주입 해주는 컨테이너 서비스 만들기**
{: .fh-default .fs-5 }

✅ **ContainerService.java**
{: .fh-default .fs-5 }

```java
public static<T> T getObject(T classType)
```
- `classType`에 해당하는 타입의 객체를 만들어 준다.
- 단 , 해당 객체의 필드 중에 `@Inject`가 있다면 해당 필드도 같이 만들어 제공한다.

## 📌 **예제**

### ContainerService.java
```java
public class ContainerService {

    public static <T> T getObject(Class<T> classType){
        T instance = createInstance(classType);
        Arrays.stream(classType.getDeclaredFields()).forEach(field -> {
            if(field.getAnnotation(Inject.class) != null){
                Object fieldInstance = createInstance(field.getType());
                field.setAccessible(true);
                try {
                    field.set(instance , fieldInstance);
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                }
            }
        });
        return instance;
    }

    public static <T> T createInstance(Class<T> classType){
        try{
            return classType.getConstructor(null).newInstance();
        }
        catch (Exception e){
            throw new RuntimeException(e);
        }
    }
}
```
> ✋ **`getObject()` 메서드만 이해한다면 IoC컨테이너에 대한 기본 이해가 가능하다**

### TestCode
```java
public class BookRepository {
}
```
```java
public class BookService {
    @Inject
    BookRepository bookRepository;
}
```
```java
public class ContainerServiceTest {

    @Test
    public void getObject_BookRepository(){
        BookRepository bookRepository = ContainerService.getObject(BookRepository.class);
        Assert.assertNotNull(bookRepository);
    }

    @Test
    public void getObject_BookService(){
        BookService bookService = ContainerService.getObject(BookService.class);
        Assert.assertNotNull(bookService);
        Assert.assertNotNull(bookService.bookRepository);
    }
}
```

***

# **정리 및 활용**
- **리플렉션 사용시 주의할 것**
  - 지나친 사용은 성능 이슈를 야기할 수 있다. **반드시 필요한 경우에만 사용할 것**
  - 컴파일 타임에 확인되지 않고 런타임 시에만 발생하는 문제를 만들 가능성이 있다.
  - 접근 지시자를 무시할 수 있다.

- **스프링**
  - 의존성 주입
  - MVC 뷰에서 넘어온 데이터를 객체에 바인딩할 때

- **하이버네이트**
  - `@Entity`클래스에 Setter가 없다면 리플렉션을 사용한다.
