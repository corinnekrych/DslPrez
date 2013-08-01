package dslprez

import groovy.transform.TypeChecked

@TypeChecked
class Turtle {
    Position currentPosition
    List steps = []
    Turtle(Position start) {
        currentPosition = start
        steps.add(start)
    }

    Turtle move(Direction dir) {
        Position newPosition
        if (dir == Direction.left) {
            newPosition = currentPosition.left()
        } else if (dir == Direction.right) {
            newPosition = currentPosition.right()
        } else if (dir == Direction.up) {
            newPosition = currentPosition.up()
        } else if (dir == Direction.down) {
            newPosition = currentPosition.down()
        }
        currentPosition = newPosition
        this
    }

    Turtle by (Integer step) {
        Position newPosition = currentPosition.move(step)
        steps.add(newPosition)
        currentPosition = newPosition
        this
    }

}


