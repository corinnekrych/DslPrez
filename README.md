DslPrez
=======

### This presentation was given at:
- [Gr8Conf EU June 2012](http://lanyrd.com/2012/gr8conf-europe/) with [Corinne Krych](http://corinnekrych.github.io/) and [Sebastien Blanc](https://github.com/sebastienblanc) 

- [GGX in London December 2012](https://skillsmatter.com/legacy_profile/fabrice-matrat) with [Corinne Krych](http://corinnekrych.github.io/) and [Fabrice Matrat](http://fabricematrat.github.io/)    

- Greach in Madrid January 2013 with [Corinne Krych](http://corinnekrych.github.io/) and [Sebastien Blanc](https://github.com/sebastienblanc) 

- RivieraGUG April 2013 with [Corinne Krych](http://corinnekrych.github.io/) and [Fabrice Matrat](http://fabricematrat.github.io/)    

- Gr8ConfUS July 2013 with [Corinne Krych](http://corinnekrych.github.io/) and [Fabrice Matrat](http://fabricematrat.github.io/)    

- [JavaOne](https://oracleus.activeevents.com/2013/connect/sessionDetail.ww?SESSION_ID=4524) September 2013 with the title "Embedded DSL: a Groovy and Scala fair duel." starring [Corinne Krych](http://corinnekrych.github.io/) and [Pascal Cohen](http://fr.linkedin.com/pub/pascal-cohen/1/105/1a8)

- [MarsJUG](http://marsjug.org/) December 2013 starring [Fabrice Matrat](http://fabricematrat.github.io/) and [Pascal Cohen](http://fr.linkedin.com/pub/pascal-cohen/1/105/1a8)

- [Scotch on the rocks](http://www.sotr.eu/) June 2014 with the title "Embedded DSL: a Groovy and Scala fair duel." starring [Corinne Krych](http://corinnekrych.github.io/) and [Fabrice Matrat](http://fabricematrat.github.io/)    

### What is it made of

1. DSL to move the turtle/robot is written in Groovy, Scala
2. Grails for Server side Controller part that will do shell.evaluate and return position value for the turtle.
3. HTML5 Canvas API for displaying turtle moves and positions. .
4. Home made presentation framework with embedded CodeMirror editor

### How to build your dev environment
See [dev environment](https://github.com/corinnekrych/KissingTurtles/blob/master/DEV.md) instruction

### Dsl by exemple

* In Groovy:

```java
move up
move left by 2
kiss
ask "Change meeting?" assign to response 
if(response == "y") meet x:12, y:1 
```

* In Scala

```java
I move up
I move left by 2
I kiss;
val response = I ask "Change meeting?"
if(response == "y") meet (12, 1) 
```

If you want to play the final game, see [KissingTurtles](https://github.com/corinnekrych/KissingTurtles)
