package dslprez

class Position {
    int x
    int y
    Direction direction
    Position left() {
        new Position(x, y, Direction.left);
    }
    Position right() {
        new Position(x, y, Direction.right);
    }
    Position up() {
        new Position(x , y, Direction.up);
    }
    Position down() {
        new Position(x , y, Direction.down);
    }
    def Position(moveX, moveY, myDirection) {
        x = moveX
        y = moveY
        direction = myDirection
    }
    Position move(Integer step) {
        Position newPosition
        if(direction == Direction.left) {
            newPosition = new Position(x - step, y, direction)
        } else if(direction == Direction.right) {
            newPosition = new Position(x + step, y, direction)
        } else if(direction == Direction.up) {
            newPosition = new Position(x, y + step, direction)
        } else if(direction == Direction.down) {
            newPosition = new Position(x, y - step, direction)
        }
    }
}
enum Direction {
    left, right, up, down
}



