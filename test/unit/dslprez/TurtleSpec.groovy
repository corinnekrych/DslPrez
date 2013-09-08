package dslprez

import spock.lang.Specification

class TurtleSpec extends Specification {

    def turtle = new Turtle()

    void 'turtle moves right without by, wont move turtle'() {
        given:
        turtle.currentPosition = new Position(1, 1, Direction.left)

        when:
        turtle = turtle.move(Direction.right)

        then:
        turtle.currentPosition.x == 1
        turtle.currentPosition.y == 1
    }

    void 'turtle moves right by 1, move the turtle'() {
        given:
        turtle.currentPosition = new Position(1, 1, Direction.left)

        when:
        turtle = turtle.move(Direction.right).by(1)

        then:
        turtle.currentPosition.x == 2
        turtle.currentPosition.y == 1
    }

}