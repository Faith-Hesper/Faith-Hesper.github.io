---
title: react
mathjax: true
date: 2022-11-18 08:53:45
tags: [react]
categories: [react]
description:
---

### react

#### useState

##### 语法

1. `count`: 数据状态

   `setCount`： 修改`count`的专有函数

2. `useState`中的参数是作为**状态**`count`的初始值

3. `[count,setCount]` 这里的写法是一个解构赋值`useState`返回值是一个数组

   名字可以自定义

   顺序不可调换

首次渲染：

1. 首次渲染的时候，组件内部的代码会被执行一次

2. 首次渲染时会执行`useState`，初始化数据状态，且初始值只在首次渲染时生效

更新渲染：

1. 组件会被再次渲染，setCount会被再次执行

2. useState 再次执行，得到新的状态`count`的值

##### 示例

###### 基础用法

```react
const [count,setCount] = useState(0)
```

```react
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      You pressed me {count} times
    </button>
  );
}
```

###### 基础用法

```react
import { useState } from 'react';

export default function Form() {
  const [name, setName] = useState('Taylor');
  const [age, setAge] = useState(42);

  return (
    <>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => setAge(age + 1)}>
        Increment age
      </button>
      <p>Hello, {name}. You are {age}.</p>
    </>
  );
}
```

###### 闭包

箭头函数形成闭包，保存了+1后的结果

```react
import { useState } from 'react';

export default function Counter() {
  const [age, setAge] = useState(42);
	
    // 闭包
  function increment() {
    setAge(a => a + 1);
  }
   
  function increment1() {
    setAge(a + 1)
  }

  return (
    <>
      <h1>Your age: {age}</h1>
      <button onClick={() => {
        increment();
        increment();
        increment();
      }}>+3</button>
      <button onClick={() => {
        increment1();
        increment1();
        increment1();
      }}>+1</button>
    </>
  );
}
```

##### 对象类型状态更新

```rea
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    setPerson({
      ...person,
      name: e.target.value
    });
  }

  function handleTitleChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        title: e.target.value
      }
    });
  }


  return (
    <>
      <label>
        Name:
        <input
          value={person.name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Title:
        <input
          value={person.artwork.title}
          onChange={handleTitleChange}
        />
      </label>
    </>
  );
}
```

##### 数组类型状态更新

```js
const initialTodos = [
  { id: 0, title: 'Buy milk', done: true },
  { id: 1, title: 'Eat tacos', done: false },
  { id: 2, title: 'Brew tea', done: false },
];
const [todos, setTodos] = useState(initialTodos);

  function handleAddTodo(title) {
    setTodos([
      ...todos,
      {
        id: nextId++,
        title: title,
        done: false
      }
    ]);
  }

  function handleChangeTodo(nextTodo) {
    setTodos(todos.map(t => {
      if (t.id === nextTodo.id) {
        return nextTodo;
      } else {
        return t;
      }
    }));
  }

  function handleDeleteTodo(todoId) {
    setTodos(
      todos.filter(t => t.id !== todoId)
    );
  }
```



#### useContext

##### 定义

获取组件`context`(上下文)，跨组件传参

###### 语法

context值取决于组件树中最近的context provider的值

```react
import { createContext, useContext } from 'react';

//
const ThemeContext = createContext(null);

export default function MyApp() {
  return (
    <ThemeContext.Provider value="dark">
      <Form />
    </ThemeContext.Provider>
  )
}

function Form() {
  return (
    <Panel title="Welcome">
      <Button>Sign up</Button>
      <Button>Log in</Button>
    </Panel>
  );
}

function Panel({ title, children }) {
  const theme = useContext(ThemeContext);
  const className = 'panel-' + theme;
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  )
}

function Button({ children }) {
  const theme = useContext(ThemeContext);
  const className = 'button-' + theme;
  return (
    <button className={className}>
      {children}
    </button>
  );
}
```



#### useEffect

##### 定义

副作用

执行时机：DOM更新完后执行，每次组件重新渲染都会执行，包括首次渲染

##### 语法

`setup`：要执行的副作用

`dependencies`：执行依赖，当依赖变化时就会执行`setup`里面的方法

```react
useEffect(setup, dependencies?)
```

当 roomId、serverUrl 值变化时会执行`useEffect`

```react
const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
  }, [roomId, serverUrl]);
```

当传入的依赖为空数组时，`useEffect`只会在首次渲染时执行

```react
useEffect(setup, [])
```

```react
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  },[]);
}
```

没有设置依赖时，当组件重新渲染时都会执行该方法

```react
useEffect(setup)
```

```react
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
}
```

通过`return`取消副作用

```r
import { useState, useEffect } from 'react';

export function createConnection(serverUrl, roomId) {
  // A real implementation would actually connect to the server
  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + '" room at ' + serverUrl + '...');
    },
    disconnect() {
      console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl);
    }
  };
}

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [roomId, serverUrl]);

  return (
    <>
      <label>
        Server URL:{' '}
        <input
          value={serverUrl}
          onChange={e => setServerUrl(e.target.value)}
        />
      </label>
      <h1>Welcome to the {roomId} room!</h1>
    </>
  );
}

export default function App() {
  const [roomId, setRoomId] = useState('general');
  const [show, setShow] = useState(false);
  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <button onClick={() => setShow(!show)}>
        {show ? 'Close chat' : 'Open chat'}
      </button>
      {show && <hr />}
      {show && <ChatRoom roomId={roomId} />}
    </>
  );
}

```

