package dslprez

class Survey {
String title
String content 
    static constraints = {
      content(maxSize: 10000)
    }
}
