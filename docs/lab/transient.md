---
layout: default
title: transient
nav_order: 21
parent: 👨‍🔬 Lab
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

# `transient`

- 해당 키워드가 붙은 필드는 직렬화 정보에 포함되지 않는다.

```java
class Person implements Serializable{
    String name;
    int age;
    transient String idNumber;
    transient String address;

    public Person(String name, int age, String idNumber, String address) {
        this.name = name;
        this.age = age;
        this.idNumber = idNumber;
        this.address = address;
    }

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", idNumber='" + idNumber + '\'' +
                ", address='" + address + '\'' +
                '}';
    }
}

class Main {
    public static void main(String[] args) throws IOException, ClassNotFoundException {
        Person test1 = new Person("테스트1" , 20 , "000000-1111111" , "서울 특별시 금천구");

        FileOutputStream fos = new FileOutputStream("person.txt");
        ObjectOutputStream oos = new ObjectOutputStream(fos);
        oos.writeObject(test1);
        oos.flush();
        oos.close();
        fos.close();

        ObjectInputStream ois = new ObjectInputStream(new FileInputStream("person.txt"));
        test1 = (Person) ois.readObject();
        ois.close();

        System.out.println(test1);
        
        // Person{name='테스트1', age=20, idNumber='000000-1111111', address='서울 특별시 금천구'}
        // Person{name='테스트1', age=20, idNumber='null', address='null'}
    }
}
```