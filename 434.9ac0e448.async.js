"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[434],{90434:function(t,e,n){n.r(e),n.d(e,{texts:function(){return a}});const a=[{value:"\u624B\u5199\u4EE3\u7801",paraId:0},{value:"\u5206\u4E09\u5927\u7C7B\uFF1A",paraId:1,tocIndex:0},{value:"\u521B\u5EFA\u578B\uFF1A\u5982\u4F55\u83B7\u53D6\u5BF9\u8C61 1\u2014\u20145",paraId:2,tocIndex:0},{value:"\u7ED3\u6784\u578B\uFF1A\u5BF9\u8C61\u4E0E\u5BF9\u8C61\u7684\u7ED3\u6784\u5173\u7CFB",paraId:3,tocIndex:0},{value:"  6\u2014\u201412",paraId:3,tocIndex:0},{value:"\u884C\u4E3A\u578B\u6A21\u5F0F\uFF1A \u5BF9\u8C61\u7684\u884C\u4E3A\u7528\u9014",paraId:4,tocIndex:0},{value:" 13 \u2014\u201423",paraId:4,tocIndex:0},{value:"\u4EC0\u4E48\u662F\u5DE5\u5382\u6A21\u5F0F\uFF1F\u5728\u7C7B\u91CC\u5199\u4E00\u4E2A\u9759\u6001\u65B9\u6CD5\uFF0C\u6216\u8005\u662F\u4E13\u95E8\u5199\u4E00\u4E2A\u5DE5\u5382\u7C7B\uFF0C\u90FD\u7B97\u5DE5\u5382\u6A21\u5F0F",paraId:5,tocIndex:1},{value:"\u8FD9\u79CD\u65B9\u6CD5\u901A\u5E38\u7528\u4E8E\u7B80\u5355\u7684\u5BF9\u8C61\u521B\u5EFA\uFF0C\u800C\u4E0D\u9700\u8981\u590D\u6742\u7684\u5BF9\u8C61\u521D\u59CB\u5316\u903B\u8F91",paraId:6,tocIndex:1},{value:"\u6BCF\u6B21\u8C03\u7528\u65F6\u4E0D\u7528\u4F7F\u7528\u6784\u9020\u51FD\u6570\u5199\u4E00\u5806\u7684\u65B9\u6CD5\uFF0C\u76F4\u63A5\u4F7F\u7528getInstance()\u5C31\u53EF\u4EE5\u8C03\u7528",paraId:7,tocIndex:1},{value:"\u4EE5\u4E0B\u662F\u4E00\u4E2A\u4F7F\u7528\u9759\u6001\u65B9\u6CD5\u5B9E\u73B0\u7684\u7B80\u5355\u5DE5\u5382\u6A21\u5F0F\u793A\u4F8B\u3002",paraId:8,tocIndex:1},{value:"\u6211\u4EEC\u5C06\u5B9E\u73B0\u4E00\u4E2A\u5DE5\u5382\u7C7B ",paraId:9,tocIndex:1},{value:"ShapeFactory",paraId:9,tocIndex:1},{value:"\uFF0C\u7528\u4E8E\u521B\u5EFA\u4E0D\u540C\u7C7B\u578B\u7684\u5F62\u72B6\u5BF9\u8C61 (",paraId:9,tocIndex:1},{value:"Circle",paraId:9,tocIndex:1},{value:" \u548C ",paraId:9,tocIndex:1},{value:"Square",paraId:9,tocIndex:1},{value:")\u3002",paraId:9,tocIndex:1},{value:"\u9996\u5148\uFF0C\u6211\u4EEC\u5B9A\u4E49\u4E00\u4E2A ",paraId:10,tocIndex:1},{value:"Shape",paraId:10,tocIndex:1},{value:" \u63A5\u53E3\uFF0C\u4EE5\u53CA\u5B9E\u73B0\u8BE5\u63A5\u53E3\u7684\u5177\u4F53\u7C7B ",paraId:10,tocIndex:1},{value:"Circle",paraId:10,tocIndex:1},{value:" \u548C ",paraId:10,tocIndex:1},{value:"Square",paraId:10,tocIndex:1},{value:"\uFF1A",paraId:10,tocIndex:1},{value:`// Shape.java
public interface Shape {
    void draw();
}


// Circle.java
public class Circle implements Shape {
    @Override
    public void draw() {
        System.out.println("Drawing a Circle");
    }
}


// Square.java
public class Square implements Shape {
    @Override
    public void draw() {
        System.out.println("Drawing a Square");
    }
}
`,paraId:11,tocIndex:1},{value:"\u63A5\u4E0B\u6765\uFF0C\u6211\u4EEC\u521B\u5EFA\u4E00\u4E2A\u5DE5\u5382\u7C7B ",paraId:12,tocIndex:1},{value:"ShapeFactory",paraId:12,tocIndex:1},{value:"\uFF0C\u8BE5\u7C7B\u5305\u542B\u4E00\u4E2A\u9759\u6001\u65B9\u6CD5 ",paraId:12,tocIndex:1},{value:"getShape",paraId:12,tocIndex:1},{value:"\uFF0C\u6839\u636E\u4F20\u5165\u7684\u53C2\u6570\u8FD4\u56DE\u4E0D\u540C\u7684\u5F62\u72B6\u5BF9\u8C61\uFF1A",paraId:12,tocIndex:1},{value:`// ShapeFactory.java
public class ShapeFactory {

    // \u9759\u6001\u65B9\u6CD5\uFF0C\u76F4\u63A5\u8FD4\u56DE\u6307\u5B9A\u7C7B\u578B\u7684Shape\u5BF9\u8C61
    public static Shape getShape(String shapeType) {
        if (shapeType == null) {
            return null;
        }
        if (shapeType.equalsIgnoreCase("CIRCLE")) {
            return new Circle();
        } else if (shapeType.equalsIgnoreCase("SQUARE")) {
            return new Square();
        }
        return null;
    }
}
`,paraId:13,tocIndex:1},{value:"\u80FD\u5206\u51FA\u5206\u4E0D\u540C\u7684\u5DE5\u5382\uFF0C\u4EA7\u751F\u4E0D\u540C\u7684\u4EA7\u54C1\u7EC4\u5408\uFF0C\u4E0D\u540C\u7684\u5DE5\u5382\u53EF\u4EE5\u5199\u4E0D\u540C\u7684\u903B\u8F91",paraId:14,tocIndex:2},{value:"\u4E0B\u9762\u662F\u4E00\u4E2A\u4F7F\u7528\u62BD\u8C61\u5DE5\u5382\u6A21\u5F0F\u7684\u793A\u4F8B\uFF0C\u6211\u4EEC\u5C06\u5B9E\u73B0\u4E00\u4E2A\u5DE5\u5382\u6765\u521B\u5EFA\u4E0D\u540C\u79CD\u7C7B\u7684\u5F62\u72B6\u548C\u989C\u8272\u5BF9\u8C61\u3002",paraId:15,tocIndex:2},{value:"\u9996\u5148\uFF0C\u6211\u4EEC\u5B9A\u4E49\u4E24\u4E2A\u63A5\u53E3\uFF1A",paraId:16,tocIndex:2},{value:"Shape",paraId:16,tocIndex:2},{value:" \u548C ",paraId:16,tocIndex:2},{value:"Color",paraId:16,tocIndex:2},{value:"\uFF0C\u4EE5\u53CA\u5B83\u4EEC\u7684\u5177\u4F53\u5B9E\u73B0\u7C7B\u3002",paraId:16,tocIndex:2},{value:`// Shape.java
public interface Shape {
    void draw();
}

// Circle.java
public class Circle implements Shape {
    @Override
    public void draw() {
        System.out.println("Drawing a Circle");
    }
}

// Square.java
public class Square implements Shape {
    @Override
    public void draw() {
        System.out.println("Drawing a Square");
    }
}

// Rectangle.java
public class Rectangle implements Shape {
    @Override
    public void draw() {
        System.out.println("Drawing a Rectangle");
    }
`,paraId:17,tocIndex:3},{value:`// Color.java
public interface Color {
    void fill();
}

// Red.java
public class Red implements Color {
    @Override
    public void fill() {
        System.out.println("Filling with Red color");
    }
}

// Green.java
public class Green implements Color {
    @Override
    public void fill() {
        System.out.println("Filling with Green color");
    }
}

// Blue.java
public class Blue implements Color {
    @Override
    public void fill() {
        System.out.println("Filling with Blue color");
    }
`,paraId:18,tocIndex:4},{value:"\u6211\u4EEC\u5B9A\u4E49\u4E00\u4E2A\u62BD\u8C61\u5DE5\u5382 ",paraId:19,tocIndex:5},{value:"AbstractFactory",paraId:19,tocIndex:5},{value:"\uFF0C\u5305\u542B\u7528\u4E8E\u521B\u5EFA ",paraId:19,tocIndex:5},{value:"Shape",paraId:19,tocIndex:5},{value:" \u548C ",paraId:19,tocIndex:5},{value:"Color",paraId:19,tocIndex:5},{value:" \u5BF9\u8C61\u7684\u65B9\u6CD5\uFF0C\u5E76\u5B9E\u73B0\u4E24\u4E2A\u5177\u4F53\u5DE5\u5382\u7C7B ",paraId:19,tocIndex:5},{value:"ShapeFactory",paraId:19,tocIndex:5},{value:" \u548C ",paraId:19,tocIndex:5},{value:"ColorFactory",paraId:19,tocIndex:5},{value:"\u3002",paraId:19,tocIndex:5},{value:`// AbstractFactory.java
public abstract class AbstractFactory {
    abstract Shape getShape(String shapeType);
    abstract Color getColor(String colorType);
}

// ShapeFactory.java
public class ShapeFactory extends AbstractFactory {
    @Override
    public Shape getShape(String shapeType) {
        if (shapeType == null) {
            return null;
        }
        if (shapeType.equalsIgnoreCase("CIRCLE")) {
            return new Circle();
        } else if (shapeType.equalsIgnoreCase("SQUARE")) {
            return new Square();
        } else if (shapeType.equalsIgnoreCase("RECTANGLE")) {
            return new Rectangle();
        }
        return null;
    }

    @Override
    public Color getColor(String colorType) {
        return null; // ShapeFactory doesn't handle Color
    }
}

// ColorFactory.java
public class ColorFactory extends AbstractFactory {

    @Override
    public Shape getShape(String shapeType) {
        return null; // ColorFactory doesn't handle Shape
    }

    @Override
    public Color getColor(String colorType) {
        if (colorType == null) {
            return null;
        }
        if (colorType.equalsIgnoreCase("RED")) {
            return new Red();
        } else if (colorType.equalsIgnoreCase("GREEN")) {
            return new Green();
        } else if (colorType.equalsIgnoreCase("BLUE")) {
            return new Blue();
        }
        return null;
    }
}
`,paraId:20,tocIndex:5},{value:"\u6211\u4EEC\u8FD8\u9700\u8981\u4E00\u4E2A\u5DE5\u5382\u751F\u6210\u5668\u7C7B\uFF0C\u7528\u4E8E\u8FD4\u56DE\u5177\u4F53\u7684\u5DE5\u5382\u7C7B\u5B9E\u4F8B\u3002",paraId:21,tocIndex:6},{value:`// FactoryProducer.java
public class FactoryProducer {
    public static AbstractFactory getFactory(String choice) {
        if (choice.equalsIgnoreCase("SHAPE")) {
            return new ShapeFactory();
        } else if (choice.equalsIgnoreCase("COLOR")) {
            return new ColorFactory();
        }
        return null;
    }
}
`,paraId:22,tocIndex:6},{value:"\u6700\u540E\uFF0C\u7F16\u5199\u5BA2\u6237\u7AEF\u4EE3\u7801\uFF0C\u4F7F\u7528\u62BD\u8C61\u5DE5\u5382\u6A21\u5F0F\u521B\u5EFA\u5BF9\u8C61\u3002",paraId:23,tocIndex:7},{value:`// AbstractFactoryPatternDemo.java
public class AbstractFactoryPatternDemo {
    public static void main(String[] args) {
        // \u83B7\u53D6 Shape \u5DE5\u5382
        AbstractFactory shapeFactory = FactoryProducer.getFactory("SHAPE");

        // \u83B7\u53D6 Shape \u5BF9\u8C61\u5E76\u8C03\u7528\u5176 draw \u65B9\u6CD5
        Shape shape1 = shapeFactory.getShape("CIRCLE");
        shape1.draw();

        Shape shape2 = shapeFactory.getShape("RECTANGLE");
        shape2.draw();

        Shape shape3 = shapeFactory.getShape("SQUARE");
        shape3.draw();

        // \u83B7\u53D6 Color \u5DE5\u5382
        AbstractFactory colorFactory = FactoryProducer.getFactory("COLOR");

        // \u83B7\u53D6 Color \u5BF9\u8C61\u5E76\u8C03\u7528\u5176 fill \u65B9\u6CD5
        Color color1 = colorFactory.getColor("RED");
        color1.fill();

        Color color2 = colorFactory.getColor("GREEN");
        color2.fill();

        Color color3 = colorFactory.getColor("BLUE");
        color3.fill();
    }
}
`,paraId:24,tocIndex:7},{value:"Shape \u548C Color \u63A5\u53E3",paraId:25,tocIndex:8},{value:"\uFF1A\u5B9A\u4E49\u4E86 ",paraId:25,tocIndex:8},{value:"draw",paraId:25,tocIndex:8},{value:" \u548C ",paraId:25,tocIndex:8},{value:"fill",paraId:25,tocIndex:8},{value:" \u65B9\u6CD5\uFF0C\u6240\u6709\u5177\u4F53\u7684\u5F62\u72B6\u548C\u989C\u8272\u7C7B\u90FD\u5FC5\u987B\u5B9E\u73B0\u8FD9\u4E9B\u65B9\u6CD5\u3002",paraId:25,tocIndex:8},{value:"\u5177\u4F53\u7684\u5F62\u72B6\u548C\u989C\u8272\u7C7B",paraId:25,tocIndex:8},{value:"\uFF1A\u5B9E\u73B0\u4E86 ",paraId:25,tocIndex:8},{value:"Shape",paraId:25,tocIndex:8},{value:" \u548C ",paraId:25,tocIndex:8},{value:"Color",paraId:25,tocIndex:8},{value:" \u63A5\u53E3\u7684\u5177\u4F53\u7C7B\u3002",paraId:25,tocIndex:8},{value:"\u62BD\u8C61\u5DE5\u5382 AbstractFactory",paraId:25,tocIndex:8},{value:"\uFF1A\u5305\u542B\u7528\u4E8E\u521B\u5EFA ",paraId:25,tocIndex:8},{value:"Shape",paraId:25,tocIndex:8},{value:" \u548C ",paraId:25,tocIndex:8},{value:"Color",paraId:25,tocIndex:8},{value:" \u5BF9\u8C61\u7684\u65B9\u6CD5\u3002\u5177\u4F53\u5DE5\u5382 ",paraId:25,tocIndex:8},{value:"ShapeFactory",paraId:25,tocIndex:8},{value:" \u548C ",paraId:25,tocIndex:8},{value:"ColorFactory",paraId:25,tocIndex:8},{value:" \u5B9E\u73B0\u4E86\u8FD9\u4E9B\u65B9\u6CD5\uFF0C\u4F46\u6BCF\u4E2A\u5DE5\u5382\u7C7B\u53EA\u5904\u7406\u4E00\u79CD\u7C7B\u578B\u7684\u5BF9\u8C61\u3002",paraId:25,tocIndex:8},{value:"\u5DE5\u5382\u751F\u6210\u5668 FactoryProducer",paraId:25,tocIndex:8},{value:"\uFF1A\u63D0\u4F9B\u4E00\u4E2A\u9759\u6001\u65B9\u6CD5\uFF0C\u7528\u4E8E\u83B7\u53D6\u5177\u4F53\u7684\u5DE5\u5382\u7C7B\u5B9E\u4F8B\u3002",paraId:25,tocIndex:8},{value:"\u5BA2\u6237\u7AEF\u4EE3\u7801 AbstractFactoryPatternDemo",paraId:25,tocIndex:8},{value:"\uFF1A\u4F7F\u7528\u62BD\u8C61\u5DE5\u5382\u6A21\u5F0F\u521B\u5EFA\u5F62\u72B6\u548C\u989C\u8272\u5BF9\u8C61\uFF0C\u5E76\u8C03\u7528\u5B83\u4EEC\u7684\u65B9\u6CD5\u3002",paraId:25,tocIndex:8},{value:"\u901A\u8FC7\u4F7F\u7528\u62BD\u8C61\u5DE5\u5382\u6A21\u5F0F\uFF0C\u5BA2\u6237\u7AEF\u4EE3\u7801\u4E0E\u5177\u4F53\u7684\u7C7B\u5B9E\u73B0\u89E3\u8026\uFF0C\u53EF\u4EE5\u8F7B\u677E\u5730\u6269\u5C55\u548C\u7EF4\u62A4\u4EE3\u7801\u3002",paraId:26,tocIndex:8},{value:"\u5355\u4F8B\u6A21\u5F0F\u662F\u4E00\u79CD\u521B\u5EFA\u578B\u8BBE\u8BA1\u6A21\u5F0F\uFF0C\u786E\u4FDD\u4E00\u4E2A\u7C7B\u53EA\u6709\u4E00\u4E2A\u5B9E\u4F8B\uFF0C\u5E76\u63D0\u4F9B\u4E00\u4E2A\u5168\u5C40\u8BBF\u95EE\u70B9\u3002\u5355\u4F8B\u6A21\u5F0F\u4E3B\u8981\u7528\u4E8E\u63A7\u5236\u5B9E\u4F8B\u7684\u521B\u5EFA\uFF0C\u786E\u4FDD\u53EA\u6709\u4E00\u4E2A\u5171\u4EAB\u5B9E\u4F8B\u88AB\u521B\u5EFA\u3002",paraId:27,tocIndex:9},{value:"\u4E0B\u9762\u662F\u4E00\u4E2A\u5355\u4F8B\u6A21\u5F0F\u7684\u793A\u4F8B\uFF0C\u5305\u62EC\u7EBF\u7A0B\u5B89\u5168\u7684\u5B9E\u73B0\u548C\u53CC\u91CD\u68C0\u67E5\u9501\u5B9A\uFF08Double-Checked Locking\uFF09\u4F18\u5316\u3002",paraId:28,tocIndex:9},{value:"\u997F\u6C49\u5F0F\u5355\u4F8B\u6A21\u5F0F\u5728\u7C7B\u52A0\u8F7D\u65F6\u5C31\u521B\u5EFA\u5B9E\u4F8B\uFF0C\u7EBF\u7A0B\u5B89\u5168\uFF0C\u4F46\u53EF\u80FD\u9020\u6210\u8D44\u6E90\u6D6A\u8D39\u3002",paraId:29,tocIndex:10},{value:`public class EagerSingleton {
    // \u5728\u7C7B\u52A0\u8F7D\u65F6\u5C31\u521B\u5EFA\u5B9E\u4F8B
    private static final EagerSingleton instance = new EagerSingleton();

    // \u79C1\u6709\u5316\u6784\u9020\u51FD\u6570\uFF0C\u9632\u6B62\u5916\u90E8\u521B\u5EFA\u5B9E\u4F8B
    private EagerSingleton() {}

    // \u63D0\u4F9B\u5168\u5C40\u8BBF\u95EE\u70B9
    public static EagerSingleton getInstance() {
        return instance;
    }

    // \u793A\u4F8B\u65B9\u6CD5
    public void showMessage() {
        System.out.println("Hello from EagerSingleton!");
    }
}
`,paraId:30,tocIndex:10},{value:"\u61D2\u6C49\u5F0F\u5355\u4F8B\u6A21\u5F0F\u5728\u9700\u8981\u65F6\u624D\u521B\u5EFA\u5B9E\u4F8B\uFF0C\u4F46\u7EBF\u7A0B\u4E0D\u5B89\u5168\u3002",paraId:31,tocIndex:11},{value:`public class LazySingleton {
    // \u5EF6\u8FDF\u52A0\u8F7D\u5B9E\u4F8B
    private static LazySingleton instance;

    // \u79C1\u6709\u5316\u6784\u9020\u51FD\u6570\uFF0C\u9632\u6B62\u5916\u90E8\u521B\u5EFA\u5B9E\u4F8B
    private LazySingleton() {}

    // \u63D0\u4F9B\u5168\u5C40\u8BBF\u95EE\u70B9\uFF0C\u7EBF\u7A0B\u4E0D\u5B89\u5168
    public static LazySingleton getInstance() {
        if (instance == null) {
            instance = new LazySingleton();
        }
        return instance;
    }

    // \u793A\u4F8B\u65B9\u6CD5
    public void showMessage() {
        System.out.println("Hello from LazySingleton!");
    }
}
`,paraId:32,tocIndex:11},{value:"\u4F7F\u7528 ",paraId:33,tocIndex:12},{value:"synchronized",paraId:33,tocIndex:12},{value:" \u5173\u952E\u5B57\u786E\u4FDD\u7EBF\u7A0B\u5B89\u5168\uFF0C\u4F46\u6027\u80FD\u8F83\u4F4E\u3002",paraId:33,tocIndex:12},{value:`public class SynchronizedLazySingleton {
    // \u5EF6\u8FDF\u52A0\u8F7D\u5B9E\u4F8B
    private static SynchronizedLazySingleton instance;

    // \u79C1\u6709\u5316\u6784\u9020\u51FD\u6570\uFF0C\u9632\u6B62\u5916\u90E8\u521B\u5EFA\u5B9E\u4F8B
    private SynchronizedLazySingleton() {}

    // \u63D0\u4F9B\u5168\u5C40\u8BBF\u95EE\u70B9\uFF0C\u7EBF\u7A0B\u5B89\u5168
    public static synchronized SynchronizedLazySingleton getInstance() {
        if (instance == null) {
            instance = new SynchronizedLazySingleton();
        }
        return instance;
    }

    // \u793A\u4F8B\u65B9\u6CD5
    public void showMessage() {
        System.out.println("Hello from SynchronizedLazySingleton!");
    }
}
`,paraId:34,tocIndex:12},{value:"\u53CC\u91CD\u68C0\u67E5\u9501\u5B9A\u5728\u4FDD\u6301\u7EBF\u7A0B\u5B89\u5168\u7684\u540C\u65F6\u63D0\u9AD8\u4E86\u6027\u80FD\u3002",paraId:35,tocIndex:13},{value:`public class DoubleCheckedLockingSingleton {
    // \u4F7F\u7528 volatile \u786E\u4FDD\u53D8\u91CF\u7684\u53EF\u89C1\u6027\u548C\u6709\u5E8F\u6027
    private static volatile DoubleCheckedLockingSingleton instance;

    // \u79C1\u6709\u5316\u6784\u9020\u51FD\u6570\uFF0C\u9632\u6B62\u5916\u90E8\u521B\u5EFA\u5B9E\u4F8B
    private DoubleCheckedLockingSingleton() {}

    // \u63D0\u4F9B\u5168\u5C40\u8BBF\u95EE\u70B9\uFF0C\u7EBF\u7A0B\u5B89\u5168\u4E14\u9AD8\u6548
	// \u5DF2\u7ECF\u521B\u5EFA\u7684\u8BDD\u5C31\u76F4\u63A5\u83B7\u53D6\u4E86\u4E0D\u9700\u8981\u7ED9\u65B9\u6CD5\u4E0A\u9501
    public static DoubleCheckedLockingSingleton getInstance() {
        if (instance == null) {
            synchronized (DoubleCheckedLockingSingleton.class) {
                if (instance == null) {
                    instance = new DoubleCheckedLockingSingleton();
                }
            }
        }
        return instance;
    }

    // \u793A\u4F8B\u65B9\u6CD5
    public void showMessage() {
        System.out.println("Hello from DoubleCheckedLockingSingleton!");
    }
}
`,paraId:36,tocIndex:13},{value:"\u5229\u7528\u7C7B\u52A0\u8F7D\u673A\u5236\u5B9E\u73B0\u61D2\u52A0\u8F7D\uFF0C\u7EBF\u7A0B\u5B89\u5168\u4E14\u9AD8\u6548\u3002",paraId:37,tocIndex:14},{value:`public class StaticInnerClassSingleton {
    // \u79C1\u6709\u5316\u6784\u9020\u51FD\u6570\uFF0C\u9632\u6B62\u5916\u90E8\u521B\u5EFA\u5B9E\u4F8B
    private StaticInnerClassSingleton() {}

    // \u9759\u6001\u5185\u90E8\u7C7B\uFF0C\u6301\u6709\u5355\u4F8B\u5B9E\u4F8B
    private static class SingletonHelper {
        private static final StaticInnerClassSingleton INSTANCE = new StaticInnerClassSingleton();
    }

    // \u63D0\u4F9B\u5168\u5C40\u8BBF\u95EE\u70B9
    public static StaticInnerClassSingleton getInstance() {
        return SingletonHelper.INSTANCE;
    }

    // \u793A\u4F8B\u65B9\u6CD5
    public void showMessage() {
        System.out.println("Hello from StaticInnerClassSingleton!");
    }
}
`,paraId:38,tocIndex:14},{value:"\u5229\u7528\u679A\u4E3E\u5B9E\u73B0\u5355\u4F8B\u6A21\u5F0F\uFF0C\u7EBF\u7A0B\u5B89\u5168\u4E14\u9632\u6B62\u53CD\u5E8F\u5217\u5316\u521B\u5EFA\u65B0\u5B9E\u4F8B\u3002",paraId:39,tocIndex:15},{value:`public enum EnumSingleton {
    INSTANCE;

    // \u793A\u4F8B\u65B9\u6CD5
    public void showMessage() {
        System.out.println("Hello from EnumSingleton!");
    }
}
`,paraId:40,tocIndex:15},{value:`java\u590D\u5236\u4EE3\u7801public class SingletonDemo {
    public static void main(String[] args) {
        // \u4F7F\u7528\u997F\u6C49\u5F0F\u5355\u4F8B
        EagerSingleton eagerInstance = EagerSingleton.getInstance();
        eagerInstance.showMessage();

        // \u4F7F\u7528\u61D2\u6C49\u5F0F\u5355\u4F8B
        LazySingleton lazyInstance = LazySingleton.getInstance();
        lazyInstance.showMessage();

        // \u4F7F\u7528\u7EBF\u7A0B\u5B89\u5168\u7684\u61D2\u6C49\u5F0F\u5355\u4F8B
        SynchronizedLazySingleton synchronizedLazyInstance = SynchronizedLazySingleton.getInstance();
        synchronizedLazyInstance.showMessage();

        // \u4F7F\u7528\u53CC\u91CD\u68C0\u67E5\u9501\u5B9A\u5355\u4F8B
        DoubleCheckedLockingSingleton doubleCheckedInstance = DoubleCheckedLockingSingleton.getInstance();
        doubleCheckedInstance.showMessage();

        // \u4F7F\u7528\u9759\u6001\u5185\u90E8\u7C7B\u5355\u4F8B
        StaticInnerClassSingleton staticInnerClassInstance = StaticInnerClassSingleton.getInstance();
        staticInnerClassInstance.showMessage();

        // \u4F7F\u7528\u679A\u4E3E\u5355\u4F8B
        EnumSingleton enumInstance = EnumSingleton.INSTANCE;
        enumInstance.showMessage();
    }
}
`,paraId:41,tocIndex:16},{value:"\u539F\u578B\u6A21\u5F0F\u662F\u4E00\u79CD\u521B\u5EFA\u578B\u8BBE\u8BA1\u6A21\u5F0F\uFF0C\u5B83\u5141\u8BB8\u590D\u5236\u73B0\u6709\u5BF9\u8C61\u800C\u65E0\u9700\u4F7F\u4EE3\u7801\u4F9D\u8D56\u5B83\u4EEC\u6240\u5C5E\u7684\u7C7B\u3002\u539F\u578B\u6A21\u5F0F\u7684\u6838\u5FC3\u662F\u63D0\u4F9B\u4E00\u4E2A\u514B\u9686\u65B9\u6CD5\uFF0C\u901A\u5E38\u5B9E\u73B0 ",paraId:42,tocIndex:17},{value:"Cloneable",paraId:42,tocIndex:17},{value:" \u63A5\u53E3\u6216\u5B9A\u4E49\u4E00\u4E2A\u81EA\u5B9A\u4E49\u7684\u514B\u9686\u65B9\u6CD5\u3002",paraId:42,tocIndex:17},{value:"\u4E0B\u9762\u662F\u4E00\u4E2A\u7B80\u5355\u7684\u539F\u578B\u6A21\u5F0F\u7684\u793A\u4F8B\uFF0C\u901A\u8FC7\u514B\u9686\u73B0\u6709\u5BF9\u8C61\u6765\u521B\u5EFA\u65B0\u5BF9\u8C61\u3002",paraId:43,tocIndex:17},{value:"\u9996\u5148\uFF0C\u5B9A\u4E49\u4E00\u4E2A\u5305\u542B\u514B\u9686\u65B9\u6CD5\u7684\u63A5\u53E3\u6216\u62BD\u8C61\u7C7B\uFF1A",paraId:44,tocIndex:18},{value:`public interface Prototype extends Cloneable {
    Prototype clone();
}
`,paraId:45,tocIndex:18},{value:"\u5B9E\u73B0\u5177\u4F53\u7684\u539F\u578B\u7C7B\u5E76\u63D0\u4F9B\u514B\u9686\u65B9\u6CD5\uFF1A",paraId:46,tocIndex:19},{value:`public class ConcretePrototype implements Prototype {
    private String name;
    private int age;

    public ConcretePrototype(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // \u5B9E\u73B0 clone \u65B9\u6CD5
    @Override
    public ConcretePrototype clone() {
        try {
            // \u6D45\u62F7\u8D1D
            return (ConcretePrototype) super.clone();
        } catch (CloneNotSupportedException e) {
            // \u5982\u679C\u4E0D\u652F\u6301\u514B\u9686\uFF0C\u5219\u629B\u51FA\u8FD0\u884C\u65F6\u5F02\u5E38
            throw new RuntimeException(e);
        }
    }
}
`,paraId:47,tocIndex:19},{value:"\u4F7F\u7528\u539F\u578B\u6A21\u5F0F\u521B\u5EFA\u5BF9\u8C61\uFF1A",paraId:48,tocIndex:20},{value:`public class PrototypeDemo {
    public static void main(String[] args) {
        // \u521B\u5EFA\u4E00\u4E2A\u539F\u578B\u5B9E\u4F8B
        ConcretePrototype original = new ConcretePrototype("John Doe", 30);
        System.out.println("Original: " + original);

        // \u901A\u8FC7\u514B\u9686\u65B9\u6CD5\u521B\u5EFA\u4E00\u4E2A\u65B0\u5B9E\u4F8B
        ConcretePrototype clone = original.clone();
        System.out.println("Clone: " + clone);

        // \u4FEE\u6539\u514B\u9686\u5BF9\u8C61\u7684\u5C5E\u6027\uFF0C\u4E0D\u5F71\u54CD\u539F\u578B\u5BF9\u8C61
        clone.setName("Jane Doe");
        clone.setAge(25);
        System.out.println("Modified Clone: " + clone);
        System.out.println("Original after clone modification: " + original);
    }
}
`,paraId:49,tocIndex:20},{value:"\u6784\u9020\u5668\u6A21\u5F0F\uFF08Builder Pattern\uFF09\u662F\u4E00\u79CD\u521B\u5EFA\u578B\u8BBE\u8BA1\u6A21\u5F0F\uFF0C\u5B83\u5141\u8BB8\u901A\u8FC7\u9010\u6B65\u6784\u5EFA\u590D\u6742\u5BF9\u8C61\u7684\u65B9\u5F0F\u6765\u521B\u5EFA\u5BF9\u8C61\uFF0C\u800C\u4E0D\u9700\u8981\u76F4\u63A5\u8C03\u7528\u6784\u9020\u5668\u3002\u6784\u9020\u5668\u6A21\u5F0F\u53EF\u4EE5\u5C06\u4E00\u4E2A\u590D\u6742\u5BF9\u8C61\u7684\u6784\u5EFA\u8FC7\u7A0B\u4E0E\u5176\u8868\u793A\u5206\u79BB\uFF0C\u4F7F\u5F97\u540C\u6837\u7684\u6784\u5EFA\u8FC7\u7A0B\u53EF\u4EE5\u521B\u5EFA\u4E0D\u540C\u7684\u8868\u793A",paraId:50,tocIndex:21},{value:"\u4E0B\u9762\u662F\u4E00\u4E2A\u4F7F\u7528\u6784\u9020\u5668\u6A21\u5F0F\u521B\u5EFA\u590D\u6742\u5BF9\u8C61\u7684\u793A\u4F8B\u3002\u6211\u4EEC\u5C06\u521B\u5EFA\u4E00\u4E2A ",paraId:51,tocIndex:21},{value:"House",paraId:51,tocIndex:21},{value:" \u7C7B\uFF0C\u5E76\u901A\u8FC7 ",paraId:51,tocIndex:21},{value:"HouseBuilder",paraId:51,tocIndex:21},{value:" \u6765\u9010\u6B65\u6784\u5EFA\u8FD9\u4E2A\u5BF9\u8C61\u3002",paraId:51,tocIndex:21},{value:"House",paraId:0},{value:`public class House {
    private String foundation;
    private String structure;
    private String roof;
    private String interior;

    private House() {}

    public static class HouseBuilder {
        private String foundation;
        private String structure;
        private String roof;
        private String interior;

        //\u901A\u8FC7\u4E0D\u65AD\u7684return this \u6765\u8FBE\u5230\u94FE\u5F0F\u8C03\u7528
        public HouseBuilder setFoundation(String foundation) {
            this.foundation = foundation;
            return this;
        }

        public HouseBuilder setStructure(String structure) {
            this.structure = structure;
            return this;
        }

        public HouseBuilder setRoof(String roof) {
            this.roof = roof;
            return this;
        }

        public HouseBuilder setInterior(String interior) {
            this.interior = interior;
            return this;
        }

        public House build() {
            House house = new House();
            house.foundation = this.foundation;
            house.structure = this.structure;
            house.roof = this.roof;
            house.interior = this.interior;
            return house;
        }
    }
}
`,paraId:52,tocIndex:22},{value:"House",paraId:0},{value:`public class BuilderPatternDemo {
    public static void main(String[] args) {
        House house = new House.HouseBuilder()
                .setFoundation("Concrete, brick, and stone")
                .setStructure("Wood and brick")
                .setRoof("Shingles")
                .setInterior("Drywall and paint")
                .build();

        System.out.println(house);
    }
}
`,paraId:53,tocIndex:23},{value:"\u9002\u914D\u5668\u6A21\u5F0F\uFF08Adapter Pattern\uFF09\u662F\u4E00\u79CD\u7ED3\u6784\u578B\u8BBE\u8BA1\u6A21\u5F0F\uFF0C\u5B83\u5141\u8BB8\u5C06\u4E00\u4E2A\u7C7B\u7684\u63A5\u53E3\u8F6C\u6362\u6210\u5BA2\u6237\u7AEF\u671F\u671B\u7684\u53E6\u4E00\u4E2A\u63A5\u53E3\uFF0C\u4F7F\u5F97\u539F\u672C\u7531\u4E8E\u63A5\u53E3\u4E0D\u517C\u5BB9\u800C\u4E0D\u80FD\u4E00\u8D77\u5DE5\u4F5C\u7684\u7C7B\u53EF\u4EE5\u534F\u540C\u5DE5\u4F5C\u3002\u9002\u914D\u5668\u6A21\u5F0F\u6709\u4E24\u79CD\u4E3B\u8981\u7684\u5B9E\u73B0\u65B9\u5F0F\uFF1A\u7C7B\u9002\u914D\u5668\u548C\u5BF9\u8C61\u9002\u914D\u5668",paraId:54,tocIndex:24},{value:"\u4E0B\u9762\u662F\u4E00\u4E2A\u5BF9\u8C61\u9002\u914D\u5668\u6A21\u5F0F\u7684\u793A\u4F8B\uFF0C\u6F14\u793A\u5982\u4F55\u4F7F\u7528\u9002\u914D\u5668\u6A21\u5F0F\u4F7F\u5F97\u4E0D\u540C\u63A5\u53E3\u7684\u7C7B\u53EF\u4EE5\u4E00\u8D77\u5DE5\u4F5C\u3002\u5047\u8BBE\u6211\u4EEC\u6709\u4E00\u4E2A\u73B0\u6709\u7684\u97F3\u9891\u64AD\u653E\u5668\u7CFB\u7EDF\uFF0C\u5B83\u53EF\u4EE5\u64AD\u653E MP3 \u6587\u4EF6\uFF0C\u4F46\u6211\u4EEC\u5E0C\u671B\u5B83\u80FD\u591F\u64AD\u653E MP4 \u548C VLC \u683C\u5F0F\u7684\u6587\u4EF6\u3002",paraId:55,tocIndex:25},{value:"\u5B9A\u4E49\u64AD\u653E\u5668\u63A5\u53E3\u548C\u5177\u4F53\u64AD\u653E\u5668\u7C7B",paraId:56,tocIndex:25},{value:"\u9996\u5148\uFF0C\u5B9A\u4E49\u4E00\u4E2A\u64AD\u653E\u5668\u63A5\u53E3 ",paraId:57,tocIndex:25},{value:"MediaPlayer",paraId:57,tocIndex:25},{value:" \u548C\u4E00\u4E2A\u9AD8\u7EA7\u5A92\u4F53\u64AD\u653E\u5668\u63A5\u53E3 ",paraId:57,tocIndex:25},{value:"AdvancedMediaPlayer",paraId:57,tocIndex:25},{value:"\uFF0C\u5E76\u5B9E\u73B0\u5B83\u4EEC\u3002",paraId:57,tocIndex:25},{value:`// \u64AD\u653E\u5668\u63A5\u53E3
public interface MediaPlayer {
    void play(String audioType, String fileName);
}

// \u9AD8\u7EA7\u5A92\u4F53\u64AD\u653E\u5668\u63A5\u53E3
public interface AdvancedMediaPlayer {
    void playVlc(String fileName);
    void playMp4(String fileName);
}
`,paraId:58,tocIndex:25},{value:"\u5B9E\u73B0",paraId:59,tocIndex:25},{value:`// \u5177\u4F53\u7684 MP4 \u64AD\u653E\u5668
public class Mp4Player implements AdvancedMediaPlayer {
    @Override
    public void playVlc(String fileName) {
        // \u4EC0\u4E48\u4E5F\u4E0D\u505A
    }

    @Override
    public void playMp4(String fileName) {
        System.out.println("Playing mp4 file. Name: " + fileName);
    }
}

// \u5177\u4F53\u7684 VLC \u64AD\u653E\u5668
public class VlcPlayer implements AdvancedMediaPlayer {
    @Override
    public void playVlc(String fileName) {
        System.out.println("Playing vlc file. Name: " + fileName);
    }

    @Override
    public void playMp4(String fileName) {
        // \u4EC0\u4E48\u4E5F\u4E0D\u505A
    }
}
`,paraId:60,tocIndex:25},{value:"\u521B\u5EFA\u9002\u914D\u5668\u7C7B",paraId:61,tocIndex:25},{value:"\u63A5\u4E0B\u6765\uFF0C\u521B\u5EFA\u4E00\u4E2A\u9002\u914D\u5668\u7C7B ",paraId:62,tocIndex:25},{value:"MediaAdapter",paraId:62,tocIndex:25},{value:"\uFF0C\u5B83\u5B9E\u73B0 ",paraId:62,tocIndex:25},{value:"MediaPlayer",paraId:62,tocIndex:25},{value:" \u63A5\u53E3\uFF0C\u5E76\u80FD\u591F\u64AD\u653E MP4 \u548C VLC \u683C\u5F0F\u7684\u6587\u4EF6\u3002",paraId:62,tocIndex:25},{value:`public class MediaAdapter implements MediaPlayer {

    AdvancedMediaPlayer advancedMusicPlayer;

    public MediaAdapter(String audioType) {
        if (audioType.equalsIgnoreCase("vlc")) {
            advancedMusicPlayer = new VlcPlayer();
        } else if (audioType.equalsIgnoreCase("mp4")) {
            advancedMusicPlayer = new Mp4Player();
        }
    }

    @Override
    public void play(String audioType, String fileName) {
        if (audioType.equalsIgnoreCase("vlc")) {
            advancedMusicPlayer.playVlc(fileName);
        } else if (audioType.equalsIgnoreCase("mp4")) {
            advancedMusicPlayer.playMp4(fileName);
        }
    }
}
`,paraId:63,tocIndex:25},{value:"\u521B\u5EFA\u4F7F\u7528\u9002\u914D\u5668\u7684\u97F3\u9891\u64AD\u653E\u5668",paraId:64,tocIndex:25},{value:"\u6700\u540E\uFF0C\u521B\u5EFA\u4E00\u4E2A\u5B9E\u73B0 ",paraId:65,tocIndex:25},{value:"MediaPlayer",paraId:65,tocIndex:25},{value:" \u63A5\u53E3\u7684 ",paraId:65,tocIndex:25},{value:"AudioPlayer",paraId:65,tocIndex:25},{value:" \u7C7B\uFF0C\u5B83\u53EF\u4EE5\u4F7F\u7528\u9002\u914D\u5668\u6765\u64AD\u653E\u4E0D\u540C\u683C\u5F0F\u7684\u6587\u4EF6\u3002",paraId:65,tocIndex:25},{value:`public class AudioPlayer implements MediaPlayer {
    MediaAdapter mediaAdapter;

    @Override
    public void play(String audioType, String fileName) {
        // \u5185\u7F6E\u652F\u6301 mp3 \u64AD\u653E
        if (audioType.equalsIgnoreCase("mp3")) {
            System.out.println("Playing mp3 file. Name: " + fileName);
        }
        // mediaAdapter \u63D0\u4F9B\u5BF9 vlc \u548C mp4 \u6587\u4EF6\u7684\u652F\u6301
        // \u76F8\u5F53\u4E8E\u8FD9\u4E2AAudioPlayer\u7C7B\u91CC\u6709\u4E00\u4E2A\u5BF9MediaAdapter\u7684\u5F15\u7528
        else if (audioType.equalsIgnoreCase("vlc") || audioType.equalsIgnoreCase("mp4")) {
            mediaAdapter = new MediaAdapter(audioType);
            mediaAdapter.play(audioType, fileName);
        } else {
            System.out.println("Invalid media. " + audioType + " format not supported");
        }
    }
}
`,paraId:66,tocIndex:25},{value:"\u4F7F\u7528\u9002\u914D\u5668\u6A21\u5F0F",paraId:67,tocIndex:25},{value:"\u4E0B\u9762\u662F\u5982\u4F55\u4F7F\u7528 ",paraId:68,tocIndex:25},{value:"AudioPlayer",paraId:68,tocIndex:25},{value:" \u7C7B\u6765\u64AD\u653E\u4E0D\u540C\u683C\u5F0F\u7684\u97F3\u9891\u6587\u4EF6\u7684\u793A\u4F8B\u3002",paraId:68,tocIndex:25},{value:`public class AdapterPatternDemo {
    public static void main(String[] args) {
        AudioPlayer audioPlayer = new AudioPlayer();

        audioPlayer.play("mp3", "song.mp3");
        audioPlayer.play("mp4", "video.mp4");
        audioPlayer.play("vlc", "movie.vlc");
        audioPlayer.play("avi", "my_movie.avi");
    }
}
`,paraId:69,tocIndex:25},{value:"MediaPlayer \u63A5\u53E3",paraId:70,tocIndex:26},{value:"\uFF1A\u8FD9\u662F\u4E00\u4E2A\u64AD\u653E\u5668\u63A5\u53E3\uFF0C\u5B9A\u4E49\u4E86 ",paraId:70,tocIndex:26},{value:"play",paraId:70,tocIndex:26},{value:" \u65B9\u6CD5\u3002",paraId:70,tocIndex:26},{value:"AdvancedMediaPlayer \u63A5\u53E3",paraId:70,tocIndex:26},{value:"\uFF1A\u8FD9\u662F\u4E00\u4E2A\u9AD8\u7EA7\u5A92\u4F53\u64AD\u653E\u5668\u63A5\u53E3\uFF0C\u5B9A\u4E49\u4E86\u64AD\u653E VLC \u548C MP4 \u6587\u4EF6\u7684\u65B9\u6CD5\u3002",paraId:70,tocIndex:26},{value:"Mp4Player \u548C VlcPlayer \u7C7B",paraId:70,tocIndex:26},{value:"\uFF1A\u8FD9\u4E9B\u662F\u5177\u4F53\u7684\u9AD8\u7EA7\u5A92\u4F53\u64AD\u653E\u5668\u7C7B\uFF0C\u5B9E\u73B0\u4E86 ",paraId:70,tocIndex:26},{value:"AdvancedMediaPlayer",paraId:70,tocIndex:26},{value:" \u63A5\u53E3\uFF0C\u53EF\u4EE5\u5206\u522B\u64AD\u653E MP4 \u548C VLC \u6587\u4EF6\u3002",paraId:70,tocIndex:26},{value:"MediaAdapter \u7C7B",paraId:70,tocIndex:26},{value:"\uFF1A\u8FD9\u662F\u9002\u914D\u5668\u7C7B\uFF0C\u5B9E\u73B0\u4E86 ",paraId:70,tocIndex:26},{value:"MediaPlayer",paraId:70,tocIndex:26},{value:" \u63A5\u53E3\uFF0C\u5E76\u4F7F\u7528 ",paraId:70,tocIndex:26},{value:"AdvancedMediaPlayer",paraId:70,tocIndex:26},{value:" \u5BF9\u8C61\u6765\u64AD\u653E\u4E0D\u540C\u683C\u5F0F\u7684\u6587\u4EF6\u3002",paraId:70,tocIndex:26},{value:"AudioPlayer \u7C7B",paraId:70,tocIndex:26},{value:"\uFF1A\u8FD9\u662F\u4E00\u4E2A\u5B9E\u73B0 ",paraId:70,tocIndex:26},{value:"MediaPlayer",paraId:70,tocIndex:26},{value:" \u63A5\u53E3\u7684\u7C7B\uFF0C\u5B83\u5185\u7F6E\u652F\u6301 MP3 \u6587\u4EF6\uFF0C\u5E76\u901A\u8FC7\u9002\u914D\u5668\u652F\u6301 VLC \u548C MP4 \u6587\u4EF6\u3002",paraId:70,tocIndex:26},{value:"AdapterPatternDemo \u7C7B",paraId:70,tocIndex:26},{value:"\uFF1A\u8FD9\u662F\u4E00\u4E2A\u6F14\u793A\u5982\u4F55\u4F7F\u7528 ",paraId:70,tocIndex:26},{value:"AudioPlayer",paraId:70,tocIndex:26},{value:" \u7C7B\u6765\u64AD\u653E\u4E0D\u540C\u683C\u5F0F\u6587\u4EF6\u7684\u793A\u4F8B\u7A0B\u5E8F\u3002",paraId:70,tocIndex:26},{value:"\u6865\u63A5\u6A21\u5F0F\uFF08Bridge Pattern\uFF09\u662F\u4E00\u79CD\u7ED3\u6784\u578B\u8BBE\u8BA1\u6A21\u5F0F\uFF0C\u5B83\u901A\u8FC7\u5C06\u62BD\u8C61\u90E8\u5206\u4E0E\u5B9E\u73B0\u90E8\u5206\u5206\u79BB\uFF0C\u4F7F\u5B83\u4EEC\u53EF\u4EE5\u72EC\u7ACB\u5730\u53D8\u5316\u3002\u6865\u63A5\u6A21\u5F0F\u4F7F\u7528\u7EC4\u5408\u800C\u4E0D\u662F\u7EE7\u627F\uFF0C\u4F7F\u5F97\u4E24\u4E2A\u7EF4\u5EA6\u7684\u53D8\u5316\u80FD\u591F\u72EC\u7ACB\u8FDB\u884C\u3002\u6865\u63A5\u6A21\u5F0F\u7684\u5178\u578B\u5E94\u7528\u573A\u666F\u662F\u5904\u7406\u5177\u6709\u591A\u4E2A\u7EF4\u5EA6\u53D8\u5316\u7684\u590D\u6742\u7CFB\u7EDF\u3002",paraId:71,tocIndex:27},{value:"\u4E0B\u9762\u662F\u4E00\u4E2A\u6865\u63A5\u6A21\u5F0F\u7684\u793A\u4F8B\uFF0C\u6F14\u793A\u5982\u4F55\u4F7F\u7528\u8BE5\u6A21\u5F0F\u6765\u8BBE\u8BA1\u4E00\u4E2A\u5F62\u72B6\u548C\u989C\u8272\u7EC4\u5408\u7684\u7CFB\u7EDF",paraId:72,tocIndex:27},{value:"\u9996\u5148\uFF0C\u5B9A\u4E49\u4E00\u4E2A\u989C\u8272\u63A5\u53E3 ",paraId:73,tocIndex:28},{value:"Color",paraId:73,tocIndex:28},{value:" \u4EE5\u53CA\u51E0\u4E2A\u5177\u4F53\u7684\u989C\u8272\u5B9E\u73B0\u7C7B\u3002",paraId:73,tocIndex:28},{value:`// \u989C\u8272\u63A5\u53E3
public interface Color {
    void applyColor();
}

// \u5177\u4F53\u7684\u7EA2\u8272\u5B9E\u73B0\u7C7B
public class Red implements Color {
    @Override
    public void applyColor() {
        System.out.println("Red color");
    }
}

// \u5177\u4F53\u7684\u7EFF\u8272\u5B9E\u73B0\u7C7B
public class Green implements Color {
    @Override
    public void applyColor() {
        System.out.println("Green color");
    }
}

// \u5177\u4F53\u7684\u84DD\u8272\u5B9E\u73B0\u7C7B
public class Blue implements Color {
    @Override
    public void applyColor() {
        System.out.println("Blue color");
    }
}
`,paraId:74,tocIndex:28},{value:"\u63A5\u4E0B\u6765\uFF0C\u5B9A\u4E49\u4E00\u4E2A\u5F62\u72B6\u62BD\u8C61\u7C7B ",paraId:75,tocIndex:29},{value:"Shape",paraId:75,tocIndex:29},{value:"\uFF0C\u5E76\u5728\u8BE5\u7C7B\u4E2D\u7EC4\u5408\u989C\u8272\u63A5\u53E3\u3002\u7136\u540E\uFF0C\u5B9A\u4E49\u5177\u4F53\u7684\u5F62\u72B6\u7C7B\uFF0C\u5982 ",paraId:75,tocIndex:29},{value:"Circle",paraId:75,tocIndex:29},{value:" \u548C ",paraId:75,tocIndex:29},{value:"Square",paraId:75,tocIndex:29},{value:"\u3002",paraId:75,tocIndex:29},{value:`// \u5F62\u72B6\u62BD\u8C61\u7C7B
public abstract class Shape {
    protected Color color;

    public Shape(Color color) {
        this.color = color;
    }

    public abstract void draw();
}

// \u5177\u4F53\u7684\u5706\u5F62\u5B9E\u73B0\u7C7B
public class Circle extends Shape {
    public Circle(Color color) {
        super(color);
    }

    @Override
    public void draw() {
        System.out.print("Circle drawn with color ");
        color.applyColor();
    }
}

// \u5177\u4F53\u7684\u6B63\u65B9\u5F62\u5B9E\u73B0\u7C7B
public class Square extends Shape {
    public Square(Color color) {
        super(color);
    }

    @Override
    public void draw() {
        System.out.print("Square drawn with color ");
        color.applyColor();
    }
}
`,paraId:76,tocIndex:29},{value:"\u4E0B\u9762\u662F\u5982\u4F55\u4F7F\u7528\u6865\u63A5\u6A21\u5F0F\u7684\u793A\u4F8B\u3002",paraId:77,tocIndex:30},{value:`public class BridgePatternDemo {
    public static void main(String[] args) {
        Shape redCircle = new Circle(new Red());
        Shape greenSquare = new Square(new Green());
        Shape blueCircle = new Circle(new Blue());

        redCircle.draw();
        greenSquare.draw();
        blueCircle.draw();
    }
}
`,paraId:78,tocIndex:30},{value:"\u901A\u8FC7\u4F7F\u7528\u6865\u63A5\u6A21\u5F0F\uFF0C\u6211\u4EEC\u53EF\u4EE5\u8F7B\u677E\u5730\u6269\u5C55\u5F62\u72B6\u548C\u989C\u8272\uFF0C\u800C\u65E0\u9700\u4FEE\u6539\u73B0\u6709\u7684\u4EE3\u7801\u3002\u65B0\u6DFB\u52A0\u7684\u5F62\u72B6\u6216\u989C\u8272\u53EF\u4EE5\u72EC\u7ACB\u8FDB\u884C\u6269\u5C55\uFF0C\u4ECE\u800C\u63D0\u9AD8\u4E86\u7CFB\u7EDF\u7684\u7075\u6D3B\u6027\u548C\u53EF\u7EF4\u62A4\u6027\u3002",paraId:79,tocIndex:30},{value:"\u7EC4\u5408\u6A21\u5F0F\uFF08Composite Pattern\uFF09\u662F\u4E00\u79CD\u7ED3\u6784\u578B\u8BBE\u8BA1\u6A21\u5F0F\uFF0C\u5B83\u4F7F\u4F60\u80FD\u591F",paraId:80,tocIndex:31},{value:"\u5C06\u5BF9\u8C61\u7EC4\u5408\u6210\u6811\u5F62\u7ED3\u6784\u6765\u8868\u793A\u201C\u90E8\u5206-\u6574\u4F53\u201D\u7684\u5C42\u6B21\u7ED3\u6784",paraId:80,tocIndex:31},{value:"\u3002\u7EC4\u5408\u6A21\u5F0F\u4F7F\u5F97\u7528\u6237\u5BF9\u5355\u4E2A\u5BF9\u8C61\u548C\u7EC4\u5408\u5BF9\u8C61\u7684\u4F7F\u7528\u5177\u6709\u4E00\u81F4\u6027\u3002",paraId:80,tocIndex:31},{value:"\u4E0B\u9762\u662F\u4E00\u4E2A\u7EC4\u5408\u6A21\u5F0F\u7684\u793A\u4F8B\uFF0C\u6F14\u793A\u5982\u4F55\u4F7F\u7528\u8BE5\u6A21\u5F0F\u6765\u8BBE\u8BA1\u4E00\u4E2A\u5305\u542B\u5404\u79CD\u6587\u4EF6\u548C\u6587\u4EF6\u5939\u7684\u7CFB\u7EDF\u3002",paraId:81,tocIndex:31},{value:"\u9996\u5148\uFF0C\u5B9A\u4E49\u4E00\u4E2A\u7EC4\u4EF6\u63A5\u53E3 ",paraId:82,tocIndex:32},{value:"FileSystemComponent",paraId:82,tocIndex:32},{value:"\uFF0C\u5B83\u5305\u542B\u6587\u4EF6\u548C\u6587\u4EF6\u5939\u7684\u901A\u7528\u64CD\u4F5C\u3002",paraId:82,tocIndex:32},{value:`// \u6587\u4EF6\u7CFB\u7EDF\u7EC4\u4EF6\u63A5\u53E3
public interface FileSystemComponent {
    void showDetails();
}
`,paraId:83,tocIndex:32},{value:"\u63A5\u4E0B\u6765\uFF0C\u5B9A\u4E49\u53F6\u5B50\u8282\u70B9\u7C7B ",paraId:84,tocIndex:33},{value:"File",paraId:84,tocIndex:33},{value:"\uFF0C\u5B83\u8868\u793A\u6587\u4EF6\u7CFB\u7EDF\u4E2D\u7684\u6587\u4EF6\u3002",paraId:84,tocIndex:33},{value:`// \u6587\u4EF6\u7C7B
public class File implements FileSystemComponent {
    private String name;

    public File(String name) {
        this.name = name;
    }

    @Override
    public void showDetails() {
        System.out.println("File: " + name);
    }
}
`,paraId:85,tocIndex:33},{value:"\u7136\u540E\uFF0C\u5B9A\u4E49\u590D\u5408\u8282\u70B9\u7C7B ",paraId:86,tocIndex:34},{value:"Folder",paraId:86,tocIndex:34},{value:"\uFF0C\u5B83\u53EF\u4EE5\u5305\u542B\u6587\u4EF6\u6216\u5176\u4ED6\u6587\u4EF6\u5939\u3002",paraId:86,tocIndex:34},{value:`// \u6587\u4EF6\u5939\u7C7B
public class Folder implements FileSystemComponent {
    private String name;
    private List<FileSystemComponent> components = new ArrayList<>();

    public Folder(String name) {
        this.name = name;
    }

    public void addComponent(FileSystemComponent component) {
        components.add(component);
    }

    public void removeComponent(FileSystemComponent component) {
        components.remove(component);
    }

    @Override
    public void showDetails() {
        System.out.println("Folder: " + name);
        for (FileSystemComponent component : components) {
            component.showDetails();
        }
    }
}
`,paraId:87,tocIndex:34},{value:"\u4E0B\u9762\u662F\u5982\u4F55\u4F7F\u7528\u7EC4\u5408\u6A21\u5F0F\u7684\u793A\u4F8B\u3002",paraId:88,tocIndex:35},{value:`public class CompositePatternDemo {
    public static void main(String[] args) {
        // \u521B\u5EFA\u6587\u4EF6
        File file1 = new File("file1.txt");
        File file2 = new File("file2.txt");
        File file3 = new File("file3.txt");

        // \u521B\u5EFA\u6587\u4EF6\u5939
        Folder folder1 = new Folder("folder1");
        Folder folder2 = new Folder("folder2");
        Folder folder3 = new Folder("folder3");

        // \u7EC4\u5408\u6587\u4EF6\u548C\u6587\u4EF6\u5939
        folder1.addComponent(file1);
        folder1.addComponent(file2);

        folder2.addComponent(file3);

        folder3.addComponent(folder1);
        folder3.addComponent(folder2);

        // \u663E\u793A\u6587\u4EF6\u7CFB\u7EDF\u7ED3\u6784
        folder3.showDetails();
    }
}
`,paraId:89,tocIndex:35},{value:"\u88C5\u9970\u5668\u6A21\u5F0F\uFF08Decorator Pattern\uFF09\u662F\u4E00\u79CD\u7ED3\u6784\u578B\u8BBE\u8BA1\u6A21\u5F0F",paraId:90,tocIndex:36},{value:"\u5B83\u5141\u8BB8\u5411\u4E00\u4E2A\u73B0\u6709\u7684\u5BF9\u8C61\u6DFB\u52A0\u65B0\u7684\u529F\u80FD\uFF0C\u540C\u65F6\u53C8\u4E0D\u6539\u53D8\u5176\u7ED3\u6784\u3002\u88C5\u9970\u5668\u6A21\u5F0F\u662F\u901A\u8FC7\u521B\u5EFA\u4E00\u4E2A\u88C5\u9970\u7C7B\u6765\u5305\u88C5\u539F\u7C7B\uFF0C\u5E76\u5728\u4FDD\u6301\u7C7B\u65B9\u6CD5\u7B7E\u540D\u5B8C\u6574\u6027\u7684\u524D\u63D0\u4E0B\uFF0C\u63D0\u4F9B\u989D\u5916\u7684\u529F\u80FD\u3002",paraId:91,tocIndex:36},{value:"\u4EE5\u4E0B\u662F\u4E00\u4E2A\u7B80\u5355\u7684\u88C5\u9970\u5668\u6A21\u5F0F\u793A\u4F8B\uFF0C\u5C55\u793A\u5982\u4F55\u5728\u4E0D\u6539\u53D8\u5BF9\u8C61\u7ED3\u6784\u7684\u60C5\u51B5\u4E0B\u52A8\u6001\u5730\u7ED9\u5BF9\u8C61\u6DFB\u52A0\u529F\u80FD\u3002",paraId:92,tocIndex:36},{value:"\u9996\u5148\uFF0C\u5B9A\u4E49\u4E00\u4E2A\u7EC4\u4EF6\u63A5\u53E3 ",paraId:93,tocIndex:37},{value:"Coffee",paraId:93,tocIndex:37},{value:"\uFF0C\u5B83\u5C06\u88AB\u88C5\u9970\u3002",paraId:93,tocIndex:37},{value:`// \u5496\u5561\u63A5\u53E3
public interface Coffee {
    double cost(); // \u8BA1\u7B97\u8D39\u7528
    String description(); // \u83B7\u53D6\u63CF\u8FF0
}
`,paraId:94,tocIndex:37},{value:"\u7136\u540E\uFF0C\u5B9A\u4E49\u4E00\u4E2A\u5177\u4F53\u7EC4\u4EF6\u7C7B ",paraId:95,tocIndex:38},{value:"SimpleCoffee",paraId:95,tocIndex:38},{value:"\uFF0C\u5B9E\u73B0 ",paraId:95,tocIndex:38},{value:"Coffee",paraId:95,tocIndex:38},{value:" \u63A5\u53E3\u3002",paraId:95,tocIndex:38},{value:`// \u7B80\u5355\u5496\u5561\u7C7B
public class SimpleCoffee implements Coffee {
    @Override
    public double cost() {
        return 5.0; // \u57FA\u672C\u5496\u5561\u7684\u8D39\u7528
    }

    @Override
    public String description() {
        return "Simple Coffee"; // \u57FA\u672C\u5496\u5561\u7684\u63CF\u8FF0
    }
}
`,paraId:96,tocIndex:38},{value:"\u63A5\u4E0B\u6765\uFF0C\u5B9A\u4E49\u4E00\u4E2A\u88C5\u9970\u5668\u62BD\u8C61\u7C7B ",paraId:97,tocIndex:39},{value:"CoffeeDecorator",paraId:97,tocIndex:39},{value:"\uFF0C\u5B9E\u73B0 ",paraId:97,tocIndex:39},{value:"Coffee",paraId:97,tocIndex:39},{value:" \u63A5\u53E3\uFF0C\u5E76\u5305\u542B\u4E00\u4E2A ",paraId:97,tocIndex:39},{value:"Coffee",paraId:97,tocIndex:39},{value:" \u5BF9\u8C61\u7684\u5F15\u7528\u3002",paraId:97,tocIndex:39},{value:`// \u5496\u5561\u88C5\u9970\u5668\u62BD\u8C61\u7C7B
public abstract class CoffeeDecorator implements Coffee {
    protected Coffee decoratedCoffee;

    public CoffeeDecorator(Coffee coffee) {
        this.decoratedCoffee = coffee;
    }

    @Override
    public double cost() {
        return decoratedCoffee.cost();
    }

    @Override
    public String description() {
        return decoratedCoffee.description();
    }
}
`,paraId:98,tocIndex:39},{value:"\u7136\u540E\uFF0C\u5B9A\u4E49\u5177\u4F53\u7684\u88C5\u9970\u5668\u7C7B ",paraId:99,tocIndex:40},{value:"MilkDecorator",paraId:99,tocIndex:40},{value:" \u548C ",paraId:99,tocIndex:40},{value:"SugarDecorator",paraId:99,tocIndex:40},{value:"\uFF0C\u6269\u5C55 ",paraId:99,tocIndex:40},{value:"CoffeeDecorator",paraId:99,tocIndex:40},{value:" \u7C7B\u3002",paraId:99,tocIndex:40},{value:`// \u725B\u5976\u88C5\u9970\u5668\u7C7B
public class MilkDecorator extends CoffeeDecorator {
    public MilkDecorator(Coffee coffee) {
        super(coffee);
    }

    @Override
    public double cost() {
        return super.cost() + 1.5; // \u589E\u52A0\u725B\u5976\u7684\u8D39\u7528
    }

    @Override
    public String description() {
        return super.description() + ", Milk"; // \u589E\u52A0\u725B\u5976\u7684\u63CF\u8FF0
    }
}

// \u7CD6\u88C5\u9970\u5668\u7C7B
public class SugarDecorator extends CoffeeDecorator {
    public SugarDecorator(Coffee coffee) {
        super(coffee);
    }

    @Override
    public double cost() {
        return super.cost() + 0.5; // \u589E\u52A0\u7CD6\u7684\u8D39\u7528
    }

    @Override
    public String description() {
        return super.description() + ", Sugar"; // \u589E\u52A0\u7CD6\u7684\u63CF\u8FF0
    }
}
`,paraId:100,tocIndex:40},{value:"\u901A\u8FC7\u4F7F\u7528\u88C5\u9970\u5668\u6A21\u5F0F\uFF0C\u53EF\u4EE5\u5728\u4E0D\u6539\u53D8\u5BF9\u8C61\u672C\u8EAB\u7684\u60C5\u51B5\u4E0B\u52A8\u6001\u5730\u6DFB\u52A0\u6216\u4FEE\u6539\u5BF9\u8C61\u7684\u884C\u4E3A\uFF0C\u8FD9\u79CD\u6A21\u5F0F\u7279\u522B\u9002\u7528\u4E8E\u9700\u8981\u6269\u5C55\u529F\u80FD\u7684\u7CFB\u7EDF\u3002",paraId:101,tocIndex:40},{value:"\u4E0D\u540C\u70B9",paraId:102,tocIndex:41},{value:"\uFF1A",paraId:102,tocIndex:41},{value:"\u88C5\u9970\u5668\u6A21\u5F0F",paraId:103,tocIndex:41},{value:"\uFF1A\u4E3B\u8981\u7528\u4E8E",paraId:103,tocIndex:41},{value:"\u52A8\u6001\u5730\u7ED9\u5BF9\u8C61\u6DFB\u52A0\u804C\u8D23\uFF0C\u4E0D\u6539\u53D8\u5BF9\u8C61\u7684\u63A5\u53E3",paraId:103,tocIndex:41},{value:"\u7EC4\u5408\u6A21\u5F0F",paraId:103,tocIndex:41},{value:"\uFF1A\u7528\u4E8E\u5C06\u5BF9\u8C61\u7EC4\u5408\u6210\u6811\u5F62\u7ED3\u6784\uFF0C\u4EE5\u8868\u793A\u201C\u90E8\u5206-\u6574\u4F53\u201D\u7684\u5C42\u6B21\u7ED3\u6784\uFF0C\u4F7F\u5F97\u5BA2\u6237\u7AEF\u53EF\u4EE5",paraId:103,tocIndex:41},{value:"\u4E00\u81F4\u5730\u5904\u7406\u5355\u4E2A\u5BF9\u8C61\u548C\u7EC4\u5408\u5BF9\u8C61",paraId:103,tocIndex:41},{value:"\u6865\u63A5\u6A21\u5F0F",paraId:103,tocIndex:41},{value:"\uFF1A",paraId:103,tocIndex:41},{value:"\u7528\u4E8E\u5C06\u62BD\u8C61\u90E8\u5206\u4E0E\u5B9E\u73B0\u90E8\u5206\u5206\u79BB\uFF0C\u4F7F\u5B83\u4EEC\u53EF\u4EE5\u72EC\u7ACB\u5730\u53D8\u5316",paraId:103,tocIndex:41},{value:"\u3002\u901A\u5E38\u7528\u4E8E\u907F\u514D\u7C7B\u5C42\u6B21\u7684\u6307\u6570\u7EA7\u589E\u957F\u3002",paraId:103,tocIndex:41},{value:"\u9002\u914D\u5668\u6A21\u5F0F",paraId:103,tocIndex:41},{value:"\uFF1A\u7528\u4E8E",paraId:103,tocIndex:41},{value:"\u5C06\u4E00\u4E2A\u7C7B\u7684\u63A5\u53E3\u8F6C\u6362\u6210\u5BA2\u6237\u5E0C\u671B\u7684\u53E6\u4E00\u4E2A\u63A5\u53E3",paraId:103,tocIndex:41},{value:"\uFF0C\u4F7F\u5F97\u539F\u672C\u7531\u4E8E\u63A5\u53E3\u4E0D\u517C\u5BB9\u800C\u4E0D\u80FD\u4E00\u8D77\u5DE5\u4F5C\u7684\u7C7B\u53EF\u4EE5\u4E00\u8D77\u5DE5\u4F5C\u3002",paraId:103,tocIndex:41},{value:"\u5916\u89C2\u6A21\u5F0F\uFF08Facade Pattern\uFF09\u662F\u4E00\u79CD\u7ED3\u6784\u578B\u8BBE\u8BA1\u6A21\u5F0F\uFF0C",paraId:104,tocIndex:42},{value:"\u63D0\u4F9B\u4E86\u4E00\u4E2A\u7EDF\u4E00\u7684\u63A5\u53E3\uFF0C\u7528\u6765\u8BBF\u95EE\u5B50\u7CFB\u7EDF\u4E2D\u7684\u4E00\u7FA4\u63A5\u53E3",paraId:104,tocIndex:42},{value:"\u3002\u5916\u89C2\u6A21\u5F0F\u5B9A\u4E49\u4E86\u4E00\u4E2A\u9AD8\u5C42\u63A5\u53E3\uFF0C\u4F7F\u5F97\u8FD9\u4E00\u5B50\u7CFB\u7EDF\u66F4\u52A0\u5BB9\u6613\u4F7F\u7528\u3002",paraId:104,tocIndex:42},{value:"\u5047\u8BBE\u6211\u4EEC\u6709\u4E00\u4E2A\u5BB6\u5EAD\u5F71\u9662\u7CFB\u7EDF\uFF0C\u5305\u62EC\u7535\u89C6\u3001\u97F3\u54CD\u3001DVD\u64AD\u653E\u5668\u548C\u706F\u5149\u7CFB\u7EDF\u3002\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528\u5916\u89C2\u6A21\u5F0F\u6765\u63D0\u4F9B\u4E00\u4E2A\u7B80\u5316\u7684\u63A5\u53E3\uFF0C\u7528\u4E8E\u542F\u52A8\u548C\u5173\u95ED\u5BB6\u5EAD\u5F71\u9662\u3002",paraId:105,tocIndex:43},{value:"\u5B50\u7CFB\u7EDF\u7C7B",paraId:106,tocIndex:43},{value:`class TV {
    public void on() {
        System.out.println("TV is on");
    }

    public void off() {
        System.out.println("TV is off");
    }
}

class SoundSystem {
    public void on() {
        System.out.println("Sound System is on");
    }

    public void off() {
        System.out.println("Sound System is off");
    }

    public void setVolume(int level) {
        System.out.println("Sound System volume set to " + level);
    }
}

class DVDPlayer {
    public void on() {
        System.out.println("DVD Player is on");
    }

    public void off() {
        System.out.println("DVD Player is off");
    }

    public void play(String movie) {
        System.out.println("Playing movie: " + movie);
    }
}

class Lights {
    public void dim(int level) {
        System.out.println("Lights dimmed to " + level + "%");
    }

    public void on() {
        System.out.println("Lights are on");
    }
}

`,paraId:107,tocIndex:43},{value:"\u5916\u89C2\u7C7B",paraId:108,tocIndex:43},{value:`public class HomeTheaterFacade {
    private TV tv;
    private SoundSystem soundSystem;
    private DVDPlayer dvdPlayer;
    private Lights lights;

    public HomeTheaterFacade(TV tv, SoundSystem soundSystem, DVDPlayer dvdPlayer, Lights lights) {
        this.tv = tv;
        this.soundSystem = soundSystem;
        this.dvdPlayer = dvdPlayer;
        this.lights = lights;
    }

    public void watchMovie(String movie) {
        System.out.println("Get ready to watch a movie...");
        lights.dim(10);
        tv.on();
        soundSystem.on();
        soundSystem.setVolume(20);
        dvdPlayer.on();
        dvdPlayer.play(movie);
    }

    public void endMovie() {
        System.out.println("Shutting down the home theater...");
        lights.on();
        tv.off();
        soundSystem.off();
        dvdPlayer.off();
    }
}
`,paraId:109,tocIndex:43},{value:`public class HomeTheaterTest {
    public static void main(String[] args) {
        TV tv = new TV();
        SoundSystem soundSystem = new SoundSystem();
        DVDPlayer dvdPlayer = new DVDPlayer();
        Lights lights = new Lights();

        HomeTheaterFacade homeTheater = new HomeTheaterFacade(tv, soundSystem, dvdPlayer, lights);
        homeTheater.watchMovie("Inception");
        homeTheater.endMovie();
    }
}
`,paraId:110,tocIndex:44},{value:"\u5B50\u7CFB\u7EDF\u7C7B",paraId:111,tocIndex:45},{value:`\uFF1A
`,paraId:111,tocIndex:45},{value:"TV",paraId:112,tocIndex:45},{value:"\u3001",paraId:112,tocIndex:45},{value:"SoundSystem",paraId:112,tocIndex:45},{value:"\u3001",paraId:112,tocIndex:45},{value:"DVDPlayer",paraId:112,tocIndex:45},{value:"\u548C",paraId:112,tocIndex:45},{value:"Lights",paraId:112,tocIndex:45},{value:"\u7C7B\u662F\u5BB6\u5EAD\u5F71\u9662\u7CFB\u7EDF\u7684\u5404\u4E2A\u7EC4\u4EF6\uFF0C\u5206\u522B\u6709\u81EA\u5DF1\u7684\u5F00\u5173\u548C\u64CD\u4F5C\u65B9\u6CD5\u3002",paraId:112,tocIndex:45},{value:"\u5916\u89C2\u7C7B",paraId:111,tocIndex:45},{value:`\uFF1A
`,paraId:111,tocIndex:45},{value:"HomeTheaterFacade",paraId:113,tocIndex:45},{value:"\u7C7B\u63D0\u4F9B\u4E86\u4E00\u4E2A\u7B80\u5316\u7684\u63A5\u53E3\uFF0C",paraId:113,tocIndex:45},{value:"\u5C01\u88C5\u4E86\u6240\u6709\u5B50\u7CFB\u7EDF\u7684\u64CD\u4F5C",paraId:113,tocIndex:45},{value:"\u3002\u901A\u8FC7",paraId:113,tocIndex:45},{value:"watchMovie",paraId:113,tocIndex:45},{value:"\u65B9\u6CD5\u548C",paraId:113,tocIndex:45},{value:"endMovie",paraId:113,tocIndex:45},{value:"\u65B9\u6CD5\uFF0C\u5BA2\u6237\u7AEF\u53EF\u4EE5\u65B9\u4FBF\u5730\u542F\u52A8\u548C\u5173\u95ED\u5BB6\u5EAD\u5F71\u9662\u7CFB\u7EDF\uFF0C\u800C\u4E0D\u9700\u8981\u4E86\u89E3\u5404\u4E2A\u5B50\u7CFB\u7EDF\u7684\u7EC6\u8282\u3002",paraId:113,tocIndex:45},{value:"\u5BA2\u6237\u7AEF\u4EE3\u7801",paraId:111,tocIndex:45},{value:`\uFF1A
`,paraId:111,tocIndex:45},{value:"\u5728",paraId:114,tocIndex:45},{value:"HomeTheaterTest",paraId:114,tocIndex:45},{value:"\u7C7B\u4E2D\uFF0C\u5BA2\u6237\u7AEF\u901A\u8FC7",paraId:114,tocIndex:45},{value:"HomeTheaterFacade",paraId:114,tocIndex:45},{value:"\u7C7B\u6765\u64CD\u4F5C\u5BB6\u5EAD\u5F71\u9662\u7CFB\u7EDF\u3002\u53EA\u9700\u8981\u8C03\u7528",paraId:114,tocIndex:45},{value:"watchMovie",paraId:114,tocIndex:45},{value:"\u65B9\u6CD5\u548C",paraId:114,tocIndex:45},{value:"endMovie",paraId:114,tocIndex:45},{value:"\u65B9\u6CD5\u5373\u53EF\u5B9E\u73B0\u590D\u6742\u7684\u542F\u52A8\u548C\u5173\u95ED\u64CD\u4F5C\u3002",paraId:114,tocIndex:45},{value:"\u5916\u89C2\u6A21\u5F0F\u901A\u8FC7\u63D0\u4F9B\u4E00\u4E2A\u7EDF\u4E00\u7684\u63A5\u53E3\uFF0C\u7B80\u5316\u4E86\u5BF9\u590D\u6742\u5B50\u7CFB\u7EDF\u7684\u8BBF\u95EE\u3002\u5B83\u4F7F\u5F97\u5B50\u7CFB\u7EDF\u7684\u4F7F\u7528\u66F4\u52A0\u5BB9\u6613\u548C\u76F4\u89C2\uFF0C\u540C\u65F6\u4E5F\u9690\u85CF\u4E86\u5B50\u7CFB\u7EDF\u7684\u590D\u6742\u6027\uFF0C\u964D\u4F4E\u4E86\u5BA2\u6237\u7AEF\u4EE3\u7801\u7684\u8026\u5408\u5EA6\u3002",paraId:115,tocIndex:46},{value:"\u4EAB\u5143\u6A21\u5F0F\uFF08Flyweight Pattern\uFF09\u662F\u4E00\u79CD\u7ED3\u6784\u578B\u8BBE\u8BA1\u6A21\u5F0F\uFF0C",paraId:116,tocIndex:47},{value:"\u901A\u8FC7\u5171\u4EAB\u6280\u672F\u6765\u6709\u6548\u652F\u6301\u5927\u91CF\u7EC6\u7C92\u5EA6\u5BF9\u8C61\u7684\u590D\u7528",paraId:116,tocIndex:47},{value:"\u3002\u5B83\u53EF\u4EE5\u51CF\u5C11\u5185\u5B58\u4F7F\u7528\u91CF\uFF0C\u63D0\u9AD8\u6027\u80FD\u3002\u4EAB\u5143\u6A21\u5F0F\u7684\u5173\u952E\u662F\u5206\u79BB\u5BF9\u8C61\u7684\u5185\u5728\u72B6\u6001\u548C\u5916\u5728\u72B6\u6001\uFF0C\u5C06\u5185\u5728\u72B6\u6001\u5B58\u50A8\u5728\u4EAB\u5143\u5BF9\u8C61\u5185\u90E8\uFF0C\u800C\u5916\u5728\u72B6\u6001\u7531\u5BA2\u6237\u7AEF\u7EF4\u62A4\u3002",paraId:116,tocIndex:47},{value:"\u83B7\u53D6\u5BF9\u8C61\u65F6\u67E5\u770B\u7F13\u5B58",paraId:117,tocIndex:47},{value:"\u5047\u8BBE\u6211\u4EEC\u6709\u4E00\u4E2A\u7ED8\u56FE\u5E94\u7528\uFF0C\u9700\u8981\u7ED8\u5236\u5927\u91CF\u76F8\u540C\u989C\u8272\u548C\u5F62\u72B6\u7684\u56FE\u5F62\u3002\u4F7F\u7528\u4EAB\u5143\u6A21\u5F0F\u53EF\u4EE5\u5171\u4EAB\u76F8\u540C\u989C\u8272\u548C\u5F62\u72B6\u7684\u56FE\u5F62\u5BF9\u8C61\uFF0C\u4ECE\u800C\u51CF\u5C11\u5185\u5B58\u5F00\u9500\u3002",paraId:118,tocIndex:48},{value:`public interface Shape {
    void draw(int x, int y);
}
`,paraId:119,tocIndex:49},{value:`public class Circle implements Shape {
    private String color;

    public Circle(String color) {
        this.color = color;
    }

    @Override
    public void draw(int x, int y) {
        System.out.println("Drawing a " + color + " circle at (" + x + ", " + y + ")");
    }
}
`,paraId:120,tocIndex:50},{value:`public class ShapeFactory {
    private static final Map<String, Shape> circleMap = new HashMap<>();
    
    public static Shape getCircle(String color) {
        Circle circle = (Circle) circleMap.get(color);

        if (circle == null) {
            circle = new Circle(color);
            circleMap.put(color, circle);
            System.out.println("Creating a circle of color: " + color);
        }

        return circle;
    }
}
`,paraId:121,tocIndex:51},{value:`public class FlyweightPatternDemo {
    private static final String[] colors = {"Red", "Green", "Blue", "White", "Black"};

    public static void main(String[] args) {
        for (int i = 0; i < 20; i++) {
            // \u6839\u636E\u968F\u673A\u4E00\u4E2A\u989C\u8272\u83B7\u53D6Circle
            Circle circle = (Circle) ShapeFactory.getCircle(getRandomColor());
            circle.draw(getRandomX(), getRandomY());
        }
    }

    private static String getRandomColor() {
        return colors[(int) (Math.random() * colors.length)];
    }

    private static int getRandomX() {
        return (int) (Math.random() * 100);
    }

    private static int getRandomY() {
        return (int) (Math.random() * 100);
    }
}
`,paraId:122,tocIndex:52},{value:"\u4EAB\u5143\u63A5\u53E3",paraId:123,tocIndex:53},{value:`\uFF1A
`,paraId:123,tocIndex:53},{value:"Shape",paraId:124,tocIndex:53},{value:"\u63A5\u53E3\u5B9A\u4E49\u4E86\u7ED8\u56FE\u65B9\u6CD5",paraId:124,tocIndex:53},{value:"draw",paraId:124,tocIndex:53},{value:"\uFF0C\u5B83\u63A5\u53D7\u5750\u6807\u53C2\u6570",paraId:124,tocIndex:53},{value:"x",paraId:124,tocIndex:53},{value:"\u548C",paraId:124,tocIndex:53},{value:"y",paraId:124,tocIndex:53},{value:"\u3002",paraId:124,tocIndex:53},{value:"\u5177\u4F53\u4EAB\u5143\u7C7B",paraId:123,tocIndex:53},{value:`\uFF1A
`,paraId:123,tocIndex:53},{value:"Circle",paraId:125,tocIndex:53},{value:"\u7C7B\u5B9E\u73B0\u4E86",paraId:125,tocIndex:53},{value:"Shape",paraId:125,tocIndex:53},{value:"\u63A5\u53E3\uFF0C\u5E76\u5305\u542B\u989C\u8272\u5C5E\u6027",paraId:125,tocIndex:53},{value:"color",paraId:125,tocIndex:53},{value:"\u3002\u5728\u6784\u9020\u65B9\u6CD5\u4E2D\u8BBE\u7F6E\u989C\u8272\uFF0C\u901A\u8FC7",paraId:125,tocIndex:53},{value:"draw",paraId:125,tocIndex:53},{value:"\u65B9\u6CD5\u7ED8\u5236\u5706\u5F62\u3002",paraId:125,tocIndex:53},{value:"\u4EAB\u5143\u5DE5\u5382\u7C7B",paraId:123,tocIndex:53},{value:`\uFF1A
`,paraId:123,tocIndex:53},{value:"ShapeFactory",paraId:126,tocIndex:53},{value:"\u7C7B\u8D1F\u8D23\u521B\u5EFA\u548C\u7BA1\u7406\u4EAB\u5143\u5BF9\u8C61\u3002\u5B83\u5305\u542B\u4E00\u4E2A\u54C8\u5E0C\u8868",paraId:126,tocIndex:53},{value:"circleMap",paraId:126,tocIndex:53},{value:"\uFF0C\u7528\u4E8E\u5B58\u50A8\u4E0D\u540C\u989C\u8272\u7684\u5706\u5F62\u5BF9\u8C61\u3002",paraId:126,tocIndex:53},{value:"getCircle",paraId:126,tocIndex:53},{value:"\u65B9\u6CD5\u6839\u636E\u989C\u8272\u83B7\u53D6\u5706\u5F62\u5BF9\u8C61\uFF0C\u5982\u679C\u5BF9\u8C61\u4E0D\u5B58\u5728\u5219\u521B\u5EFA\u4E00\u4E2A\u65B0\u7684\u5706\u5F62\u5BF9\u8C61\u5E76\u5B58\u5165\u54C8\u5E0C\u8868\u3002",paraId:126,tocIndex:53},{value:"\u5BA2\u6237\u7AEF\u4EE3\u7801",paraId:123,tocIndex:53},{value:`\uFF1A
`,paraId:123,tocIndex:53},{value:"\u5728",paraId:127,tocIndex:53},{value:"FlyweightPatternDemo",paraId:127,tocIndex:53},{value:"\u7C7B\u4E2D\uFF0C\u901A\u8FC7",paraId:127,tocIndex:53},{value:"ShapeFactory",paraId:127,tocIndex:53},{value:"\u83B7\u53D6\u5706\u5F62\u5BF9\u8C61\uFF0C\u5E76\u968F\u673A\u8BBE\u7F6E\u5750\u6807\u6765\u7ED8\u5236\u5706\u5F62\u3002\u6BCF\u6B21\u7ED8\u5236\u65F6\uFF0C\u5BA2\u6237\u7AEF\u53EA\u9700\u8981\u6307\u5B9A\u989C\u8272\u548C\u5750\u6807\uFF0C\u800C\u4E0D\u9700\u8981\u5173\u5FC3\u5706\u5F62\u5BF9\u8C61\u7684\u521B\u5EFA\u3002",paraId:127,tocIndex:53},{value:"\u4EAB\u5143\u6A21\u5F0F\u901A\u8FC7\u5171\u4EAB\u76F8\u540C\u7C7B\u578B\u7684\u7EC6\u7C92\u5EA6\u5BF9\u8C61\uFF0C\u51CF\u5C11\u5185\u5B58\u5F00\u9500\uFF0C\u63D0\u9AD8\u6027\u80FD",paraId:128,tocIndex:54},{value:"\u3002\u5B83\u7279\u522B\u9002\u7528\u4E8E\u9700\u8981\u5927\u91CF\u521B\u5EFA\u76F8\u540C\u7C7B\u578B\u5BF9\u8C61\u7684\u573A\u666F\uFF0C\u5982\u7ED8\u56FE\u5E94\u7528\u4E2D\u7684\u56FE\u5F62\u5BF9\u8C61\u3001\u6587\u672C\u7F16\u8F91\u5668\u4E2D\u7684\u5B57\u7B26\u5BF9\u8C61\u7B49\u3002\u5728\u5B9E\u73B0\u4EAB\u5143\u6A21\u5F0F\u65F6\uFF0C\u5173\u952E\u5728\u4E8E\u5206\u79BB\u5185\u5728\u72B6\u6001\u548C\u5916\u5728\u72B6\u6001\uFF0C\u5185\u5728\u72B6\u6001\u5B58\u50A8\u5728\u4EAB\u5143\u5BF9\u8C61\u5185\u90E8\uFF0C\u800C\u5916\u5728\u72B6\u6001\u7531\u5BA2\u6237\u7AEF\u7EF4\u62A4\u3002",paraId:128,tocIndex:54},{value:"\u4EE3\u7406\u6A21\u5F0F\uFF08Proxy Pattern\uFF09\u662F\u4E00\u79CD\u7ED3\u6784\u578B\u8BBE\u8BA1\u6A21\u5F0F\uFF0C",paraId:129,tocIndex:55},{value:"\u63D0\u4F9B\u4E86\u5BF9\u8C61\u7684\u66FF\u4EE3\u54C1\u6216\u5360\u4F4D\u7B26\uFF0C\u4EE5\u63A7\u5236\u5BF9\u8FD9\u4E2A\u5BF9\u8C61\u7684\u8BBF\u95EE",paraId:129,tocIndex:55},{value:"\u3002",paraId:129,tocIndex:55},{value:"\u4EE3\u7406\u6A21\u5F0F\u53EF\u4EE5\u5728\u4E0D\u6539\u53D8\u5BA2\u6237\u7AEF\u4EE3\u7801\u7684\u524D\u63D0\u4E0B\uFF0C\u63A7\u5236\u5BF9\u76EE\u6807\u5BF9\u8C61\u7684\u8BBF\u95EE\u3002\u5E38\u89C1\u7684\u4EE3\u7406\u6A21\u5F0F\u6709\u9759\u6001\u4EE3\u7406\u548C\u52A8\u6001\u4EE3\u7406\u3002",paraId:130,tocIndex:55},{value:"\u9759\u6001\u4EE3\u7406\uFF1A\u4EE3\u7406\u7C7B\u5728\u7F16\u8BD1\u671F\u95F4\u751F\u6210\uFF0C",paraId:131,tocIndex:55},{value:"\u4EE3\u7801\u4E2D\u624B\u52A8\u7F16\u5199\u4EE3\u7406\u7C7B",paraId:131,tocIndex:55},{value:"\u3002",paraId:131,tocIndex:55},{value:"\u52A8\u6001\u4EE3\u7406\uFF1A\u4EE3\u7406\u7C7B\u5728\u8FD0\u884C\u671F\u95F4\u751F\u6210\uFF0C\u901A\u8FC7",paraId:132,tocIndex:55},{value:"\u53CD\u5C04\u673A\u5236\u52A8\u6001\u521B\u5EFA\u4EE3\u7406\u5BF9\u8C61",paraId:132,tocIndex:55},{value:"\u3002",paraId:132,tocIndex:55},{value:"\u6211\u4EEC\u4EE5\u4E00\u4E2A\u94F6\u884C\u8D26\u6237\u64CD\u4F5C\u4E3A\u4F8B\uFF0C\u5C55\u793A\u5982\u4F55\u4F7F\u7528\u4EE3\u7406\u6A21\u5F0F\u6765\u63A7\u5236\u5BF9\u94F6\u884C\u8D26\u6237\u7684\u8BBF\u95EE\u3002",paraId:133,tocIndex:56},{value:"\u9996\u5148\uFF0C\u5B9A\u4E49\u4E00\u4E2A",paraId:134,tocIndex:57},{value:"BankAccount",paraId:134,tocIndex:57},{value:"\u63A5\u53E3\uFF0C\u5305\u542B\u5B58\u6B3E\u548C\u53D6\u6B3E\u7684\u65B9\u6CD5\u3002",paraId:134,tocIndex:57},{value:`public interface BankAccount {
    void deposit(double amount);
    void withdraw(double amount);
    double getBalance();
}
`,paraId:135,tocIndex:57},{value:"\u5B9E\u73B0\u63A5\u53E3\u7684\u771F\u5B9E\u5BF9\u8C61",paraId:136,tocIndex:58},{value:"RealBankAccount",paraId:136,tocIndex:58},{value:"\uFF1A",paraId:136,tocIndex:58},{value:`public class RealBankAccount implements BankAccount {
    private double balance;

    //\u5B58\u6B3E
    @Override
    public void deposit(double amount) {
        balance += amount;
        System.out.println("Deposited " + amount + ", new balance is " + balance);
    }

    //\u53D6\u6B3E
    @Override
    public void withdraw(double amount) {
        if (amount <= balance) {
            balance -= amount;
            System.out.println("Withdrew " + amount + ", new balance is " + balance);
        } else {
            System.out.println("Insufficient balance.");
        }
    }

    @Override
    public double getBalance() {
        return balance;
    }
}
`,paraId:137,tocIndex:58},{value:"\u5B9E\u73B0\u540C\u6837\u63A5\u53E3\u7684\u4EE3\u7406\u5BF9\u8C61",paraId:138,tocIndex:59},{value:"BankAccountProxy",paraId:138,tocIndex:59},{value:"\uFF1A",paraId:138,tocIndex:59},{value:`public class BankAccountProxy implements BankAccount {
    private RealBankAccount realBankAccount;

    public BankAccountProxy(RealBankAccount realBankAccount) {
        this.realBankAccount = realBankAccount;
    }

    // \u4EE5\u4E0B\u65B9\u6CD5\u5BF9\u539F\u6765\u7684RealBankAccount\u529F\u80FD\u8FDB\u884C\u4E86\u62D3\u5C55
    @Override
    public void deposit(double amount) {
        System.out.println("Proxy: Checking access before depositing.");
        realBankAccount.deposit(amount);
    }

    @Override
    public void withdraw(double amount) {
        System.out.println("Proxy: Checking access before withdrawing.");
        realBankAccount.withdraw(amount);
    }

    @Override
    public double getBalance() {
        System.out.println("Proxy: Checking access before getting balance.");
        return realBankAccount.getBalance();
    }
}
`,paraId:139,tocIndex:59},{value:"\u4F7F\u7528\u4EE3\u7406\u5BF9\u8C61\u6765\u64CD\u4F5C\u94F6\u884C\u8D26\u6237\uFF1A",paraId:140,tocIndex:60},{value:`public class ProxyPatternDemo {
    public static void main(String[] args) {
        RealBankAccount realAccount = new RealBankAccount();
        BankAccount proxyAccount = new BankAccountProxy(realAccount);

        proxyAccount.deposit(100);
        proxyAccount.withdraw(50);
        System.out.println("Current balance: " + proxyAccount.getBalance());
    }
}
`,paraId:141,tocIndex:60},{value:"\u63A5\u53E3\u5B9A\u4E49",paraId:142,tocIndex:61},{value:`\uFF1A
`,paraId:142,tocIndex:61},{value:"BankAccount",paraId:143,tocIndex:61},{value:"\u63A5\u53E3\u5B9A\u4E49\u4E86\u94F6\u884C\u8D26\u6237\u7684\u57FA\u672C\u64CD\u4F5C\uFF1A\u5B58\u6B3E\uFF08deposit\uFF09\u3001\u53D6\u6B3E\uFF08withdraw\uFF09\u548C\u83B7\u53D6\u4F59\u989D\uFF08getBalance\uFF09\u3002",paraId:143,tocIndex:61},{value:"\u771F\u5B9E\u5BF9\u8C61",paraId:142,tocIndex:61},{value:`\uFF1A
`,paraId:142,tocIndex:61},{value:"RealBankAccount",paraId:144,tocIndex:61},{value:"\u7C7B\u5B9E\u73B0\u4E86",paraId:144,tocIndex:61},{value:"BankAccount",paraId:144,tocIndex:61},{value:"\u63A5\u53E3\uFF0C\u5305\u542B\u5B9E\u9645\u7684\u5B58\u6B3E\u3001\u53D6\u6B3E\u548C\u4F59\u989D\u64CD\u4F5C\u3002",paraId:144,tocIndex:61},{value:"\u4EE3\u7406\u5BF9\u8C61",paraId:142,tocIndex:61},{value:`\uFF1A
`,paraId:142,tocIndex:61},{value:"BankAccountProxy",paraId:145,tocIndex:61},{value:"\u7C7B\u4E5F\u5B9E\u73B0\u4E86",paraId:145,tocIndex:61},{value:"BankAccount",paraId:145,tocIndex:61},{value:"\u63A5\u53E3\uFF0C\u4F46\u5B83\u5728\u8C03\u7528\u771F\u5B9E\u5BF9\u8C61\u7684\u64CD\u4F5C\u4E4B\u524D\u8FDB\u884C\u4E86\u989D\u5916\u7684\u6743\u9650\u68C0\u67E5\u6216\u65E5\u5FD7\u8BB0\u5F55\u3002",paraId:145,tocIndex:61},{value:"\u5BA2\u6237\u7AEF\u4EE3\u7801",paraId:142,tocIndex:61},{value:`\uFF1A
`,paraId:142,tocIndex:61},{value:"\u5728",paraId:146,tocIndex:61},{value:"ProxyPatternDemo",paraId:146,tocIndex:61},{value:"\u7C7B\u4E2D\uFF0C\u521B\u5EFA\u4E86\u771F\u5B9E\u7684\u94F6\u884C\u8D26\u6237\u5BF9\u8C61\u548C\u4EE3\u7406\u5BF9\u8C61\uFF0C\u5E76\u901A\u8FC7\u4EE3\u7406\u5BF9\u8C61\u8FDB\u884C\u5B58\u6B3E\u3001\u53D6\u6B3E\u548C\u67E5\u8BE2\u4F59\u989D\u7684\u64CD\u4F5C\u3002\u4EE3\u7406\u5BF9\u8C61\u5728\u6267\u884C\u64CD\u4F5C\u524D\u540E\u6DFB\u52A0\u4E86\u989D\u5916\u7684\u65E5\u5FD7\u4FE1\u606F\u3002",paraId:146,tocIndex:61},{value:"\u4EE3\u7406\u6A21\u5F0F\u7684\u4E3B\u8981\u4F18\u70B9\u662F\uFF1A",paraId:147,tocIndex:62},{value:"\u53EF\u4EE5\u5728\u4E0D\u4FEE\u6539\u771F\u5B9E\u5BF9\u8C61\u7684\u60C5\u51B5\u4E0B\uFF0C\u589E\u52A0\u989D\u5916\u7684\u529F\u80FD\uFF08\u5982\u6743\u9650\u68C0\u67E5\u3001\u65E5\u5FD7\u8BB0\u5F55\u3001\u5EF6\u8FDF\u52A0\u8F7D\u7B49\uFF09",paraId:148,tocIndex:62},{value:"\u3002",paraId:148,tocIndex:62},{value:"\u5BA2\u6237\u7AEF\u4EE3\u7801\u65E0\u9700\u6539\u53D8\uFF0C\u53EA\u9700\u901A\u8FC7\u4EE3\u7406\u5BF9\u8C61\u6765\u64CD\u4F5C",paraId:148,tocIndex:62},{value:"\u3002",paraId:148,tocIndex:62},{value:"\u4EE3\u7406\u6A21\u5F0F\u5E38\u7528\u4E8E\u4EE5\u4E0B\u573A\u666F\uFF1A",paraId:149,tocIndex:62},{value:"\u8FDC\u7A0B\u4EE3\u7406\uFF1A\u4E3A\u4E00\u4E2A\u5BF9\u8C61\u5728\u4E0D\u540C\u5730\u5740\u7A7A\u95F4\u63D0\u4F9B\u5C40\u90E8\u4EE3\u8868\u3002",paraId:150,tocIndex:62},{value:"\u865A\u62DF\u4EE3\u7406\uFF1A\u6839\u636E\u9700\u8981\u521B\u5EFA\u5F00\u9500\u5F88\u5927\u7684\u5BF9\u8C61\u3002",paraId:150,tocIndex:62},{value:"\u4FDD\u62A4\u4EE3\u7406\uFF1A\u63A7\u5236\u5BF9\u539F\u59CB\u5BF9\u8C61\u7684\u8BBF\u95EE\u3002",paraId:150,tocIndex:62},{value:"\u804C\u8D23\u94FE\u6A21\u5F0F\uFF08Chain of Responsibility\uFF09\u662F\u4E00\u79CD",paraId:151,tocIndex:63},{value:"\u884C\u4E3A\u8BBE\u8BA1\u6A21\u5F0F",paraId:151,tocIndex:63},{value:"\uFF0C\u4F7F\u5F97\u591A\u4E2A\u5BF9\u8C61\u90FD\u6709\u673A\u4F1A\u5904\u7406\u8BF7\u6C42\uFF0C\u4ECE\u800C\u907F\u514D\u8BF7\u6C42\u7684\u53D1\u9001\u8005\u548C\u63A5\u6536\u8005\u4E4B\u95F4\u7684\u8026\u5408\u3002\u8FD9\u4E9B\u5BF9\u8C61\u8FDE\u6210\u4E00\u6761\u94FE\uFF0C\u5E76\u6CBF\u7740\u8FD9\u6761\u94FE\u4F20\u9012\u8BF7\u6C42\uFF0C\u76F4\u5230\u6709\u5BF9\u8C61\u5904\u7406\u5B83\u4E3A\u6B62\u3002",paraId:151,tocIndex:63},{value:"\u4EE5\u4E0B\u662F\u4E00\u4E2A\u804C\u8D23\u94FE\u6A21\u5F0F\u7684\u793A\u4F8B\uFF0C\u6A21\u62DF\u4E00\u4E2A\u7B80\u5355\u7684\u5BA2\u6237\u670D\u52A1\u7CFB\u7EDF\uFF0C\u6709\u4E0D\u540C\u7684\u5904\u7406\u5668\u5904\u7406\u4E0D\u540C\u7EA7\u522B\u7684\u5BA2\u6237\u8BF7\u6C42\u3002",paraId:152,tocIndex:63},{value:`public abstract class RequestHandler {
    protected RequestHandler nextHandler;

    public void setNextHandler(RequestHandler nextHandler) {
        this.nextHandler = nextHandler;
    }

    public abstract void handleRequest(CustomerRequest request);
}
`,paraId:153,tocIndex:64},{value:`public class BasicSupportHandler extends RequestHandler {
    @Override
    public void handleRequest(CustomerRequest request) {
        if (request.getLevel() == RequestLevel.BASIC) {
            System.out.println("BasicSupportHandler: Handling request " + request.getDescription());
        } else if (nextHandler != null) {
            nextHandler.handleRequest(request);
        }
    }
}
`,paraId:154,tocIndex:66},{value:`public class IntermediateSupportHandler extends RequestHandler {
    @Override
    public void handleRequest(CustomerRequest request) {
        if (request.getLevel() == RequestLevel.INTERMEDIATE) {
            System.out.println("IntermediateSupportHandler: Handling request " + request.getDescription());
        } else if (nextHandler != null) {
            nextHandler.handleRequest(request);
        }
    }
}
`,paraId:155,tocIndex:67},{value:`public class AdvancedSupportHandler extends RequestHandler {
    @Override
    public void handleRequest(CustomerRequest request) {
        if (request.getLevel() == RequestLevel.ADVANCED) {
            System.out.println("AdvancedSupportHandler: Handling request " + request.getDescription());
        } else if (nextHandler != null) {
            nextHandler.handleRequest(request);
        }
    }
}
`,paraId:156,tocIndex:68},{value:`public class CustomerRequest {
    private String description;
    private RequestLevel level;
}
`,paraId:157,tocIndex:69},{value:`public enum RequestLevel {
    BASIC,
    INTERMEDIATE,
    ADVANCED
}
`,paraId:158,tocIndex:70},{value:`public class ChainOfResponsibilityDemo {
    public static void main(String[] args) {
        // \u521B\u5EFA\u5904\u7406\u5668
        RequestHandler basicHandler = new BasicSupportHandler();
        RequestHandler intermediateHandler = new IntermediateSupportHandler();
        RequestHandler advancedHandler = new AdvancedSupportHandler();

        // \u8BBE\u7F6E\u94FE
        basicHandler.setNextHandler(intermediateHandler);
        intermediateHandler.setNextHandler(advancedHandler);

        // \u521B\u5EFA\u8BF7\u6C42
        CustomerRequest basicRequest = new CustomerRequest("Basic issue", RequestLevel.BASIC);
        CustomerRequest intermediateRequest = new CustomerRequest("Intermediate issue", RequestLevel.INTERMEDIATE);
        CustomerRequest advancedRequest = new CustomerRequest("Advanced issue", RequestLevel.ADVANCED);

        // \u5904\u7406\u8BF7\u6C42
        basicHandler.handleRequest(basicRequest);
        basicHandler.handleRequest(intermediateRequest);
        basicHandler.handleRequest(advancedRequest);
    }
}
`,paraId:159,tocIndex:71},{value:"RequestHandler",paraId:160,tocIndex:72},{value:"\uFF1A\u62BD\u8C61\u5904\u7406\u5668\u7C7B\uFF0C\u5B9A\u4E49\u4E86\u4E00\u4E2A\u5904\u7406\u8BF7\u6C42\u7684\u65B9\u6CD5 ",paraId:160,tocIndex:72},{value:"handleRequest",paraId:160,tocIndex:72},{value:"\uFF0C\u4EE5\u53CA\u8BBE\u7F6E\u4E0B\u4E00\u4E2A\u5904\u7406\u5668\u7684\u65B9\u6CD5 ",paraId:160,tocIndex:72},{value:"setNextHandler",paraId:160,tocIndex:72},{value:"\u3002",paraId:160,tocIndex:72},{value:"BasicSupportHandler, IntermediateSupportHandler, AdvancedSupportHandler",paraId:160,tocIndex:72},{value:"\uFF1A\u5177\u4F53\u5904\u7406\u5668\u7C7B\uFF0C\u5206\u522B\u5904\u7406\u4E0D\u540C\u7EA7\u522B\u7684\u8BF7\u6C42\u3002\u5982\u679C\u5F53\u524D\u5904\u7406\u5668\u4E0D\u80FD\u5904\u7406\u8BF7\u6C42\uFF0C\u5219\u5C06\u8BF7\u6C42\u4F20\u9012\u7ED9\u4E0B\u4E00\u4E2A\u5904\u7406\u5668\u3002",paraId:160,tocIndex:72},{value:"CustomerRequest",paraId:160,tocIndex:72},{value:"\uFF1A\u5BA2\u6237\u8BF7\u6C42\u7C7B\uFF0C\u5305\u542B\u8BF7\u6C42\u63CF\u8FF0\u548C\u8BF7\u6C42\u7EA7\u522B\u3002",paraId:160,tocIndex:72},{value:"RequestLevel",paraId:160,tocIndex:72},{value:"\uFF1A\u8BF7\u6C42\u7EA7\u522B\u679A\u4E3E\uFF0C\u5B9A\u4E49\u4E86\u8BF7\u6C42\u7684\u4E0D\u540C\u7EA7\u522B\u3002",paraId:160,tocIndex:72},{value:"ChainOfResponsibilityDemo",paraId:160,tocIndex:72},{value:"\uFF1A\u5BA2\u6237\u7AEF\u4EE3\u7801\uFF0C\u521B\u5EFA\u5904\u7406\u5668\u94FE\u5E76\u5904\u7406\u4E0D\u540C\u7EA7\u522B\u7684\u8BF7\u6C42\u3002",paraId:160,tocIndex:72},{value:"\u5728\u8FD9\u4E2A\u793A\u4F8B\u4E2D\uFF0C\u8BF7\u6C42\u6309\u7167\u5904\u7406\u5668\u94FE\u8FDB\u884C\u4F20\u9012\uFF0C\u76F4\u5230\u6709\u5904\u7406\u5668\u80FD\u591F\u5904\u7406\u8BF7\u6C42\u3002\u8FD9\u79CD\u6A21\u5F0F\u4F7F\u5F97\u8BF7\u6C42\u53D1\u9001\u8005\u548C\u5904\u7406\u8005\u89E3\u8026\uFF0C\u589E\u52A0\u4E86\u7CFB\u7EDF\u7684\u7075\u6D3B\u6027\u3002",paraId:161,tocIndex:72},{value:"\u547D\u4EE4\u6A21\u5F0F\uFF08Command Pattern\uFF09\u662F\u4E00\u79CD\u884C\u4E3A\u8BBE\u8BA1\u6A21\u5F0F\uFF0C",paraId:162,tocIndex:73},{value:"\u5C06\u4E00\u4E2A\u8BF7\u6C42\u5C01\u88C5\u6210\u4E00\u4E2A\u5BF9\u8C61\uFF0C\u4ECE\u800C\u4F7F\u60A8\u53EF\u4EE5\u7528\u4E0D\u540C\u7684\u8BF7\u6C42\u5BF9\u5BA2\u6237\u7AEF\u8FDB\u884C\u53C2\u6570\u5316",paraId:162,tocIndex:73},{value:"\uFF1B\u5BF9\u8BF7\u6C42\u6392\u961F\u6216\u8BB0\u5F55\u8BF7\u6C42\u65E5\u5FD7\uFF0C\u4EE5\u53CA\u652F\u6301\u53EF\u64A4\u9500\u7684\u64CD\u4F5C\u3002",paraId:162,tocIndex:73},{value:"\u4EE5\u4E0B\u662F\u4E00\u4E2A\u547D\u4EE4\u6A21\u5F0F\u7684\u793A\u4F8B\uFF0C\u6A21\u62DF\u4E00\u4E2A\u7B80\u5355\u7684\u9065\u63A7\u5668\u7CFB\u7EDF\uFF0C\u8BE5\u7CFB\u7EDF\u53EF\u4EE5\u53D1\u51FA\u5404\u79CD\u547D\u4EE4\uFF0C\u6BD4\u5982\u6253\u5F00\u548C\u5173\u95ED\u706F\u3001\u6253\u5F00\u548C\u5173\u95ED\u7535\u89C6\u3002",paraId:163,tocIndex:73},{value:`public interface Command {
    void execute();
    void undo();
}
`,paraId:164,tocIndex:74},{value:`public class LightOnCommand implements Command {
    private Light light;

    public LightOnCommand(Light light) {
        this.light = light;
    }

    @Override
    public void execute() {
        light.on();
    }

    @Override
    public void undo() {
        light.off();
    }
}
`,paraId:165,tocIndex:76},{value:`public class LightOffCommand implements Command {
    private Light light;

    public LightOffCommand(Light light) {
        this.light = light;
    }

    @Override
    public void execute() {
        light.off();
    }

    @Override
    public void undo() {
        light.on();
    }
}
`,paraId:166,tocIndex:77},{value:`public class Light {
    public void on() {
        System.out.println("The light is on.");
    }

    public void off() {
        System.out.println("The light is off.");
    }
}
`,paraId:167,tocIndex:79},{value:`public class TV {
    public void on() {
        System.out.println("The TV is on.");
    }

    public void off() {
        System.out.println("The TV is off.");
    }
}
`,paraId:168,tocIndex:80},{value:`public class TVOnCommand implements Command {
    private TV tv;

    public TVOnCommand(TV tv) {
        this.tv = tv;
    }

    @Override
    public void execute() {
        tv.on();
    }

    @Override
    public void undo() {
        tv.off();
    }
}
`,paraId:169,tocIndex:82},{value:`public class TVOffCommand implements Command {
    private TV tv;

    public TVOffCommand(TV tv) {
        this.tv = tv;
    }

    @Override
    public void execute() {
        tv.off();
    }

    @Override
    public void undo() {
        tv.on();
    }
}
`,paraId:170,tocIndex:83},{value:`public class RemoteControl {
    private Command[] onCommands;
    private Command[] offCommands;
    private Command undoCommand;

    public RemoteControl() {
        onCommands = new Command[5];
        offCommands = new Command[5];

        Command noCommand = new NoCommand();
        for (int i = 0; i < 5; i++) {
            onCommands[i] = noCommand;
            offCommands[i] = noCommand;
        }
        undoCommand = noCommand;
    }

    public void setCommand(int slot, Command onCommand, Command offCommand) {
        onCommands[slot] = onCommand;
        offCommands[slot] = offCommand;
    }

    public void onButtonWasPushed(int slot) {
        onCommands[slot].execute();
        undoCommand = onCommands[slot];
    }

    public void offButtonWasPushed(int slot) {
        offCommands[slot].execute();
        undoCommand = offCommands[slot];
    }

    public void undoButtonWasPushed() {
        undoCommand.undo();
    }
}
`,paraId:171,tocIndex:84},{value:`public class NoCommand implements Command {
    @Override
    public void execute() {
        // Do nothing
    }

    @Override
    public void undo() {
        // Do nothing
    }
}
`,paraId:172,tocIndex:85},{value:`public class RemoteLoader {
    public static void main(String[] args) {
        RemoteControl remoteControl = new RemoteControl();

        Light livingRoomLight = new Light();
        TV livingRoomTV = new TV();

        LightOnCommand livingRoomLightOn = new LightOnCommand(livingRoomLight);
        LightOffCommand livingRoomLightOff = new LightOffCommand(livingRoomLight);

        TVOnCommand livingRoomTVOn = new TVOnCommand(livingRoomTV);
        TVOffCommand livingRoomTVOff = new TVOffCommand(livingRoomTV);

        remoteControl.setCommand(0, livingRoomLightOn, livingRoomLightOff);
        remoteControl.setCommand(1, livingRoomTVOn, livingRoomTVOff);

        System.out.println("Testing Light Commands");
        remoteControl.onButtonWasPushed(0);
        remoteControl.offButtonWasPushed(0);
        remoteControl.undoButtonWasPushed();

        System.out.println("Testing TV Commands");
        remoteControl.onButtonWasPushed(1);
        remoteControl.offButtonWasPushed(1);
        remoteControl.undoButtonWasPushed();
    }
}
`,paraId:173,tocIndex:86},{value:"Command",paraId:174,tocIndex:87},{value:"\uFF1A\u547D\u4EE4\u63A5\u53E3\uFF0C\u5B9A\u4E49\u4E86\u6267\u884C\u64CD\u4F5C\u548C\u64A4\u9500\u64CD\u4F5C\u7684\u65B9\u6CD5\u3002",paraId:174,tocIndex:87},{value:"LightOnCommand, LightOffCommand, TVOnCommand, TVOffCommand",paraId:174,tocIndex:87},{value:"\uFF1A\u5177\u4F53\u547D\u4EE4\u7C7B\uFF0C\u5B9E\u73B0\u4E86\u547D\u4EE4\u63A5\u53E3\uFF0C\u5E76\u8C03\u7528\u63A5\u6536\u8005\u7684\u76F8\u5173\u65B9\u6CD5\u3002",paraId:174,tocIndex:87},{value:"Light, TV",paraId:174,tocIndex:87},{value:"\uFF1A\u63A5\u6536\u8005\u7C7B\uFF0C\u5177\u4F53\u6267\u884C\u547D\u4EE4\u7684\u5BF9\u8C61\u3002",paraId:174,tocIndex:87},{value:"RemoteControl",paraId:174,tocIndex:87},{value:"\uFF1A\u8C03\u7528\u8005\u7C7B\uFF0C\u6301\u6709\u547D\u4EE4\u5BF9\u8C61\uFF0C\u5E76\u8C03\u7528\u547D\u4EE4\u5BF9\u8C61\u7684 ",paraId:174,tocIndex:87},{value:"execute",paraId:174,tocIndex:87},{value:" \u548C ",paraId:174,tocIndex:87},{value:"undo",paraId:174,tocIndex:87},{value:" \u65B9\u6CD5\u3002",paraId:174,tocIndex:87},{value:"NoCommand",paraId:174,tocIndex:87},{value:"\uFF1A\u7A7A\u547D\u4EE4\u7C7B\uFF0C\u5B9E\u73B0\u547D\u4EE4\u63A5\u53E3\uFF0C\u4EC0\u4E48\u4E5F\u4E0D\u505A\uFF0C\u7528\u4E8E\u521D\u59CB\u5316\u547D\u4EE4\u6570\u7EC4\u3002",paraId:174,tocIndex:87},{value:"RemoteLoader",paraId:174,tocIndex:87},{value:"\uFF1A\u5BA2\u6237\u7AEF\u4EE3\u7801\uFF0C\u8BBE\u7F6E\u547D\u4EE4\u5E76\u8C03\u7528\u3002",paraId:174,tocIndex:87},{value:"\u5728\u8FD9\u4E2A\u793A\u4F8B\u4E2D\uFF0C\u9065\u63A7\u5668\uFF08RemoteControl\uFF09\u4F5C\u4E3A\u8C03\u7528\u8005\uFF0C\u6301\u6709\u547D\u4EE4\u5BF9\u8C61\uFF0C\u5E76\u8C03\u7528\u547D\u4EE4\u5BF9\u8C61\u7684\u6267\u884C\u548C\u64A4\u9500\u65B9\u6CD5\uFF0C\u4ECE\u800C\u5B9E\u73B0\u547D\u4EE4\u7684\u53D1\u9001\u548C\u64A4\u9500\u3002\u547D\u4EE4\u5BF9\u8C61\u5C06\u8BF7\u6C42\u5C01\u88C5\u4E3A\u4E00\u4E2A\u5BF9\u8C61\uFF0C\u5E76\u5C06\u8BF7\u6C42\u4F20\u9012\u7ED9\u63A5\u6536\u8005\u6267\u884C\u3002",paraId:175,tocIndex:87},{value:"\u89E3\u91CA\u5668\u6A21\u5F0F\uFF08Interpreter Pattern\uFF09\u662F\u4E00\u79CD\u884C\u4E3A\u8BBE\u8BA1\u6A21\u5F0F\uFF0C",paraId:176,tocIndex:88},{value:"\u7528\u4E8E\u5B9A\u4E49\u8BED\u8A00\u7684\u6587\u6CD5\uFF0C\u5E76\u63D0\u4F9B\u4E00\u4E2A\u89E3\u91CA\u5668\u6765\u89E3\u91CA\u8BE5\u8BED\u8A00\u4E2D\u7684\u53E5\u5B50",paraId:176,tocIndex:88},{value:"\u3002\u5B83\u5B9A\u4E49\u4E86\u4E00\u79CD\u65B9\u5F0F\u6765\u8BC4\u4F30\u8BED\u8A00\u7684\u53E5\u5B50\u6216\u8868\u8FBE\u5F0F\uFF0C\u5C06\u5176\u8F6C\u6362\u6210\u53E6\u4E00\u79CD\u5F62\u5F0F\u6216\u6267\u884C\u67D0\u4E9B\u64CD\u4F5C\u3002",paraId:176,tocIndex:88},{value:"\u4EE5\u4E0B\u662F\u4E00\u4E2A\u7B80\u5355\u7684\u89E3\u91CA\u5668\u6A21\u5F0F\u793A\u4F8B\uFF0C\u5047\u8BBE\u6211\u4EEC\u6709\u4E00\u4E2A\u7B80\u5355\u7684\u8868\u8FBE\u5F0F\u8BED\u8A00\uFF0C\u53EF\u4EE5\u5BF9\u6570\u5B57\u8FDB\u884C\u52A0\u6CD5\u548C\u51CF\u6CD5\u8FD0\u7B97\u3002",paraId:177,tocIndex:88},{value:`public interface Expression {
    int interpret();
}
`,paraId:178,tocIndex:89},{value:`public class NumberExpression implements Expression {
    private int number;

    public NumberExpression(int number) {
        this.number = number;
    }

    @Override
    public int interpret() {
        return number;
    }
}
`,paraId:179,tocIndex:91},{value:`public class AddExpression implements Expression {
    private Expression left;
    private Expression right;

    public AddExpression(Expression left, Expression right) {
        this.left = left;
        this.right = right;
    }

    @Override
    public int interpret() {
        return left.interpret() + right.interpret();
    }
}
`,paraId:180,tocIndex:92},{value:`public class SubtractExpression implements Expression {
    private Expression left;
    private Expression right;

    public SubtractExpression(Expression left, Expression right) {
        this.left = left;
        this.right = right;
    }

    @Override
    public int interpret() {
        return left.interpret() - right.interpret();
    }
}
`,paraId:181,tocIndex:93},{value:`public class Client {
    public static void main(String[] args) {
        // \u6784\u5EFA\u8868\u8FBE\u5F0F\uFF1A(5 + 3) - 2
        Expression expression = new SubtractExpression(
            new AddExpression(new NumberExpression(5), new NumberExpression(3)),
            new NumberExpression(2)
        );

        // \u89E3\u91CA\u5E76\u8BA1\u7B97\u7ED3\u679C
        int result = expression.interpret();
        System.out.println("Result: " + result);
    }
}
`,paraId:182,tocIndex:94},{value:"Expression \u63A5\u53E3",paraId:183,tocIndex:95},{value:"\uFF1A\u5B9A\u4E49\u4E86\u89E3\u91CA\u5668\u7684\u63A5\u53E3\uFF0C\u5305\u542B\u4E00\u4E2A interpret \u65B9\u6CD5\u7528\u4E8E\u89E3\u91CA\u8868\u8FBE\u5F0F\u3002",paraId:183,tocIndex:95},{value:"NumberExpression \u7C7B",paraId:183,tocIndex:95},{value:"\uFF1A\u8868\u793A\u6570\u5B57\u8868\u8FBE\u5F0F\uFF0C\u5B9E\u73B0\u4E86 Expression \u63A5\u53E3\uFF0C\u5E76\u8FD4\u56DE\u6570\u5B57\u672C\u8EAB\u3002",paraId:183,tocIndex:95},{value:"AddExpression \u7C7B",paraId:183,tocIndex:95},{value:"\uFF1A\u8868\u793A\u52A0\u6CD5\u8868\u8FBE\u5F0F\uFF0C\u5305\u542B\u5DE6\u53F3\u4E24\u4E2A\u8868\u8FBE\u5F0F\uFF0C\u5B9E\u73B0\u4E86 Expression \u63A5\u53E3\uFF0C\u5E76\u5C06\u5DE6\u53F3\u8868\u8FBE\u5F0F\u7684\u7ED3\u679C\u76F8\u52A0\u3002",paraId:183,tocIndex:95},{value:"SubtractExpression \u7C7B",paraId:183,tocIndex:95},{value:"\uFF1A\u8868\u793A\u51CF\u6CD5\u8868\u8FBE\u5F0F\uFF0C\u5305\u542B\u5DE6\u53F3\u4E24\u4E2A\u8868\u8FBE\u5F0F\uFF0C\u5B9E\u73B0\u4E86 Expression \u63A5\u53E3\uFF0C\u5E76\u5C06\u5DE6\u53F3\u8868\u8FBE\u5F0F\u7684\u7ED3\u679C\u76F8\u51CF\u3002",paraId:183,tocIndex:95},{value:"Client \u7C7B",paraId:183,tocIndex:95},{value:"\uFF1A\u5BA2\u6237\u7AEF\u4EE3\u7801\uFF0C\u6784\u5EFA\u8868\u8FBE\u5F0F\u5E76\u89E3\u91CA\uFF0C\u8F93\u51FA\u8BA1\u7B97\u7ED3\u679C\u3002",paraId:183,tocIndex:95},{value:"\u5728\u8FD9\u4E2A\u793A\u4F8B\u4E2D\uFF0C\u6211\u4EEC\u901A\u8FC7\u4F7F\u7528\u8868\u8FBE\u5F0F\u89E3\u91CA\u5668\u6765\u8BA1\u7B97\u7B80\u5355\u7684\u6570\u5B66\u8868\u8FBE\u5F0F\uFF0C\u5982 ",paraId:184,tocIndex:95},{value:"(5 + 3) - 2",paraId:184,tocIndex:95},{value:"\u3002\u901A\u8FC7\u7EC4\u5408\u4E0D\u540C\u7684\u8868\u8FBE\u5F0F\uFF0C\u6211\u4EEC\u53EF\u4EE5\u6784\u5EFA\u590D\u6742\u7684\u8BED\u6CD5\u6811\uFF0C\u5E76\u4F7F\u7528\u89E3\u91CA\u5668\u6765\u89E3\u91CA\u548C\u6267\u884C\u8FD9\u4E9B\u8868\u8FBE\u5F0F\u3002",paraId:184,tocIndex:95},{value:"\u8FED\u4EE3\u5668\u6A21\u5F0F\uFF08Iterator Pattern\uFF09\u662F\u4E00\u79CD\u884C\u4E3A\u8BBE\u8BA1\u6A21\u5F0F\uFF0C",paraId:185,tocIndex:96},{value:"\u7528\u4E8E\u63D0\u4F9B\u4E00\u79CD\u65B9\u6CD5\u987A\u5E8F\u8BBF\u95EE\u96C6\u5408\u4E2D\u7684\u5143\u7D20\uFF0C\u800C\u65E0\u9700\u66B4\u9732\u96C6\u5408\u7684\u5185\u90E8\u8868\u793A",paraId:185,tocIndex:96},{value:"\u3002\u5B83\u5C06\u8FED\u4EE3\u903B\u8F91\u5C01\u88C5\u5728\u4E00\u4E2A\u72EC\u7ACB\u7684\u8FED\u4EE3\u5668\u5BF9\u8C61\u4E2D\uFF0C\u4F7F\u5F97\u5BA2\u6237\u7AEF\u53EF\u4EE5\u5728\u4E0D\u4E86\u89E3\u96C6\u5408\u5185\u90E8\u7ED3\u6784\u7684\u60C5\u51B5\u4E0B\u904D\u5386\u96C6\u5408\u4E2D\u7684\u5143\u7D20\u3002",paraId:185,tocIndex:96},{value:"\u4EE5\u4E0B\u662F\u8FED\u4EE3\u5668\u6A21\u5F0F\u7684\u57FA\u672C\u7ED3\u6784\u548C\u793A\u4F8B\uFF1A",paraId:186,tocIndex:96},{value:"\u8FED\u4EE3\u5668\uFF08Iterator\uFF09\u63A5\u53E3",paraId:187,tocIndex:97},{value:"\uFF1A\u5B9A\u4E49\u4E86\u7528\u4E8E\u904D\u5386\u96C6\u5408\u7684\u65B9\u6CD5\uFF0C\u5305\u62EC\u83B7\u53D6\u4E0B\u4E00\u4E2A\u5143\u7D20\u3001\u5224\u65AD\u662F\u5426\u8FD8\u6709\u4E0B\u4E00\u4E2A\u5143\u7D20\u7B49\u3002",paraId:187,tocIndex:97},{value:"\u5177\u4F53\u8FED\u4EE3\u5668\uFF08ConcreteIterator\uFF09\u7C7B",paraId:187,tocIndex:97},{value:"\uFF1A\u5B9E\u73B0\u4E86\u8FED\u4EE3\u5668\u63A5\u53E3\uFF0C\u8D1F\u8D23\u5B9E\u73B0\u5177\u4F53\u7684\u904D\u5386\u903B\u8F91\u3002",paraId:187,tocIndex:97},{value:"\u96C6\u5408\uFF08Aggregate\uFF09\u63A5\u53E3",paraId:187,tocIndex:97},{value:"\uFF1A\u5B9A\u4E49\u4E86\u521B\u5EFA\u8FED\u4EE3\u5668\u5BF9\u8C61\u7684\u65B9\u6CD5\u3002",paraId:187,tocIndex:97},{value:"\u5177\u4F53\u96C6\u5408\uFF08ConcreteAggregate\uFF09\u7C7B",paraId:187,tocIndex:97},{value:"\uFF1A\u5B9E\u73B0\u4E86\u96C6\u5408\u63A5\u53E3\uFF0C\u8D1F\u8D23\u521B\u5EFA\u5177\u4F53\u7684\u8FED\u4EE3\u5668\u5BF9\u8C61\u3002",paraId:187,tocIndex:97},{value:`public interface Iterator<T> {
    boolean hasNext();
    T next();
}
`,paraId:188,tocIndex:99},{value:`public class ConcreteIterator<T> implements Iterator<T> {
    private T[] array;
    private int currentIndex = 0;

    public ConcreteIterator(T[] array) {
        this.array = array;
    }

    @Override
    public boolean hasNext() {
        return currentIndex < array.length;
    }

    @Override
    public T next() {
        if (!hasNext()) {
            throw new NoSuchElementException();
        }
        return array[currentIndex++];
    }
}
`,paraId:189,tocIndex:100},{value:`public interface Aggregate<T> {
    Iterator<T> iterator();
}
`,paraId:190,tocIndex:101},{value:`public class ConcreteAggregate<T> implements Aggregate<T> {
    private T[] array;

    public ConcreteAggregate(T[] array) {
        this.array = array;
    }

    @Override
    public Iterator<T> iterator() {
        return new ConcreteIterator<>(array);
    }
}
`,paraId:191,tocIndex:102},{value:`public class Client {
    public static void main(String[] args) {
        String[] array = {"A", "B", "C", "D", "E"};
        Aggregate<String> aggregate = new ConcreteAggregate<>(array);
        Iterator<String> iterator = aggregate.iterator();

        while (iterator.hasNext()) {
            System.out.println(iterator.next());
        }
    }
}
`,paraId:192,tocIndex:103},{value:"Iterator \u63A5\u53E3",paraId:193,tocIndex:104},{value:"\uFF1A\u5B9A\u4E49\u4E86\u7528\u4E8E\u904D\u5386\u96C6\u5408\u7684\u65B9\u6CD5\uFF0C\u5305\u62EC\u5224\u65AD\u662F\u5426\u8FD8\u6709\u4E0B\u4E00\u4E2A\u5143\u7D20\u548C\u83B7\u53D6\u4E0B\u4E00\u4E2A\u5143\u7D20\u3002",paraId:193,tocIndex:104},{value:"ConcreteIterator \u7C7B",paraId:193,tocIndex:104},{value:"\uFF1A\u5B9E\u73B0\u4E86\u8FED\u4EE3\u5668\u63A5\u53E3\uFF0C\u8D1F\u8D23\u904D\u5386\u5177\u4F53\u7684\u96C6\u5408\uFF0C\u5E76\u5B9E\u73B0\u904D\u5386\u903B\u8F91\u3002",paraId:193,tocIndex:104},{value:"Aggregate \u63A5\u53E3",paraId:193,tocIndex:104},{value:"\uFF1A\u5B9A\u4E49\u4E86\u7528\u4E8E\u521B\u5EFA\u8FED\u4EE3\u5668\u5BF9\u8C61\u7684\u65B9\u6CD5\u3002",paraId:193,tocIndex:104},{value:"ConcreteAggregate \u7C7B",paraId:193,tocIndex:104},{value:"\uFF1A\u5B9E\u73B0\u4E86\u96C6\u5408\u63A5\u53E3\uFF0C\u8D1F\u8D23\u521B\u5EFA\u5177\u4F53\u7684\u8FED\u4EE3\u5668\u5BF9\u8C61\u3002",paraId:193,tocIndex:104},{value:"Client \u7C7B",paraId:193,tocIndex:104},{value:"\uFF1A\u5BA2\u6237\u7AEF\u4EE3\u7801\uFF0C\u4F7F\u7528\u5177\u4F53\u96C6\u5408\u7C7B\u521B\u5EFA\u96C6\u5408\u5BF9\u8C61\uFF0C\u5E76\u901A\u8FC7\u8FED\u4EE3\u5668\u904D\u5386\u96C6\u5408\u4E2D\u7684\u5143\u7D20\u3002",paraId:193,tocIndex:104},{value:"\u901A\u8FC7\u8FED\u4EE3\u5668\u6A21\u5F0F\uFF0C\u5BA2\u6237\u7AEF\u53EF\u4EE5\u4F7F\u7528\u7EDF\u4E00\u7684\u63A5\u53E3\u904D\u5386\u96C6\u5408\u4E2D\u7684\u5143\u7D20\uFF0C\u800C\u4E0D\u9700\u8981\u4E86\u89E3\u96C6\u5408\u7684\u5185\u90E8\u7ED3\u6784\u3002\u8FD9\u6837\u53EF\u4EE5\u63D0\u9AD8\u4EE3\u7801\u7684\u7075\u6D3B\u6027\u548C\u53EF\u7EF4\u62A4\u6027\u3002",paraId:194,tocIndex:104},{value:"\u89C2\u5BDF\u8005\u6A21\u5F0F\uFF08Observer Pattern\uFF09\u662F\u4E00\u79CD\u884C\u4E3A\u8BBE\u8BA1\u6A21\u5F0F\uFF0C",paraId:195,tocIndex:105},{value:"\u7528\u4E8E\u5B9A\u4E49\u5BF9\u8C61\u4E4B\u95F4\u7684\u4E00\u5BF9\u591A\u4F9D\u8D56\u5173\u7CFB\uFF0C\u5F53\u4E00\u4E2A\u5BF9\u8C61\u7684\u72B6\u6001\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u5176\u6240\u6709\u4F9D\u8D56\u5BF9\u8C61\u90FD\u4F1A\u6536\u5230\u901A\u77E5\u5E76\u81EA\u52A8\u66F4\u65B0",paraId:195,tocIndex:105},{value:"\u3002\u8FD9\u79CD\u6A21\u5F0F\u901A\u5E38\u88AB\u7528\u4E8E\u5B9E\u73B0",paraId:195,tocIndex:105},{value:"\u5206\u5E03\u5F0F\u4E8B\u4EF6\u5904\u7406\u7CFB\u7EDF",paraId:195,tocIndex:105},{value:"\u3002",paraId:195,tocIndex:105},{value:"\u4EE5\u4E0B\u662F\u89C2\u5BDF\u8005\u6A21\u5F0F\u7684\u57FA\u672C\u7ED3\u6784\u548C\u793A\u4F8B\uFF1A",paraId:196,tocIndex:105},{value:"Subject\uFF08\u4E3B\u9898\uFF09",paraId:197,tocIndex:106},{value:"\uFF1A\u88AB\u89C2\u5BDF\u7684\u5BF9\u8C61\uFF0C\u5B83\u7EF4\u62A4\u4E00\u7EC4\u89C2\u5BDF\u8005\u5BF9\u8C61\uFF0C\u63D0\u4F9B\u65B9\u6CD5\u7528\u4E8E\u6DFB\u52A0\u3001\u5220\u9664\u548C\u901A\u77E5\u89C2\u5BDF\u8005\u3002",paraId:197,tocIndex:106},{value:"Observer\uFF08\u89C2\u5BDF\u8005\uFF09",paraId:197,tocIndex:106},{value:"\uFF1A\u89C2\u5BDF\u4E3B\u9898\u7684\u5BF9\u8C61\uFF0C\u5F53\u4E3B\u9898\u72B6\u6001\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u4F1A\u6536\u5230\u901A\u77E5\u5E76\u6267\u884C\u76F8\u5E94\u7684\u66F4\u65B0\u64CD\u4F5C\u3002",paraId:197,tocIndex:106},{value:`public interface Subject {
    void registerObserver(Observer observer);
    void removeObserver(Observer observer);
    void notifyObservers();
}
`,paraId:198,tocIndex:108},{value:`public class ConcreteSubject implements Subject {
    private List<Observer> observers = new ArrayList<>();
    private int state;

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
        notifyObservers();
    }

    @Override
    public void registerObserver(Observer observer) {
        observers.add(observer);
    }

    @Override
    public void removeObserver(Observer observer) {
        observers.remove(observer);
    }
	
    // \u53D1\u751F\u53D8\u5316\u65F6\u901A\u77E5\u81EA\u5DF1\u7684\u89C2\u5BDF\u8005
    @Override
    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(state);
        }
    }
}
`,paraId:199,tocIndex:109},{value:`public interface Observer {
    void update(int state);
}
`,paraId:200,tocIndex:110},{value:`public class ConcreteObserver implements Observer {
    private int state;

    @Override
    public void update(int state) {
        this.state = state;
        System.out.println("Observer updated with state: " + state);
    }
}
`,paraId:201,tocIndex:111},{value:`public class Client {
    public static void main(String[] args) {
        ConcreteSubject subject = new ConcreteSubject();
        ConcreteObserver observer1 = new ConcreteObserver();
        ConcreteObserver observer2 = new ConcreteObserver();

        subject.registerObserver(observer1);
        subject.registerObserver(observer2);

        subject.setState(10);
        subject.setState(20);

        subject.removeObserver(observer1);

        subject.setState(30);
    }
}
`,paraId:202,tocIndex:112},{value:"Subject \u63A5\u53E3",paraId:203,tocIndex:113},{value:"\uFF1A\u5B9A\u4E49\u4E86\u4E3B\u9898\u7684\u65B9\u6CD5\uFF0C\u5305\u62EC\u6CE8\u518C\u3001\u5220\u9664\u548C\u901A\u77E5\u89C2\u5BDF\u8005\u3002",paraId:203,tocIndex:113},{value:"ConcreteSubject \u7C7B",paraId:203,tocIndex:113},{value:"\uFF1A\u5177\u4F53\u7684\u4E3B\u9898\u7C7B\uFF0C\u7EF4\u62A4\u4E86\u4E00\u7EC4\u89C2\u5BDF\u8005\u5BF9\u8C61\uFF0C\u5E76\u5728\u72B6\u6001\u53D1\u751F\u53D8\u5316\u65F6\u901A\u77E5\u5B83\u4EEC\u3002",paraId:203,tocIndex:113},{value:"Observer \u63A5\u53E3",paraId:203,tocIndex:113},{value:"\uFF1A\u5B9A\u4E49\u4E86\u89C2\u5BDF\u8005\u7684\u65B9\u6CD5\uFF0C\u5305\u62EC\u66F4\u65B0\u64CD\u4F5C\u3002",paraId:203,tocIndex:113},{value:"ConcreteObserver \u7C7B",paraId:203,tocIndex:113},{value:"\uFF1A\u5177\u4F53\u7684\u89C2\u5BDF\u8005\u7C7B\uFF0C\u5B9E\u73B0\u4E86 Observer \u63A5\u53E3\uFF0C\u8D1F\u8D23\u63A5\u6536\u4E3B\u9898\u7684\u901A\u77E5\u5E76\u6267\u884C\u76F8\u5E94\u7684\u66F4\u65B0\u64CD\u4F5C\u3002",paraId:203,tocIndex:113},{value:"Client \u7C7B",paraId:203,tocIndex:113},{value:"\uFF1A\u5BA2\u6237\u7AEF\u4EE3\u7801\uFF0C\u521B\u5EFA\u5177\u4F53\u7684\u4E3B\u9898\u548C\u89C2\u5BDF\u8005\u5BF9\u8C61\uFF0C\u5E76\u6CE8\u518C\u89C2\u5BDF\u8005\u5230\u4E3B\u9898\u4E2D\uFF0C\u6F14\u793A\u4E3B\u9898\u72B6\u6001\u53D1\u751F\u53D8\u5316\u65F6\u89C2\u5BDF\u8005\u7684\u66F4\u65B0\u64CD\u4F5C\u3002",paraId:203,tocIndex:113},{value:"\u901A\u8FC7\u89C2\u5BDF\u8005\u6A21\u5F0F\uFF0C\u4E3B\u9898\u548C\u89C2\u5BDF\u8005\u4E4B\u95F4\u89E3\u8026\u5408\uFF0C\u4F7F\u5F97\u4E3B\u9898\u548C\u89C2\u5BDF\u8005\u53EF\u4EE5\u72EC\u7ACB\u5730\u8FDB\u884C\u53D8\u5316\uFF0C\u63D0\u9AD8\u4E86\u4EE3\u7801\u7684\u7075\u6D3B\u6027\u548C\u53EF\u7EF4\u62A4\u6027\u3002",paraId:204,tocIndex:113},{value:"\u7C7B\u4F3CMQ",paraId:0},{value:"\u4E2D\u4ECB\u8005\u6A21\u5F0F\uFF08Mediator Pattern\uFF09\u662F\u4E00\u79CD\u884C\u4E3A\u8BBE\u8BA1\u6A21\u5F0F\uFF0C",paraId:205,tocIndex:114},{value:"\u7528\u4E8E\u51CF\u5C11\u5BF9\u8C61\u4E4B\u95F4\u7684\u76F4\u63A5\u901A\u4FE1\uFF0C\u800C\u662F\u901A\u8FC7\u4E00\u4E2A\u4E2D\u4ECB\u8005\u5BF9\u8C61\u6765\u534F\u8C03\u5404\u4E2A\u5BF9\u8C61\u4E4B\u95F4\u7684\u4EA4\u4E92",paraId:205,tocIndex:114},{value:"\u3002\u8FD9\u79CD\u6A21\u5F0F\u6709\u52A9\u4E8E\u964D\u4F4E\u7CFB\u7EDF\u4E2D\u5BF9\u8C61\u4E4B\u95F4\u7684\u8026\u5408\u5EA6\u3002",paraId:205,tocIndex:114},{value:"\u4EE5\u4E0B\u662F\u4E2D\u4ECB\u8005\u6A21\u5F0F\u7684\u57FA\u672C\u7ED3\u6784\u548C\u793A\u4F8B\uFF1A",paraId:206,tocIndex:114},{value:"\u4E2D\u4ECB\u8005\uFF08Mediator\uFF09\u63A5\u53E3",paraId:207,tocIndex:115},{value:"\uFF1A\u5B9A\u4E49\u4E86\u4E2D\u4ECB\u8005\u5BF9\u8C61\u7684\u65B9\u6CD5\uFF0C\u7528\u4E8E\u5404\u4E2A\u540C\u4E8B\u5BF9\u8C61\u4E4B\u95F4\u7684\u901A\u4FE1\u3002",paraId:207,tocIndex:115},{value:"\u5177\u4F53\u4E2D\u4ECB\u8005\uFF08Concrete Mediator\uFF09\u7C7B",paraId:207,tocIndex:115},{value:"\uFF1A\u5B9E\u73B0\u4E86\u4E2D\u4ECB\u8005\u63A5\u53E3\uFF0C\u8D1F\u8D23\u534F\u8C03\u5404\u4E2A\u540C\u4E8B\u5BF9\u8C61\u4E4B\u95F4\u7684\u4EA4\u4E92\u5173\u7CFB\u3002",paraId:207,tocIndex:115},{value:"\u540C\u4E8B\uFF08Colleague\uFF09\u63A5\u53E3",paraId:207,tocIndex:115},{value:"\uFF1A\u5B9A\u4E49\u4E86\u540C\u4E8B\u5BF9\u8C61\u7684\u65B9\u6CD5\uFF0C\u7528\u4E8E\u4E0E\u4E2D\u4ECB\u8005\u5BF9\u8C61\u8FDB\u884C\u901A\u4FE1\u3002",paraId:207,tocIndex:115},{value:"\u5177\u4F53\u540C\u4E8B\uFF08Concrete Colleague\uFF09\u7C7B",paraId:207,tocIndex:115},{value:"\uFF1A\u5B9E\u73B0\u4E86\u540C\u4E8B\u63A5\u53E3\uFF0C\u901A\u8FC7\u4E2D\u4ECB\u8005\u5BF9\u8C61\u4E0E\u5176\u4ED6\u540C\u4E8B\u5BF9\u8C61\u8FDB\u884C\u901A\u4FE1\u3002",paraId:207,tocIndex:115},{value:`public interface Mediator {
    void sendMessage(Colleague colleague, String message);
}
`,paraId:208,tocIndex:117},{value:`public class ConcreteMediator implements Mediator {
    private List<Colleague> colleagues = new ArrayList<>();

    public void addColleague(Colleague colleague) {
        colleagues.add(colleague);
    }

    @Override
    public void sendMessage(Colleague sender, String message) {
        for (Colleague colleague : colleagues) {
            if (colleague != sender) {
                colleague.receiveMessage(message);
            }
        }
    }
}
`,paraId:209,tocIndex:118},{value:`public interface Colleague {
    void sendMessage(String message);
    void receiveMessage(String message);
}
`,paraId:210,tocIndex:119},{value:`public class ConcreteColleague implements Colleague {
    private Mediator mediator;

    public ConcreteColleague(Mediator mediator) {
        this.mediator = mediator;
    }

    @Override
    public void sendMessage(String message) {
        mediator.sendMessage(this, message);
    }

    @Override
    public void receiveMessage(String message) {
        System.out.println("Received message: " + message);
    }
}
`,paraId:211,tocIndex:120},{value:`public class Client {
    public static void main(String[] args) {
        ConcreteMediator mediator = new ConcreteMediator();
        ConcreteColleague colleague1 = new ConcreteColleague(mediator);
        ConcreteColleague colleague2 = new ConcreteColleague(mediator);

        mediator.addColleague(colleague1);
        mediator.addColleague(colleague2);

        colleague1.sendMessage("Hello from colleague 1!");
        colleague2.sendMessage("Hi from colleague 2!");
    }
}
`,paraId:212,tocIndex:121},{value:"Mediator \u63A5\u53E3",paraId:213,tocIndex:122},{value:"\uFF1A\u5B9A\u4E49\u4E86\u4E2D\u4ECB\u8005\u5BF9\u8C61\u7684\u65B9\u6CD5\uFF0C\u7528\u4E8E\u540C\u4E8B\u5BF9\u8C61\u4E4B\u95F4\u7684\u901A\u4FE1\u3002",paraId:213,tocIndex:122},{value:"ConcreteMediator \u7C7B",paraId:213,tocIndex:122},{value:"\uFF1A\u5177\u4F53\u7684\u4E2D\u4ECB\u8005\u7C7B\uFF0C\u5B9E\u73B0\u4E86\u4E2D\u4ECB\u8005\u63A5\u53E3\uFF0C\u8D1F\u8D23\u534F\u8C03\u5404\u4E2A\u540C\u4E8B\u5BF9\u8C61\u4E4B\u95F4\u7684\u901A\u4FE1\u5173\u7CFB\u3002",paraId:213,tocIndex:122},{value:"Colleague \u63A5\u53E3",paraId:213,tocIndex:122},{value:"\uFF1A\u5B9A\u4E49\u4E86\u540C\u4E8B\u5BF9\u8C61\u7684\u65B9\u6CD5\uFF0C\u7528\u4E8E\u4E0E\u4E2D\u4ECB\u8005\u5BF9\u8C61\u8FDB\u884C\u901A\u4FE1\u3002",paraId:213,tocIndex:122},{value:"ConcreteColleague \u7C7B",paraId:213,tocIndex:122},{value:"\uFF1A\u5177\u4F53\u7684\u540C\u4E8B\u7C7B\uFF0C\u5B9E\u73B0\u4E86\u540C\u4E8B\u63A5\u53E3\uFF0C\u901A\u8FC7\u4E2D\u4ECB\u8005\u5BF9\u8C61\u4E0E\u5176\u4ED6\u540C\u4E8B\u5BF9\u8C61\u8FDB\u884C\u901A\u4FE1\u3002",paraId:213,tocIndex:122},{value:"Client \u7C7B",paraId:213,tocIndex:122},{value:"\uFF1A\u5BA2\u6237\u7AEF\u4EE3\u7801\uFF0C\u521B\u5EFA\u5177\u4F53\u7684\u4E2D\u4ECB\u8005\u548C\u540C\u4E8B\u5BF9\u8C61\uFF0C\u5C06\u540C\u4E8B\u5BF9\u8C61\u6CE8\u518C\u5230\u4E2D\u4ECB\u8005\u4E2D\uFF0C\u5E76\u8FDB\u884C\u901A\u4FE1\u6F14\u793A\u3002",paraId:213,tocIndex:122},{value:"\u901A\u8FC7\u4E2D\u4ECB\u8005\u6A21\u5F0F\uFF0C\u53EF\u4EE5\u5C06\u5BF9\u8C61\u4E4B\u95F4\u7684\u901A\u4FE1\u96C6\u4E2D\u7BA1\u7406\uFF0C\u51CF\u5C11\u4E86\u5BF9\u8C61\u4E4B\u95F4\u7684\u76F4\u63A5\u8026\u5408\uFF0C\u63D0\u9AD8\u4E86\u4EE3\u7801\u7684\u7075\u6D3B\u6027\u548C\u53EF\u7EF4\u62A4\u6027\u3002",paraId:214,tocIndex:122},{value:"\u7B56\u7565\u6A21\u5F0F\uFF08Strategy Pattern\uFF09\u662F\u4E00\u79CD\u884C\u4E3A\u8BBE\u8BA1\u6A21\u5F0F\uFF0C",paraId:215,tocIndex:123},{value:"\u5B83\u5B9A\u4E49\u4E86\u4E00\u7CFB\u5217\u7B97\u6CD5\uFF0C\u5C06\u6BCF\u4E2A\u7B97\u6CD5\u5C01\u88C5\u5230\u5177\u6709\u5171\u540C\u63A5\u53E3\u7684\u7B56\u7565\u7C7B\u4E2D\uFF0C\u4F7F\u5F97\u5B83\u4EEC\u53EF\u4EE5\u76F8\u4E92\u66FF\u6362",paraId:215,tocIndex:123},{value:"\u3002\u8FD9\u79CD\u6A21\u5F0F\u53EF\u4EE5\u8BA9\u7B97\u6CD5\u7684\u53D8\u5316\u72EC\u7ACB\u4E8E\u4F7F\u7528\u7B97\u6CD5\u7684\u5BA2\u6237\u7AEF\u3002",paraId:215,tocIndex:123},{value:"\u4EE5\u4E0B\u662F\u7B56\u7565\u6A21\u5F0F\u7684\u57FA\u672C\u7ED3\u6784\u548C\u793A\u4F8B\uFF1A",paraId:216,tocIndex:123},{value:"Context\uFF08\u4E0A\u4E0B\u6587\uFF09",paraId:217,tocIndex:124},{value:"\uFF1A\u7EF4\u6301\u4E00\u4E2A\u5BF9\u7B56\u7565\u5BF9\u8C61\u7684\u5F15\u7528\uFF0C\u63D0\u4F9B\u4E00\u4E2A\u63A5\u53E3\uFF0C\u7528\u4E8E\u8C03\u7528\u5177\u4F53\u7B56\u7565\u7684\u7B97\u6CD5\u3002",paraId:217,tocIndex:124},{value:"Strategy\uFF08\u7B56\u7565\uFF09\u63A5\u53E3",paraId:217,tocIndex:124},{value:"\uFF1A\u5B9A\u4E49\u4E86\u6240\u6709\u652F\u6301\u7684\u7B97\u6CD5\u7684\u901A\u7528\u63A5\u53E3\u3002",paraId:217,tocIndex:124},{value:"ConcreteStrategy\uFF08\u5177\u4F53\u7B56\u7565\uFF09\u7C7B",paraId:217,tocIndex:124},{value:"\uFF1A\u5B9E\u73B0\u4E86\u7B56\u7565\u63A5\u53E3\uFF0C\u5C01\u88C5\u4E86\u5177\u4F53\u7684\u7B97\u6CD5\u3002",paraId:217,tocIndex:124},{value:`public interface PaymentStrategy {
    void pay(int amount);
}
`,paraId:218,tocIndex:126},{value:`// \u4F7F\u7528\u4FE1\u7528\u5361\u652F\u4ED8
public class CreditCardPaymentStrategy implements PaymentStrategy {
    private String cardNumber;
    private String expiryDate;
    private String cvv;

    public CreditCardPaymentStrategy(String cardNumber, String expiryDate, String cvv) {
        this.cardNumber = cardNumber;
        this.expiryDate = expiryDate;
        this.cvv = cvv;
    }

    @Override
    public void pay(int amount) {
        System.out.println("Paying " + amount + " using credit card.");
    }
}

// \u4F7F\u7528paypal\u652F\u4ED8
public class PayPalPaymentStrategy implements PaymentStrategy {
    private String email;
    private String password;

    public PayPalPaymentStrategy(String email, String password) {
        this.email = email;
        this.password = password;
    }

    @Override
    public void pay(int amount) {
        System.out.println("Paying " + amount + " using PayPal.");
    }
}
`,paraId:219,tocIndex:127},{value:`public class PaymentContext {
    private PaymentStrategy strategy;

    public PaymentContext(PaymentStrategy strategy) {
        this.strategy = strategy;
    }

    public void setStrategy(PaymentStrategy strategy) {
        this.strategy = strategy;
    }

    public void executePayment(int amount) {
        strategy.pay(amount);
    }
}
`,paraId:220,tocIndex:128},{value:`public class Client {
    public static void main(String[] args) {
        PaymentContext paymentContext = new PaymentContext(new CreditCardPaymentStrategy("1234567890", "12/25", "123"));
        paymentContext.executePayment(100);

        paymentContext.setStrategy(new PayPalPaymentStrategy("example@example.com", "password"));
        paymentContext.executePayment(200);
    }
}
`,paraId:221,tocIndex:129},{value:"PaymentStrategy \u63A5\u53E3",paraId:222,tocIndex:130},{value:"\uFF1A\u5B9A\u4E49\u4E86\u652F\u4ED8\u7B56\u7565\u7684\u901A\u7528\u63A5\u53E3\u3002",paraId:222,tocIndex:130},{value:"CreditCardPaymentStrategy \u548C PayPalPaymentStrategy \u7C7B",paraId:222,tocIndex:130},{value:"\uFF1A\u5177\u4F53\u7684\u652F\u4ED8\u7B56\u7565\u7C7B\uFF0C\u5B9E\u73B0\u4E86\u652F\u4ED8\u7B56\u7565\u63A5\u53E3\uFF0C\u5C01\u88C5\u4E86\u5177\u4F53\u7684\u652F\u4ED8\u903B\u8F91\u3002",paraId:222,tocIndex:130},{value:"PaymentContext \u7C7B",paraId:222,tocIndex:130},{value:"\uFF1A\u4E0A\u4E0B\u6587\u7C7B\uFF0C\u7EF4\u6301\u4E00\u4E2A\u5BF9\u7B56\u7565\u5BF9\u8C61\u7684\u5F15\u7528\uFF0C\u63D0\u4F9B\u4E00\u4E2A\u63A5\u53E3\u7528\u4E8E\u6267\u884C\u5177\u4F53\u7684\u652F\u4ED8\u64CD\u4F5C\u3002",paraId:222,tocIndex:130},{value:"Client \u7C7B",paraId:222,tocIndex:130},{value:"\uFF1A\u5BA2\u6237\u7AEF\u4EE3\u7801\uFF0C\u521B\u5EFA\u5177\u4F53\u7684\u652F\u4ED8\u7B56\u7565\u5BF9\u8C61\u5E76\u4F20\u9012\u7ED9\u4E0A\u4E0B\u6587\u7C7B\uFF0C\u7136\u540E\u901A\u8FC7\u4E0A\u4E0B\u6587\u7C7B\u6267\u884C\u652F\u4ED8\u64CD\u4F5C\u3002",paraId:222,tocIndex:130},{value:"\u901A\u8FC7\u7B56\u7565\u6A21\u5F0F\uFF0C",paraId:223,tocIndex:130},{value:"\u5BA2\u6237\u7AEF\u53EF\u4EE5\u6839\u636E\u9700\u6C42\u9009\u62E9\u4E0D\u540C\u7684\u652F\u4ED8\u7B56\u7565\uFF0C\u800C\u4E0D\u9700\u8981\u4FEE\u6539\u5BA2\u6237\u7AEF\u4EE3\u7801\uFF0C\u5B9E\u73B0\u4E86\u7B97\u6CD5\u548C\u5BA2\u6237\u7AEF\u7684\u89E3\u8026\u5408",paraId:223,tocIndex:130},{value:"\u53EF\u4EE5\u7528\u6765\u5E94\u5BF9\u6D77\u91CFifelse\u7684\u60C5\u51B5",paraId:224,tocIndex:130},{value:"\u72B6\u6001\u6A21\u5F0F\uFF08State Pattern\uFF09\u662F\u4E00\u79CD\u884C\u4E3A\u8BBE\u8BA1\u6A21\u5F0F\uFF0C",paraId:225,tocIndex:131},{value:"\u5B83\u5141\u8BB8\u5BF9\u8C61\u5728\u5176\u5185\u90E8\u72B6\u6001\u6539\u53D8\u65F6\u6539\u53D8\u5176\u884C\u4E3A",paraId:225,tocIndex:131},{value:"\u3002\u8FD9\u79CD\u6A21\u5F0F\u7684\u5173\u952E\u601D\u60F3",paraId:225,tocIndex:131},{value:"\u662F\u5C06\u5BF9\u8C61\u7684\u72B6\u6001\u5C01\u88C5\u6210\u72EC\u7ACB\u7684\u7C7B\uFF0C\u5E76\u5C06\u884C\u4E3A\u59D4\u6258\u7ED9\u5F53\u524D\u72B6\u6001\u5BF9\u8C61",paraId:225,tocIndex:131},{value:"\u3002",paraId:225,tocIndex:131},{value:"\u4EE5\u4E0B\u662F\u72B6\u6001\u6A21\u5F0F\u7684\u57FA\u672C\u7ED3\u6784\u548C\u793A\u4F8B\uFF1A",paraId:226,tocIndex:131},{value:"Context\uFF08\u4E0A\u4E0B\u6587\uFF09",paraId:227,tocIndex:132},{value:"\uFF1A\u7EF4\u6301\u4E00\u4E2A\u5BF9\u5F53\u524D\u72B6\u6001\u5BF9\u8C61\u7684\u5F15\u7528\uFF0C\u53EF\u4EE5\u901A\u8FC7\u8BE5\u5BF9\u8C61\u6765\u89E6\u53D1\u72B6\u6001\u7684\u6539\u53D8\u3002",paraId:227,tocIndex:132},{value:"State\uFF08\u72B6\u6001\uFF09\u63A5\u53E3",paraId:227,tocIndex:132},{value:"\uFF1A\u5B9A\u4E49\u4E86\u6240\u6709\u5177\u4F53\u72B6\u6001\u7C7B\u7684\u901A\u7528\u63A5\u53E3\u3002",paraId:227,tocIndex:132},{value:"ConcreteState\uFF08\u5177\u4F53\u72B6\u6001\uFF09\u7C7B",paraId:227,tocIndex:132},{value:"\uFF1A\u5B9E\u73B0\u4E86\u72B6\u6001\u63A5\u53E3\uFF0C\u5C01\u88C5\u4E86\u5177\u4F53\u7684\u72B6\u6001\u884C\u4E3A\u3002",paraId:227,tocIndex:132},{value:`public interface State {
    void handleRequest();
}
`,paraId:228,tocIndex:134},{value:`public class OpenState implements State {
    @Override
    public void handleRequest() {
        System.out.println("Door is open");
    }
}

public class ClosedState implements State {
    @Override
    public void handleRequest() {
        System.out.println("Door is closed");
    }
}

public class LockedState implements State {
    @Override
    public void handleRequest() {
        System.out.println("Door is locked");
    }
}
`,paraId:229,tocIndex:135},{value:`public class DoorContext {
    private State currentState;

    public DoorContext() {
        this.currentState = new ClosedState();
    }

    public void setState(State state) {
        this.currentState = state;
    }

    public void request() {
        currentState.handleRequest();
    }
}
`,paraId:230,tocIndex:136},{value:`public class Client {
    public static void main(String[] args) {
        DoorContext door = new DoorContext();

        door.request(); // Output: Door is closed

        door.setState(new OpenState());
        door.request(); // Output: Door is open

        door.setState(new LockedState());
        door.request(); // Output: Door is locked
    }
}
`,paraId:231,tocIndex:137},{value:"State \u63A5\u53E3",paraId:232,tocIndex:138},{value:"\uFF1A\u5B9A\u4E49\u4E86\u72B6\u6001\u5BF9\u8C61\u7684\u901A\u7528\u63A5\u53E3\uFF0C\u5305\u542B\u4E86\u72B6\u6001\u5BF9\u8C61\u53EF\u80FD\u4F1A\u6267\u884C\u7684\u884C\u4E3A\u3002",paraId:232,tocIndex:138},{value:"\u5177\u4F53\u72B6\u6001\u7C7B",paraId:232,tocIndex:138},{value:"\uFF1A\u5B9E\u73B0\u4E86\u72B6\u6001\u63A5\u53E3\uFF0C\u5C01\u88C5\u4E86\u5177\u4F53\u7684\u72B6\u6001\u884C\u4E3A\u3002",paraId:232,tocIndex:138},{value:"DoorContext \u7C7B",paraId:232,tocIndex:138},{value:"\uFF1A\u4E0A\u4E0B\u6587\u7C7B\uFF0C\u7EF4\u6301\u4E00\u4E2A\u5BF9\u5F53\u524D\u72B6\u6001\u5BF9\u8C61\u7684\u5F15\u7528\uFF0C\u5E76\u63D0\u4F9B\u4E86\u4E00\u4E2A\u7528\u4E8E\u89E6\u53D1\u72B6\u6001\u6539\u53D8\u7684\u65B9\u6CD5\u3002",paraId:232,tocIndex:138},{value:"Client \u7C7B",paraId:232,tocIndex:138},{value:"\uFF1A\u5BA2\u6237\u7AEF\u4EE3\u7801\uFF0C\u521B\u5EFA\u4E0A\u4E0B\u6587\u5BF9\u8C61\u5E76\u6839\u636E\u9700\u8981\u8BBE\u7F6E\u4E0D\u540C\u7684\u72B6\u6001\uFF0C\u7136\u540E\u89E6\u53D1\u72B6\u6001\u7684\u6539\u53D8\u3002",paraId:232,tocIndex:138},{value:"\u901A\u8FC7\u72B6\u6001\u6A21\u5F0F\uFF0C\u53EF\u4EE5\u4F7F\u5F97\u5BF9\u8C61\u7684\u884C\u4E3A\u5728\u5176\u5185\u90E8\u72B6\u6001\u6539\u53D8\u65F6\u81EA\u52A8\u6539\u53D8",paraId:233,tocIndex:138},{value:"\uFF0C\u540C\u65F6\u907F\u514D\u4E86\u4F7F\u7528\u5927\u91CF\u7684\u6761\u4EF6\u8BED\u53E5\u6765\u5224\u65AD\u72B6\u6001\u3002",paraId:233,tocIndex:138},{value:"\u5907\u5FD8\u5F55\u6A21\u5F0F\uFF08Memento Pattern\uFF09\u662F\u4E00\u79CD\u884C\u4E3A\u8BBE\u8BA1\u6A21\u5F0F\uFF0C",paraId:234,tocIndex:139},{value:"\u5B83\u5141\u8BB8\u5728\u4E0D\u7834\u574F\u5C01\u88C5\u6027\u7684\u524D\u63D0\u4E0B\u6355\u83B7\u5BF9\u8C61\u7684\u5185\u90E8\u72B6\u6001\uFF0C\u5E76\u5728\u9700\u8981\u65F6\u5C06\u5BF9\u8C61\u6062\u590D\u5230\u5148\u524D\u7684\u72B6\u6001",paraId:234,tocIndex:139},{value:"\u3002",paraId:234,tocIndex:139},{value:"Originator\uFF08\u539F\u53D1\u5668\uFF09",paraId:235,tocIndex:140},{value:"\uFF1A\u8D1F\u8D23\u521B\u5EFA\u5907\u5FD8\u5F55\u5BF9\u8C61\uFF0C\u7528\u4E8E\u8BB0\u5F55\u5F53\u524D\u65F6\u523B\u7684\u5185\u90E8\u72B6\u6001\uFF0C\u5E76\u53EF\u4EE5\u4F7F\u7528\u5907\u5FD8\u5F55\u5BF9\u8C61\u6062\u590D\u5176\u5185\u90E8\u72B6\u6001\u3002",paraId:235,tocIndex:140},{value:"Memento\uFF08\u5907\u5FD8\u5F55\uFF09",paraId:235,tocIndex:140},{value:"\uFF1A\u5B58\u50A8\u4E86\u539F\u53D1\u5668\u5BF9\u8C61\u7684\u5185\u90E8\u72B6\u6001\uFF0C\u53EF\u4EE5\u9632\u6B62\u539F\u53D1\u5668\u4EE5\u5916\u7684\u5BF9\u8C61\u8BBF\u95EE\u5907\u5FD8\u5F55\u5185\u90E8\u7684\u72B6\u6001\u3002",paraId:235,tocIndex:140},{value:"Caretaker\uFF08\u7BA1\u7406\u8005\uFF09",paraId:235,tocIndex:140},{value:"\uFF1A\u8D1F\u8D23\u4FDD\u5B58\u5907\u5FD8\u5F55\u5BF9\u8C61\uFF0C\u4F46\u4E0D\u80FD\u4FEE\u6539\u5907\u5FD8\u5F55\u7684\u5185\u5BB9\u3002\u4E3B\u8981\u7528\u4E8E\u4FDD\u5B58\u548C\u6062\u590D\u5907\u5FD8\u5F55\u5BF9\u8C61\u3002",paraId:235,tocIndex:140},{value:`public class Memento {
    private final String state;

    public Memento(String stateToSave) {
        state = stateToSave;
    }

    public String getSavedState() {
        return state;
    }
}
`,paraId:236,tocIndex:142},{value:`public class Originator {
    private String state;

    public void setState(String state) {
        this.state = state;
    }

    public String getState() {
        return state;
    }

    public Memento saveStateToMemento() {
        return new Memento(state);
    }

    public void getStateFromMemento(Memento memento) {
        state = memento.getSavedState();
    }
}
`,paraId:237,tocIndex:143},{value:`public class Caretaker {
    private final List<Memento> mementoList = new ArrayList<>();

    public void addMemento(Memento memento) {
        mementoList.add(memento);
    }

    public Memento getMemento(int index) {
        return mementoList.get(index);
    }
}
`,paraId:238,tocIndex:144},{value:`public class Client {
    public static void main(String[] args) {
        Originator originator = new Originator();
        Caretaker caretaker = new Caretaker();

        originator.setState("State 1");
        originator.setState("State 2");
        caretaker.addMemento(originator.saveStateToMemento());

        originator.setState("State 3");
        caretaker.addMemento(originator.saveStateToMemento());

        originator.getStateFromMemento(caretaker.getMemento(0));
        System.out.println("First saved State: " + originator.getState());

        originator.getStateFromMemento(caretaker.getMemento(1));
        System.out.println("Second saved State: " + originator.getState());
    }
}
`,paraId:239,tocIndex:145},{value:"Memento \u7C7B",paraId:240,tocIndex:146},{value:"\uFF1A\u5907\u5FD8\u5F55\u5BF9\u8C61\uFF0C\u5B58\u50A8\u4E86\u539F\u53D1\u5668\u5BF9\u8C61\u7684\u5185\u90E8\u72B6\u6001\u3002",paraId:240,tocIndex:146},{value:"Originator \u7C7B",paraId:240,tocIndex:146},{value:"\uFF1A\u539F\u53D1\u5668\u5BF9\u8C61\uFF0C\u8D1F\u8D23\u521B\u5EFA\u5907\u5FD8\u5F55\u5BF9\u8C61\uFF0C\u4FDD\u5B58\u5F53\u524D\u72B6\u6001\u5230\u5907\u5FD8\u5F55\uFF0C\u4EE5\u53CA\u4ECE\u5907\u5FD8\u5F55\u6062\u590D\u72B6\u6001\u3002",paraId:240,tocIndex:146},{value:"Caretaker \u7C7B",paraId:240,tocIndex:146},{value:"\uFF1A\u7BA1\u7406\u8005\u5BF9\u8C61\uFF0C\u8D1F\u8D23\u4FDD\u5B58\u5907\u5FD8\u5F55\u5BF9\u8C61\uFF0C\u5E76\u63D0\u4F9B\u83B7\u53D6\u5907\u5FD8\u5F55\u5BF9\u8C61\u7684\u65B9\u6CD5\u3002",paraId:240,tocIndex:146},{value:"Client \u7C7B",paraId:240,tocIndex:146},{value:"\uFF1A\u5BA2\u6237\u7AEF\u4EE3\u7801\uFF0C\u521B\u5EFA\u539F\u53D1\u5668\u548C\u7BA1\u7406\u8005\u5BF9\u8C61\uFF0C\u5E76\u6F14\u793A\u4E86\u4FDD\u5B58\u548C\u6062\u590D\u5BF9\u8C61\u72B6\u6001\u7684\u8FC7\u7A0B\u3002",paraId:240,tocIndex:146},{value:"\u901A\u8FC7\u5907\u5FD8\u5F55\u6A21\u5F0F\uFF0C\u53EF\u4EE5\u5728\u4E0D\u66B4\u9732\u5BF9\u8C61\u5185\u90E8\u5B9E\u73B0\u7684\u60C5\u51B5\u4E0B\u4FDD\u5B58\u548C\u6062\u590D\u5BF9\u8C61\u7684\u72B6\u6001\uFF0C\u4ECE\u800C\u66F4\u597D\u5730\u7EF4\u62A4\u5BF9\u8C61\u7684\u5C01\u88C5\u6027\u3002",paraId:241,tocIndex:146},{value:"\u6A21\u677F\u65B9\u6CD5\u6A21\u5F0F\uFF08Template Method Pattern\uFF09\u662F\u4E00\u79CD\u884C\u4E3A\u8BBE\u8BA1\u6A21\u5F0F\uFF0C",paraId:242,tocIndex:147},{value:"\u5B83\u5B9A\u4E49\u4E86\u4E00\u4E2A\u64CD\u4F5C\u4E2D\u7684\u7B97\u6CD5\u6846\u67B6\uFF0C\u5C06\u4E00\u4E9B\u6B65\u9AA4\u5EF6\u8FDF\u5230\u5B50\u7C7B\u4E2D\u5B9E\u73B0",paraId:242,tocIndex:147},{value:"\u3002\u6A21\u677F\u65B9\u6CD5\u4F7F\u5F97\u5B50\u7C7B\u53EF\u4EE5\u5728\u4E0D\u6539\u53D8\u7B97\u6CD5\u7ED3\u6784\u7684\u60C5\u51B5\u4E0B\u91CD\u65B0\u5B9A\u4E49\u7B97\u6CD5\u4E2D\u7684\u67D0\u4E9B\u6B65\u9AA4\u3002",paraId:242,tocIndex:147},{value:"AbstractClass\uFF08\u62BD\u8C61\u7C7B\uFF09",paraId:243,tocIndex:148},{value:"\uFF1A\u5B9A\u4E49\u4E86\u4E00\u4E2A\u6A21\u677F\u65B9\u6CD5\uFF0C\u5176\u4E2D\u5305\u542B\u4E86\u7B97\u6CD5\u7684\u6846\u67B6\u548C\u4E00\u7CFB\u5217\u62BD\u8C61\u65B9\u6CD5\uFF0C\u8FD9\u4E9B\u62BD\u8C61\u65B9\u6CD5\u7531\u5B50\u7C7B\u6765\u5B9E\u73B0\u3002",paraId:243,tocIndex:148},{value:"ConcreteClass\uFF08\u5177\u4F53\u7C7B\uFF09",paraId:243,tocIndex:148},{value:"\uFF1A\u5B9E\u73B0\u4E86\u62BD\u8C61\u7C7B\u4E2D\u7684\u62BD\u8C61\u65B9\u6CD5\uFF0C\u5B8C\u6210\u7B97\u6CD5\u4E2D\u7684\u5177\u4F53\u6B65\u9AA4\u3002",paraId:243,tocIndex:148},{value:`public abstract class AbstractClass {
    // \u6A21\u677F\u65B9\u6CD5\uFF0C\u5B9A\u4E49\u4E86\u7B97\u6CD5\u7684\u6846\u67B6
    public final void templateMethod() {
        step1();
        step2();
        step3();
    }

    // \u62BD\u8C61\u65B9\u6CD5\uFF0C\u7531\u5B50\u7C7B\u5B9E\u73B0\u5177\u4F53\u7684\u6B65\u9AA4
    protected abstract void step1();
    protected abstract void step2();

    // \u5177\u4F53\u65B9\u6CD5\uFF0C\u5DF2\u7ECF\u5B9E\u73B0\u597D\u7684\u6B65\u9AA4
    protected void step3() {
        System.out.println("AbstractClass: Performing step3");
    }
}
`,paraId:244,tocIndex:150},{value:`public class ConcreteClass extends AbstractClass {
    @Override
    protected void step1() {
        System.out.println("ConcreteClass: Performing step1");
    }

    @Override
    protected void step2() {
        System.out.println("ConcreteClass: Performing step2");
    }
}
`,paraId:245,tocIndex:151},{value:`public class Client {
    public static void main(String[] args) {
        AbstractClass abstractClass = new ConcreteClass();
        abstractClass.templateMethod();
    }
}
`,paraId:246,tocIndex:152},{value:"AbstractClass \u7C7B",paraId:247,tocIndex:153},{value:"\uFF1A\u62BD\u8C61\u7C7B\u5B9A\u4E49\u4E86\u4E00\u4E2A\u6A21\u677F\u65B9\u6CD5\uFF0C\u5176\u4E2D\u5305\u542B\u4E86\u7B97\u6CD5\u7684\u6846\u67B6\uFF0C\u4EE5\u53CA\u4E00\u7CFB\u5217\u62BD\u8C61\u65B9\u6CD5\u548C\u5177\u4F53\u65B9\u6CD5\u3002\u62BD\u8C61\u65B9\u6CD5\u7531\u5B50\u7C7B\u5B9E\u73B0\uFF0C\u5177\u4F53\u65B9\u6CD5\u5728\u62BD\u8C61\u7C7B\u4E2D\u5DF2\u7ECF\u5B9E\u73B0\u3002",paraId:247,tocIndex:153},{value:"ConcreteClass \u7C7B",paraId:247,tocIndex:153},{value:"\uFF1A\u5177\u4F53\u7C7B\u5B9E\u73B0\u4E86\u62BD\u8C61\u7C7B\u4E2D\u7684\u62BD\u8C61\u65B9\u6CD5\uFF0C\u5B8C\u6210\u4E86\u7B97\u6CD5\u4E2D\u7684\u5177\u4F53\u6B65\u9AA4\u3002",paraId:247,tocIndex:153},{value:"Client \u7C7B",paraId:247,tocIndex:153},{value:"\uFF1A\u5BA2\u6237\u7AEF\u4EE3\u7801\u521B\u5EFA\u4E86\u5177\u4F53\u7C7B\u7684\u5BF9\u8C61\uFF0C\u5E76\u8C03\u7528\u4E86\u6A21\u677F\u65B9\u6CD5\u3002",paraId:247,tocIndex:153},{value:"\u901A\u8FC7\u6A21\u677F\u65B9\u6CD5\u6A21\u5F0F\uFF0C\u53EF\u4EE5\u5728\u62BD\u8C61\u7C7B\u4E2D\u5B9A\u4E49\u7B97\u6CD5\u7684\u6846\u67B6\u548C\u5DF2\u7ECF\u5B9E\u73B0\u7684\u6B65\u9AA4\uFF0C\u800C\u5C06\u4E00\u4E9B\u5177\u4F53\u7684\u6B65\u9AA4\u5EF6\u8FDF\u5230\u5B50\u7C7B\u4E2D\u5B9E\u73B0",paraId:248,tocIndex:153},{value:"\uFF0C\u4ECE\u800C\u5B9E\u73B0\u4E86\u4EE3\u7801\u7684\u590D\u7528\u548C\u7075\u6D3B\u6027\u7684\u63D0\u9AD8\u3002",paraId:248,tocIndex:153},{value:"\u8BBF\u95EE\u8005\u6A21\u5F0F\uFF08Visitor Pattern\uFF09\u662F\u4E00\u79CD\u884C\u4E3A\u8BBE\u8BA1\u6A21\u5F0F\uFF0C",paraId:249,tocIndex:154},{value:"\u5B83\u5141\u8BB8\u4F60\u5C06\u7B97\u6CD5\u4ECE\u5176\u5BF9\u8C61\u7ED3\u6784\u4E2D\u5206\u79BB\u51FA\u6765\u3002\u8FD9\u6837\uFF0C\u4F60\u53EF\u4EE5\u5728\u4E0D\u6539\u53D8\u8FD9\u4E9B\u5BF9\u8C61\u7684\u60C5\u51B5\u4E0B\uFF0C\u5728\u8BE5\u5BF9\u8C61\u7ED3\u6784\u4E0A\u6DFB\u52A0\u65B0\u7684\u64CD\u4F5C\u3002",paraId:249,tocIndex:154},{value:"Visitor\uFF08\u8BBF\u95EE\u8005\uFF09",paraId:250,tocIndex:155},{value:"\uFF1A\u5B9A\u4E49\u4E86\u5BF9\u6BCF\u4E2A\u5143\u7D20\u5BF9\u8C61\uFF08Element\uFF09\u7684\u64CD\u4F5C\uFF0C\u53EF\u4EE5\u8BBF\u95EE\u5E76\u5904\u7406\u6BCF\u4E2A\u5143\u7D20\u5BF9\u8C61\u3002",paraId:250,tocIndex:155},{value:"ConcreteVisitor\uFF08\u5177\u4F53\u8BBF\u95EE\u8005\uFF09",paraId:250,tocIndex:155},{value:"\uFF1A\u5B9E\u73B0\u4E86 Visitor \u63A5\u53E3\u4E2D\u5B9A\u4E49\u7684\u6BCF\u4E2A\u64CD\u4F5C\uFF0C\u5B8C\u6210\u5BF9\u5143\u7D20\u5BF9\u8C61\u7684\u5177\u4F53\u64CD\u4F5C\u3002",paraId:250,tocIndex:155},{value:"Element\uFF08\u5143\u7D20\uFF09",paraId:250,tocIndex:155},{value:"\uFF1A\u5B9A\u4E49\u4E86\u4E00\u4E2A accept \u65B9\u6CD5\uFF0C\u63A5\u6536\u4E00\u4E2A\u8BBF\u95EE\u8005\u5BF9\u8C61\u4F5C\u4E3A\u53C2\u6570\uFF0C\u4F7F\u5F97\u8BBF\u95EE\u8005\u53EF\u4EE5\u8BBF\u95EE\u5E76\u5904\u7406\u8BE5\u5143\u7D20\u5BF9\u8C61\u3002",paraId:250,tocIndex:155},{value:"ConcreteElement\uFF08\u5177\u4F53\u5143\u7D20\uFF09",paraId:250,tocIndex:155},{value:"\uFF1A\u5B9E\u73B0\u4E86 Element \u63A5\u53E3\u4E2D\u7684 accept \u65B9\u6CD5\uFF0C\u7528\u4E8E\u5C06\u81EA\u8EAB\u4F20\u9012\u7ED9\u8BBF\u95EE\u8005\u5BF9\u8C61\uFF0C\u5E76\u8C03\u7528\u8BBF\u95EE\u8005\u5BF9\u8C61\u7684\u76F8\u5E94\u65B9\u6CD5\u3002",paraId:250,tocIndex:155},{value:"ObjectStructure\uFF08\u5BF9\u8C61\u7ED3\u6784\uFF09",paraId:250,tocIndex:155},{value:"\uFF1A\u7EF4\u62A4\u4E86\u4E00\u4E2A\u5143\u7D20\u7684\u96C6\u5408\uFF0C\u5E76\u63D0\u4F9B\u4E86\u4E00\u4E2A\u63A5\u6536\u8BBF\u95EE\u8005\u7684\u65B9\u6CD5\u3002",paraId:250,tocIndex:155},{value:`public interface Visitor {
    void visit(ConcreteElementA element);
    void visit(ConcreteElementB element);
}
`,paraId:251,tocIndex:157},{value:`public class ConcreteVisitor implements Visitor {
    @Override
    public void visit(ConcreteElementA element) {
        System.out.println("Visitor is processing ConcreteElementA");
    }

    @Override
    public void visit(ConcreteElementB element) {
        System.out.println("Visitor is processing ConcreteElementB");
    }
}
`,paraId:252,tocIndex:158},{value:`public interface Element {
    void accept(Visitor visitor);
}
`,paraId:253,tocIndex:159},{value:`public class ConcreteElementA implements Element {
    @Override
    public void accept(Visitor visitor) {
        visitor.visit(this);
    }
}

public class ConcreteElementB implements Element {
    @Override
    public void accept(Visitor visitor) {
        visitor.visit(this);
    }
}
`,paraId:254,tocIndex:160},{value:`public class ObjectStructure {
    private final List<Element> elements = new ArrayList<>();

    public void addElement(Element element) {
        elements.add(element);
    }

    public void accept(Visitor visitor) {
        for (Element element : elements) {
            element.accept(visitor);
        }
    }
}
`,paraId:255,tocIndex:161},{value:`public class Client {
    public static void main(String[] args) {
        ObjectStructure objectStructure = new ObjectStructure();
        objectStructure.addElement(new ConcreteElementA());
        objectStructure.addElement(new ConcreteElementB());

        Visitor visitor = new ConcreteVisitor();
        objectStructure.accept(visitor);
    }
}
`,paraId:256,tocIndex:162},{value:"Visitor \u63A5\u53E3",paraId:257,tocIndex:163},{value:"\uFF1A\u5B9A\u4E49\u4E86\u5BF9\u6BCF\u4E2A\u5177\u4F53\u5143\u7D20\u7684\u8BBF\u95EE\u65B9\u6CD5\u3002",paraId:257,tocIndex:163},{value:"ConcreteVisitor \u7C7B",paraId:257,tocIndex:163},{value:"\uFF1A\u5B9E\u73B0\u4E86 Visitor \u63A5\u53E3\uFF0C\u63D0\u4F9B\u4E86\u5BF9\u5177\u4F53\u5143\u7D20\u7684\u5B9E\u9645\u64CD\u4F5C\u3002",paraId:257,tocIndex:163},{value:"Element \u63A5\u53E3",paraId:257,tocIndex:163},{value:"\uFF1A\u5B9A\u4E49\u4E86\u63A5\u53D7\u8BBF\u95EE\u8005\u5BF9\u8C61\u7684\u65B9\u6CD5\uFF0C\u4F7F\u5F97\u8BBF\u95EE\u8005\u53EF\u4EE5\u8BBF\u95EE\u548C\u5904\u7406\u5143\u7D20\u5BF9\u8C61\u3002",paraId:257,tocIndex:163},{value:"ConcreteElement \u7C7B",paraId:257,tocIndex:163},{value:"\uFF1A\u5B9E\u73B0\u4E86 Element \u63A5\u53E3\uFF0C\u5B9E\u73B0\u4E86 accept \u65B9\u6CD5\uFF0C\u7528\u4E8E\u5C06\u81EA\u8EAB\u4F20\u9012\u7ED9\u8BBF\u95EE\u8005\u5BF9\u8C61\uFF0C\u5E76\u8C03\u7528\u8BBF\u95EE\u8005\u5BF9\u8C61\u7684\u76F8\u5E94\u65B9\u6CD5\u3002",paraId:257,tocIndex:163},{value:"ObjectStructure \u7C7B",paraId:257,tocIndex:163},{value:"\uFF1A\u7EF4\u62A4\u4E86\u4E00\u4E2A\u5143\u7D20\u5BF9\u8C61\u7684\u96C6\u5408\uFF0C\u5E76\u63D0\u4F9B\u4E86\u4E00\u4E2A\u63A5\u6536\u8BBF\u95EE\u8005\u5BF9\u8C61\u7684\u65B9\u6CD5\uFF0C\u7528\u4E8E\u904D\u5386\u5143\u7D20\u5BF9\u8C61\u96C6\u5408\uFF0C\u5E76\u8C03\u7528\u8BBF\u95EE\u8005\u5BF9\u8C61\u7684\u65B9\u6CD5\u3002",paraId:257,tocIndex:163},{value:"\u901A\u8FC7\u8BBF\u95EE\u8005\u6A21\u5F0F\uFF0C\u53EF\u4EE5\u5C06\u7B97\u6CD5\u4E0E\u5143\u7D20\u5BF9\u8C61\u7684\u7ED3\u6784\u5206\u79BB\uFF0C\u4F7F\u5F97\u589E\u52A0\u65B0\u7684\u64CD\u4F5C\u53D8\u5F97\u5BB9\u6613\uFF0C\u5E76\u4E14\u53EF\u4EE5\u5728\u4E0D\u6539\u53D8\u5143\u7D20\u5BF9\u8C61\u7684\u60C5\u51B5\u4E0B\u5BF9\u5176\u8FDB\u884C\u64CD\u4F5C\u3002",paraId:258,tocIndex:163},{value:"1\u3001\u5355\u4F8B\u6A21\u5F0F",paraId:259,tocIndex:164},{value:"\u4F5C\u7528\uFF1A\u4FDD\u8BC1\u7C7B\u53EA\u6709\u4E00\u4E2A\u5B9E\u4F8B\u3002",paraId:260,tocIndex:164},{value:"JDK\u4E2D\u4F53\u73B0\uFF1ARuntime\u7C7B\u3002",paraId:261,tocIndex:164},{value:"2\u3001\u9759\u6001\u5DE5\u5382\u6A21\u5F0F",paraId:262,tocIndex:164},{value:"\u4F5C\u7528\uFF1A\u4EE3\u66FF\u6784\u9020\u51FD\u6570\u521B\u5EFA\u5BF9\u8C61\uFF0C\u65B9\u6CD5\u540D\u6BD4\u6784\u9020\u51FD\u6570\u6E05\u6670\u3002",paraId:263,tocIndex:164},{value:"JDK\u4E2D\u4F53\u73B0\uFF1AInteger.valueOf\u3001Class.forName",paraId:264,tocIndex:164},{value:"3\u3001\u62BD\u8C61\u5DE5\u5382",paraId:265,tocIndex:164},{value:"\u4F5C\u7528\uFF1A\u521B\u5EFA\u67D0\u4E00\u79CD\u7C7B\u7684\u5BF9\u8C61\u3002",paraId:266,tocIndex:164},{value:"JDK\u4E2D\u4F53\u73B0\uFF1AJava.sql\u5305\u3002",paraId:267,tocIndex:164},{value:"4\u3001\u539F\u578B\u6A21\u5F0F",paraId:268,tocIndex:164},{value:"clone()\uFF1B",paraId:269,tocIndex:164},{value:"\u539F\u578B\u6A21\u5F0F\u7684\u672C\u8D28\u662F\u62F7\u8D1D\u539F\u578B\u6765\u521B\u5EFA\u65B0\u7684\u5BF9\u8C61\uFF0C\u62F7\u8D1D\u662F\u6BD4new\u66F4\u5FEB\u7684\u521B\u5EFA\u5BF9\u8C61\u7684\u65B9\u6CD5\uFF0C\u5F53\u9700\u8981\u5927\u6279\u91CF",paraId:270,tocIndex:164},{value:"\u521B\u5EFA\u65B0\u5BF9\u8C61\u800C\u4E14\u90FD\u662F\u540C\u4E00\u4E2A\u7C7B\u7684\u5BF9\u8C61\u7684\u65F6\u5019\u8003\u8651\u4F7F\u7528\u539F\u578B\u6A21\u5F0F\u3002",paraId:271,tocIndex:164},{value:"\u4E00\u822C\u7684\u514B\u9686\u53EA\u662F\u6D45\u62F7\u8D1D\uFF08\u5BF9\u8C61\u7684hash\u503C\u4E0D\u4E00\u6837\uFF0C\u4F46\u662F\u5BF9\u8C61\u91CC\u9762\u7684\u6210\u5458\u53D8\u91CF\u7684hash\u503C\u662F\u4E00\u6837\u7684\uFF09\u3002",paraId:272,tocIndex:164},{value:"\u6709\u4E9B\u573A\u666F\u9700\u8981\u6DF1\u62F7\u8D1D\uFF0C\u8FD9\u65F6\u6211\u4EEC\u5C31\u8981\u91CD\u5199clone\u65B9\u6CD5\uFF0C\u4EE5ArrayList\u4E3A\u4F8B\uFF1A",paraId:273,tocIndex:164},{value:"5\u3001\u9002\u914D\u5668\u6A21\u5F0F",paraId:274,tocIndex:164},{value:"\u4F5C\u7528\uFF1A\u4F7F\u4E0D\u517C\u5BB9\u7684\u63A5\u53E3\u76F8\u5BB9\u3002",paraId:275,tocIndex:164},{value:"JDK\u4E2D\u4F53\u73B0\uFF1AInputStream\u3001OutputStream\u3002",paraId:276,tocIndex:164},{value:"6\u3001\u88C5\u9970\u5668\u6A21\u5F0F",paraId:277,tocIndex:164},{value:"\u4F5C\u7528\uFF1A\u4E3A\u7C7B\u6DFB\u52A0\u65B0\u7684\u529F\u80FD\uFF0C\u9632\u6B62\u7C7B\u7EE7\u627F\u5E26\u6765\u7684\u7C7B\u7206\u70B8\u3002",paraId:278,tocIndex:164},{value:"JDK\u4E2D\u4F53\u73B0\uFF1Aio\u7C7B\u3001Collections\u3001List\u3002",paraId:279,tocIndex:164},{value:"7\u3001\u5916\u89C2\u6A21\u5F0F",paraId:280,tocIndex:164},{value:"\u4F5C\u7528\uFF1A\u5C01\u88C5\u4E00\u7EC4\u4EA4\u4E92\u7C7B\uFF0C\u4E00\u76F4\u5BF9\u5916\u63D0\u4F9B\u63A5\u53E3\u3002",paraId:281,tocIndex:164},{value:"JDK\u4E2D\u4F53\u73B0\uFF1Alogging\u5305\u3002",paraId:282,tocIndex:164},{value:"8\u3001\u4EAB\u5143\u6A21\u5F0F",paraId:283,tocIndex:164},{value:"\u4F5C\u7528\uFF1A\u5171\u4EAB\u5BF9\u8C61\u3001\u8282\u7701\u5185\u5B58\u3002",paraId:284,tocIndex:164},{value:"JDK\u4E2D\u4F53\u73B0\uFF1AInteger.valueOf\u3001String\u5E38\u91CF\u6C60\u3002",paraId:285,tocIndex:164},{value:"9\u3001\u4EE3\u7406\u6A21\u5F0F",paraId:286,tocIndex:164},{value:"\u4F5C\u7528\uFF1A",paraId:287,tocIndex:164},{value:"\uFF081\uFF09\u900F\u660E\u8C03\u7528\u88AB\u4EE3\u7406\u5BF9\u8C61\uFF0C\u65E0\u987B\u77E5\u9053\u590D\u6742\u5B9E\u73B0\u7EC6\u8282\uFF1B",paraId:288,tocIndex:164},{value:"\uFF082\uFF09\u589E\u52A0\u88AB\u4EE3\u7406\u7C7B\u7684\u529F\u80FD\uFF1B",paraId:289,tocIndex:164},{value:"JDK\u4E2D\u4F53\u73B0\uFF1A\u52A8\u6001\u4EE3\u7406\u3002",paraId:290,tocIndex:164},{value:"10\u3001\u8FED\u4EE3\u5668\u6A21\u5F0F",paraId:291,tocIndex:164},{value:"\u4F5C\u7528\uFF1A\u5C06\u96C6\u5408\u7684\u8FED\u4EE3\u548C\u96C6\u5408\u672C\u8EAB\u5206\u79BB\u3002",paraId:292,tocIndex:164},{value:"JDK\u4E2D\u4F53\u73B0\uFF1AIterator",paraId:293,tocIndex:164},{value:"11\u3001\u547D\u4EE4\u6A21\u5F0F",paraId:294,tocIndex:164},{value:"\u4F5C\u7528\uFF1A\u5C01\u88C5\u64CD\u4F5C\uFF0C\u4F7F\u63A5\u53E3\u4E00\u81F4\u3002",paraId:295,tocIndex:164},{value:"JDK\u4E2D\u4F53\u73B0\uFF1ARunable\u3001Callable\u3001ThreadPoolExecutor\u3002",paraId:296,tocIndex:164}]}}]);
