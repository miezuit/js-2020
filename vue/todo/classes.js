// alege un numar aleatoriu intre 0 si max
function random(max) {
    return Math.floor(Math.random() * max - 1)
}

class Color {
    red
    green
    blue

    constructor(red, green, blue) {
        this.red = red
        this.green = green
        this.blue = blue
    }

    // creaza o noua culoare aleatorie
    // (constructor static)
    static random() {
        return new Color(random(255), random(255), random(255))
    }
}

class Task {
    description
    color = Color.random()
    done = false

    constructor(description) {
        this.description = description
    }

    switchDone() {
        this.done = !this.done
    }

    isDone() {
        return this.done
    }

    changeDescription(newDescription) {
        if (newDescription.length > 100) {
            throw 'Description is too long'
        }
        this.description = newDescription
    }

    getDescription() {
        return this.description
    }
}

class TodoList {
    name
    tasks = []

    constructor(name) {
        this.name = name
    }

    rename(newName) {
        this.name = newName
    }

    add(task) {
        this.tasks.push(task)
    }

    remove(index) {
        this.tasks.splice(index, 1)
    }

    // avem nevoie de 2 getteri (nume si task-uri)
    // pentru incapsulare (protejarea informatiei)
    getName() {
        return this.name
    }

    getTasks() {
        return this.tasks
    }
}

export { TodoList, Task }

// let today = new TodoList('Today')
// today.add(new Task('Say good morning'))
// today.add(new Task('Learn OOP'))
// today.remove(1)
