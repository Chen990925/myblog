---
group: 开发工具
title: idea中的debug
order: 1
---

# idea中debug指南

<img src="../../public/images/image-20240407162349187.png" alt="image-20240407162349187" style="zoom:150%;" />

让你的鼠标光标快速移动到正在debug运行的那一行代码

<img src="../../public/images/image-20240407162502539.png" alt="image-20240407162502539" style="zoom:150%;" />

执行下一行代码

<img src="../../public/images/image-20240407162537459.png" alt="image-20240407162537459" style="zoom:150%;" />

<img src="../../public/images/image-20240407162603592.png" alt="image-20240407162603592" style="zoom:150%;" />

进入/退出方法体

<img src="../../public/images/image-20240407162644997.png" alt="image-20240407162644997" style="zoom:150%;" />

直接运行到鼠标光标所在这一行

<img src="../../public/images/image-20240407162908982.png" alt="image-20240407162908982" style="zoom:150%;" />

输入表达式获取debug期间的程序变量，类似于监视

<img src="../../public/images/image-20240407163313392.png" alt="image-20240407163313392" style="zoom:150%;" />

执行到下个断点，没有则结束debug

<img src="../../public/images/image-20240407163344524.png" alt="image-20240407163344524" style="zoom:150%;" />

查看程序中所有的断点，行/方法/异常上断点

<img src="../../public/images/image-20240407163545786.png" alt="image-20240407163545786" style="zoom:150%;" />

debug期间取消全部断点，使所有断点本次不生效

![image-20240407163732927](../../public/images/image-20240407163732927.png)

右键某变量可以时刻观察

![image-20240407163842051](../../public/images/image-20240407163842051.png)

右键某个断点可以添加条件，让条件符合时才执行这个断点

<img src="../../public/images/image-20240407164458135.png" alt="image-20240407164458135" style="zoom:150%;" />

对于lambda表达式可以通过这个按钮进行监视

<img src="../../public/images/image-20240407164631829.png" alt="image-20240407164631829" style="zoom:50%;" />

让某个方法不执行直接返回某个想要的值

<img src="../../public/images/image-20240407164753093.png" alt="image-20240407164753093" style="zoom:50%;" />

多线程环境下选择想要进入的线程



对于属性加断点可以监视这个属性修改时的代码



接口中方法的断点会直接跳转到实现这个接口的方法中去



<img src="../../public/images/image-20240407165332640.png" alt="image-20240407165332640" style="zoom: 50%;" />

在查看所有断点中执行以上操作，如果代码中出现了想要监视的异常则会直接跳转到出现异常的那行代码
